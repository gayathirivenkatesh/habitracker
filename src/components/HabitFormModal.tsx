import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Check } from 'lucide-react';
import type { Category, Frequency, Habit } from '../types/habit';
import { AVAILABLE_ICONS } from '../constants/icons';

interface HabitFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddHabit: (habitData: Omit<Habit, 'id' | 'createdAt' | 'completedDates'>) => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export const HabitFormModal: React.FC<HabitFormModalProps> = ({
  isOpen,
  onClose,
  onAddHabit,
  triggerRef,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('Health');
  const [frequency, setFrequency] = useState<Frequency>('Daily');
  const [icon, setIcon] = useState('Target');
  const [nameError, setNameError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setNameError(null);
    onClose();
    // Restore focus to trigger
    setTimeout(() => {
      triggerRef?.current?.focus();
    }, 50);
  }, [onClose, triggerRef]);

  // Manage focus and keyboard trap
  useEffect(() => {
    if (!isOpen) return;

    // Focus first input on open
    const timer = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 50);

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }

      // Trap focus inside modal
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmedName = name.trim();
    if (!trimmedName) {
      setNameError('Please enter a habit name.');
      firstInputRef.current?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      onAddHabit({
        name: trimmedName,
        description: description.trim() || undefined,
        category,
        frequency,
        icon,
      });

      // Reset form
      setName('');
      setDescription('');
      setCategory('Health');
      setFrequency('Daily');
      setIcon('Target');
      setNameError(null);
      handleClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 id="modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
              Create New Habit
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Add a routine to track your daily or weekly progress.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close dialog"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Name Field */}
          <div>
            <label
              htmlFor="habit-name-input"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1.5"
            >
              Habit Name <span className="text-rose-500" aria-hidden="true">*</span>
            </label>
            <input
              ref={firstInputRef}
              id="habit-name-input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError(null);
              }}
              placeholder="e.g., Morning Meditation, Read 15 mins..."
              aria-required="true"
              aria-invalid={nameError ? 'true' : 'false'}
              aria-describedby={nameError ? 'name-error-msg' : undefined}
              className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-850 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 transition-colors ${
                nameError
                  ? 'border-rose-500 ring-1 ring-rose-500'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            />
            {nameError && (
              <p id="name-error-msg" role="alert" className="text-xs text-rose-500 font-medium mt-1.5">
                {nameError}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="habit-desc-input"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1.5"
            >
              Description <span className="text-slate-400 normal-case font-normal">(optional)</span>
            </label>
            <textarea
              id="habit-desc-input"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add personal notes, specific cues, or your target duration..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 transition-colors resize-none"
            />
          </div>

          {/* Category & Frequency Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="habit-category-select"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1.5"
              >
                Category
              </label>
              <select
                id="habit-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white cursor-pointer"
              >
                <option value="Health">Health</option>
                <option value="Learning">Learning</option>
                <option value="Mindfulness">Mindfulness</option>
                <option value="Productivity">Productivity</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="habit-frequency-select"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1.5"
              >
                Schedule Frequency
              </label>
              <select
                id="habit-frequency-select"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as Frequency)}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white cursor-pointer"
              >
                <option value="Daily">Daily (Every Day)</option>
                <option value="Weekdays">Weekdays (Mon–Fri)</option>
                <option value="Weekly">Weekly (Once a Week)</option>
              </select>
            </div>
          </div>

          {/* Icon Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-2">
              Choose an Icon
            </label>
            <div className="grid grid-cols-6 gap-2" role="radiogroup" aria-label="Icon options">
              {AVAILABLE_ICONS.map((iconKey) => {
                const isSelected = icon === iconKey;
                return (
                  <button
                    key={iconKey}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setIcon(iconKey)}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/30'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-[11px] truncate w-full text-center">{iconKey}</span>
                    {isSelected && <Check className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              {isSubmitting ? 'Creating...' : 'Create Habit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
