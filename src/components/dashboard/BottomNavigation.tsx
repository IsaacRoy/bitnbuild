import { Home, Wallet, Plus, BarChart3, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Wallet, label: "Wallet", active: false },
  { icon: Plus, label: "Add", isCenter: true },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: User, label: "Profile", active: false },
];

export function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-4 py-2 shadow-lg z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item, index) => (
          <Button
            key={item.label}
            variant={item.isCenter ? "action" : "navigation"}
            size={item.isCenter ? "default" : "icon"}
            className={`${
              item.isCenter 
                ? "bg-gradient-action text-white shadow-action scale-110" 
                : item.active 
                  ? "text-navy-primary" 
                  : "text-muted-foreground"
            }`}
          >
            <item.icon className={`${item.isCenter ? "h-5 w-5" : "h-6 w-6"}`} />
            {item.isCenter && <span className="sr-only">{item.label}</span>}
          </Button>
        ))}
      </div>
    </nav>
  );
}