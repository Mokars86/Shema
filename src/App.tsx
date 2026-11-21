import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HybridCartDrawer } from './components/HybridCartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { CompareModal } from './components/CompareModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { HomePage } from './pages/HomePage';
import { ElectronicsPage } from './pages/ElectronicsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { DigitalServicesPage } from './pages/DigitalServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { TrackPage } from './pages/TrackPage';
import { ContactPage } from './pages/ContactPage';
import { ClipsPage } from './pages/ClipsPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ToastBanner: React.FC = () => {
  const { toast } = useApp();
  if (!toast) return null;
  return (
    <div className="fixed top-24 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs font-semibold animate-bounce">
      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      <span>{toast}</span>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-slate-50">
          <Navbar />
          <ToastBanner />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/electronics" element={<ElectronicsPage />} />
              <Route path="/electronics/:id" element={<ProductDetailPage />} />
              <Route path="/digital-services" element={<DigitalServicesPage />} />
              <Route path="/digital-services/:id" element={<ServiceDetailPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/track" element={<TrackPage />} />
              <Route path="/clips" element={<ClipsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
          <HybridCartDrawer />
          <QuickViewModal />
          <CompareModal />
          <WhatsAppWidget />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
