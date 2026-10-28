import React from 'react';
import { Check, Flame, Trash2, Calendar, History } from 'lucide-react';
import type { Habit } from '../types/habit';
import { HabitIcon } from './HabitIcon';
import { isCompletedToday, calculateStreak } from '../utils/habitHelpers';

interface HabitCardProps {
  habit: Habit;
  todayStr: string;
  onToggleComplete: (id: string) => void;
  onDelete: (habit: Habit) => void;
  onViewHistory?: (habit: Habit) => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  todayStr,
  onToggleComplete,
  onDelete,
  onViewHistory,
}) => {
  const isDone = isCompletedToday(habit, todayStr);
  const streak = calculateStreak(habit, todayStr);

  return (
    <article
      className={`group relative p-4 sm:p-5 rounded-2xl border transition-all duration-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isDone
          ? 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/70 dark:border-slate-800/60'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      {/* Left content */}
      <div className="flex items-start gap-3.5 min-w-0 flex-1">
        <HabitIcon
          name={habit.icon}
          category={habit.category}
          size="md"
          className="shrink-0 mt-0.5"
        />

        <div className="min-w-0 space-y-1 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`text-base font-bold truncate transition-colors ${
                isDone
                  ? 'line-through text-slate-400 dark:text-slate-500'
                  : 'text-slate-900 dark:text-white'
              }`}
            >
              {habit.name}
            </h3>

            {/* Badges */}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {habit.category}
            </span>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
              <Calendar className="w-2.5 h-2.5" />
              <span>{habit.frequency}</span>
            </span>

            {/* Streak Badge */}
            {streak > 0 && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60"
                title={`${streak} consecutive days completed`}
              >
                <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>{streak}d streak</span>
              </span>
            )}
          </div>

          {habit.description && (
            <p
              className={`text-xs sm:text-sm line-clamp-2 ${
                isDone
                  ? 'text-slate-400 dark:text-slate-500'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {habit.description}
            </p>
          )}
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800/80 shrink-0">
        {/* History / Details button */}
        {onViewHistory && (
          <button
            type="button"
            onClick={() => onViewHistory(habit)}
            aria-label={`View history and before details for ${habit.name}`}
            title="View 30-day history and past logs"
            className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-xl transition-colors cursor-pointer"
          >
            <History className="w-4 h-4" />
          </button>
        )}

        {/* Delete Habit button */}
        <button
          type="button"
          onClick={() => onDelete(habit)}
          aria-label={`Delete habit ${habit.name}`}
          className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* Completion toggle button */}
        <button
          type="button"
          onClick={() => onToggleComplete(habit.id)}
          aria-label={
            isDone
              ? `Mark ${habit.name} pending for today`
              : `Mark ${habit.name} complete for today`
          }
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
            isDone
              ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
              : 'border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400'
          }`}
        >
          <span
            className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
              isDone
                ? 'border-white bg-white/20 text-white'
                : 'border-slate-400 dark:border-slate-600'
            }`}
          >
            {isDone && <Check className="w-3 h-3 stroke-[3]" />}
          </span>
          <span>{isDone ? 'Completed Today' : 'Mark Done'}</span>
        </button>
      </div>
    </article>
  );
};
