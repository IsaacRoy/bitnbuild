import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  TrendingUp,
  PieChart,
  BarChart3,
  Target,
  Clock,
  DollarSign,
  Brain,
  Zap,
  Star,
  ChevronRight,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const IdeaFi = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("generator");
  const [userInputs, setUserInputs] = useState({
    budget: "",
    timeHorizon: "1",
    riskLevel: "moderate",
  });
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  // Dummy investment ideas data
  const investmentIdeas = {
    conservative: {
      "0.5": [
        {
          name: "Government Bonds",
          allocation: 60,
          return: "6-8%",
          risk: "Very Low",
          color: "#22c55e",
        },
        {
          name: "Bank FDs",
          allocation: 30,
          return: "5-7%",
          risk: "Very Low",
          color: "#3b82f6",
        },
        {
          name: "Liquid Funds",
          allocation: 10,
          return: "4-6%",
          risk: "Very Low",
          color: "#f59e0b",
        },
      ],
      "1": [
        {
          name: "Index Funds",
          allocation: 40,
          return: "8-12%",
          risk: "Low",
          color: "#22c55e",
        },
        {
          name: "Government Bonds",
          allocation: 40,
          return: "6-8%",
          risk: "Very Low",
          color: "#3b82f6",
        },
        {
          name: "Gold ETF",
          allocation: 20,
          return: "6-10%",
          risk: "Low",
          color: "#f59e0b",
        },
      ],
      "2": [
        {
          name: "Nifty 50 SIP",
          allocation: 50,
          return: "10-14%",
          risk: "Moderate",
          color: "#22c55e",
        },
        {
          name: "Debt Funds",
          allocation: 30,
          return: "7-9%",
          risk: "Low",
          color: "#3b82f6",
        },
        {
          name: "Gold ETF",
          allocation: 20,
          return: "6-10%",
          risk: "Low",
          color: "#f59e0b",
        },
      ],
    },
    moderate: {
      "0.5": [
        {
          name: "Large Cap Funds",
          allocation: 50,
          return: "8-12%",
          risk: "Moderate",
          color: "#22c55e",
        },
        {
          name: "Debt Funds",
          allocation: 30,
          return: "6-8%",
          risk: "Low",
          color: "#3b82f6",
        },
        {
          name: "Gold ETF",
          allocation: 20,
          return: "6-10%",
          risk: "Low",
          color: "#f59e0b",
        },
      ],
      "1": [
        {
          name: "Nifty 50 SIP",
          allocation: 50,
          return: "10-14%",
          risk: "Moderate",
          color: "#22c55e",
        },
        {
          name: "Mid Cap Funds",
          allocation: 30,
          return: "12-16%",
          risk: "Moderate",
          color: "#8b5cf6",
        },
        {
          name: "Government Bonds",
          allocation: 20,
          return: "6-8%",
          risk: "Low",
          color: "#3b82f6",
        },
      ],
      "2": [
        {
          name: "Index Funds",
          allocation: 40,
          return: "10-14%",
          risk: "Moderate",
          color: "#22c55e",
        },
        {
          name: "Mid Cap SIP",
          allocation: 35,
          return: "12-18%",
          risk: "Moderate-High",
          color: "#8b5cf6",
        },
        {
          name: "REIT Funds",
          allocation: 25,
          return: "8-12%",
          risk: "Moderate",
          color: "#f59e0b",
        },
      ],
    },
    aggressive: {
      "0.5": [
        {
          name: "Small Cap Funds",
          allocation: 40,
          return: "15-25%",
          risk: "High",
          color: "#ef4444",
        },
        {
          name: "Large Cap Funds",
          allocation: 35,
          return: "10-14%",
          risk: "Moderate",
          color: "#22c55e",
        },
        {
          name: "Crypto ETF",
          allocation: 25,
          return: "20-40%",
          risk: "Very High",
          color: "#8b5cf6",
        },
      ],
      "1": [
        {
          name: "Small Cap SIP",
          allocation: 50,
          return: "15-25%",
          risk: "High",
          color: "#ef4444",
        },
        {
          name: "Tech Sector ETF",
          allocation: 30,
          return: "12-20%",
          risk: "High",
          color: "#8b5cf6",
        },
        {
          name: "Crypto (Bitcoin ETF)",
          allocation: 20,
          return: "20-50%",
          risk: "Very High",
          color: "#f59e0b",
        },
      ],
      "2": [
        {
          name: "Growth Stocks",
          allocation: 45,
          return: "15-30%",
          risk: "High",
          color: "#ef4444",
        },
        {
          name: "Small Cap Funds",
          allocation: 35,
          return: "15-25%",
          risk: "High",
          color: "#8b5cf6",
        },
        {
          name: "Emerging Markets",
          allocation: 20,
          return: "12-22%",
          risk: "High",
          color: "#f59e0b",
        },
      ],
    },
  };

  // Market trends data
  const marketTrends = [
    {
      trend: "EV Revolution",
      suggestion: "Auto ETFs showing 25% growth",
      investment: "Invest in Electric Vehicle ETFs",
      potential: "+18-25% returns",
      icon: "🚗",
      confidence: 85,
    },
    {
      trend: "AI & Tech Boom",
      suggestion: "Technology sector outperforming",
      investment: "IT Index Funds or Tech ETFs",
      potential: "+20-30% returns",
      icon: "🤖",
      confidence: 92,
    },
    {
      trend: "Green Energy Push",
      suggestion: "Renewable energy gaining momentum",
      investment: "Clean Energy Mutual Funds",
      potential: "+15-22% returns",
      icon: "🌱",
      confidence: 78,
    },
  ];

  // Scenario comparison data
  const scenarioComparisons = [
    {
      title: "Gold vs Crypto (1 Year)",
      amount: "₹20,000",
      scenarios: [
        {
          name: "Gold ETF",
          expectedReturn: "8-12%",
          bestCase: "₹22,400",
          worstCase: "₹19,200",
          volatility: "Low",
          reasoning:
            "Stable hedge against inflation, traditionally safe during market uncertainty",
        },
        {
          name: "Bitcoin ETF",
          expectedReturn: "25-45%",
          bestCase: "₹29,000",
          worstCase: "₹14,000",
          volatility: "Very High",
          reasoning:
            "High growth potential but extremely volatile, suitable for risk-tolerant investors",
        },
      ],
    },
    {
      title: "SIP vs Lump Sum (2 Years)",
      amount: "₹1,00,000",
      scenarios: [
        {
          name: "SIP Strategy",
          expectedReturn: "12-15%",
          bestCase: "₹1,15,000",
          worstCase: "₹1,08,000",
          volatility: "Moderate",
          reasoning:
            "Rupee cost averaging reduces risk, better for volatile markets",
        },
        {
          name: "Lump Sum",
          expectedReturn: "10-18%",
          bestCase: "₹1,18,000",
          worstCase: "₹95,000",
          volatility: "High",
          reasoning:
            "Higher potential returns if market timing is right, but riskier",
        },
      ],
    },
  ];

  const generateIdeas = () => {
    setLoading(true);
    setTimeout(() => {
      const selectedIdeas =
        investmentIdeas[userInputs.riskLevel][userInputs.timeHorizon] || [];
      setIdeas(selectedIdeas);
      setLoading(false);
    }, 1500);
  };

  const renderPieChart = (ideas) => {
    const total = ideas.reduce((sum, idea) => sum + idea.allocation, 0);
    let currentAngle = 0;

    return (
      <div className="flex items-center justify-center">
        <svg width="200" height="200" className="transform -rotate-90">
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="8"
          />
          {ideas.map((idea, index) => {
            const percentage = (idea.allocation / total) * 100;
            const angle = (percentage / 100) * 360;
            const x1 = 100 + 80 * Math.cos((currentAngle * Math.PI) / 180);
            const y1 = 100 + 80 * Math.sin((currentAngle * Math.PI) / 180);
            const x2 =
              100 + 80 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
            const y2 =
              100 + 80 * Math.sin(((currentAngle + angle) * Math.PI) / 180);

            const largeArcFlag = angle > 180 ? 1 : 0;
            const pathData = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

            currentAngle += angle;

            return (
              <path
                key={index}
                d={pathData}
                fill={idea.color}
                className="transition-all duration-300 hover:opacity-80"
              />
            );
          })}
        </svg>
      </div>
    );
  };

  const renderForecastChart = (scenario) => {
    const months = ["Month 1", "Month 3", "Month 6", "Month 9", "Month 12"];
    const data =
      scenario.name === "Gold ETF"
        ? [20000, 20500, 21200, 21800, 22400]
        : [20000, 22000, 18000, 25000, 29000];

    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);

    return (
      <div className="h-32">
        <svg width="100%" height="100%" viewBox="0 0 300 120">
          <defs>
            <linearGradient
              id={`gradient-${scenario.name}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor={scenario.name === "Gold ETF" ? "#fbbf24" : "#8b5cf6"}
                stopOpacity="0.3"
              />
              <stop
                offset="100%"
                stopColor={scenario.name === "Gold ETF" ? "#fbbf24" : "#8b5cf6"}
                stopOpacity="0.1"
              />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1={i * 60 + 30}
              y1="10"
              x2={i * 60 + 30}
              y2="100"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          {/* Area chart */}
          <path
            d={`M 30 ${
              100 - ((data[0] - minValue) / (maxValue - minValue)) * 80
            } ${data
              .map(
                (value, index) =>
                  `L ${index * 60 + 30} ${
                    100 - ((value - minValue) / (maxValue - minValue)) * 80
                  }`
              )
              .join(" ")} L 270 100 L 30 100 Z`}
            fill={`url(#gradient-${scenario.name})`}
          />

          {/* Line chart */}
          <path
            d={`M 30 ${
              100 - ((data[0] - minValue) / (maxValue - minValue)) * 80
            } ${data
              .map(
                (value, index) =>
                  `L ${index * 60 + 30} ${
                    100 - ((value - minValue) / (maxValue - minValue)) * 80
                  }`
              )
              .join(" ")}`}
            fill="none"
            stroke={scenario.name === "Gold ETF" ? "#fbbf24" : "#8b5cf6"}
            strokeWidth="3"
          />

          {/* Data points */}
          {data.map((value, index) => (
            <circle
              key={index}
              cx={index * 60 + 30}
              cy={100 - ((value - minValue) / (maxValue - minValue)) * 80}
              r="4"
              fill={scenario.name === "Gold ETF" ? "#fbbf24" : "#8b5cf6"}
            />
          ))}
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Go back to home"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              IdeaFi
            </h1>
            <p className="text-sm text-gray-500">AI Investment Ideas</p>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white shadow-sm">
        <div className="flex">
          {[
            { id: "generator", name: "AI Generator", icon: Brain },
            { id: "trends", name: "Market Trends", icon: TrendingUp },
            { id: "compare", name: "Compare", icon: BarChart3 },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* AI Generator Tab */}
        {activeTab === "generator" && (
          <div className="space-y-6">
            {/* User Inputs */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                Your Investment Profile
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Budget
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={userInputs.budget}
                      onChange={(e) =>
                        setUserInputs({ ...userInputs, budget: e.target.value })
                      }
                      placeholder="Enter amount in ₹"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Horizon
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <select
                      value={userInputs.timeHorizon}
                      onChange={(e) =>
                        setUserInputs({
                          ...userInputs,
                          timeHorizon: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                      title="Select investment time horizon"
                    >
                      <option value="0.5">6 Months</option>
                      <option value="1">1 Year</option>
                      <option value="2">2 Years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Risk Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      {
                        id: "conservative",
                        name: "Conservative",
                        desc: "Low Risk",
                      },
                      { id: "moderate", name: "Moderate", desc: "Balanced" },
                      {
                        id: "aggressive",
                        name: "Aggressive",
                        desc: "High Risk",
                      },
                    ].map((risk) => (
                      <button
                        key={risk.id}
                        onClick={() =>
                          setUserInputs({ ...userInputs, riskLevel: risk.id })
                        }
                        className={`p-3 rounded-xl text-center transition-all ${
                          userInputs.riskLevel === risk.id
                            ? "bg-blue-500 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <div className="font-medium text-sm">{risk.name}</div>
                        <div className="text-xs opacity-80">{risk.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={generateIdeas}
                  disabled={!userInputs.budget || loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating Ideas...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      <span>Generate AI Ideas</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Generated Ideas */}
            {ideas.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Personalized Investment Ideas
                </h3>

                {/* Portfolio Allocation Chart */}
                <div className="mb-6">{renderPieChart(ideas)}</div>

                {/* Ideas List */}
                <div className="space-y-3">
                  {ideas.map((idea, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            idea.color === "#22c55e"
                              ? "bg-green-500"
                              : idea.color === "#3b82f6"
                              ? "bg-blue-500"
                              : idea.color === "#f59e0b"
                              ? "bg-amber-500"
                              : idea.color === "#8b5cf6"
                              ? "bg-violet-500"
                              : idea.color === "#ef4444"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        ></div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {idea.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {idea.risk} Risk • {idea.return} Returns
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">
                          {idea.allocation}%
                        </div>
                        <div className="text-sm text-gray-500">Allocation</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Why This Strategy */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                  <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    Why This Strategy?
                  </h4>
                  <p className="text-sm text-blue-800">
                    {userInputs.riskLevel === "conservative" &&
                      "This conservative approach prioritizes capital preservation with steady returns. Perfect for short-term goals with minimal risk tolerance."}
                    {userInputs.riskLevel === "moderate" &&
                      "This balanced strategy combines growth potential with stability. Index funds provide market returns while bonds offer downside protection."}
                    {userInputs.riskLevel === "aggressive" &&
                      "This growth-focused approach maximizes potential returns through high-growth investments. Suitable for long-term wealth building with high risk tolerance."}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Market Trends Tab */}
        {activeTab === "trends" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Real-Time Market Opportunities
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                AI-powered insights from latest market trends
              </p>

              <div className="space-y-4">
                {marketTrends.map((trend, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{trend.icon}</span>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {trend.trend}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {trend.suggestion}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">
                          {trend.potential}
                        </div>
                        <div className="text-xs text-gray-500">
                          Confidence: {trend.confidence}%
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-blue-600">
                        {trend.investment}
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Compare Tab */}
        {activeTab === "compare" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
                Scenario Comparison
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Compare different investment strategies side by side
              </p>

              <div className="space-y-6">
                {scenarioComparisons.map((comparison, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <div className="bg-gray-50 p-4">
                      <h3 className="font-medium text-gray-900">
                        {comparison.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Investment Amount: {comparison.amount}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                      {comparison.scenarios.map((scenario, scenarioIndex) => (
                        <div key={scenarioIndex} className="p-4">
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900 mb-1">
                              {scenario.name}
                            </h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              <div>
                                Expected Return:{" "}
                                <span className="font-medium text-green-600">
                                  {scenario.expectedReturn}
                                </span>
                              </div>
                              <div>
                                Best Case:{" "}
                                <span className="font-medium text-green-600">
                                  {scenario.bestCase}
                                </span>
                              </div>
                              <div>
                                Worst Case:{" "}
                                <span className="font-medium text-red-600">
                                  {scenario.worstCase}
                                </span>
                              </div>
                              <div>
                                Volatility:{" "}
                                <span className="font-medium">
                                  {scenario.volatility}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Forecast Chart */}
                          <div className="mb-4">
                            {renderForecastChart(scenario)}
                          </div>

                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-600">
                              {scenario.reasoning}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeaFi;
