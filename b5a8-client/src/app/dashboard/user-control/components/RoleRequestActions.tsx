import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { userApi } from "@/lib/api";
import { RoleChangeRequest } from "./RoleChangeRequestsTable";

interface RoleRequestActionsProps {
  request: RoleChangeRequest;
  onRequestUpdated: () => void;
}

export default function RoleRequestActions({
  request,
  onRequestUpdated,
}: RoleRequestActionsProps) {
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      const result = await userApi.updateUserRole(request._id, request.roleChangeRequest);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Role change approved. User is now a ${request.roleChangeRequest}`);
        setShowApproveDialog(false);
        onRequestUpdated();
      }
    } catch (error) {
      toast.error("Failed to approve role change");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="default"
        onClick={() => setShowApproveDialog(true)}
        disabled={isLoading}
      >
        Approve
      </Button>

      {/* Approve Dialog */}
      <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Role Change</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve <strong>{request.fullName}</strong>&apos;s
              request to become a <strong className="capitalize">{request.roleChangeRequest}</strong>?
              This will change their role from{" "}
              <strong className="capitalize">{request.role}</strong> to{" "}
              <strong className="capitalize">{request.roleChangeRequest}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleApprove} disabled={isLoading}>
              {isLoading ? "Approving..." : "Approve"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
