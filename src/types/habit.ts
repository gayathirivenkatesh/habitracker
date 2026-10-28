export type Frequency = 'Daily' | 'Weekdays' | 'Weekly';
export type Category = 'Health' | 'Learning' | 'Mindfulness' | 'Productivity';

export interface Habit {
  id: string;
  name: string;
  description?: string;
  category: Category;
  frequency: Frequency;
  icon?: string;
  createdAt: string; // ISO date string
  completedDates: string[]; // array of YYYY-MM-DD strings
}

export type SortOption = 'name-asc' | 'name-desc' | 'status' | 'frequency';
export type StatusFilter = 'all' | 'completed' | 'pending';
