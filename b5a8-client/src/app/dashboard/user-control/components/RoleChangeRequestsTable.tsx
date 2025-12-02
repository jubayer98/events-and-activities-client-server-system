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
import RoleRequestActions from "./RoleRequestActions";

export interface RoleChangeRequest {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  role: string;
  userStatus: boolean;
  roleChangeRequest: string;
  profileImage: string | null;
  bio: string | null;
  interests: string[];
  location: string | null;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  id: string;
}

interface RoleChangeRequestsTableProps {
  data: RoleChangeRequest[];
  onRequestUpdated?: () => void;
}

export default function RoleChangeRequestsTable({ data, onRequestUpdated }: RoleChangeRequestsTableProps) {
  if (!data || data.length === 0) {
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-lg font-semibold mb-2">No role change requests</h3>
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
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Current Role</TableHead>
                <TableHead>Requested Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested On</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((request) => (
                <TableRow key={request._id}>
                  <TableCell className="font-medium">{request.fullName}</TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {request.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {request.roleChangeRequest}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default" className="capitalize">
                      Pending
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {formatDate(request.updatedAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    {onRequestUpdated && (
                      <RoleRequestActions
                        request={request}
                        onRequestUpdated={onRequestUpdated}
                      />
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
