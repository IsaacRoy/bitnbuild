import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Star, Award, TrendingUp, Shield, Bell, Settings, ChevronRight, Edit3, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Dummy user data
  const userData = {
    name: "Floyd Miles",
    email: "floyd.miles@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "January 2023",
    membershipLevel: "Premium",
    profileImage: "/src/assets/profile-floyd.jpg",
    totalInvestments: "₹2,45,000",
    totalReturns: "₹32,400",
    portfolioValue: "₹2,77,400",
    riskScore: 7.2,
    creditScore: 785
  };

  // Investment statistics
  const investmentStats = [
    { label: "Total Invested", value: "₹2,45,000", change: "+12.5%", positive: true },
    { label: "Current Value", value: "₹2,77,400", change: "+13.2%", positive: true },
    { label: "Total Returns", value: "₹32,400", change: "+15.8%", positive: true },
    { label: "Monthly SIP", value: "₹15,000", change: "Active", positive: true }
  ];

  // Recent activities
  const recentActivities = [
    { type: "Investment", description: "SIP in Nifty 50 Index Fund", amount: "₹5,000", date: "Today", icon: TrendingUp, color: "text-green-600" },
    { type: "Dividend", description: "Received dividend from HDFC Mutual Fund", amount: "+₹1,250", date: "2 days ago", icon: Star, color: "text-yellow-600" },
    { type: "Withdrawal", description: "Emergency fund withdrawal", amount: "-₹8,000", date: "1 week ago", icon: ArrowLeft, color: "text-red-600" },
    { type: "Achievement", description: "Completed 1 year of consistent SIP", amount: "🏆", date: "2 weeks ago", icon: Award, color: "text-purple-600" }
  ];

  // Settings options
  const settingsOptions = [
    { label: "Account Settings", icon: Settings, color: "text-gray-600" },
    { label: "Security & Privacy", icon: Shield, color: "text-blue-600" },
    { label: "Notifications", icon: Bell, color: "text-orange-600" },
    { label: "Investment Preferences", icon: TrendingUp, color: "text-green-600" }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Investment Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {investmentStats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
            <div className="text-lg font-bold text-gray-900">{stat.value}</div>
            <div className={`text-xs flex items-center mt-1 ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="w-3 h-3 mr-1" />
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Portfolio Performance Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Portfolio Performance</h3>
        <div className="h-32 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 300 120">
            <defs>
              <linearGradient id="portfolioGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1"/>
              </linearGradient>
            </defs>
            
            {/* Performance line */}
            <path
              d="M 30 80 L 70 70 L 110 60 L 150 45 L 190 40 L 230 35 L 270 30"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            {/* Area under curve */}
            <path
              d="M 30 80 L 70 70 L 110 60 L 150 45 L 190 40 L 230 35 L 270 30 L 270 100 L 30 100 Z"
              fill="url(#portfolioGradient)"
            />
            
            {/* Data points */}
            {[30, 70, 110, 150, 190, 230, 270].map((x, index) => {
              const y = [80, 70, 60, 45, 40, 35, 30][index];
              return (
                <circle key={index} cx={x} cy={y} r="4" fill="#3b82f6" />
              );
            })}
          </svg>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Jan</span>
          <span>Mar</span>
          <span>May</span>
          <span>Jul</span>
          <span>Sep</span>
        </div>
      </div>

      {/* Risk & Credit Scores */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Risk Score</span>
            <Shield className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{userData.riskScore}/10</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className={`bg-orange-500 h-2 rounded-full ${
              userData.riskScore <= 3 ? 'w-3/10' :
              userData.riskScore <= 5 ? 'w-5/10' :
              userData.riskScore <= 7 ? 'w-7/10' :
              userData.riskScore <= 8 ? 'w-8/10' : 'w-9/10'
            }`}></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Credit Score</span>
            <Star className="w-4 h-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{userData.creditScore}</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className={`bg-green-500 h-2 rounded-full ${
              userData.creditScore >= 800 ? 'w-full' :
              userData.creditScore >= 750 ? 'w-11/12' :
              userData.creditScore >= 700 ? 'w-5/6' :
              userData.creditScore >= 650 ? 'w-3/4' : 'w-2/3'
            }`}></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActivity = () => (
    <div className="space-y-4">
      {recentActivities.map((activity, index) => {
        const Icon = activity.icon;
        return (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full bg-gray-50 ${activity.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-gray-900">{activity.type}</div>
                  <div className="text-sm text-gray-500">{activity.date}</div>
                </div>
                <div className="text-sm text-gray-600 mt-1">{activity.description}</div>
                <div className={`text-sm font-medium mt-1 ${
                  activity.amount.startsWith('+') ? 'text-green-600' : 
                  activity.amount.startsWith('-') ? 'text-red-600' : 'text-gray-900'
                }`}>
                  {activity.amount}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-3">
      {settingsOptions.map((option, index) => {
        const Icon = option.icon;
        return (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 ${option.color}`} />
                <span className="font-medium text-gray-900">{option.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
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
            <h1 className="text-xl font-bold text-gray-900">Profile</h1>
          </div>
          <button 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Edit profile"
          >
            <Edit3 className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <button 
                className="absolute -bottom-1 -right-1 bg-blue-500 p-1.5 rounded-full text-white"
                title="Change profile picture"
              >
                <Camera className="w-3 h-3" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{userData.name}</h2>
              <p className="text-gray-600">{userData.membershipLevel} Member</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Mail className="w-4 h-4" />
                  <span>{userData.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{userData.portfolioValue}</div>
              <div className="text-xs text-gray-500">Portfolio Value</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{userData.totalReturns}</div>
              <div className="text-xs text-gray-500">Total Returns</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">18 Months</div>
              <div className="text-xs text-gray-500">Member Since</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex">
          {[
            { id: 'overview', name: 'Overview' },
            { id: 'activity', name: 'Activity' },
            { id: 'settings', name: 'Settings' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'activity' && renderActivity()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
};

export default Profile;
