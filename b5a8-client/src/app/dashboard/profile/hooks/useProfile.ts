import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  role: string;
  userStatus: boolean;
  roleChangeRequest: string | null;
  profileImage: string | null;
  bio: string | null;
  interests: string[];
  location: string | null;
  createdAt: string;
  updatedAt: string;
  fullName: string;
}

export function useProfile() {
  const router = useRouter();
  const { logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [interests, setInterests] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const result = await authApi.getProfile();
      if (result.error) {
        toast.error(result.error);
      } else if (result.data) {
        const profileData = result.data as UserProfile;
        setProfile(profileData);
        setFirstName(profileData.firstName);
        setLastName(profileData.lastName);
        setEmail(profileData.email);
        setGender(profileData.gender);
        setBio(profileData.bio || "");
        setLocation(profileData.location || "");
        setInterests(profileData.interests.join(", "));
        setProfileImage(profileData.profileImage || "");
      }
    } catch {
      toast.error("Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async () => {
    const emailChanged = email !== profile?.email;

    try {
      const result = await authApi.updateProfile({
        firstName,
        lastName,
        email,
        gender,
        bio: bio || undefined,
        location: location || undefined,
        interests: interests ? interests.split(",").map((i) => i.trim()) : [],
        profileImage: profileImage || undefined,
      });

      if (result.error) {
        toast.error(result.error);
        return false;
      } else {
        toast.success("Profile updated successfully");

        // If email changed, logout user
        if (emailChanged) {
          toast.info("Email changed. Please login again with your new email.");
          await logout();
          router.push("/login");
          return true;
        }

        fetchProfile();
        return true;
      }
    } catch {
      toast.error("Failed to update profile");
      return false;
    }
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return false;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return false;
    }

    try {
      const result = await authApi.changePassword({
        currentPassword,
        newPassword,
      });

      if (result.error) {
        toast.error(result.error);
        return false;
      } else {
        toast.success("Password changed successfully. Please login again.");
        await logout();
        router.push("/login");
        return true;
      }
    } catch {
      toast.error("Failed to change password");
      return false;
    }
  };

  const requestRoleChange = async () => {
    if (!profile || profile.role !== "user") return false;

    try {
      const result = await authApi.requestRoleChange();

      if (result.error) {
        toast.error(result.error);
        return false;
      } else {
        toast.success("Role change request submitted successfully");
        fetchProfile();
        return true;
      }
    } catch {
      toast.error("Failed to submit role change request");
      return false;
    }
  };

  return {
    profile,
    isLoading,
    firstName,
    lastName,
    email,
    gender,
    bio,
    location,
    interests,
    profileImage,
    setFirstName,
    setLastName,
    setEmail,
    setGender,
    setBio,
    setLocation,
    setInterests,
    setProfileImage,
    fetchProfile,
    updateProfile,
    changePassword,
    requestRoleChange,
  };
}
