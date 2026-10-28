import { useState, useEffect, useRef, useMemo } from 'react';
import { Plus, RotateCcw, AlertCircle } from 'lucide-react';
import type { Habit, SortOption, StatusFilter } from '../types/habit';
import initialHabitsData from '../data/habits.json';
import {
  getTodayString,
  isCompletedToday,
  filterHabits,
  sortHabits,
  createNewHabitRecord,
} from '../utils/habitHelpers';
import { HabitSummary } from '../components/HabitSummary';
import { WeeklyProgress } from '../components/WeeklyProgress';
import { HabitFilters } from '../components/HabitFilters';
import { HabitCard } from '../components/HabitCard';
import { HabitFormModal } from '../components/HabitFormModal';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { EmptyState } from '../components/EmptyState';
import { NoResultsState } from '../components/NoResultsState';
import { ErrorState } from '../components/ErrorState';
import { useToast } from '../context/ToastContext';

const STORAGE_KEY = 'habitly_habits_v1';

export const HabitsPage = () => {
  const { showToast } = useToast();

  // State
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  // Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');
  const [selectedFrequency, setSelectedFrequency] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addHabitButtonRef = useRef<HTMLButtonElement>(null);

  // Undo delete tracking: stores last deleted habit and its index
  const lastDeletedRef = useRef<{ habit: Habit; index: number } | null>(null);

  // Today's formatted date string (YYYY-MM-DD)
  const [todayStr] = useState(() => getTodayString());

  // Formatted date string for page banner
  const [formattedTodayDate] = useState(() => {
    return new Date().toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  });

  // Initial load simulation with realistic delay
  const loadHabitsData = (simulateFailure = false) => {
    const timer = setTimeout(() => {
      if (simulateFailure) {
        setIsLoading(false);
        setIsError(true);
        return;
      }

      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setHabits(parsed);
            setIsLoading(false);
            return;
          }
        }

        // Fallback to initial local sample JSON dataset
        const typedData = (initialHabitsData as Habit[]).map((h) => ({
          ...h,
          category: h.category as any,
          frequency: h.frequency as any,
        }));
        setHabits(typedData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(typedData));
      } catch (err) {
        console.error('Failed to parse local habits:', err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }, 350);

    return timer;
  };

  useEffect(() => {
    const timer = loadHabitsData();
    return () => clearTimeout(timer);
  }, []);

  // Sync state changes with localStorage
  const saveHabits = (newHabits: Habit[]) => {
    setHabits(newHabits);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHabits));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  // Habit operations
  const handleToggleComplete = (id: string) => {
    const habit = habits.find((h) => h.id === id);
    if (!habit) return;

    const alreadyDone = isCompletedToday(habit, todayStr);
    let updatedDates: string[];

    if (alreadyDone) {
      updatedDates = habit.completedDates.filter((d) => d !== todayStr);
    } else {
      updatedDates = [...habit.completedDates, todayStr];
    }

    const updatedHabits = habits.map((h) =>
      h.id === id ? { ...h, completedDates: updatedDates } : h
    );
    saveHabits(updatedHabits);

    if (alreadyDone) {
      showToast(`Marked "${habit.name}" pending.`, 'info');
    } else {
      showToast(`Marked "${habit.name}" complete for today! 🎉`, 'success');
    }
  };

  const handleAddHabit = (
    habitData: Omit<Habit, 'id' | 'createdAt' | 'completedDates'>
  ) => {
    const newHabit = createNewHabitRecord(habitData);
    const updated = [newHabit, ...habits];
    saveHabits(updated);
    showToast(`Habit "${newHabit.name}" created!`, 'success');

    // If new habit is hidden by category or frequency filter, reset them so it's immediately visible
    if (
      (selectedCategory !== 'all' && selectedCategory.toLowerCase() !== newHabit.category.toLowerCase()) ||
      (selectedFrequency !== 'all' && selectedFrequency.toLowerCase() !== newHabit.frequency.toLowerCase()) ||
      selectedStatus === 'completed'
    ) {
      handleResetFilters();
      showToast(`Reset filters so "${newHabit.name}" is visible.`, 'info');
    }
  };

  const handleDeleteHabit = (habitToDelete: Habit) => {
    const habitIndex = habits.findIndex((h) => h.id === habitToDelete.id);
    lastDeletedRef.current = { habit: habitToDelete, index: habitIndex };

    const updated = habits.filter((h) => h.id !== habitToDelete.id);
    saveHabits(updated);

    showToast(
      `Deleted "${habitToDelete.name}".`,
      'info',
      {
        label: 'Undo',
        onClick: () => {
          if (lastDeletedRef.current) {
            const { habit, index } = lastDeletedRef.current;
            setHabits((prev) => {
              const restored = [...prev];
              // Restore at original index or prepend
              restored.splice(index >= 0 && index <= restored.length ? index : 0, 0, habit);
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(restored));
              } catch (e) {
                console.error(e);
              }
              return restored;
            });
            showToast(`Restored "${habit.name}".`, 'success');
            lastDeletedRef.current = null;
          }
        },
      }
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedFrequency('all');
    setSortBy('name-asc');
  };

  const handleResetToSampleData = () => {
    const typedData = (initialHabitsData as Habit[]).map((h) => ({
      ...h,
      category: h.category as any,
      frequency: h.frequency as any,
    }));
    saveHabits(typedData);
    handleResetFilters();
    showToast('Reset habits to sample starter dataset.', 'success');
  };

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      loadHabitsData(false);
      setIsRetrying(false);
    }, 300);
  };

  // Compute filtered & sorted habits
  const filteredHabits = useMemo(() => {
    const filtered = filterHabits(
      habits,
      searchQuery,
      selectedCategory,
      selectedStatus,
      selectedFrequency,
      todayStr
    );
    return sortHabits(filtered, sortBy, todayStr);
  }, [habits, searchQuery, selectedCategory, selectedStatus, selectedFrequency, sortBy, todayStr]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedStatus !== 'all' ||
    selectedFrequency !== 'all' ||
    sortBy !== 'name-asc';

  return (
    <div className="flex-1 py-8 sm:py-12 bg-slate-50/50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header & Date Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-md">
                {formattedTodayDate}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              My Habits
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Track your daily momentum, stay accountable, and build lasting habits.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Developer Test Trigger for Simulated Error */}
            <button
              type="button"
              onClick={() => loadHabitsData(true)}
              title="Test error state and retry mechanism"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>Simulate Error</span>
            </button>

            {/* Reset to Sample Data */}
            <button
              type="button"
              onClick={handleResetToSampleData}
              title="Reload initial starter sample habits"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Sample Data</span>
            </button>

            {/* Primary Add Habit Button */}
            <button
              ref={addHabitButtonRef}
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-sm shadow-indigo-600/25 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Habit</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : isError ? (
          <ErrorState
            message="Failed to load your habit entries from local memory. Click retry to recover."
            onRetry={handleRetry}
            isRetrying={isRetrying}
          />
        ) : (
          <div className="space-y-8">
            {/* Summary Statistics */}
            <HabitSummary habits={habits} />

            {/* 7-Day Weekly Progress Strip */}
            {habits.length > 0 && <WeeklyProgress habits={habits} />}

            {/* Search and Filters Toolbar */}
            {habits.length > 0 && (
              <HabitFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                selectedFrequency={selectedFrequency}
                onFrequencyChange={setSelectedFrequency}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onResetFilters={handleResetFilters}
                hasActiveFilters={hasActiveFilters}
              />
            )}

            {/* Habit List or Empty / No-Results States */}
            <section aria-label="Habit items list" className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Active Routines ({filteredHabits.length})
                </h2>
                {hasActiveFilters && habits.length > 0 && (
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Showing filtered results
                  </span>
                )}
              </div>

              {habits.length === 0 ? (
                <EmptyState onAddFirstHabit={() => setIsModalOpen(true)} />
              ) : filteredHabits.length === 0 ? (
                <NoResultsState
                  searchQuery={searchQuery}
                  onResetFilters={handleResetFilters}
                />
              ) : (
                <div className="space-y-3">
                  {filteredHabits.map((habit) => (
                    <HabitCard
                      key={habit.id}
                      habit={habit}
                      todayStr={todayStr}
                      onToggleComplete={handleToggleComplete}
                      onDelete={handleDeleteHabit}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>

      {/* Add Habit Dialog Modal */}
      <HabitFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddHabit={handleAddHabit}
        triggerRef={addHabitButtonRef}
      />
    </div>
  );
};
