import { Link, useLocation } from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  LayoutDashboard,
  Database,
  TrendingUp,
  Shield,
  BarChart3,
  FileText,
  AlertTriangle,
  LineChart,
  Activity,
  Workflow,
  PieChart,
  DollarSign,
  Menu,
  LogOut,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigationItems = [
  { name: "Dashboard", path: "/trial-dashboard", icon: LayoutDashboard },
  { name: "Data Warehouse", path: "/data-warehouse", icon: Database },
  { name: "Direct Alpha", path: "/direct-alpha", icon: TrendingUp },
  { name: "Risk Metrics", path: "/risk-metrics", icon: Shield },
  { name: "Holdings Report", path: "/holdings-report", icon: BarChart3 },
  { name: "Financial Summary", path: "/financial-summary", icon: FileText },
  { name: "Drawdown Analysis", path: "/drawdown-analysis", icon: AlertTriangle },
  { name: "Fixed Income", path: "/fixed-income", icon: LineChart },
  { name: "Volatility", path: "/volatility-analysis", icon: Activity },
  { name: "Workflow", path: "/workflow-analysis", icon: Workflow },
  { name: "Sector Risk", path: "/sector-risk", icon: PieChart },
  { name: "Stress Testing", path: "/stress-testing", icon: DollarSign },
];

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleLogout = async () => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    } else {
      navigate("/");
    }
  };

  const NavLinks = () => (
    <>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm">{item.name}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex w-64 min-h-screen border-r bg-card flex-col">
        <div className="p-6 border-b">
          <Link href="/trial-dashboard">
            <h1 className="text-xl font-bold">Collation.AI</h1>
          </Link>
        </div>
        <div className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavLinks />
        </div>
        <div className="p-4 border-t">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b">
        <div className="flex items-center justify-between p-4">
          <Link href="/trial-dashboard">
            <h1 className="text-lg font-bold">Collation.AI</h1>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="p-6 border-b">
                <h1 className="text-xl font-bold">Collation.AI</h1>
              </div>
              <div className="p-4 space-y-1">
                <NavLinks />
              </div>
              <div className="p-4 border-t">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};
