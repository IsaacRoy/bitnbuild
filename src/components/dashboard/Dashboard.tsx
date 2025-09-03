import { Header } from "./Header";
import { BalanceSection } from "./BalanceSection";
import { ActionButtons } from "./ActionButtons";
import { ExpensesSection } from "./ExpensesSection";
import { TransactionsSection } from "./TransactionsSection";
import { BottomNavigation } from "./BottomNavigation";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Fixed Navy Header Area */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-navy-primary rounded-b-3xl">
        <Header />
        <BalanceSection />
        <ActionButtons />
      </div>

      {/* Scrollable Content Area */}
      <div className="pt-72">
        {" "}
        {/* Increased padding to prevent overlap */}
        <ExpensesSection />
        <TransactionsSection />
      </div>

      <BottomNavigation />
    </div>
  );
}
