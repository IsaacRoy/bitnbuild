import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight } from "lucide-react";

const transactions = [
  { type: "Send", amount: -15111, icon: ArrowUpRight, color: "text-expense-entertainment" },
  { type: "Receive", amount: 25555, icon: ArrowDownLeft, color: "text-expense-food" },
  { type: "Swap", amount: -10222, icon: ArrowLeftRight, color: "text-expense-sport" },
];

export function TransactionsSection() {
  return (
    <section className="bg-muted/60 mx-4 mb-6 p-4 rounded-2xl shadow-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-foreground">Transactions</h2>
        <button className="text-accent text-sm font-medium hover:underline">
          See All
        </button>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex items-center justify-between py-2 hover:bg-muted/50 rounded-lg px-2 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${transaction.color}`}>
                <transaction.icon className="h-4 w-4" />
              </div>
              <span className="font-medium text-foreground">{transaction.type}</span>
            </div>
            <span className={`font-semibold ${transaction.amount > 0 ? 'text-expense-food' : 'text-expense-entertainment'}`}>
              {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()}$
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}