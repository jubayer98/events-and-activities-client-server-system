import { Button } from "@/components/ui/button";

interface BrowseEventsHeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

export default function BrowseEventsHeader({
  onRefresh,
  isRefreshing,
}: BrowseEventsHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-2">Browse Events</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover and join exciting events happening around you
        </p>
      </div>
      <Button
        onClick={onRefresh}
        disabled={isRefreshing}
        variant="outline"
        size="sm"
      >
        <svg
          className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        {isRefreshing ? "Refreshing..." : "Refresh"}
      </Button>
    </div>
  );
}
