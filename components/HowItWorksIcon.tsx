import { Calendar, Brain, Share2, TrendingUp, FileText, Clock, CheckCircle, Puzzle, Bot, LayoutDashboard } from "lucide-react";

interface HowItWorksIconProps {
  type: 'calendar' | 'brain' | 'share' | 'chart' | 'document' | 'clock' | 'check' | 'puzzle' | 'bot' | 'dashboard';
  size?: 'sm' | 'md' | 'lg';
  position?: 'left' | 'right' | 'center';
}

const HowItWorksIcon = ({ type, size = 'md', position = 'center' }: HowItWorksIconProps) => {
  const iconComponents = {
    calendar: Calendar,
    brain: Brain,
    share: Share2,
    chart: TrendingUp,
    document: FileText,
    clock: Clock,
    check: CheckCircle,
    puzzle: Puzzle,
    bot: Bot,
    dashboard: LayoutDashboard,
  };

  const Icon = iconComponents[type];

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-28 h-28',
    lg: 'w-36 h-36',
  };

  const iconSizes = {
    sm: 32,
    md: 44,
    lg: 56,
  };

  const positionClasses = {
    left: '-left-4',
    right: '-right-4',
    center: '',
  };

  return (
    <div className={`relative flex items-center ${position === 'center' ? 'justify-center' : ''}`}>
      {/* Main circle */}
      <div className={`${sizeClasses[size]} ${positionClasses[position]} rounded-full bg-primary flex items-center justify-center shadow-lg relative`}>
        <Icon className="text-white" size={iconSizes[size]} strokeWidth={2} />
      </div>
    </div>
  );
};

export default HowItWorksIcon;
