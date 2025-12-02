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
import { Event } from "../hooks/useEventControl";
import ViewEventDialog from "@/components/ViewEventDialog";

interface EventsTableProps {
  events: Event[];
  onEventUpdated: () => void;
  showApproveAction?: boolean;
}

export default function EventsTable({
  events,
  onEventUpdated,
  showApproveAction = false,
}: EventsTableProps) {
  const [viewEventId, setViewEventId] = useState<string | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);
  const [approveEventId, setApproveEventId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const handleView = (eventId: string) => {
    setViewEventId(eventId);
    setIsViewDialogOpen(true);
  };

  const handleApprove = async () => {
    if (!approveEventId) return;

    setIsApproving(true);
    try {
      const result = await eventApi.approveEvent(approveEventId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Event approved successfully");
        setApproveEventId(null);
        onEventUpdated();
      }
    } catch (_error) {
      toast.error("Failed to approve event");
    } finally {
      setIsApproving(false);
    }
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
    } catch (_error) {
      toast.error("Failed to delete event");
    } finally {
      setIsDeleting(false);
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

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Status</TableHead>
              {!showApproveAction && <TableHead>Approval</TableHead>}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={showApproveAction ? 8 : 9}
                  className="text-center py-8 text-gray-500"
                >
                  No events found
                </TableCell>
              </TableRow>
            ) : (
              events.map((event) => (
                <TableRow key={event._id}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>{event.type}</TableCell>
                  <TableCell>{formatDate(event.date)}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    {event.currentParticipants} / {event.requiredParticipant.max}
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
                  {!showApproveAction && (
                    <TableCell>{getApprovalBadge(event.approvalStatus)}</TableCell>
                  )}
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
                        <DropdownMenuItem onClick={() => handleView(event._id)}>
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
                        {showApproveAction && (
                          <DropdownMenuItem
                            onClick={() => setApproveEventId(event._id)}
                            className="text-green-600 focus:text-green-600"
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
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Approve Event
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => setDeleteEventId(event._id)}
                          className="text-red-600 focus:text-red-600"
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
                          {showApproveAction ? "Reject Event" : "Delete Event"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Event Dialog */}
      <ViewEventDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        eventId={viewEventId}
      />

      {/* Approve Confirmation Dialog */}
      {showApproveAction && (
        <AlertDialog
          open={!!approveEventId}
          onOpenChange={() => setApproveEventId(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Approve Event</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to approve this event? It will become visible
                to all users.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleApprove}
                disabled={isApproving}
                className="bg-green-600 hover:bg-green-700"
              >
                {isApproving ? "Approving..." : "Approve"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteEventId}
        onOpenChange={() => setDeleteEventId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {showApproveAction ? "Reject Event" : "Delete Event"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {showApproveAction ? "reject" : "delete"}{" "}
              this event? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting
                ? showApproveAction
                  ? "Rejecting..."
                  : "Deleting..."
                : showApproveAction
                ? "Reject"
                : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
