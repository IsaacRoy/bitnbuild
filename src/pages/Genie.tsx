import { useState } from "react";
import { ArrowLeft, MessageCircle, ThumbsUp, ThumbsDown, Lightbulb, TrendingUp, TrendingDown, BarChart3, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { BottomNavigation } from "@/components/dashboard/BottomNavigation";

interface ChartData {
  label: string;
  current: number;
  previous: number;
  color: string;
}

interface LineChartData {
  period: string;
  amount: number;
}

interface GenieInsight {
  id: number;
  category: string;
  message: string;
  tone: "friendly" | "concerned" | "celebratory" | "motivational";
  actionable_tip: string;
  savings_potential: string;
  emoji: string;
  trend: "up" | "down" | "stable";
  amount: string;
  timeframe: string;
  chartData?: ChartData[];
  lineChartData?: LineChartData[];
  chartType: "bar" | "line" | "none";
  hasChart: boolean;
  isHelpful?: boolean;
}

const dummyGenieInsights: GenieInsight[] = [
  {
    id: 1,
    category: "Food Delivery",
    message: "Hey! I noticed you spent 40% more on food delivery this week compared to last week. I get it - cooking can be exhausting sometimes! 😅",
    tone: "concerned",
    actionable_tip: "Maybe try cooking twice a week to save ₹1,500/month. Start with simple 15-minute meals!",
    savings_potential: "₹1,500/month",
    emoji: "🍳",
    trend: "up",
    amount: "₹2,800",
    timeframe: "this week vs last week",
    chartType: "bar",
    hasChart: true,
    chartData: [
      { label: "Last Week", current: 2000, previous: 1800, color: "bg-green-400" },
      { label: "This Week", current: 2800, previous: 2000, color: "bg-red-400" },
      { label: "Projection", current: 1300, previous: 2800, color: "bg-blue-400" }
    ]
  },
  {
    id: 2,
    category: "Coffee & Snacks",
    message: "You're totally crushing it! Your coffee shop visits dropped by 30% this month. That discipline is paying off! ☕️",
    tone: "celebratory",
    actionable_tip: "Keep this momentum going! Maybe invest those savings in a nice coffee maker for home?",
    savings_potential: "₹800/month",
    emoji: "🎉",
    trend: "down",
    amount: "₹900",
    timeframe: "this month vs last month",
    chartType: "line",
    hasChart: true,
    lineChartData: [
      { period: "Week 1", amount: 1300 },
      { period: "Week 2", amount: 1100 },
      { period: "Week 3", amount: 950 },
      { period: "Week 4", amount: 900 },
      { period: "Week 5", amount: 850 }
    ]
  },
  {
    id: 3,
    category: "Online Shopping",
    message: "Whoa there, shopping enthusiast! Your online purchases jumped 75% this week. Amazon Prime Day effect? 😄",
    tone: "friendly",
    actionable_tip: "Try the 24-hour rule: add items to cart, then wait a day before buying. You'll be surprised how often you change your mind!",
    savings_potential: "₹2,000/month",
    emoji: "🛒",
    trend: "up",
    amount: "₹3,500",
    timeframe: "this week vs average",
    chartType: "bar",
    hasChart: true,
    chartData: [
      { label: "Average Week", current: 2000, previous: 1800, color: "bg-gray-400" },
      { label: "This Week", current: 3500, previous: 2000, color: "bg-orange-400" },
      { label: "Recommended", current: 1500, previous: 3500, color: "bg-green-400" }
    ]
  },
  {
    id: 4,
    category: "Transportation",
    message: "Love what I'm seeing! You switched to metro more often and cut Uber costs by 45%. Your wallet and the planet thank you! 🌱",
    tone: "celebratory",
    actionable_tip: "You're on fire! Consider getting a monthly metro pass for even more savings.",
    savings_potential: "₹1,200/month",
    emoji: "🚇",
    trend: "down",
    amount: "₹1,100",
    timeframe: "this month",
    chartType: "line",
    hasChart: true,
    lineChartData: [
      { period: "Jan", amount: 2000 },
      { period: "Feb", amount: 1800 },
      { period: "Mar", amount: 1500 },
      { period: "Apr", amount: 1200 },
      { period: "May", amount: 1100 }
    ]
  },
  {
    id: 5,
    category: "Entertainment",
    message: "Your entertainment spending is perfectly balanced - like all things should be! You're treating yourself without going overboard. 👏",
    tone: "motivational",
    actionable_tip: "This is the sweet spot! Maybe explore some free entertainment options to stretch your budget even further?",
    savings_potential: "Already optimized",
    emoji: "⚖️",
    trend: "stable",
    amount: "₹1,800",
    timeframe: "consistently",
    chartType: "bar",
    hasChart: true,
    chartData: [
      { label: "Movies", current: 600, previous: 550, color: "bg-purple-400" },
      { label: "Games", current: 400, previous: 450, color: "bg-blue-400" },
      { label: "Events", current: 800, previous: 750, color: "bg-pink-400" }
    ]
  },
  {
    id: 6,
    category: "Groceries",
    message: "Smart move! You've started buying groceries in bulk and saved 20% compared to frequent small trips. Efficiency level: Pro! 🛍️",
    tone: "celebratory",
    actionable_tip: "Plan your meals weekly to avoid food waste and save even more!",
    savings_potential: "₹600/month",
    emoji: "🥬",
    trend: "down",
    amount: "₹2,400",
    timeframe: "this month",
    chartType: "bar",
    hasChart: true,
    chartData: [
      { label: "Small Trips", current: 3000, previous: 2800, color: "bg-red-400" },
      { label: "Bulk Shopping", current: 2400, previous: 3000, color: "bg-green-400" },
      { label: "Savings", current: 600, previous: 0, color: "bg-emerald-400" }
    ]
  }
];

export function Genie() {
  const navigate = useNavigate();
  const [insights, setInsights] = useState(dummyGenieInsights);

  const handleBack = () => {
    navigate("/");
  };

  const markHelpful = (id: number, helpful: boolean) => {
    setInsights(prev => prev.map(insight => 
      insight.id === id ? { ...insight, isHelpful: helpful } : insight
    ));
  };

  const getToneColor = (tone: string) => {
    switch (tone) {
      case "concerned": return "text-orange-600 bg-orange-50 border-orange-200";
      case "celebratory": return "text-green-600 bg-green-50 border-green-200";
      case "friendly": return "text-blue-600 bg-blue-50 border-blue-200";
      case "motivational": return "text-purple-600 bg-purple-50 border-purple-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-red-500" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-green-500" />;
    return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
  };

  const renderBarChart = (chartData: ChartData[]) => {
    const maxValue = Math.max(...chartData.map(d => d.current));
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-600">Spending Comparison</span>
        </div>
        {chartData.map((data, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">{data.label}</span>
              <span className="font-medium">₹{data.current.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${data.color} transition-all duration-300`}
                data-width={`${(data.current / maxValue) * 100}%`}
                style={{width: `${(data.current / maxValue) * 100}%`}}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderLineChart = (lineData: LineChartData[]) => {
    const maxValue = Math.max(...lineData.map(d => d.amount));
    const minValue = Math.min(...lineData.map(d => d.amount));
    
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <LineChart className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-600">Spending Trend</span>
        </div>
        <div className="h-24 relative bg-gray-50 rounded-lg p-3">
          <svg className="w-full h-full" viewBox="0 0 300 60">
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="60" height="15" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 15" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Line path */}
            <path
              d={lineData.map((point, index) => {
                const x = (index / (lineData.length - 1)) * 280 + 10;
                const y = 50 - ((point.amount - minValue) / (maxValue - minValue)) * 40;
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
            />
            
            {/* Data points */}
            {lineData.map((point, index) => {
              const x = (index / (lineData.length - 1)) * 280 + 10;
              const y = 50 - ((point.amount - minValue) / (maxValue - minValue)) * 40;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="#3b82f6"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
          
          {/* Labels */}
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            {lineData.map((point, index) => (
              <span key={index}>{point.period}</span>
            ))}
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex justify-between text-xs text-gray-600">
          <span>₹{minValue.toLocaleString()}</span>
          <span>₹{maxValue.toLocaleString()}</span>
        </div>
      </div>
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
          <h1 className="text-xl font-bold text-foreground">Genie Insights</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-24 pt-4 overflow-y-auto scrollbar-hide">
        <div className="space-y-4">
          {/* Welcome Card */}
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Your Personal Finance Genie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 text-sm">
                Hey there! 🧞‍♂️ I'm your finance genie, here to explain your spending like your best friend would. 
                Let's make sense of your money together!
              </p>
            </CardContent>
          </Card>

          {/* Insights */}
          {insights.map((insight) => (
            <Card key={insight.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{insight.emoji}</div>
                    <div>
                      <CardTitle className="text-base font-semibold">{insight.category}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        {getTrendIcon(insight.trend)}
                        <span className="text-sm text-muted-foreground">{insight.timeframe}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{insight.amount}</p>
                    <Badge variant="outline" className={getToneColor(insight.tone)}>
                      {insight.tone}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Main Message */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {insight.message}
                  </p>
                </div>

                {/* Actionable Tip */}
                <div className={`p-4 rounded-lg border ${getToneColor(insight.tone)}`}>
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm mb-1">Smart Tip</h4>
                      <p className="text-xs leading-relaxed">{insight.actionable_tip}</p>
                      {insight.savings_potential !== "Already optimized" && (
                        <p className="text-xs font-semibold mt-2 text-green-600">
                          💰 Potential savings: {insight.savings_potential}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Charts */}
                {insight.hasChart && (
                  <div className="bg-white border rounded-lg p-4">
                    {insight.chartType === "bar" && insight.chartData && 
                      renderBarChart(insight.chartData)
                    }
                    {insight.chartType === "line" && insight.lineChartData && 
                      renderLineChart(insight.lineChartData)
                    }
                  </div>
                )}

                {/* Feedback */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-xs text-muted-foreground">Was this helpful?</span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markHelpful(insight.id, true)}
                      className={`h-8 px-3 ${
                        insight.isHelpful === true ? 'bg-green-100 text-green-600' : ''
                      }`}
                    >
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      Yes
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markHelpful(insight.id, false)}
                      className={`h-8 px-3 ${
                        insight.isHelpful === false ? 'bg-red-100 text-red-600' : ''
                      }`}
                    >
                      <ThumbsDown className="h-3 w-3 mr-1" />
                      No
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Motivational Footer */}
          <Card className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-lg font-semibold mb-2">🌟 You're Doing Great!</p>
                <p className="text-white/90 text-sm">
                  Remember, small consistent changes lead to big financial wins. 
                  Your future self will thank you for every smart decision you make today!
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
