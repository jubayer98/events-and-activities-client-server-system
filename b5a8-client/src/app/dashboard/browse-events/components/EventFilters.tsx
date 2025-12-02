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
import { FilterOptions } from "../hooks/useBrowseEvents";

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

interface EventFiltersProps {
  filters: FilterOptions;
  onFilterChange: (key: keyof FilterOptions, value: string) => void;
  onReset: () => void;
}

export default function EventFilters({
  filters,
  onFilterChange,
  onReset,
}: EventFiltersProps) {
  return (
    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>

      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search by event name or location..."
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
        />
      </div>

      {/* Type Filter */}
      <div className="space-y-2">
        <Label htmlFor="type">Event Type</Label>
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
        <Label htmlFor="feeStatus">Fee Status</Label>
        <Select
          value={filters.feeStatus}
          onValueChange={(value) => onFilterChange("feeStatus", value)}
        >
          <SelectTrigger id="feeStatus">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Status Filter */}
      <div className="space-y-2">
        <Label htmlFor="status">Event Status</Label>
        <Select
          value={filters.status}
          onValueChange={(value) => onFilterChange("status", value)}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="Full">Full</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <Label htmlFor="sortBy">Sort By</Label>
        <Select
          value={filters.sortBy}
          onValueChange={(value) => onFilterChange("sortBy", value)}
        >
          <SelectTrigger id="sortBy">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-asc">Date (Ascending)</SelectItem>
            <SelectItem value="date-desc">Date (Descending)</SelectItem>
            <SelectItem value="joiningFee-asc">Fee (Low to High)</SelectItem>
            <SelectItem value="joiningFee-desc">Fee (High to Low)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
