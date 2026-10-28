import React from 'react';
import { Search, X, RotateCcw } from 'lucide-react';
import type { SortOption, StatusFilter } from '../types/habit';

interface HabitFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedStatus: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
  selectedFrequency: string;
  onFrequencyChange: (freq: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

const CATEGORIES: { label: string; value: string }[] = [
  { label: 'All Categories', value: 'all' },
  { label: 'Health', value: 'health' },
  { label: 'Learning', value: 'learning' },
  { label: 'Mindfulness', value: 'mindfulness' },
  { label: 'Productivity', value: 'productivity' },
];

const FREQUENCIES: { label: string; value: string }[] = [
  { label: 'All Schedules', value: 'all' },
  { label: 'Daily', value: 'daily' },
  { label: 'Weekdays', value: 'weekdays' },
  { label: 'Weekly', value: 'weekly' },
];

const STATUSES: { label: string; value: StatusFilter }[] = [
  { label: 'All Status', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Pending', value: 'pending' },
];

export const HabitFilters: React.FC<HabitFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  selectedFrequency,
  onFrequencyChange,
  sortBy,
  onSortChange,
  onResetFilters,
  hasActiveFilters,
}) => {
  return (
    <div
      className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
      role="search"
      aria-label="Filter and Sort Habits"
    >
      {/* Top row: Search input & Reset action */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input with label */}
        <div className="relative flex-1">
          <label htmlFor="habit-search" className="sr-only">
            Search habits by title or description
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="habit-search"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search habits by name or description..."
            className="w-full pl-10 pr-9 py-2 text-sm bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search query"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Reset button if active */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-xl transition-colors cursor-pointer border border-indigo-200/60 dark:border-indigo-800/60"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Filter controls row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
        {/* Category filter */}
        <div>
          <label htmlFor="category-select" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Category
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full py-1.5 px-2.5 text-xs bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 cursor-pointer focus:border-indigo-500"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status filter */}
        <div>
          <label htmlFor="status-select" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Status
          </label>
          <select
            id="status-select"
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value as StatusFilter)}
            className="w-full py-1.5 px-2.5 text-xs bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 cursor-pointer focus:border-indigo-500"
          >
            {STATUSES.map((st) => (
              <option key={st.value} value={st.value}>
                {st.label}
              </option>
            ))}
          </select>
        </div>

        {/* Frequency filter */}
        <div>
          <label htmlFor="frequency-select" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Schedule
          </label>
          <select
            id="frequency-select"
            value={selectedFrequency}
            onChange={(e) => onFrequencyChange(e.target.value)}
            className="w-full py-1.5 px-2.5 text-xs bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 cursor-pointer focus:border-indigo-500"
          >
            {FREQUENCIES.map((freq) => (
              <option key={freq.value} value={freq.value}>
                {freq.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort option */}
        <div>
          <label htmlFor="sort-select" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Sort By
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full py-1.5 px-2.5 text-xs bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 cursor-pointer focus:border-indigo-500"
          >
            <option value="name-asc">Name: A–Z</option>
            <option value="name-desc">Name: Z–A</option>
            <option value="status">Completion Status</option>
            <option value="frequency">Schedule Frequency</option>
          </select>
        </div>
      </div>
    </div>
  );
};
