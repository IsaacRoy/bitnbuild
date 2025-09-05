import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { Fingo } from "./pages/Fingo";
import { Spens } from "./pages/Spens";
import { Genie } from "./pages/Genie";
import IdeaFi from "./pages/IdeaFi";
import LexFi from "./pages/LexFi";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fingo" element={<Fingo />} />
          <Route path="/spens" element={<Spens />} />
          <Route path="/genie" element={<Genie />} />
          <Route path="/ideafi" element={<IdeaFi />} />
          <Route path="/lexfi" element={<LexFi />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
