import { useState, useEffect, useRef, useMemo } from 'react';
import {
  Plus,
  RotateCcw,
  AlertCircle,
  Download,
  Upload,
  User,
  History,
  ArrowLeft,
} from 'lucide-react';
import type { Habit, SortOption, StatusFilter, UserProfile } from '../types/habit';
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
import { HabitHistoryModal } from '../components/HabitHistoryModal';
import { UserProfileModal } from '../components/UserProfileModal';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { EmptyState } from '../components/EmptyState';
import { NoResultsState } from '../components/NoResultsState';
import { ErrorState } from '../components/ErrorState';
import { useToast } from '../context/ToastContext';

const STORAGE_KEY = 'habitly_habits_v1';
const PROFILE_KEY = 'habitly_user_profile_v1';

export const HabitsPage = () => {
  const { showToast } = useToast();

  // State
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      name: 'Habit Builder',
      focusMotto: 'Small daily steps build lasting momentum',
      dailyTarget: 4,
    };
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');
  const [selectedFrequency, setSelectedFrequency] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addHabitButtonRef = useRef<HTMLButtonElement>(null);

  // Habit History Modal State
  const [selectedHabitForHistory, setSelectedHabitForHistory] = useState<Habit | null>(null);

  // File import input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Undo delete tracking: stores last deleted habit and its index
  const lastDeletedRef = useRef<{ habit: Habit; index: number } | null>(null);

  // Today's formatted date string (YYYY-MM-DD)
  const [todayStr] = useState(() => getTodayString());

  // Active selected viewing date (defaults to today, or clicked from 7-day strip)
  const [selectedDate, setSelectedDate] = useState(() => getTodayString());

  // Formatted date string for page banner
  const [formattedTodayDate] = useState(() => {
    return new Date().toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  });

  // Selected date formatted label
  const selectedDateLabel = useMemo(() => {
    if (selectedDate === todayStr) return 'Today';
    const parts = selectedDate.split('-');
    if (parts.length === 3) {
      const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    }
    return selectedDate;
  }, [selectedDate, todayStr]);

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

  const handleSaveProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
      showToast('Profile details updated!', 'success');
    } catch (e) {
      console.error(e);
    }
  };

  // Toggle completion on the currently viewed date (today or selected past date)
  const handleToggleComplete = (id: string) => {
    const habit = habits.find((h) => h.id === id);
    if (!habit) return;

    const targetDate = selectedDate;
    const alreadyDone = isCompletedToday(habit, targetDate);
    let updatedDates: string[];

    if (alreadyDone) {
      updatedDates = habit.completedDates.filter((d) => d !== targetDate);
    } else {
      updatedDates = [...habit.completedDates, targetDate];
    }

    const updatedHabits = habits.map((h) =>
      h.id === id ? { ...h, completedDates: updatedDates } : h
    );
    saveHabits(updatedHabits);

    const dateName = targetDate === todayStr ? 'today' : targetDate;
    if (alreadyDone) {
      showToast(`Marked "${habit.name}" pending for ${dateName}.`, 'info');
    } else {
      showToast(`Marked "${habit.name}" complete for ${dateName}! 🎉`, 'success');
    }
  };

  // Toggle specific date in the History modal
  const handleToggleSpecificDate = (habitId: string, targetDateStr: string) => {
    const habit = habits.find((h) => h.id === habitId);
    if (!habit) return;

    const isDone = habit.completedDates.includes(targetDateStr);
    const updatedDates = isDone
      ? habit.completedDates.filter((d) => d !== targetDateStr)
      : [...habit.completedDates, targetDateStr];

    const updatedHabits = habits.map((h) =>
      h.id === habitId ? { ...h, completedDates: updatedDates } : h
    );
    saveHabits(updatedHabits);

    // Keep active history modal updated with modified habit
    setSelectedHabitForHistory({
      ...habit,
      completedDates: updatedDates,
    });

    showToast(
      `${isDone ? 'Removed' : 'Added'} record for ${targetDateStr}.`,
      'info'
    );
  };

  const handleAddHabit = (
    habitData: Omit<Habit, 'id' | 'createdAt' | 'completedDates'>
  ) => {
    const newHabit = createNewHabitRecord(habitData);
    const updated = [newHabit, ...habits];
    saveHabits(updated);
    showToast(`Habit "${newHabit.name}" created!`, 'success');

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

  // Export full JSON backup
  const handleExportData = () => {
    const backupData = {
      app: 'Habitly',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      userProfile,
      habits,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `habitly-backup-${todayStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast('Backup file downloaded! Your data is safe.', 'success');
  };

  // Import JSON backup
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);

        let importedHabits: Habit[] = [];
        if (Array.isArray(parsed)) {
          importedHabits = parsed;
        } else if (parsed && Array.isArray(parsed.habits)) {
          importedHabits = parsed.habits;
          if (parsed.userProfile) {
            handleSaveProfile(parsed.userProfile);
          }
        } else {
          throw new Error('Unrecognized backup format');
        }

        saveHabits(importedHabits);
        showToast(`Successfully imported ${importedHabits.length} habits!`, 'success');
      } catch (err) {
        console.error('Import failed:', err);
        showToast('Invalid backup JSON file.', 'error');
      }
    };
    reader.readAsText(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      loadHabitsData(false);
      setIsRetrying(false);
    }, 300);
  };

  // Compute filtered & sorted habits based on selected viewing date
  const filteredHabits = useMemo(() => {
    const filtered = filterHabits(
      habits,
      searchQuery,
      selectedCategory,
      selectedStatus,
      selectedFrequency,
      selectedDate
    );
    return sortHabits(filtered, sortBy, selectedDate);
  }, [habits, searchQuery, selectedCategory, selectedStatus, selectedFrequency, sortBy, selectedDate]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedStatus !== 'all' ||
    selectedFrequency !== 'all' ||
    sortBy !== 'name-asc';

  return (
    <div className="flex-1 py-8 sm:py-12 bg-slate-50/50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* User Profile Banner & Motivational Greeting */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-base shrink-0">
              {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'H'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  Welcome back, {userProfile.name}!
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                  Target: {userProfile.dailyTarget || 3}/day
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {userProfile.focusMotto ? `“${userProfile.focusMotto}”` : 'Building atomic consistency every day.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 rounded-xl transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-indigo-500" />
              <span>Edit Profile &amp; Target</span>
            </button>
          </div>
        </div>

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
              Track your daily momentum, browse previous records, and build lasting habits.
            </p>
          </div>

          {/* Action buttons: Backup export/import, Reset, Error Test, Add */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Hidden file input for import */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />

            {/* Export JSON Backup */}
            <button
              type="button"
              onClick={handleExportData}
              title="Download a complete JSON backup of your habits and before details"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-indigo-500" />
              <span>Export Backup</span>
            </button>

            {/* Import JSON Backup */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Restore habits from a previously saved JSON backup"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-blue-500" />
              <span>Import Backup</span>
            </button>

            {/* Developer Test Trigger for Simulated Error */}
            <button
              type="button"
              onClick={() => loadHabitsData(true)}
              title="Test error state and retry mechanism"
              className="inline-flex items-center gap-1.5 px-2.5 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>Test Error</span>
            </button>

            {/* Reset to Sample Data */}
            <button
              type="button"
              onClick={handleResetToSampleData}
              title="Reload initial starter sample habits"
              className="inline-flex items-center gap-1.5 px-2.5 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Sample</span>
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

            {/* 7-Day Weekly Progress Strip with Clickable Day Selection */}
            {habits.length > 0 && (
              <WeeklyProgress
                habits={habits}
                selectedDate={selectedDate}
                onSelectDate={(d) => setSelectedDate(d)}
              />
            )}

            {/* History Date Navigation Indicator */}
            {selectedDate !== todayStr && (
              <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between text-xs sm:text-sm text-indigo-900 dark:text-indigo-200">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>
                    Viewing past completion records for <strong>{selectedDateLabel}</strong> ({selectedDate}).
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedDate(todayStr)}
                  className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Today</span>
                </button>
              </div>
            )}

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
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Active Routines ({filteredHabits.length})
                  </h2>
                  <span className="text-xs text-slate-400">
                    • for {selectedDateLabel}
                  </span>
                </div>
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
                      todayStr={selectedDate}
                      onToggleComplete={handleToggleComplete}
                      onDelete={handleDeleteHabit}
                      onViewHistory={(h) => setSelectedHabitForHistory(h)}
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

      {/* Habit Details & Past History Modal */}
      <HabitHistoryModal
        habit={selectedHabitForHistory}
        isOpen={Boolean(selectedHabitForHistory)}
        onClose={() => setSelectedHabitForHistory(null)}
        onToggleDateCompletion={handleToggleSpecificDate}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={userProfile}
        onSaveProfile={handleSaveProfile}
      />
    </div>
  );
};
