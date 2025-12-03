import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { eventApi } from "@/lib/api";
import { MyEvent } from "../hooks/useMyEvents";
import UpdateEventDialog from "@/components/UpdateEventDialog";
import ViewEventDialog from "@/components/ViewEventDialog";
import EventBookingsDialog from "./EventBookingsDialog";

interface MyEventsTableProps {
  events: MyEvent[];
  onEventUpdated: () => void;
}

export default function MyEventsTable({ events, onEventUpdated }: MyEventsTableProps) {
  const [selectedEvent, setSelectedEvent] = useState<MyEvent | null>(null);
  const [viewEventId, setViewEventId] = useState<string | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusChangeEvent, setStatusChangeEvent] = useState<{ id: string; newStatus: string } | null>(null);
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const [bookingsEvent, setBookingsEvent] = useState<{ id: string; name: string } | null>(null);

  const handleView = (event: MyEvent) => {
    setViewEventId(event._id);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (event: MyEvent) => {
    setSelectedEvent(event);
    setIsUpdateDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteEventId) return;

    setIsDeleting(true);
    try {
      const result = await eventApi.deleteEvent(deleteEventId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Event deleted successfully");
        setDeleteEventId(null);
        onEventUpdated();
      }
    } catch (error) {
      toast.error("Failed to delete event");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async () => {
    if (!statusChangeEvent) return;

    setIsChangingStatus(true);
    try {
      const result = await eventApi.updateEventStatus(
        statusChangeEvent.id,
        statusChangeEvent.newStatus
      );
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Event status changed to ${statusChangeEvent.newStatus}`);
        setStatusChangeEvent(null);
        onEventUpdated();
      }
    } catch (error) {
      toast.error("Failed to change event status");
    } finally {
      setIsChangingStatus(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
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

  const getApprovalBadge = (approved: boolean) => {
    if (approved) {
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
          Approved
        </Badge>
      );
    }
    return (
      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
        Pending
      </Badge>
    );
  };

  // Check if event can be edited/deleted (only Open events with approvalStatus true)
  const canModifyEvent = (event: MyEvent) => {
    return event.status === "Open";
  };

  // Get available status changes based on current status
  const getAvailableStatusChanges = (currentStatus: string) => {
    if (currentStatus === "Open") {
      return ["Completed", "Cancelled"];
    }
    if (currentStatus === "Full") {
      return ["Completed"];
    }
    return [];
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Approval</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event._id}>
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell>{event.type}</TableCell>
                <TableCell>{formatDate(event.date)}</TableCell>
                <TableCell>{event.time}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>
                  {event.currentParticipants} / {event.requiredParticipant.max}
                  <span className="text-xs text-gray-500 ml-1">
                    (min: {event.requiredParticipant.min})
                  </span>
                </TableCell>
                <TableCell>
                  {event.feeStatus === "free" ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    <span className="font-medium">${event.joiningFee}</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                </TableCell>
                <TableCell>{getApprovalBadge(event.approvalStatus)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {event.approvalStatus && (
                        <DropdownMenuItem onClick={() => handleView(event)}>
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
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          View Details
                        </DropdownMenuItem>
                      )}
                      {event.approvalStatus && (
                        <DropdownMenuItem 
                          onClick={() => setBookingsEvent({ id: event._id, name: event.name })}
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
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          View Bookings
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => handleEdit(event)}
                        disabled={!canModifyEvent(event)}
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
                      </DropdownMenuItem>
                      {getAvailableStatusChanges(event.status).map((newStatus) => (
                        <DropdownMenuItem
                          key={newStatus}
                          onClick={() => setStatusChangeEvent({ id: event._id, newStatus })}
                          className="text-blue-600 focus:text-blue-600"
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
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Mark as {newStatus}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuItem
                        onClick={() => setDeleteEventId(event._id)}
                        className="text-red-600 focus:text-red-600"
                        disabled={!canModifyEvent(event)}
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
                        Delete Event
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Update Event Dialog */}
      <UpdateEventDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        event={selectedEvent}
        onEventUpdated={onEventUpdated}
      />

      {/* View Event Dialog */}
      <ViewEventDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        eventId={viewEventId}
        onEdit={(event) => {
          setSelectedEvent(event);
          setIsUpdateDialogOpen(true);
        }}
        onDelete={(eventId) => {
          setDeleteEventId(eventId);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteEventId} onOpenChange={() => setDeleteEventId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Status Change Confirmation Dialog */}
      <AlertDialog
        open={!!statusChangeEvent}
        onOpenChange={() => setStatusChangeEvent(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Event Status</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change the event status to{" "}
              <strong>{statusChangeEvent?.newStatus}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleStatusChange}
              disabled={isChangingStatus}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isChangingStatus ? "Changing..." : "Change Status"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Event Bookings Dialog */}
      <EventBookingsDialog
        open={!!bookingsEvent}
        onOpenChange={() => setBookingsEvent(null)}
        eventId={bookingsEvent?.id || null}
        eventName={bookingsEvent?.name || null}
      />
    </div>
  );
}
