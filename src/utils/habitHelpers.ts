import type { Habit, SortOption, StatusFilter } from '../types/habit';

export const formatDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const getTodayString = (): string => {
  return formatDate(new Date());
};

export const isCompletedToday = (habit: Habit, todayStr: string = getTodayString()): boolean => {
  return habit.completedDates.includes(todayStr);
};

export const calculateStreak = (habit: Habit, todayStr: string = getTodayString()): number => {
  if (!habit.completedDates || habit.completedDates.length === 0) return 0;

  const completedSet = new Set(habit.completedDates);
  let streak = 0;
  const current = new Date();

  // If completed today, count today and go backwards
  const isDoneToday = completedSet.has(todayStr);
  const startOffset = isDoneToday ? 0 : 1;

  for (let i = startOffset; i < 365; i++) {
    const d = new Date(current);
    d.setDate(current.getDate() - i);
    const dateStr = formatDate(d);

    if (completedSet.has(dateStr)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

export interface DayProgress {
  dateStr: string;
  dayShort: string;
  dayNumber: number;
  completedCount: number;
  totalHabits: number;
  percentage: number;
  isToday: boolean;
}

export const getLast7DaysProgress = (habits: Habit[]): DayProgress[] => {
  const result: DayProgress[] = [];
  const todayStr = getTodayString();
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = formatDate(d);
    const dayShort = d.toLocaleDateString(undefined, { weekday: 'short' });
    const dayNumber = d.getDate();

    const activeHabits = habits.filter(h => {
      // Check if habit was created on or before this day
      return !h.createdAt || h.createdAt.slice(0, 10) <= dateStr;
    });

    const totalHabits = activeHabits.length > 0 ? activeHabits.length : habits.length;
    const completedCount = activeHabits.filter(h => h.completedDates.includes(dateStr)).length;
    const percentage = totalHabits > 0 ? Math.round((completedCount / totalHabits) * 100) : 0;

    result.push({
      dateStr,
      dayShort,
      dayNumber,
      completedCount,
      totalHabits,
      percentage,
      isToday: dateStr === todayStr,
    });
  }

  return result;
};

export const calculateSummaryStats = (habits: Habit[]) => {
  const todayStr = getTodayString();
  const total = habits.length;
  const completedToday = habits.filter(h => isCompletedToday(h, todayStr)).length;
  const completionRate = total > 0 ? Math.round((completedToday / total) * 100) : 0;
  
  let bestStreak = 0;
  for (const h of habits) {
    const s = calculateStreak(h, todayStr);
    if (s > bestStreak) bestStreak = s;
  }

  return {
    total,
    completedToday,
    completionRate,
    bestStreak,
  };
};

export const filterHabits = (
  habits: Habit[],
  query: string,
  category: string,
  status: StatusFilter,
  frequency: string,
  todayStr: string = getTodayString(),
): Habit[] => {
  const cleanQuery = query.trim().toLowerCase();

  return habits.filter(habit => {
    // Search match
    if (cleanQuery) {
      const matchName = habit.name.toLowerCase().includes(cleanQuery);
      const matchDesc = habit.description ? habit.description.toLowerCase().includes(cleanQuery) : false;
      if (!matchName && !matchDesc) return false;
    }

    // Category filter
    if (category !== 'all' && habit.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }

    // Frequency filter
    if (frequency !== 'all' && habit.frequency.toLowerCase() !== frequency.toLowerCase()) {
      return false;
    }

    // Status filter
    if (status !== 'all') {
      const isDone = isCompletedToday(habit, todayStr);
      if (status === 'completed' && !isDone) return false;
      if (status === 'pending' && isDone) return false;
    }

    return true;
  });
};

export const sortHabits = (habits: Habit[], sortBy: SortOption, todayStr: string = getTodayString()): Habit[] => {
  const sorted = [...habits];

  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'status': {
      // Pending first, then completed (or completed first)
      return sorted.sort((a, b) => {
        const aDone = isCompletedToday(a, todayStr) ? 1 : 0;
        const bDone = isCompletedToday(b, todayStr) ? 1 : 0;
        return aDone - bDone;
      });
    }
    case 'frequency': {
      const order: Record<string, number> = { Daily: 1, Weekdays: 2, Weekly: 3 };
      return sorted.sort((a, b) => (order[a.frequency] || 4) - (order[b.frequency] || 4));
    }
    default:
      return sorted;
  }
};

export const createNewHabitRecord = (
  habitData: Omit<Habit, 'id' | 'createdAt' | 'completedDates'>
): Habit => {
  return {
    ...habitData,
    id: `habit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    completedDates: [],
  };
};

