"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { eventApi } from "@/lib/api";
import { MyEvent } from "@/app/dashboard/my-events/hooks/useMyEvents";

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

interface EventFormData {
  name: string;
  type: string;
  date: string;
  time: string;
  location: string;
  minParticipants: string;
  maxParticipants: string;
  description: string;
  image: string;
  feeStatus: "free" | "paid";
  joiningFee: string;
}

interface UpdateEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: MyEvent | null;
  onEventUpdated?: () => void;
}

export default function UpdateEventDialog({
  open,
  onOpenChange,
  event,
  onEventUpdated,
}: UpdateEventDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    type: "",
    date: "",
    time: "",
    location: "",
    minParticipants: "",
    maxParticipants: "",
    description: "",
    image: "",
    feeStatus: "free",
    joiningFee: "0",
  });

  // Populate form when event changes
  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name,
        type: event.type,
        date: event.date.split("T")[0], // Convert ISO to YYYY-MM-DD
        time: event.time,
        location: event.location,
        minParticipants: event.requiredParticipant.min.toString(),
        maxParticipants: event.requiredParticipant.max.toString(),
        description: event.description || "",
        image: event.image || "",
        feeStatus: event.feeStatus,
        joiningFee: event.joiningFee.toString(),
      });
    }
  }, [event]);

  const handleChange = (field: keyof EventFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Auto-set joining fee to 0 when free is selected
    if (field === "feeStatus" && value === "free") {
      setFormData((prev) => ({ ...prev, joiningFee: "0" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!event) return;

    // Validation
    if (!formData.name.trim()) {
      toast.error("Event name is required");
      return;
    }
    if (!formData.type) {
      toast.error("Event type is required");
      return;
    }
    if (!formData.date) {
      toast.error("Event date is required");
      return;
    }
    if (!formData.time) {
      toast.error("Event time is required");
      return;
    }
    if (!formData.location.trim()) {
      toast.error("Event location is required");
      return;
    }
    if (!formData.minParticipants || parseInt(formData.minParticipants) < 1) {
      toast.error("Minimum participants must be at least 1");
      return;
    }
    if (!formData.maxParticipants || parseInt(formData.maxParticipants) < 1) {
      toast.error("Maximum participants must be at least 1");
      return;
    }
    if (
      parseInt(formData.minParticipants) > parseInt(formData.maxParticipants)
    ) {
      toast.error("Minimum participants cannot be greater than maximum");
      return;
    }
    if (
      formData.feeStatus === "paid" &&
      (!formData.joiningFee || parseFloat(formData.joiningFee) <= 0)
    ) {
      toast.error("Joining fee must be greater than 0 for paid events");
      return;
    }

    setIsLoading(true);
    try {
      const eventData = {
        name: formData.name.trim(),
        type: formData.type,
        date: formData.date,
        time: formData.time,
        location: formData.location.trim(),
        requiredParticipant: {
          min: parseInt(formData.minParticipants),
          max: parseInt(formData.maxParticipants),
        },
        description: formData.description.trim() || undefined,
        image: formData.image.trim() || undefined,
        feeStatus: formData.feeStatus,
        joiningFee: parseFloat(formData.joiningFee),
      };

      const result = await eventApi.updateEvent(event._id, eventData);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Event updated successfully!");
        onOpenChange(false);
        if (onEventUpdated) {
          onEventUpdated();
        }
      }
    } catch (_error) {
      toast.error("Failed to update event");
    } finally {
      setIsLoading(false);
    }
  };

  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Update Event</DialogTitle>
          <DialogDescription>
            Make changes to your event details
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Event Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Event Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Enter event name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>

            {/* Event Type */}
            <div className="space-y-2">
              <Label htmlFor="type">
                Event Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleChange("type", value)}
                required
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">
                  Event Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">
                  Event Time <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleChange("time", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">
                Location <span className="text-red-500">*</span>
              </Label>
              <Input
                id="location"
                placeholder="Enter event location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                required
              />
            </div>

            {/* Participants */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minParticipants">
                  Min Participants <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="minParticipants"
                  type="number"
                  min="1"
                  placeholder="e.g., 5"
                  value={formData.minParticipants}
                  onChange={(e) =>
                    handleChange("minParticipants", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxParticipants">
                  Max Participants <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  min="1"
                  placeholder="e.g., 50"
                  value={formData.maxParticipants}
                  onChange={(e) =>
                    handleChange("maxParticipants", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter event description (optional)"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                type="url"
                placeholder="https://example.com/image.jpg (optional)"
                value={formData.image}
                onChange={(e) => handleChange("image", e.target.value)}
              />
            </div>

            {/* Fee Status */}
            <div className="space-y-3">
              <Label>
                Fee Status <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                value={formData.feeStatus}
                onValueChange={(value) =>
                  handleChange("feeStatus", value as "free" | "paid")
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="free" id="free" />
                  <Label htmlFor="free" className="font-normal cursor-pointer">
                    Free Event
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paid" id="paid" />
                  <Label htmlFor="paid" className="font-normal cursor-pointer">
                    Paid Event
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Joining Fee */}
            {formData.feeStatus === "paid" && (
              <div className="space-y-2">
                <Label htmlFor="joiningFee">
                  Joining Fee ($) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="joiningFee"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="e.g., 25.00"
                  value={formData.joiningFee}
                  onChange={(e) => handleChange("joiningFee", e.target.value)}
                  required
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? "Updating..." : "Update Event"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
