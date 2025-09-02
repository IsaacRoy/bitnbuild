import { Button } from "@/components/ui/button";

const months = ["Feb", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
const currentMonth = "Jun";

const expenses = [
  { category: "Entertainment", amount: 658, color: "bg-expense-entertainment", height: "h-16" },
  { category: "Sport", amount: 259, color: "bg-expense-sport", height: "h-10" },
  { category: "Food", amount: 558, color: "bg-expense-food", height: "h-14" },
  { category: "Bills", amount: 124, color: "bg-expense-bills", height: "h-6" },
];

export function ExpensesSection() {
  return (
    <section className="bg-muted/60 rounded-2xl mx-4 mt-6 mb-4 px-4 py-6 shadow-card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-foreground">Expenses</h2>
        <span className="text-lg font-semibold text-foreground">2,523$</span>
      </div>

      {/* Month Selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {months.map((month) => (
          <Button
            key={month}
            variant={month === currentMonth ? "default" : "ghost"}
            size="sm"
            className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
              month === currentMonth 
                ? "bg-navy-primary text-white" 
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {month}
          </Button>
        ))}
      </div>

      {/* Chart Area */}
      <div className="flex items-end gap-4 h-24 mb-4">
        {expenses.map((expense, index) => (
          <div key={expense.category} className="flex-1 flex flex-col items-center">
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
              <span className="text-sm text-muted-foreground">{expense.category}</span>
              <span className="text-sm font-semibold">{expense.amount}$</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}