import React from 'react';
import type { Habit } from '../types/habit';
import { getLast7DaysProgress } from '../utils/habitHelpers';
import { CalendarDays } from 'lucide-react';

interface WeeklyProgressProps {
  habits: Habit[];
  selectedDate?: string;
  onSelectDate?: (dateStr: string) => void;
}

export const WeeklyProgress: React.FC<WeeklyProgressProps> = ({
  habits,
  selectedDate,
  onSelectDate,
}) => {
  const days = getLast7DaysProgress(habits);

  return (
    <section
      aria-label="Weekly Progress Overview"
      className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            7-Day Completion Momentum
          </h2>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Click any day to view or record past details
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {days.map((day) => {
          const isSelected = selectedDate ? selectedDate === day.dateStr : day.isToday;

          return (
            <button
              key={day.dateStr}
              type="button"
              onClick={() => onSelectDate && onSelectDate(day.dateStr)}
              className={`flex flex-col items-center justify-between p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-50 border-indigo-400 dark:bg-indigo-950/70 dark:border-indigo-600 ring-2 ring-indigo-500 shadow-xs'
                  : day.isToday
                  ? 'bg-indigo-50/40 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-800'
                  : 'bg-slate-50/50 border-slate-100 dark:bg-slate-850/50 dark:border-slate-800/80 hover:border-slate-300'
              }`}
            >
              <span className={`text-[11px] font-semibold uppercase tracking-wider ${
                isSelected ? 'text-indigo-700 dark:text-indigo-300 font-bold' : 'text-slate-500 dark:text-slate-400'
              }`}>
                {day.dayShort}
              </span>

              <span className={`text-sm sm:text-base font-bold my-1 ${
                isSelected ? 'text-indigo-950 dark:text-indigo-100 font-black' : 'text-slate-800 dark:text-slate-200'
              }`}>
                {day.dayNumber}
              </span>

              {/* Progress mini bar */}
              <div className="w-full mt-1 space-y-1">
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      day.percentage === 100
                        ? 'bg-emerald-500'
                        : day.percentage > 0
                        ? 'bg-indigo-600 dark:bg-indigo-500'
                        : 'bg-transparent'
                    }`}
                    style={{ width: `${day.percentage}%` }}
                    aria-hidden="true"
                  />
                </div>
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block truncate">
                  {day.percentage}%
                </span>
              </div>

              {day.isToday && (
                <span className="mt-1 text-[9px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/60 px-1.5 py-0.5 rounded-full">
                  Today
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};
