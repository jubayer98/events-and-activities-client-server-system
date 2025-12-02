"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import UserControlHeader from "./components/UserControlHeader";
import UsersTable from "./components/UsersTable";
import RoleChangeRequestsTable from "./components/RoleChangeRequestsTable";
import UserControlLoadingSkeleton from "./components/UserControlLoadingSkeleton";
import { useUserControl } from "./hooks/useUserControl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function UserControlPage() {
  const { allUsers, regularUsers, hostUsers, roleChangeRequests, isLoading, refetch } = useUserControl();
  const [activeTab, setActiveTab] = useState("all");

  if (isLoading) {
    return (
      <DashboardLayout>
        <UserControlLoadingSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <UserControlHeader />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All ({allUsers.length})
            </TabsTrigger>
            <TabsTrigger value="users">
              Users ({regularUsers.length})
            </TabsTrigger>
            <TabsTrigger value="hosts">
              Hosts ({hostUsers.length})
            </TabsTrigger>
            <TabsTrigger value="requests">
              Role Requests ({roleChangeRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <UsersTable users={allUsers} emptyMessage="No registered users" onUserUpdated={refetch} />
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <UsersTable users={regularUsers} emptyMessage="No users with 'user' role" onUserUpdated={refetch} />
          </TabsContent>

          <TabsContent value="hosts" className="mt-6">
            <UsersTable users={hostUsers} emptyMessage="No users with 'host' role" onUserUpdated={refetch} />
          </TabsContent>

          <TabsContent value="requests" className="mt-6">
            <RoleChangeRequestsTable data={roleChangeRequests} onRequestUpdated={refetch} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
