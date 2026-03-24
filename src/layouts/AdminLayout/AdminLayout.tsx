import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Store, 
  Settings, 
  LogOut,
  Menu,
  X,
  ChefHat
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: ShoppingBag, label: "Orders", path: "/admin/orders" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: ChefHat, label: "Foods", path: "/admin/foods" }, 
  { icon: Store, label: "Vendors", path: "/admin/vendors" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-card border border-border"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-40 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-2xl">🍽️</span>
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Admin Panel
              </h2>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 ${
                    isActive
                      ? "bg-primary/10 text-primary hover:bg-primary/20"
                      : "hover:bg-muted"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10">
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
