import React from 'react';
import { X, Calendar, Flame, CheckCircle2, Clock } from 'lucide-react';
import type { Habit } from '../types/habit';
import { HabitIcon } from './HabitIcon';
import { formatDate, calculateStreak, getTodayString } from '../utils/habitHelpers';

interface HabitHistoryModalProps {
  habit: Habit | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleDateCompletion: (habitId: string, dateStr: string) => void;
}

const generatePast30Days = (completedDates: string[], todayStr: string) => {
  const days: { dateStr: string; label: string; dayNumber: number; isCompleted: boolean; isToday: boolean }[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = formatDate(d);
    const isCompleted = completedDates.includes(dateStr);
    days.push({
      dateStr,
      label: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      dayNumber: d.getDate(),
      isCompleted,
      isToday: dateStr === todayStr,
    });
  }
  return days;
};

export const HabitHistoryModal: React.FC<HabitHistoryModalProps> = ({
  habit,
  isOpen,
  onClose,
  onToggleDateCompletion,
}) => {
  if (!isOpen || !habit) return null;

  const todayStr = getTodayString();
  const past30Days = generatePast30Days(habit.completedDates, todayStr);
  const streak = calculateStreak(habit, todayStr);
  const totalCompleted = habit.completedDates.length;
  const createdDate = new Date(habit.createdAt).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="history-modal-title"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <HabitIcon name={habit.icon} category={habit.category} size="md" />
            <div>
              <h2 id="history-modal-title" className="text-xl font-bold text-slate-900 dark:text-white">
                {habit.name}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                <span>{habit.category}</span>
                <span>•</span>
                <span>{habit.frequency}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Started {createdDate}</span>
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lifetime Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
                Total Completions
              </span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                {totalCompleted} {totalCompleted === 1 ? 'day' : 'days'}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
                Current Streak
              </span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                {streak} {streak === 1 ? 'day' : 'days'}
              </span>
            </div>
          </div>
        </div>

        {habit.description && (
          <div className="p-3.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/60 dark:border-indigo-900/30 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <span className="font-semibold text-indigo-900 dark:text-indigo-200 block mb-0.5">
              Habit Cue / Notes:
            </span>
            {habit.description}
          </div>
        )}

        {/* 30-Day Completion History Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Past 30 Days History</span>
            </h3>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 italic">
              Tap any day to toggle its record
            </span>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-10 gap-2 p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-100 dark:border-slate-800">
            {past30Days.map((day) => (
              <button
                key={day.dateStr}
                type="button"
                onClick={() => onToggleDateCompletion(habit.id, day.dateStr)}
                title={`${day.label}: ${day.isCompleted ? 'Completed' : 'Missed'} (Click to toggle)`}
                className={`p-2 rounded-lg text-center flex flex-col items-center justify-center transition-all cursor-pointer border ${
                  day.isCompleted
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                } ${day.isToday ? 'ring-2 ring-indigo-500 ring-offset-1' : ''}`}
              >
                <span className="text-[10px] opacity-80">{day.label.slice(0, 3)}</span>
                <span className="text-xs font-bold leading-none mt-1">{day.dayNumber}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Completion Log Dates */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
            Recorded Completed Dates ({habit.completedDates.length})
          </h3>
          {habit.completedDates.length === 0 ? (
            <p className="text-xs text-slate-400 dark:text-slate-500 italic">
              No completed dates recorded yet. Mark today complete to begin your record.
            </p>
          ) : (
            <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-2 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-100 dark:border-slate-800">
              {[...habit.completedDates].reverse().map((dateStr) => (
                <span
                  key={dateStr}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60"
                >
                  {dateStr}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-sm cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
