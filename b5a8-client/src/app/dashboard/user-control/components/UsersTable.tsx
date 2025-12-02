import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "../utils/dateFormatter";
import UserActions from "./UserActions";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  role: string;
  userStatus: boolean;
  roleChangeRequest: string | null;
  profileImage: string | null;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  id: string;
}

interface UsersTableProps {
  users: User[];
  emptyMessage?: string;
  onUserUpdated?: () => void;
}

export default function UsersTable({ 
  users, 
  emptyMessage = "No users found",
  onUserUpdated 
}: UsersTableProps) {
  if (users.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold mb-2">{emptyMessage}</h3>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="capitalize">{user.gender}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.userStatus ? "default" : "destructive"}>
                      {user.userStatus ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {formatDate(user.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    {onUserUpdated && (
                      <UserActions user={user} onUserUpdated={onUserUpdated} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
