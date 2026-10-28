import React from 'react';
import {
  Droplets,
  BookOpen,
  Sparkles,
  Flame,
  Dumbbell,
  Calendar,
  Sun,
  Heart,
  Coffee,
  CheckCircle2,
  Clock,
  Compass,
  Smile,
  Music,
  Code,
  Target,
  type LucideIcon,
} from 'lucide-react';
import type { Category } from '../types/habit';

const iconMap: Record<string, LucideIcon> = {
  Droplets,
  BookOpen,
  Sparkles,
  Flame,
  Dumbbell,
  Calendar,
  Sun,
  Heart,
  Coffee,
  CheckCircle2,
  Clock,
  Compass,
  Smile,
  Music,
  Code,
  Target,
};

import { AVAILABLE_ICONS } from '../constants/icons';
export { AVAILABLE_ICONS };

interface HabitIconProps {
  name?: string;
  category?: Category;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const HabitIcon: React.FC<HabitIconProps> = ({
  name = 'Target',
  category = 'Health',
  className = '',
  size = 'md',
}) => {
  const IconComponent = iconMap[name] || Target;

  const sizeClasses = {
    sm: 'w-7 h-7 p-1.5',
    md: 'w-10 h-10 p-2.5',
    lg: 'w-12 h-12 p-3',
  }[size];

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }[size];

  // Category-based colors
  const categoryStyles: Record<Category, string> = {
    Health: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/40',
    Learning: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200/60 dark:border-blue-800/40',
    Mindfulness: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400 border-purple-200/60 dark:border-purple-800/40',
    Productivity: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/40',
  };

  return (
    <div
      className={`inline-flex items-center justify-center rounded-xl border ${categoryStyles[category] || categoryStyles.Health} ${sizeClasses} ${className}`}
      aria-hidden="true"
    >
      <IconComponent className={iconSizes} />
    </div>
  );
};
