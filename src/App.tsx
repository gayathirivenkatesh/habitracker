import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { HabitsPage } from './pages/HabitsPage';
import { PricingPlanPage } from './pages/PricingPlanPage';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
            {/* Semantic Header Landmark */}
            <Header />

            {/* Semantic Main Content Landmark */}
            <main id="main-content" className="flex-1 flex flex-col">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/habits" element={<HabitsPage />} />
                <Route path="/plan" element={<PricingPlanPage />} />
                <Route path="/plan/:planId" element={<PricingPlanPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Semantic Footer Landmark */}
            <Footer />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
