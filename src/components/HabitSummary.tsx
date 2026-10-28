import React from 'react';
import { CheckCircle2, ListOrdered, Percent, Flame } from 'lucide-react';
import type { Habit } from '../types/habit';
import { calculateSummaryStats } from '../utils/habitHelpers';

interface HabitSummaryProps {
  habits: Habit[];
}

export const HabitSummary: React.FC<HabitSummaryProps> = ({ habits }) => {
  const { total, completedToday, completionRate, bestStreak } = calculateSummaryStats(habits);

  const cards = [
    {
      id: 'stat-total',
      label: 'Total Habits',
      value: total,
      subtext: `${habits.filter(h => h.frequency === 'Daily').length} daily routines`,
      icon: ListOrdered,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/40',
      border: 'border-indigo-100 dark:border-indigo-900/40',
    },
    {
      id: 'stat-completed',
      label: 'Completed Today',
      value: `${completedToday}/${total}`,
      subtext: total === 0 ? 'No habits yet' : completedToday === total && total > 0 ? 'All finished! 🎉' : `${total - completedToday} remaining`,
      icon: CheckCircle2,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-100 dark:border-emerald-900/40',
    },
    {
      id: 'stat-rate',
      label: 'Completion Rate',
      value: `${completionRate}%`,
      subtext: 'Daily target metric',
      icon: Percent,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      border: 'border-blue-100 dark:border-blue-900/40',
    },
    {
      id: 'stat-streak',
      label: 'Best Active Streak',
      value: `${bestStreak} ${bestStreak === 1 ? 'day' : 'days'}`,
      subtext: bestStreak > 0 ? 'Keep the momentum going' : 'Complete today to start',
      icon: Flame,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-100 dark:border-amber-900/40',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" role="region" aria-label="Habit Statistics Summary">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border ${card.border} shadow-xs flex flex-col justify-between transition-all`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">
                {card.label}
              </span>
              <div className={`w-8 h-8 rounded-lg ${card.bg} ${card.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {card.value}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                {card.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
