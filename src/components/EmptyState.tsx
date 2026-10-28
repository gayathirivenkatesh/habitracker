import React from 'react';
import { PlusCircle, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  onAddFirstHabit: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onAddFirstHabit }) => {
  return (
    <div className="py-16 px-6 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 space-y-5">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-sm">
        <Sparkles className="w-8 h-8" />
      </div>

      <div className="max-w-md mx-auto space-y-2">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          No habits created yet
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Start your momentum today by creating your first daily or weekly routine. Small consistent steps create big transformations.
        </p>
      </div>

      <div>
        <button
          type="button"
          onClick={onAddFirstHabit}
          className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Your First Habit</span>
        </button>
      </div>
    </div>
  );
};
