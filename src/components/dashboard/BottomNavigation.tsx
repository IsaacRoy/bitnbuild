import {
  Bot,
  Wallet,
  Plus,
  BarChart3,
  User,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ScanIcon } from "@/components/icons/ScanIcon";

const navItems = [
  { icon: Bot, label: "Fingo", active: false, path: "/fingo" },
  { icon: ScanIcon, label: "Scan", active: false, path: "/" },
  { icon: Plus, label: "Add", isCenter: true, path: "/" },
  { icon: BarChart3, label: "Analytics", active: false, path: "/" },
  { icon: User, label: "Profile", active: false, path: "/" },
];

export function BottomNavigation() {
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddClick = () => {
    // Trigger spin animation
    setIsSpinning(true);

    // Check if we're on the home screen
    if (location.pathname === "/") {
      // Show popup if on home screen
      setTimeout(() => {
        setShowAddOptions(!showAddOptions);
      }, 50);
    } else {
      // Navigate to home screen if not on home
      setTimeout(() => {
        navigate("/");
        setShowAddOptions(false); // Make sure popup is closed
      }, 50);
    }

    // Reset spin animation after completion
    setTimeout(() => {
      setIsSpinning(false);
    }, 300);
  };

  const handleNavClick = (item: any) => {
    if (item.isCenter) {
      handleAddClick();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const handleOverlayClick = () => {
    // Trigger spin animation when closing
    setIsSpinning(true);
    setShowAddOptions(false);

    // Reset spin animation after completion
    setTimeout(() => {
      setIsSpinning(false);
    }, 300);
  };

  const handleOptionClick = (type: "expense" | "income") => {
    console.log(`${type} selected`);
    // Trigger spin animation when option is selected
    setIsSpinning(true);
    setShowAddOptions(false);

    // Reset spin animation after completion
    setTimeout(() => {
      setIsSpinning(false);
    }, 300);
    // Add your logic here for handling expense/income addition
  };

  return (
    <>
      {/* Overlay */}
      {showAddOptions && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={handleOverlayClick}
        />
      )}

      {/* Add Options Popup */}
      {showAddOptions && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 min-w-[200px]">
            <div className="space-y-2">
              <Button
                onClick={() => handleOptionClick("expense")}
                className="w-full bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 justify-start gap-3 h-12"
                variant="outline"
              >
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </div>
                <span className="font-medium">Add Expense</span>
              </Button>
              <Button
                onClick={() => handleOptionClick("income")}
                className="w-full bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 justify-start gap-3 h-12"
                variant="outline"
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <span className="font-medium">Add Income</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-4 py-2 shadow-lg z-50">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map((item, index) => (
            <div
              key={item.label}
              className={`${
                item.isCenter && isSpinning ? "animate-spin" : ""
              } transition-transform duration-300 ease-in-out flex flex-col items-center gap-1`}
            >
              <Button
                variant={item.isCenter ? "action" : "navigation"}
                size={item.isCenter ? "default" : "icon"}
                onClick={() => handleNavClick(item)}
                className={`${
                  item.isCenter
                    ? `bg-gradient-action text-white shadow-action w-12 h-12 rounded-full ${
                        showAddOptions ? "scale-125" : "scale-100"
                      } transition-all duration-300 ease-in-out`
                    : item.path === location.pathname
                    ? "text-navy-primary"
                    : "text-muted-foreground"
                }`}
              >
                <item.icon
                  className={`${item.isCenter ? "h-6 w-6" : "h-6 w-6"}`}
                />
                {item.isCenter && <span className="sr-only">{item.label}</span>}
              </Button>
              {!item.isCenter && (
                <span
                  className={`text-xs font-medium ${
                    item.path === location.pathname
                      ? "text-navy-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
