import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Flame,
  TrendingUp,
  ShieldCheck,
  Zap,
  Star,
  ChevronRight,
} from 'lucide-react';
import { HabitIcon } from '../components/HabitIcon';
import sampleHabits from '../data/habits.json';

export const LandingPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  // Live demo state for Hero visual preview
  const [demoHabits, setDemoHabits] = useState(() =>
    sampleHabits.slice(0, 3).map((h, i) => ({
      ...h,
      done: i === 0, // first one completed by default
    }))
  );

  const toggleDemoHabit = (id: string) => {
    setDemoHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, done: !h.done } : h))
    );
  };

  const demoCompletedCount = demoHabits.filter((h) => h.done).length;
  const demoRate = Math.round((demoCompletedCount / demoHabits.length) * 100);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-indigo-50/50 via-white to-white dark:from-slate-900/60 dark:via-slate-900 dark:to-slate-900 border-b border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left copy column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Simplicity-first habit mastery</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Build Better Habits, <br className="hidden sm:inline" />
                <span className="text-indigo-600 dark:text-indigo-400">One Day at a Time.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Habitly replaces complicated tracking spreadsheets with a calm, focused dashboard.
                Establish small, sustainable routines, celebrate honest streaks, and maintain momentum without overwhelm.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/habits"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-md shadow-indigo-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <span>Start building habits</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#features"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Explore features
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>100% Local &amp; Private</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Instant zero-lag interactions</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                  <span>No login friction required</span>
                </div>
              </div>
            </div>

            {/* Right column: Interactive UI Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md w-full bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden backdrop-blur-sm p-5 space-y-4">
                {/* Header in preview */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700/60">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Live Dashboard Preview
                    </span>
                    <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                      Today’s Focus
                    </h2>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
                    <Flame className="w-3.5 h-3.5 text-indigo-500" />
                    <span>5 Day Streak</span>
                  </div>
                </div>

                {/* Live Progress pill */}
                <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-3 border border-slate-100 dark:border-slate-700/50">
                  <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                    <span>Daily Completion</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {demoCompletedCount} of {demoHabits.length} ({demoRate}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
                      style={{ width: `${demoRate}%` }}
                    />
                  </div>
                </div>

                {/* Interactive Habit Item previews */}
                <div className="space-y-2.5 pt-1" role="region" aria-label="Interactive demo habits">
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 italic">
                    Tap a circle below to try completion:
                  </p>
                  {demoHabits.map((habit) => (
                    <div
                      key={habit.id}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
                        habit.done
                          ? 'bg-emerald-50/60 border-emerald-200/80 dark:bg-emerald-950/20 dark:border-emerald-900/40'
                          : 'bg-white dark:bg-slate-800 border-slate-200/90 dark:border-slate-700/80 hover:border-indigo-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <HabitIcon
                          name={habit.icon}
                          category={habit.category as any}
                          size="sm"
                        />
                        <div className="min-w-0">
                          <p
                            className={`text-sm font-semibold truncate ${
                              habit.done
                                ? 'line-through text-slate-400 dark:text-slate-500'
                                : 'text-slate-800 dark:text-slate-100'
                            }`}
                          >
                            {habit.name}
                          </p>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                            {habit.frequency} • {habit.category}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleDemoHabit(habit.id)}
                        aria-label={`Toggle ${habit.name}`}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 border ${
                          habit.done
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-300 dark:border-slate-600 hover:border-indigo-500 text-transparent'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    to="/habits"
                    className="flex items-center justify-center gap-1.5 w-full py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    <span>Open full workspace</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE FEATURE CARDS */}
      <section id="features" className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-indigo-600 dark:text-indigo-400">
              Core Capabilities
            </h2>
            <p className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Designed for Daily Momentum
            </p>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
              Everything you need to turn deliberate intentions into automatic daily behaviors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <article className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/40 hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Build Consistency
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Establish repeatable daily, weekday, or weekly routines. Clear schedules remove decision fatigue so you simply show up and execute.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                <span>Flexible schedules</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </article>

            {/* Feature 2 */}
            <article className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/40 hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Track Your Progress
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Gain immediate clarity on today's completion rate and weekly progress trends. Accurate metrics empower you with real self-knowledge.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <span>Weekly overview</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </article>

            {/* Feature 3 */}
            <article className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/40 hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Stay Motivated
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Maintain streaks without toxic guilt. Habitly encourages sustainable daily habits and lets you easily undo accidental clicks with full control.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <span>Streak protection</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-slate-50 dark:bg-slate-950/50 border-y border-slate-200 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-indigo-600 dark:text-indigo-400">
              Simple 3-Step Flow
            </h2>
            <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              How Habitly Works
            </p>
            <p className="text-base text-slate-600 dark:text-slate-400">
              No bloated setup manuals or complex point systems. Just three straightforward habits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs relative">
              <span className="text-4xl font-black text-indigo-200 dark:text-indigo-950 absolute top-6 right-6">
                01
              </span>
              <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Choose a Habit
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Pick a clear, atomic action across health, learning, mindfulness, or productivity, and select its schedule.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs relative">
              <span className="text-4xl font-black text-indigo-200 dark:text-indigo-950 absolute top-6 right-6">
                02
              </span>
              <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Show Up Consistently
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Check in each day, mark completions with a single click, and feel the satisfaction of small daily wins.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs relative">
              <span className="text-4xl font-black text-indigo-200 dark:text-indigo-950 absolute top-6 right-6">
                03
              </span>
              <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Reflect on Progress
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Review your weekly completion trends and active streaks to adjust routines and build lasting discipline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS */}
      <section id="testimonials" className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-indigo-600 dark:text-indigo-400">
              Community Stories
            </h2>
            <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Loved by Intentional Builders
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 italic">
              Illustrative sample user stories from our early productivity testing group.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Story 1 */}
            <figure className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-400" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  “I used to quit habit apps after three days because of endless push notifications and badges. Habitly’s clean editorial layout feels like a quiet sanctuary for my daily goals.”
                </blockquote>
              </div>
              <figcaption className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center">
                  AR
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    Alex R.
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Software Engineer • 28-day reading streak
                  </div>
                </div>
              </figcaption>
            </figure>

            {/* Story 2 */}
            <figure className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-400" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  “The weekly progress strip gives me an immediate visual cue of where my energy went. I finally stayed consistent with my morning hydration and meditation routines.”
                </blockquote>
              </div>
              <figcaption className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center">
                  SL
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    Sarah L.
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Product Designer • Morning routine practitioner
                  </div>
                </div>
              </figcaption>
            </figure>

            {/* Story 3 */}
            <figure className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-400" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  “The instant undo toast saved me multiple times when I accidentally tapped a habit on mobile. Fast, keyboard-accessible, and completely private on my browser.”
                </blockquote>
              </div>
              <figcaption className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 font-bold text-xs flex items-center justify-center">
                  MK
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    Marcus K.
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Writer &amp; Researcher • Mindfulness habit builder
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 5. PRICING */}
      <section id="pricing" className="py-20 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-indigo-600 dark:text-indigo-400">
              Clear Plans
            </h2>
            <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Invest in Your Consistency
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Sample illustrative plans. Select an option below to view its complete plan breakdown.
            </p>

            {/* Interactive Billing Cycle Toggle */}
            <div className="flex items-center justify-center pt-4">
              <div
                role="group"
                aria-label="Billing frequency options"
                className="inline-flex items-center p-1 bg-slate-200/70 dark:bg-slate-800 rounded-2xl border border-slate-300/50 dark:border-slate-700/60"
              >
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    billingCycle === 'monthly'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Monthly billing
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    billingCycle === 'annual'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>Annual billing</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Plan 1: Free */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Free</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Essential habit tracking for personal routines.
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">$0</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">/ forever</span>
                </div>

                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Up to 10 active habits</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Full daily check-in &amp; streak tracking</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>7-day progress history</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Private local browser storage</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <Link
                  to={`/plan/free?billing=${billingCycle}`}
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 text-sm font-semibold rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  View Free Plan Details
                </Link>
              </div>
            </div>

            {/* Plan 2: Plus (Recommended) */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border-2 border-indigo-600 dark:border-indigo-500 relative flex flex-col justify-between shadow-lg shadow-indigo-500/10 scale-[1.02]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                Recommended
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Plus</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Advanced progress and rich habit organization.
                  </p>
                </div>

                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white transition-all">
                      {billingCycle === 'annual' ? '$3.99' : '$4.99'}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {billingCycle === 'annual' ? '/ month' : '/ month'}
                    </span>
                  </div>
                  {billingCycle === 'annual' && (
                    <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                      Billed $47.88 annually (20% savings)
                    </p>
                  )}
                </div>

                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2.5 font-medium text-slate-900 dark:text-white">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span>Everything in Free, plus:</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Unlimited habits &amp; custom categories</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Monthly &amp; yearly progress analytics</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Streak shield &amp; rest-day forgiveness</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <Link
                  to={`/plan/plus?billing=${billingCycle}`}
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-sm transition-colors"
                >
                  Select Plus Plan
                </Link>
              </div>
            </div>

            {/* Plan 3: Pro */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pro</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Advanced personal coaching and life-design workflows.
                  </p>
                </div>

                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white transition-all">
                      {billingCycle === 'annual' ? '$7.99' : '$9.99'}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {billingCycle === 'annual' ? '/ month' : '/ month'}
                    </span>
                  </div>
                  {billingCycle === 'annual' && (
                    <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                      Billed $95.88 annually (20% savings)
                    </p>
                  )}
                </div>

                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2.5 font-medium text-slate-900 dark:text-white">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span>Everything in Plus, plus:</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Cross-device encrypted sync</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Custom reminder triggers &amp; webhook exports</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Priority feature requests &amp; beta lab</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <Link
                  to={`/plan/pro?billing=${billingCycle}`}
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 text-sm font-semibold rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Select Pro Plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="py-16 bg-indigo-600 dark:bg-indigo-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Build Lasting Habits Today?
          </h2>
          <p className="text-indigo-100 max-w-2xl mx-auto text-base sm:text-lg">
            No signup forms, credit cards, or passwords. Your habit tracker is ready right now in your browser.
          </p>
          <div className="pt-2">
            <Link
              to="/habits"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-bold text-indigo-700 bg-white hover:bg-indigo-50 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Go to My Habits</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
