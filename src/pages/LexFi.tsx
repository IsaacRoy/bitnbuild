import React, { useState, useEffect } from 'react';
import { ArrowLeft, AlertTriangle, Bell, TrendingDown, TrendingUp, Calendar, DollarSign, Zap, Target, Eye, Brain, Clock, CheckCircle, XCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LexFi = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('alerts');
  const [currentBalance, setCurrentBalance] = useState(24500);
  const [dailySpending, setDailySpending] = useState(850);

  // Predictive Alerts Data
  const predictiveAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Balance Alert',
      message: 'At this rate, your balance may hit zero before the month ends ⚠️',
      prediction: 'Based on your spending pattern of ₹850/day',
      daysLeft: 16,
      confidence: 94,
      icon: AlertTriangle,
      color: 'red',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      iconColor: 'text-red-600'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Electricity Bill Due',
      message: 'Your electricity bill is usually ₹1,200 — expect it soon',
      prediction: 'Due date predicted: September 12th',
      amount: 1200,
      confidence: 89,
      icon: Zap,
      color: 'orange',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-800',
      iconColor: 'text-orange-600'
    },
    {
      id: 3,
      type: 'info',
      title: 'Rent Payment',
      message: 'Monthly rent of ₹18,000 is due in 5 days',
      prediction: 'Scheduled for September 10th',
      amount: 18000,
      confidence: 98,
      icon: Calendar,
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-600'
    },
    {
      id: 4,
      type: 'success',
      title: 'Salary Credit',
      message: 'Salary of ₹45,000 expected in 3 days',
      prediction: 'Based on previous months pattern',
      amount: 45000,
      confidence: 96,
      icon: TrendingUp,
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      iconColor: 'text-green-600'
    },
    {
      id: 5,
      type: 'warning',
      title: 'Credit Card Bill',
      message: 'Credit card bill of ₹8,500 due in 8 days',
      prediction: 'Minimum payment: ₹850',
      amount: 8500,
      confidence: 92,
      icon: DollarSign,
      color: 'purple',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-800',
      iconColor: 'text-purple-600'
    }
  ];

  // Spending Pattern Analysis
  const spendingPatterns = [
    {
      category: 'Food & Dining',
      dailyAvg: 320,
      trend: 'up',
      change: '+12%',
      prediction: 'Likely to exceed budget this month'
    },
    {
      category: 'Transportation',
      dailyAvg: 180,
      trend: 'down',
      change: '-8%',
      prediction: 'On track with monthly budget'
    },
    {
      category: 'Entertainment',
      dailyAvg: 250,
      trend: 'up',
      change: '+25%',
      prediction: 'Weekend spike detected'
    },
    {
      category: 'Shopping',
      dailyAvg: 150,
      trend: 'stable',
      change: '0%',
      prediction: 'Normal spending pattern'
    }
  ];

  // AI Insights
  const aiInsights = [
    {
      title: 'Smart Saving Opportunity',
      message: 'You could save ₹2,400 this month by reducing dining out by 25%',
      impact: 'High',
      actionable: true,
      icon: Target
    },
    {
      title: 'Bill Optimization',
      message: 'Switch to a better mobile plan and save ₹300/month',
      impact: 'Medium',
      actionable: true,
      icon: Brain
    },
    {
      title: 'Investment Reminder',
      message: 'Your SIP amount can be increased by ₹2,000 based on surplus',
      impact: 'High',
      actionable: true,
      icon: TrendingUp
    }
  ];

  // Balance Projection Chart
  const projectionData = Array.from({length: 30}, (_, i) => {
    const baseSpending = dailySpending;
    const variance = Math.random() * 200 - 100; // Random variance
    const dailyChange = -(baseSpending + variance);
    return Math.max(0, currentBalance + (dailyChange * (i + 1)));
  });

  const renderBalanceProjection = () => {
    const maxValue = Math.max(...projectionData, currentBalance);
    const minValue = 0;
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <TrendingDown className="w-5 h-5 mr-2 text-red-500" />
          Balance Projection (30 Days)
        </h3>
        
        <div className="h-48 mb-4">
          <svg width="100%" height="100%" viewBox="0 0 350 180">
            <defs>
              <linearGradient id="balanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1"/>
              </linearGradient>
            </defs>
            
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map(i => (
              <line key={i} x1="30" y1={40 + i * 30} x2="320" y2={40 + i * 30} stroke="#f3f4f6" strokeWidth="1"/>
            ))}
            
            {/* Zero line */}
            <line x1="30" y1="160" x2="320" y2="160" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5"/>
            <text x="325" y="165" fill="#ef4444" fontSize="12">₹0</text>
            
            {/* Balance projection line */}
            <path
              d={`M 30 ${160 - ((currentBalance - minValue) / (maxValue - minValue)) * 120} ${projectionData.map((value, index) => 
                `L ${30 + (index + 1) * 10} ${160 - ((value - minValue) / (maxValue - minValue)) * 120}`
              ).join(' ')}`}
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
            />
            
            {/* Area under curve */}
            <path
              d={`M 30 ${160 - ((currentBalance - minValue) / (maxValue - minValue)) * 120} ${projectionData.map((value, index) => 
                `L ${30 + (index + 1) * 10} ${160 - ((value - minValue) / (maxValue - minValue)) * 120}`
              ).join(' ')} L 320 160 L 30 160 Z`}
              fill="url(#balanceGradient)"
            />
            
            {/* Current balance point */}
            <circle cx="30" cy={160 - ((currentBalance - minValue) / (maxValue - minValue)) * 120} r="5" fill="#ef4444"/>
            <text x="10" y={165 - ((currentBalance - minValue) / (maxValue - minValue)) * 120} fill="#ef4444" fontSize="12">₹{currentBalance.toLocaleString()}</text>
          </svg>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="font-medium text-red-800">Critical Alert</span>
          </div>
          <p className="text-sm text-red-700">
            At current spending rate of ₹{dailySpending}/day, your balance will reach zero in approximately 16 days.
          </p>
        </div>
      </div>
    );
  };

  const renderAlerts = () => (
    <div className="space-y-4">
      {predictiveAlerts.map((alert) => {
        const Icon = alert.icon;
        return (
          <div key={alert.id} className={`${alert.bgColor} border ${alert.borderColor} rounded-xl p-4`}>
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full bg-white ${alert.iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-bold ${alert.textColor}`}>{alert.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                      {alert.confidence}% confidence
                    </span>
                  </div>
                </div>
                <p className={`text-sm ${alert.textColor} mb-2`}>{alert.message}</p>
                <p className="text-xs text-gray-600">{alert.prediction}</p>
                
                {alert.amount && (
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">₹{alert.amount.toLocaleString()}</span>
                    {alert.daysLeft && (
                      <span className="text-sm text-gray-500">{alert.daysLeft} days left</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Balance Projection */}
      {renderBalanceProjection()}
      
      {/* Spending Patterns */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Eye className="w-5 h-5 mr-2 text-blue-500" />
          Spending Pattern Analysis
        </h3>
        
        <div className="space-y-4">
          {spendingPatterns.map((pattern, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{pattern.category}</div>
                <div className="text-sm text-gray-600">₹{pattern.dailyAvg}/day average</div>
              </div>
              <div className="text-right">
                <div className={`flex items-center space-x-1 ${
                  pattern.trend === 'up' ? 'text-red-600' : 
                  pattern.trend === 'down' ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {pattern.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                  {pattern.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                  <span className="text-sm font-medium">{pattern.change}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{pattern.prediction}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInsights = () => (
    <div className="space-y-4">
      {aiInsights.map((insight, index) => {
        const Icon = insight.icon;
        return (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-50 rounded-full">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{insight.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    insight.impact === 'High' ? 'bg-red-100 text-red-700' :
                    insight.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {insight.impact} Impact
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{insight.message}</p>
                {insight.actionable && (
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                    Take Action
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={() => navigate('/')} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Go back to home"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LexFi
            </h1>
            <p className="text-sm text-gray-500">Predictive AI Assistant</p>
          </div>
          <button 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm opacity-80">Current Balance</div>
            <div className="text-2xl font-bold">₹{currentBalance.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm opacity-80">Daily Spending</div>
            <div className="text-2xl font-bold">₹{dailySpending}</div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-white/10 rounded-lg">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5" />
            <span className="text-sm font-medium">AI is actively monitoring your finances</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white shadow-sm">
        <div className="flex">
          {[
            { id: 'alerts', name: 'Smart Alerts', icon: AlertTriangle },
            { id: 'analytics', name: 'Analytics', icon: TrendingDown },
            { id: 'insights', name: 'AI Insights', icon: Brain }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'alerts' && renderAlerts()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'insights' && renderInsights()}
      </div>
    </div>
  );
};

export default LexFi;
