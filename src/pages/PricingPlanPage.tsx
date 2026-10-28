import { useLocation, Link, useParams } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, ArrowLeft, Star, Sparkles } from 'lucide-react';

interface PlanDetail {
  name: string;
  tagline: string;
  monthlyPrice: string;
  annualPrice: string;
  annualTotal: string;
  badge?: string;
  features: string[];
  description: string;
}

const PLANS: Record<string, PlanDetail> = {
  free: {
    name: 'Free Starter',
    tagline: 'Essential personal habit tracking for daily focus.',
    monthlyPrice: '$0',
    annualPrice: '$0',
    annualTotal: '$0 / year',
    description: 'Perfect for building 1–10 essential routines with complete privacy and zero friction.',
    features: [
      'Up to 10 active daily or weekly habits',
      'Full daily check-in & completion tracking',
      'Real consecutive streak calculations',
      '7-day progress momentum overview',
      'Private local browser storage',
      'Accessible keyboard & screen reader support',
    ],
  },
  plus: {
    name: 'Plus Plan',
    tagline: 'Enhanced progress analytics & unlimited habit organization.',
    monthlyPrice: '$4.99',
    annualPrice: '$3.99',
    annualTotal: '$47.88 / year',
    badge: 'Most Popular',
    description: 'Designed for ambitious individuals who want deeper habit insights and streak flexibility.',
    features: [
      'Everything in Free Starter',
      'Unlimited daily, weekday, and weekly habits',
      'Custom category tagging & color accents',
      '30-day and yearly progress history trends',
      'Streak Shield & rest-day forgiveness',
      'Priority client-side search & filtering',
    ],
  },
  pro: {
    name: 'Pro Mastery',
    tagline: 'Advanced personal performance and life-design workflows.',
    monthlyPrice: '$9.99',
    annualPrice: '$7.99',
    annualTotal: '$95.88 / year',
    badge: 'Best Value',
    description: 'The complete productivity suite for coaches, knowledge workers, and routine practitioners.',
    features: [
      'Everything in Plus Plan',
      'Cross-device encrypted sync backup',
      'Custom reminder triggers & Webhook exports',
      'Advanced weekly reflection journal metrics',
      'CSV / JSON habit history data export',
      'Early access to beta features and lab tools',
    ],
  },
};

export const PricingPlanPage = () => {
  const { planId = 'plus' } = useParams<{ planId: string }>();
  const location = useLocation();

  // Read billing query param (?billing=annual or ?billing=monthly)
  const searchParams = new URLSearchParams(location.search);
  const billingCycle = searchParams.get('billing') === 'annual' ? 'annual' : 'monthly';

  // Normalize selected plan key
  const normalizedKey = planId.toLowerCase() in PLANS ? planId.toLowerCase() : 'plus';
  const plan = PLANS[normalizedKey];

  const priceDisplay = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
  const billingFrequencyText = billingCycle === 'annual' ? '/ month (billed annually)' : '/ month';

  return (
    <div className="flex-1 py-12 md:py-16 bg-slate-50/60 dark:bg-slate-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <div>
          <Link
            to="/#pricing"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Pricing comparison</span>
          </Link>
        </div>

        {/* Page Heading */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Selected Plan Overview</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Review Your {plan.name}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            You selected the {plan.name} with {billingCycle === 'annual' ? 'Annual (20% off)' : 'Monthly'} billing.
          </p>
        </div>

        {/* Plan Summary Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {plan.name}
                </h2>
                {plan.badge && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white">
                    {plan.badge}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {plan.tagline}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900 dark:text-white">
                  {priceDisplay}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {billingFrequencyText}
                </span>
              </div>
              {billingCycle === 'annual' && normalizedKey !== 'free' && (
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                  Billed {plan.annualTotal} • 20% savings applied
                </span>
              )}
            </div>
          </div>

          {/* Description & Features */}
          <div className="space-y-4">
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {plan.description}
            </p>

            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 pt-2">
              Everything Included in {plan.name}:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notice Banner */}
          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-start gap-3">
            <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm text-indigo-900 dark:text-indigo-200">
              <p className="font-semibold">Frontend Assignment Demonstration</p>
              <p className="text-indigo-700 dark:text-indigo-300">
                This is an illustrative plan checkout view. No payment is processed and no account registration is needed. Habitly’s habit tracker is fully functional and ready in your browser right now!
              </p>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Private local storage</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" />
              <span>Zero-risk habit tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-500" />
              <span>Instant activation</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
            <Link
              to="/#pricing"
              className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-center"
            >
              Change Selected Plan
            </Link>

            <Link
              to="/habits"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-md shadow-indigo-600/25 transition-all text-center"
            >
              <span>Continue to My Habits</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
