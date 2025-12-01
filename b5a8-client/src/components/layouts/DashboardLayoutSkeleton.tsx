import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLayoutSkeleton() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar Skeleton */}
      <aside className="hidden md:flex md:w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
        <div className="flex flex-col w-full p-4 space-y-4">
          {/* Logo Skeleton */}
          <div className="flex items-center space-x-2 px-2 py-4">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <Skeleton className="w-32 h-6" />
          </div>

          {/* Navigation Items Skeleton */}
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-md" />
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header Skeleton */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            {/* Mobile Menu + Title */}
            <div className="flex items-center space-x-4">
              <Skeleton className="w-10 h-10 rounded-md md:hidden" />
              <Skeleton className="h-8 w-48" />
            </div>

            {/* User Menu Skeleton */}
            <div className="flex items-center space-x-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="hidden md:block space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Skeleton */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="space-y-6">
            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-3 w-24" />
                </div>
              ))}
            </div>

            {/* Table/List Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
              <Skeleton className="h-6 w-40" />
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="h-8 w-20 rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
