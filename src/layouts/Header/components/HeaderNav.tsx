import { NAV_ITEMS } from "@/shared";
import { Link, useLocation } from "react-router";
import { motion } from "@/shared";

type NavProps = {
  role: string;
};

export default function HeaderNav({ role }: NavProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  const getNavByRole = (role?: string) => {
    const userRole = role || "GUEST";
    return NAV_ITEMS.filter((item) => item.roles?.includes(userRole as any));
  };

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {getNavByRole(role).map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`relative px-3 py-1.5 text-sm rounded-lg transition-all ${
            isActive(item.path)
              ? "text-primary font-semibold"
              : "text-foreground hover:text-primary hover:bg-primary/5"
          }`}
        >
          {item.label}
          {/* Active underline indicator */}
          {isActive(item.path) && (
            <motion.span
              layoutId="nav-indicator"
              className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </Link>
      ))}
    </nav>
  );
}
