export const LoadingSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse" role="status" aria-label="Loading habit data">
      {/* Summary Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded-md" />
              <div className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            </div>
            <div className="h-7 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <div className="h-3 w-16 bg-slate-100 dark:bg-slate-850 rounded-md" />
          </div>
        ))}
      </div>

      {/* Progress Strip Skeleton */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded-md" />
        <div className="grid grid-cols-7 gap-3">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-100 dark:bg-slate-850 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Filter Bar Skeleton */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="h-10 bg-slate-100 dark:bg-slate-850 rounded-xl" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 bg-slate-100 dark:bg-slate-850 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Habit Cards Skeleton */}
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5 flex-1">
              <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-36 bg-slate-200 dark:bg-slate-800 rounded-md" />
                <div className="h-3 w-64 bg-slate-100 dark:bg-slate-850 rounded-md" />
              </div>
            </div>
            <div className="h-9 w-28 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading habit tracker dashboard...</span>
    </div>
  );
};
