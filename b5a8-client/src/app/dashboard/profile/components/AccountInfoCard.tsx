import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface UserProfile {
  role: string;
  userStatus: boolean;
  roleChangeRequest: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AccountInfoCardProps {
  profile: UserProfile;
  isRequestingRoleChange: boolean;
  onRequestRoleChange: () => void;
}

export default function AccountInfoCard({
  profile,
  isRequestingRoleChange,
  onRequestRoleChange,
}: AccountInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>View your account details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
            <Badge variant="outline" className="mt-1 capitalize">
              {profile.role}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Account Status</p>
            <Badge variant={profile.userStatus ? "default" : "destructive"} className="mt-1">
              {profile.userStatus ? "Active" : "Inactive"}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
            <p className="font-medium">
              {new Date(profile.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
            <p className="font-medium">
              {new Date(profile.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Role Change Request - Only for regular users */}
        {profile.role === "user" && (
          <>
            <Separator className="my-4" />
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Role Change Request</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Request to become a host and start creating events
                </p>
              </div>
              {profile.roleChangeRequest ? (
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Request Pending</Badge>
                  <p className="text-sm text-gray-500">
                    Your role change request is under review
                  </p>
                </div>
              ) : (
                <Button
                  onClick={onRequestRoleChange}
                  disabled={isRequestingRoleChange}
                  variant="outline"
                >
                  {isRequestingRoleChange ? "Submitting..." : "Request Host Role"}
                </Button>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
