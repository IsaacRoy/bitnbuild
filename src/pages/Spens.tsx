import { useState } from "react";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BottomNavigation } from "@/components/dashboard/BottomNavigation";

interface ExpenseInsight {
  id: number;
  category: string;
  insight: string;
  type: "warning" | "success" | "info";
  comparison: string;
  suggestion: string;
  amount: string;
  trend: "up" | "down";
  percentage: number;
}

const dummyInsights: ExpenseInsight[] = [
  {
    id: 1,
    category: "Food Delivery",
    insight:
      "You spent 40% more on food delivery this week compared to last week.",
    type: "warning",
    comparison: "₹2,800 this week vs ₹2,000 last week",
    suggestion: "Maybe try cooking twice a week to save ₹1,500/month.",
    amount: "₹2,800",
    trend: "up",
    percentage: 40,
  },
  {
    id: 2,
    category: "Transportation",
    insight: "Great job! You reduced your Uber spending by 25% this month.",
    type: "success",
    comparison: "₹1,200 this month vs ₹1,600 last month",
    suggestion: "Keep it up! Maybe try walking or cycling for short distances.",
    amount: "₹1,200",
    trend: "down",
    percentage: 25,
  },
  {
    id: 3,
    category: "Shopping",
    insight: "Your online shopping increased by 60% this week.",
    type: "warning",
    comparison: "₹4,000 this week vs ₹2,500 last week",
    suggestion: "Consider a 24-hour rule before buying non-essentials.",
    amount: "₹4,000",
    trend: "up",
    percentage: 60,
  },
  {
    id: 4,
    category: "Entertainment",
    insight: "Your entertainment spending is perfectly balanced this month.",
    type: "success",
    comparison: "₹1,800 this month vs ₹1,750 last month",
    suggestion: "You're doing great! This looks like a sustainable level.",
    amount: "₹1,800",
    trend: "up",
    percentage: 3,
  },
  {
    id: 5,
    category: "Bills & Utilities",
    insight: "Your electricity bill dropped by 15% this month!",
    type: "success",
    comparison: "₹1,200 this month vs ₹1,400 last month",
    suggestion: "Those energy-saving habits are paying off. Keep it up!",
    amount: "₹1,200",
    trend: "down",
    percentage: 15,
  },
];

export function Spens() {
  const navigate = useNavigate();
  const [selectedInsight, setSelectedInsight] = useState<ExpenseInsight | null>(
    null
  );

  const handleBack = () => {
    navigate("/");
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-red-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-green-500" />
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-background px-4 py-6 border-b">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">
            Smart Expense Insights
          </h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Insights List */}
      <div className="flex-1 px-4 pb-24 pt-4 overflow-y-auto scrollbar-hide">
        <div className="space-y-4">
          {/* Summary Card */}
          <Card className="bg-gradient-to-r from-navy-primary to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="text-lg">Your Spending Story</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 text-sm">
                Hey there! I've analyzed your spending patterns and found some
                interesting insights. Let's make your money work smarter for
                you! 💡
              </p>
            </CardContent>
          </Card>

          {/* Insights */}
          {dummyInsights.map((insight) => (
            <Card
              key={insight.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedInsight?.id === insight.id
                  ? "ring-2 ring-navy-primary"
                  : ""
              }`}
              onClick={() =>
                setSelectedInsight(
                  selectedInsight?.id === insight.id ? null : insight
                )
              }
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getInsightIcon(insight.type)}
                    <div>
                      <CardTitle className="text-base font-semibold">
                        {insight.category}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        {getTrendIcon(insight.trend)}
                        <span
                          className={`text-sm font-medium ${
                            insight.trend === "up"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {insight.percentage}%{" "}
                          {insight.trend === "up" ? "increase" : "decrease"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{insight.amount}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm mb-3">
                  {insight.insight}
                </p>

                {selectedInsight?.id === insight.id && (
                  <div className="space-y-3 border-t pt-3 animate-in slide-in-from-top-2 duration-200">
                    <div>
                      <h4 className="font-medium text-sm text-foreground mb-1">
                        Comparison
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {insight.comparison}
                      </p>
                    </div>

                    <div
                      className={`p-3 rounded-lg ${
                        insight.type === "warning"
                          ? "bg-orange-50 border border-orange-200"
                          : "bg-green-50 border border-green-200"
                      }`}
                    >
                      <h4 className="font-medium text-sm mb-1">
                        💡{" "}
                        {insight.type === "warning"
                          ? "Suggestion"
                          : "Keep it up!"}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {insight.suggestion}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Fun Tip Card */}
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-lg font-semibold mb-2">🎯 Pro Tip</p>
                <p className="text-white/90 text-sm">
                  Small changes in spending habits can lead to big savings over
                  time. Even saving ₹100 per day adds up to ₹36,500 per year!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
