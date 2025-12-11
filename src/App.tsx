import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EnquiryProvider } from "@/contexts/EnquiryContext";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Enquiry from "./pages/Enquiry";
import NotFound from "./pages/NotFound";
import Events from "./pages/Events";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import CorporateEvents from "./pages/products/CorporateEvents";
import HotelLinens from "./pages/products/HotelLinens";
import Kitchen from "./pages/products/Kitchen";
import Restaurant from "./pages/products/Restaurant";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <EnquiryProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Events route */}
            <Route path="/events" element={<Events />} />
            
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            
            <Route path="/corporate-events" element={<CorporateEvents />} />
            <Route path="/hotel-linens" element={<HotelLinens />} />
            <Route path="/kitchen" element={<Kitchen />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/enquiry" element={<Enquiry />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </EnquiryProvider>
  </QueryClientProvider>
);

export default App;
