import { useState } from "react";
import { ArrowLeft, Camera, Upload, FileText, BarChart3, PieChart, TrendingUp, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { BottomNavigation } from "@/components/dashboard/BottomNavigation";

interface ScannedItem {
  id: number;
  item: string;
  amount: number;
  category: string;
  date: string;
  merchant: string;
  confidence: number;
}

interface ScanAnalytics {
  totalScanned: number;
  totalAmount: number;
  categoriesCount: number;
  topCategory: string;
  avgAmount: number;
  thisMonth: number;
  lastMonth: number;
  trend: "up" | "down";
}

const dummyScannedItems: ScannedItem[] = [
  {
    id: 1,
    item: "Groceries - Vegetables & Fruits",
    amount: 450,
    category: "Food & Dining",
    date: "Today, 2:30 PM",
    merchant: "Fresh Market",
    confidence: 98
  },
  {
    id: 2,
    item: "Coffee & Sandwich",
    amount: 180,
    category: "Food & Dining",
    date: "Today, 10:15 AM",
    merchant: "Café Coffee Day",
    confidence: 95
  },
  {
    id: 3,
    item: "Uber Ride",
    amount: 120,
    category: "Transportation",
    date: "Yesterday, 8:45 PM",
    merchant: "Uber India",
    confidence: 100
  },
  {
    id: 4,
    item: "Medical Checkup",
    amount: 800,
    category: "Healthcare",
    date: "Yesterday, 4:20 PM",
    merchant: "Apollo Clinic",
    confidence: 92
  },
  {
    id: 5,
    item: "Mobile Recharge",
    amount: 599,
    category: "Bills & Utilities",
    date: "2 days ago",
    merchant: "Airtel",
    confidence: 100
  }
];

const dummyAnalytics: ScanAnalytics = {
  totalScanned: 127,
  totalAmount: 15680,
  categoriesCount: 8,
  topCategory: "Food & Dining",
  avgAmount: 123,
  thisMonth: 15680,
  lastMonth: 12450,
  trend: "up"
};

export function Scanner() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedItems, setScannedItems] = useState(dummyScannedItems);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const handleBack = () => {
    navigate("/");
  };

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      const newItem: ScannedItem = {
        id: scannedItems.length + 1,
        item: "Restaurant Bill - Dinner",
        amount: 650,
        category: "Food & Dining",
        date: "Just now",
        merchant: "The Great Kabab Factory",
        confidence: 96
      };
      setScannedItems(prev => [newItem, ...prev]);
      setIsScanning(false);
    }, 3000);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Food & Dining": "bg-orange-100 text-orange-800",
      "Transportation": "bg-blue-100 text-blue-800",
      "Healthcare": "bg-green-100 text-green-800",
      "Bills & Utilities": "bg-purple-100 text-purple-800",
      "Shopping": "bg-pink-100 text-pink-800",
      "Entertainment": "bg-indigo-100 text-indigo-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "text-green-600";
    if (confidence >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  const categoryData = [
    { name: "Food & Dining", amount: 4500, percentage: 29, color: "bg-orange-400" },
    { name: "Transportation", amount: 2800, percentage: 18, color: "bg-blue-400" },
    { name: "Shopping", amount: 3200, percentage: 20, color: "bg-pink-400" },
    { name: "Bills & Utilities", amount: 2100, percentage: 13, color: "bg-purple-400" },
    { name: "Healthcare", amount: 1600, percentage: 10, color: "bg-green-400" },
    { name: "Entertainment", amount: 1480, percentage: 10, color: "bg-indigo-400" }
  ];

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
          <h1 className="text-xl font-bold text-foreground">Smart Scanner</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="text-muted-foreground hover:text-foreground"
          >
            <BarChart3 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-24 pt-4 overflow-y-auto scrollbar-hide">
        <div className="space-y-4">
          {/* Scan Options */}
          <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Scan Your Receipts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 text-sm mb-4">
                Automatically extract and categorize expenses from receipts, bills, and invoices
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={handleScan}
                  disabled={isScanning}
                  className="bg-white text-indigo-600 hover:bg-gray-100 flex-1"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  {isScanning ? "Scanning..." : "Take Photo"}
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10 flex-1"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Analytics Toggle */}
          {showAnalytics && (
            <>
              {/* Analytics Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Scan Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-indigo-600">{dummyAnalytics.totalScanned}</p>
                      <p className="text-xs text-gray-600">Total Scans</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">₹{dummyAnalytics.totalAmount.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">Total Amount</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">{dummyAnalytics.categoriesCount}</p>
                      <p className="text-xs text-gray-600">Categories</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">₹{dummyAnalytics.avgAmount}</p>
                      <p className="text-xs text-gray-600">Avg Amount</p>
                    </div>
                  </div>

                  {/* Category Breakdown */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Category Breakdown
                    </h4>
                    <div className="space-y-2">
                      {categoryData.map((category, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{category.name}</span>
                            <span className="font-medium">₹{category.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div className={`h-2 rounded-full ${category.color} transition-all duration-500`}>
                                <Progress value={category.percentage} className="h-2 bg-transparent" />
                              </div>
                            </div>
                            <span className="text-xs text-gray-500 w-8">{category.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Monthly Trend */}
                  <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Monthly Trend</p>
                        <p className="text-lg font-bold">
                          ₹{dummyAnalytics.thisMonth.toLocaleString()}
                          <span className="text-sm text-green-600 ml-2">
                            +26% from last month
                          </span>
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Scanning Progress */}
          {isScanning && (
            <Card className="border-indigo-200 bg-indigo-50">
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                    <Camera className="h-8 w-8 text-indigo-600 animate-pulse" />
                  </div>
                  <div>
                    <p className="font-medium text-indigo-900">Scanning Receipt...</p>
                    <p className="text-sm text-indigo-600">Processing with AI technology</p>
                  </div>
                  <div className="space-y-2">
                    <Progress value={60} className="h-2" />
                    <p className="text-xs text-indigo-600">Extracting text and amounts...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Scans */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Scans
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {scannedItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{item.item}</h4>
                        <Badge className={getCategoryColor(item.category)} variant="secondary">
                          {item.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span>{item.merchant}</span>
                        <span>•</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">₹{item.amount}</p>
                      <div className="flex items-center gap-1">
                        {item.confidence >= 95 ? (
                          <CheckCircle className="h-3 w-3 text-green-600" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-yellow-600" />
                        )}
                        <span className={`text-xs ${getConfidenceColor(item.confidence)}`}>
                          {item.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-lg font-semibold mb-2">💡 Scanner Tips</p>
                <p className="text-white/90 text-sm">
                  For best results: ensure good lighting, hold camera steady, and capture the entire receipt. 
                  AI accuracy improves with each scan!
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
