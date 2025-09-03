
import {
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeftRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpensIcon } from "@/components/icons/SpensIcon";
import { GenieIcon } from "@/components/icons/GenieIcon";
import { RadarIcon } from "@/components/icons/RadarIcon";
import { DepositIcon } from "@/components/icons/DepositIcon";

const actions = [
  { icon: SpensIcon, label: "Spens", color: "bg-expense-entertainment" },
  { icon: GenieIcon, label: "Genie", color: "bg-expense-sport" },
  { icon: RadarIcon, label: "Radar", color: "bg-expense-food" },
  { icon: DepositIcon, label: "LexFi", color: "bg-expense-bills" },
];

export function ActionButtons() {
  return (
    <section className="bg-navy-primary px-4 pb-6 rounded-b-3xl">
      <div className="flex justify-between gap-6">
        {actions.map((action, index) => (
          <div key={action.label} className="flex flex-col items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`w-12 h-12 rounded-full ${action.color} hover:scale-110 hover:shadow-action transition-all duration-300 text-white`}
            >
              <action.icon className="h-5 w-5" />
            </Button>
            <span className="text-white/70 text-xs font-medium">
              {action.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
