/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { userApi } from "@/lib/api";
import { toast } from "sonner";
import { User } from "../components/UsersTable";
import { RoleChangeRequest } from "../components/RoleChangeRequestsTable";

export function useUserControl() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [roleChangeRequests, setRoleChangeRequests] = useState<RoleChangeRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [usersResult, requestsResult] = await Promise.all([
        userApi.getAllUsers(),
        userApi.getRoleChangeRequests(),
      ]);

      // Handle users data
      const usersData = (usersResult.data as any)?.users || usersResult.data;
      const usersArray = Array.isArray(usersData) ? usersData : [];
      setAllUsers(usersArray as User[]);

      // Handle role change requests data
      const requestsData = (requestsResult.data as any)?.requests || requestsResult.data;
      const requestsArray = Array.isArray(requestsData) ? requestsData : [];
      setRoleChangeRequests(requestsArray as RoleChangeRequest[]);
    } catch (error) {
      console.error("Failed to fetch user control data:", error);
      toast.error("Failed to load user data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter users by role
  const regularUsers = allUsers.filter((user) => user.role === "user");
  const hostUsers = allUsers.filter((user) => user.role === "host");

  return {
    allUsers,
    regularUsers,
    hostUsers,
    roleChangeRequests,
    isLoading,
    refetch: fetchData,
  };
}
