import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface NoResultsStateProps {
  searchQuery: string;
  onResetFilters: () => void;
}

export const NoResultsState: React.FC<NoResultsStateProps> = ({
  searchQuery,
  onResetFilters,
}) => {
  return (
    <div className="py-14 px-6 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto">
        <SearchX className="w-7 h-7" />
      </div>

      <div className="max-w-md mx-auto space-y-1.5">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          No matching habits found
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {searchQuery
            ? `No habits match your search "${searchQuery}" or the active category/status filters.`
            : 'No habits match your currently selected category, frequency, or status filters.'}
        </p>
      </div>

      <div>
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/60 dark:border-indigo-800/60 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset search and filters</span>
        </button>
      </div>
    </div>
  );
};
