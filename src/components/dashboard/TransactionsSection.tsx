import {
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeftRight,
  CreditCard,
  Wallet,
  ShoppingCart,
  Coffee,
  Car,
} from "lucide-react";

const transactions = [
  {
    type: "Send",
    amount: -15111,
    icon: ArrowUpRight,
    color: "text-expense-entertainment",
  },
  {
    type: "Receive",
    amount: 25555,
    icon: ArrowDownLeft,
    color: "text-expense-food",
  },
  {
    type: "Swap",
    amount: -10222,
    icon: ArrowLeftRight,
    color: "text-expense-sport",
  },
  {
    type: "Payment",
    amount: -8750,
    icon: CreditCard,
    color: "text-expense-bills",
  },
  {
    type: "Deposit",
    amount: 12000,
    icon: Wallet,
    color: "text-expense-food",
  },
  {
    type: "Shopping",
    amount: -4500,
    icon: ShoppingCart,
    color: "text-expense-entertainment",
  },
  {
    type: "Coffee",
    amount: -250,
    icon: Coffee,
    color: "text-expense-food",
  },
  {
    type: "Fuel",
    amount: -6800,
    icon: Car,
    color: "text-expense-sport",
  },
];

export function TransactionsSection() {
  return (
    <section className="bg-gray-100 dark:bg-gray-800 mx-4 mb-6 p-4 rounded-2xl shadow-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-foreground">Transactions</h2>
      </div>

      {/* Scrollable container for transactions */}
      <div className="h-64 overflow-y-auto scrollbar-hide">
        <div className="space-y-3 pr-2">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 px-4 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center ${transaction.color} shadow-sm`}
                >
                  <transaction.icon className="h-4 w-4" />
                </div>
                <span className="font-medium text-foreground">
                  {transaction.type}
                </span>
              </div>
              <span
                className={`font-semibold ${
                  transaction.amount > 0
                    ? "text-expense-food"
                    : "text-expense-entertainment"
                }`}
              >
                {transaction.amount > 0 ? "+" : ""}
                {transaction.amount.toLocaleString()}$
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
