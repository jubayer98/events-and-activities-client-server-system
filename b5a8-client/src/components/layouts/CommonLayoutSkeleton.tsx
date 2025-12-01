import { Skeleton } from "@/components/ui/skeleton";

export default function CommonLayoutSkeleton() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar Skeleton */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo Skeleton */}
            <div className="flex items-center space-x-2">
              <Skeleton className="w-8 h-8 md:w-10 md:h-10 rounded-lg" />
              <Skeleton className="w-32 h-6" />
            </div>

            {/* Desktop Nav Links Skeleton */}
            <div className="hidden md:flex items-center space-x-8">
              <Skeleton className="w-16 h-4" />
              <Skeleton className="w-16 h-4" />
              <Skeleton className="w-16 h-4" />
              <Skeleton className="w-20 h-4" />
            </div>

            {/* Desktop Actions Skeleton */}
            <div className="hidden md:flex items-center space-x-4">
              <Skeleton className="w-20 h-10 rounded-md" />
              <Skeleton className="w-24 h-10 rounded-md" />
            </div>

            {/* Mobile Menu Button Skeleton */}
            <div className="md:hidden">
              <Skeleton className="w-10 h-10 rounded-md" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Skeleton */}
      <main className="grow pt-16 md:pt-20">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Hero Section Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>

          {/* Content Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer Skeleton */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-36" />
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
