import {
  Avatar, AvatarFallback, AvatarImage, Badge, Button, Card, Separator,
} from "@/shared";
import {
  User, Package, MapPin, CreditCard, Settings, LogOut, Camera,
  ShoppingBag, Star,
} from "lucide-react";
import { StatCard } from "./ProfileStatusCard";

interface ProfileSidebarProps {
  fullName: string;
  initials: string;
  photoURL: string;
  email: string;
  role?: string;
  orderCount: number;
  deliveredCount: number;
  logout: () => void;
}

export function ProfileSidebar({
  fullName, initials, photoURL, email, role, orderCount, deliveredCount, logout,
}: ProfileSidebarProps) {
  return (
    <Card className="p-2 sm:p-3 border-primary/10 lg:sticky lg:top-24">
      {/* Avatar */}
      <div className="flex lg:flex-col items-center gap-4 lg:gap-0 mb-4 lg:mb-5 lg:text-center">
        <div className="relative shrink-0 lg:mb-3">
          <Avatar className="w-16 h-16 lg:w-20 lg:h-20 border-4 border-primary/20 shadow-lg shadow-primary/10">
            <AvatarImage src={photoURL} />
            <AvatarFallback className="text-base lg:text-lg font-bold bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <button
            title="Change photo"
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow"
          >
            <Camera className="w-3 h-3 text-white" />
          </button>
        </div>
        <div className="min-w-0 lg:w-full">
          <h3 className="text-base lg:text-lg font-bold truncate">{fullName}</h3>
          <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[200px] lg:max-w-[160px] lg:mx-auto">
            {email}
          </p>
          {role && (
            <Badge className="mt-1.5 bg-primary/15 text-primary border border-primary/20 text-xs capitalize">
              {role === "ADMIN" ? "⭐ Admin" : "Premium Member"}
            </Badge>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 mb-4 lg:mb-5">
        <StatCard icon={ShoppingBag} label="Orders"    value={orderCount} accent />
        <StatCard icon={Star}        label="Delivered" value={deliveredCount} />
      </div>

      <Separator className="mb-3 lg:mb-4" />

      {/* Nav */}
      <nav className="flex flex-wrap lg:flex-col gap-1">
        {[
          { icon: User,       label: "Profile"         },
          { icon: Package,    label: "Orders"          },
          { icon: MapPin,     label: "Addresses"       },
          { icon: CreditCard, label: "Payment Methods" },
          { icon: Settings,   label: "Settings"        },
        ].map(({ icon: Icon, label }) => (
          <Button
            key={label}
            variant="ghost"
            className="flex-1 lg:flex-none lg:w-full justify-start gap-2.5 hover:bg-primary/8 hover:text-primary text-sm h-9 min-w-[120px] lg:min-w-0"
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline lg:inline">{label}</span>
          </Button>
        ))}
      </nav>

      <Separator className="my-3 lg:my-4" />

      <Button
        variant="ghost"
        onClick={logout}
        className="w-full justify-start gap-2.5 text-destructive hover:bg-destructive/8 text-sm h-9"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden sm:inline lg:inline">Logout</span>
      </Button>
    </Card>
  );
}