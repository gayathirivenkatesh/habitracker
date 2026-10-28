import { Link } from 'react-router-dom';
import { CheckCircle2, Heart } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800/80 py-12 transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <Link to="/" className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span>Habitly</span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Build better habits, one day at a time. Designed with focus, calm aesthetics, and intentional simplicity to help you achieve sustainable consistency.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3">
              Product
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Pricing Plans
                </a>
              </li>
              <li>
                <Link to="/habits" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                  My Habits Tracker
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Trust */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3">
              Application
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>Local-first architecture</li>
              <li>Privacy focused (No cloud sync)</li>
              <li>WCAG 2.1 AA Accessible</li>
              <li>
                <a href="#testimonials" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Community Stories
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-500 gap-4">
          <p>© {CURRENT_YEAR} Habitly. Built for focus and personal momentum.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with care</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-0.5 inline" />
            <span>for daily self-improvement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
