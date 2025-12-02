import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { userApi } from "@/lib/api";
import { User } from "./UsersTable";

interface UserActionsProps {
  user: User;
  onUserUpdated: () => void;
}

export default function UserActions({ user, onUserUpdated }: UserActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user.role);

  const handleToggleStatus = async () => {
    setIsLoading(true);
    try {
      const result = await userApi.updateUserStatus(user._id, !user.userStatus);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`User status updated to ${!user.userStatus ? "Active" : "Inactive"}`);
        onUserUpdated();
      }
    } catch (error) {
      toast.error("Failed to update user status");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateRole = async () => {
    setIsLoading(true);
    try {
      const result = await userApi.updateUserRole(user._id, selectedRole);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`User role updated to ${selectedRole}`);
        setShowRoleDialog(false);
        onUserUpdated();
      }
    } catch (error) {
      toast.error("Failed to update user role");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setIsLoading(true);
    try {
      const result = await userApi.deleteUser(user._id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("User deleted successfully");
        setShowDeleteDialog(false);
        onUserUpdated();
      }
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleToggleStatus} disabled={isLoading}>
            {user.userStatus ? "Deactivate User" : "Activate User"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>{user.fullName}</strong>&apos;s account.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Change Role Dialog */}
      <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription>
              Update the role for <strong>{user.fullName}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="role">Select Role</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="host">Host</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRoleDialog(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateRole} disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Role"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
