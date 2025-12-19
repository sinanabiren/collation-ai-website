import { lazy, Suspense, useEffect, useRef, useState } from "react";

interface LottieAnimationProps {
  animationData?: unknown;
  // Optional dynamic importer to code-split heavy JSON animations
  animationImport?: () => Promise<any>;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  onComplete?: () => void;
}

const Lottie = lazy(() => import("lottie-react"));

const LottieAnimation = ({
  animationData,
  animationImport,
  className = "",
  loop = true,
  autoplay = true,
  speed = 1,
  onComplete
}: LottieAnimationProps) => {
  const lottieRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loadedData, setLoadedData] = useState<any>(animationData);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Lazy import the JSON only when visible
  useEffect(() => {
    let cancelled = false;
    if (isVisible && !loadedData && animationImport) {
      setIsLoading(true);
      animationImport().then((mod) => {
        if (!cancelled) {
          setLoadedData(mod?.default ?? mod);
          setIsLoading(false);
        }
      }).catch((error) => {
        if (!cancelled) {
          console.error('Error loading animation:', error);
          setHasError(true);
          setIsLoading(false);
        }
      });
    }
    return () => { cancelled = true; };
  }, [isVisible, loadedData, animationImport]);
  
  useEffect(() => {
    if (lottieRef.current && speed !== 1) {
      lottieRef.current.setSpeed(speed);
    }
  }, [speed]);

  const data = loadedData ?? animationData;

  return (
    <div ref={containerRef} className={className}>
      {isLoading && (
        <div className={`flex items-center justify-center ${className}`}>
          <div className="animate-pulse text-muted-foreground">Loading animation...</div>
        </div>
      )}
      {hasError && (
        <div className={`flex items-center justify-center ${className}`}>
          <div className="text-muted-foreground text-sm">Animation unavailable</div>
        </div>
      )}
      {isVisible && data && !isLoading && !hasError && (
        <Suspense fallback={<div className={`animate-pulse ${className}`} />}>
          <Lottie
            lottieRef={lottieRef}
            animationData={data}
            loop={loop}
            autoplay={autoplay}
            className={className}
            rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
            onComplete={onComplete}
          />
        </Suspense>
      )}
    </div>
  );
};

export default LottieAnimation;
