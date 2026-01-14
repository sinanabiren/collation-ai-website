'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Welcome Back!",
        description: "Successfully signed in. Redirecting to dashboard...",
      });
      
      // Redirect to trial dashboard after successful signin
      setTimeout(() => {
        router.push('/trial-dashboard');
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Sign In Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8">
        {/* Back to Home */}
        <Link href="/"
          className="inline-flex items-center text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors mb-6 sm:mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
          Back to Home
        </Link>

        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              collation.ai
            </h1>
          </div>

          <Card className="border-border/50 shadow-lg">
            <CardHeader className="text-center px-4 py-5 sm:px-6 sm:py-6">
              <CardTitle className="text-xl sm:text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription className="text-xs sm:text-sm mt-1.5">
                Sign in to access your 7-day trial
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="email" className="text-xs sm:text-sm">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@smithfamily.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-10 sm:h-11 text-sm sm:text-base px-3 sm:px-4"
                  />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="password" className="text-xs sm:text-sm">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="h-10 sm:h-11 text-sm sm:text-base px-3 sm:px-4 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 sm:right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, rememberMe: checked as boolean })
                      }
                      className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                    />
                    <Label htmlFor="rememberMe" className="text-xs sm:text-sm cursor-pointer">
                      Remember me
                    </Label>
                  </div>
                  <Link href="#"
                    className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors ml-6 sm:ml-0"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-10 sm:h-11 text-sm sm:text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </Button>

                <div className="text-center pt-2">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link href="/free-trial"
                      className="text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      Start your free trial
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Trial Banner */}
          <div className="mt-5 sm:mt-6 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center px-4 py-2.5 sm:py-2 bg-success/10 border border-success/20 rounded-lg gap-1 sm:gap-0">
              <span className="text-xs sm:text-sm font-medium text-success">
                7-Day Free Trial
              </span>
              <span className="text-[10px] sm:text-sm text-muted-foreground sm:ml-2">
                - No credit card required
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

