import { Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/profile-floyd.jpg";

export function Header() {
  return (
    <header className="bg-navy-primary px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Notification Bell */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/10 hover:bg-white/20 rounded-full"
          >
            <Bell className="h-5 w-5 text-white" />
          </Button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 bg-white/10 rounded-full px-3 py-2 hover:bg-white/20 transition-colors cursor-pointer">
          <img
            src={profileImage}
            alt="Isaac Roy profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-white font-medium text-sm">Isaac Roy</span>
          <ChevronDown className="h-4 w-4 text-white/70" />
        </div>
      </div>
    </header>
  );
}
