import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FilterOptions } from "../hooks/usePublicEvents";
import { Card, CardContent } from "@/components/ui/card";

const EVENT_TYPES = [
  "Cultural",
  "Travel",
  "Sports",
  "Business",
  "Conference",
  "Workshop",
  "Family",
  "Exhibition",
  "Training",
  "Tour",
  "Food",
  "Networking",
] as const;

interface EventsFiltersProps {
  filters: FilterOptions;
  onFilterChange: (key: keyof FilterOptions, value: string) => void;
  onReset: () => void;
}

export default function EventsFilters({
  filters,
  onFilterChange,
  onReset,
}: EventsFiltersProps) {
  return (
    <Card className="sticky top-4">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </h2>
            <Button variant="ghost" size="sm" onClick={onReset} className="text-blue-600 hover:text-blue-700">
              Reset All
            </Button>
          </div>

          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search" className="text-sm font-semibold">
              Search Events
            </Label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <Input
                id="search"
                placeholder="Search by name or location..."
                value={filters.search}
                onChange={(e) => onFilterChange("search", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="h-px bg-gray-200 dark:bg-gray-700" />

          {/* Type Filter */}
          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-semibold">
              Event Type
            </Label>
            <Select
              value={filters.type}
              onValueChange={(value) => onFilterChange("type", value)}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {EVENT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Fee Status Filter */}
          <div className="space-y-2">
            <Label htmlFor="feeStatus" className="text-sm font-semibold">
              Price
            </Label>
            <Select
              value={filters.feeStatus}
              onValueChange={(value) => onFilterChange("feeStatus", value)}
            >
              <SelectTrigger id="feeStatus">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="free">Free Events</SelectItem>
                <SelectItem value="paid">Paid Events</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-semibold">
              Availability
            </Label>
            <Select
              value={filters.status}
              onValueChange={(value) => onFilterChange("status", value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="Open">Available</SelectItem>
                <SelectItem value="Full">Full</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="h-px bg-gray-200 dark:bg-gray-700" />

          {/* Sort By */}
          <div className="space-y-2">
            <Label htmlFor="sortBy" className="text-sm font-semibold">
              Sort By
            </Label>
            <Select
              value={filters.sortBy}
              onValueChange={(value) => onFilterChange("sortBy", value)}
            >
              <SelectTrigger id="sortBy">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-asc">Date (Soonest First)</SelectItem>
                <SelectItem value="date-desc">Date (Latest First)</SelectItem>
                <SelectItem value="joiningFee-asc">Price (Low to High)</SelectItem>
                <SelectItem value="joiningFee-desc">Price (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
