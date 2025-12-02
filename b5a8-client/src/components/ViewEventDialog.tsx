/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { eventApi } from "@/lib/api";
import { MyEvent } from "@/app/dashboard/my-events/hooks/useMyEvents";

interface ViewEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventId: string | null;
  onEdit?: (event: MyEvent) => void;
  onDelete?: (eventId: string) => void;
}

export default function ViewEventDialog({
  open,
  onOpenChange,
  eventId,
  onEdit,
  onDelete,
}: ViewEventDialogProps) {
  const [event, setEvent] = useState<MyEvent | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (eventId && open) {
      fetchEventDetails();
    }
  }, [eventId, open]);

  const fetchEventDetails = async () => {
    if (!eventId) return;

    setIsLoading(true);
    try {
      const result = await eventApi.getEventById(eventId);
      if (result.error) {
        toast.error(result.error);
      } else {
        // Handle nested response structure
        const eventData = (result.data as any)?.event || result.data;
        setEvent(eventData);
      }
    } catch (error) {
      toast.error("Failed to load event details");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Full":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "Completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Loading Event Details</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{event.name}</DialogTitle>
          <DialogDescription>Event Details</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            {/* Event Image */}
            {event.image && (
              <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Status and Approval */}
            <div className="flex gap-2">
              <Badge className={getStatusColor(event.status)}>
                {event.status}
              </Badge>
              {event.approvalStatus ? (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  Approved
                </Badge>
              ) : (
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                  Pending Approval
                </Badge>
              )}
            </div>

            <Separator />

            {/* Event Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Event Type
                </h4>
                <p className="text-base font-medium">{event.type}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Fee Status
                </h4>
                <p className="text-base font-medium">
                  {event.feeStatus === "free" ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    <span>${event.joiningFee}</span>
                  )}
                </p>
              </div>
            </div>

            <Separator />

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Date
                </h4>
                <p className="text-base font-medium">{formatDate(event.date)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Time
                </h4>
                <p className="text-base font-medium">{event.time}</p>
              </div>
            </div>

            <Separator />

            {/* Location */}
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Location
              </h4>
              <p className="text-base font-medium">{event.location}</p>
            </div>

            <Separator />

            {/* Participants */}
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Participants
              </h4>
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-2xl font-bold">{event.currentParticipants}</span>
                  <span className="text-gray-500"> / {event.requiredParticipant.max}</span>
                </div>
                <div className="text-sm text-gray-500">
                  (Minimum: {event.requiredParticipant.min})
                </div>
              </div>
            </div>

            {/* Description */}
            {event.description && (
              <>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Description
                  </h4>
                  <p className="text-base text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {event.description}
                  </p>
                </div>
              </>
            )}

            <Separator />

            {/* Timestamps */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
              <div>
                <span className="font-medium">Created:</span>{" "}
                {new Date(event.createdAt).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Updated:</span>{" "}
                {new Date(event.updatedAt).toLocaleDateString()}
              </div>
            </div>

            {/* Close Button */}
            <div className="flex gap-3 pt-4">
              {onEdit && event.status === "Open" && (
                <Button
                  variant="default"
                  onClick={() => {
                    onOpenChange(false);
                    onEdit(event);
                  }}
                  className="flex-1"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit Event
                </Button>
              )}
              {onDelete && event.status === "Open" && (
                <Button
                  variant="destructive"
                  onClick={() => {
                    onOpenChange(false);
                    onDelete(event._id);
                  }}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className={onEdit || onDelete ? "" : "w-full"}
              >
                Close
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
