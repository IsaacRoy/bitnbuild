import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const expenses = [
  {
    category: "Entertainment",
    amount: 658,
    color: "bg-expense-entertainment",
    height: "h-16",
  },
  { category: "Sport", amount: 259, color: "bg-expense-sport", height: "h-10" },
  { category: "Food", amount: 558, color: "bg-expense-food", height: "h-14" },
  { category: "Bills", amount: 124, color: "bg-expense-bills", height: "h-6" },
];

export function ExpensesSection() {
  const [selectedMonth, setSelectedMonth] = useState("Jun");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMonthClick = (month: string) => {
    setSelectedMonth(month);
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-800 rounded-2xl mx-4 mt-6 mb-4 px-4 py-6 pt-8 shadow-card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-foreground">Expenses</h2>
        <span className="text-lg font-semibold text-foreground">2,523$</span>
      </div>

      {/* Month Selector */}
      <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-2 mb-6 relative overflow-hidden">
        {/* Wave Effect */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-full h-full rounded-full transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(${months.indexOf(selectedMonth) * 20}px)`,
              animation: "wave 0.6s ease-out",
            }}
          />
        </div>

        <div
          ref={containerRef}
          className="flex gap-2 overflow-x-auto relative z-10"
        >
          {months.map((month, index) => (
            <Button
              key={month}
              variant="ghost"
              size="sm"
              onClick={() => handleMonthClick(month)}
              className={`px-3 py-1 text-xs rounded-full whitespace-nowrap relative transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-0 active:bg-transparent ${
                month === selectedMonth
                  ? "text-white scale-105 font-semibold z-20 bg-black hover:bg-black"
                  : "text-muted-foreground hover:bg-gray-300/50 dark:hover:bg-gray-600/50 hover:scale-102 scale-100 bg-transparent"
              }`}
            >
              {month}
            </Button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex items-end gap-4 h-24 mb-4">
        {expenses.map((expense, index) => (
          <div
            key={expense.category}
            className="flex-1 flex flex-col items-center"
          >
            <div
              className={`w-full ${expense.color} ${expense.height} rounded-t-md mb-2 relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white/20 bg-stripe"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3">
        {expenses.map((expense, index) => (
          <div key={expense.category} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${expense.color}`}></div>
            <div className="flex-1 flex justify-between">
              <span className="text-sm text-muted-foreground">
                {expense.category}
              </span>
              <span className="text-sm font-semibold">{expense.amount}$</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
