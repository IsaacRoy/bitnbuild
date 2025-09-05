import { useState } from "react";
import { Send, Bot, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { BottomNavigation } from "@/components/dashboard/BottomNavigation";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function Fingo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Fingo, your AI financial assistant. How can I help you manage your finances today?",
      isUser: false,
      timestamp: new Date(Date.now() - 600000), // 10 minutes ago
    },
    {
      id: 2,
      text: "Hi Fingo! I've been spending a lot on food delivery lately. Any tips?",
      isUser: true,
      timestamp: new Date(Date.now() - 540000), // 9 minutes ago
    },
    {
      id: 3,
      text: "Great question! I can see from your spending patterns that food delivery has increased by 40% this month. Here are some practical tips:\n\n🍳 Try meal prepping on Sundays\n📱 Use grocery delivery instead (usually 50% cheaper)\n⏰ Set a weekly food delivery budget of ₹1,000\n🥗 Cook 2-3 simple meals at home\n\nThis could save you ₹2,000+ per month! Would you like me to suggest some quick 15-minute recipes?",
      isUser: false,
      timestamp: new Date(Date.now() - 480000), // 8 minutes ago
    },
    {
      id: 4,
      text: "That's helpful! What about my investment portfolio? Should I invest more in mutual funds?",
      isUser: true,
      timestamp: new Date(Date.now() - 420000), // 7 minutes ago
    },
    {
      id: 5,
      text: "Based on your current portfolio, you have 60% in equity funds and 40% in debt. This is actually well-balanced for your age group! 📊\n\n💡 Recommendations:\n• Your SIP of ₹5,000/month is great - consider increasing by ₹1,000 next quarter\n• You could add 10% to international funds for diversification\n• Your emergency fund is solid at 6 months expenses\n\nYour portfolio is on track to reach ₹50 lakhs in 8 years at current rate! 🚀",
      isUser: false,
      timestamp: new Date(Date.now() - 360000), // 6 minutes ago
    },
    {
      id: 6,
      text: "Wow, that's encouraging! How can I track my daily expenses better?",
      isUser: true,
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    },
    {
      id: 7,
      text: "Perfect timing! Here's my smart tracking system:\n\n📸 Use our Scanner feature to automatically capture receipts\n🏷️ I'll categorize expenses for you automatically\n📊 Get weekly spending summaries every Sunday\n⚡ Set instant alerts when you exceed category budgets\n\n💫 Pro tip: Take a photo of every receipt immediately after purchase. I'll handle the rest! Try scanning one right now using the Scanner tab.",
      isUser: false,
      timestamp: new Date(Date.now() - 240000), // 4 minutes ago
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  // Dummy AI responses based on common financial queries
  const getSmartResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes("budget")) {
      return "I recommend the 50-30-20 rule: 50% for needs, 30% for wants, 20% for savings. Based on your ₹45,000 monthly income, that's ₹22,500 for essentials, ₹13,500 for lifestyle, and ₹9,000 for savings. You're currently saving ₹8,200, so you're close! 💪";
    }
    
    if (input.includes("save") || input.includes("saving")) {
      return "Great question! Your current saving rate is 18% which is above average! 🎯 To boost it:\n\n• Automate savings on salary day\n• Use the 24-hour rule for purchases >₹1,000\n• Review subscriptions monthly\n• Try a no-spend challenge once a month\n\nSmall changes can increase your savings by ₹3,000/month! 🚀";
    }
    
    if (input.includes("invest") || input.includes("mutual fund") || input.includes("stock")) {
      return "Smart thinking! For beginners, I suggest:\n\n📈 Large cap funds (60%) - stable growth\n🌱 Mid cap funds (20%) - higher returns\n🌍 International funds (10%) - diversification\n💰 Debt funds (10%) - stability\n\nStart with ₹2,000/month SIP and increase by 10% annually. Time in market beats timing the market! 📊";
    }
    
    if (input.includes("emergency") || input.includes("fund")) {
      return "Your emergency fund should cover 6-12 months of expenses. Based on your spending of ₹35,000/month, aim for ₹2.5 lakhs.\n\n✅ You currently have ₹2.1 lakhs - almost there!\n🎯 Add ₹5,000 more to complete it\n🏦 Keep it in a high-yield savings account for easy access\n\nYou're doing great! 🌟";
    }
    
    if (input.includes("debt") || input.includes("loan") || input.includes("emi")) {
      return "Let's tackle your debt strategically! 💪\n\n🔥 Avalanche method: Pay minimums on all, extra on highest interest\n❄️ Snowball method: Pay smallest debts first for motivation\n\nYour current EMI-to-income ratio is 35% - ideal is under 40%. Consider prepaying your personal loan (12% interest) before home loan (8.5% interest). Save ₹45,000 in interest! 💰";
    }
    
    if (input.includes("tax") || input.includes("80c")) {
      return "Tax season made easy! 📋\n\n💼 You can save ₹46,800 under 80C with:\n• ELSS funds: ₹1,50,000 (₹12,500/month)\n• Already investing: ₹60,000\n• Need ₹90,000 more\n\n💡 Quick wins:\n• PPF top-up: ₹50,000\n• ELSS SIP: ₹3,500/month\n• Life insurance: ₹25,000\n\nTotal tax saved: ₹31,200! 🎉";
    }
    
    // Default response for other queries
    return `I understand you're asking about "${userInput}". That's a great financial question! Based on your profile, I can provide personalized advice. Here are some quick insights:\n\n💡 Your current financial health score: 7.8/10\n📊 Monthly surplus: ₹9,800\n🎯 On track for your goals!\n\nWould you like me to dive deeper into any specific area of your finances?`;
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);

    // Simulate AI response with smart replies
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: getSmartResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds

    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Simple Header */}
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
          <h1 className="text-xl font-bold text-foreground">Fingo</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 px-4 pb-24 pt-4 overflow-y-auto scrollbar-hide">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              {!message.isUser && (
                <div className="w-8 h-8 bg-navy-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.isUser
                    ? "bg-navy-primary text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-foreground"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <span
                  className={`text-xs mt-1 block ${
                    message.isUser ? "text-white/70" : "text-muted-foreground"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {message.isUser && (
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="fixed bottom-20 left-0 right-0 px-4 bg-background border-t border-border">
        <div className="py-4">
          <div className="flex gap-2 items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Fingo about your finances..."
              className="border-none bg-transparent focus:ring-0 focus:outline-none text-sm"
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="bg-navy-primary hover:bg-navy-primary/90 rounded-full w-8 h-8"
              disabled={inputValue.trim() === ""}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
