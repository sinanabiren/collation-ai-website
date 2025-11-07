import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company name is required"),
  phone: z.string().optional(),
});

interface TrialModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TrialModal = ({ open, onOpenChange }: TrialModalProps) => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const trialUrl = import.meta.env.VITE_TRIAL_URL || "https://lovable.dev/projects/f18d007a-d7ee-460c-b0ee-ee72a51683d9";

      // Open target immediately on user gesture to avoid blank about:blank tabs
      let opened = false;
      try {
        const win = window.open(trialUrl, "_blank", "noopener,noreferrer");
        opened = !!win;
      } catch {
        opened = false;
      }
      if (!opened) {
        const a = document.createElement("a");
        a.href = trialUrl;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.click();
      }

      // Here you can integrate with your backend or email service
      // For now, we'll just show a success message
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      toast({
        title: "Trial Request Submitted!",
        description: "Your trial opened in a new tab. If not, use this link: " + trialUrl,
      });

      // Reset form
      form.reset();

      // Close modal
      setTimeout(() => {
        onOpenChange(false);
      }, 800);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Start Your 7-Day Free Trial</DialogTitle>
          <DialogDescription className="text-base">
            Experience the power of Collation.AI's Agentic AI Bots. No credit card required.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Email *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Company" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4 space-y-3">
              <Button
                type="submit"
                className="w-full text-lg py-6"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Processing..." : "Start Free Trial"}
              </Button>

            <p className="text-xs text-center text-muted-foreground">
              By submitting, you agree to our Terms of Service and Privacy Policy.
              <br />
              No credit card required. Cancel anytime.
            </p>
          </div>

          <div className="pt-4 border-t">
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <p className="font-bold text-primary">7 Days</p>
                <p className="text-muted-foreground">Free Trial</p>
              </div>
              <div>
                <p className="font-bold text-primary">$0</p>
                <p className="text-muted-foreground">Setup Fee</p>
              </div>
              <div>
                <p className="font-bold text-primary">24/7</p>
                <p className="text-muted-foreground">Support</p>
              </div>
            </div>
          </div>
          </motion.form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
