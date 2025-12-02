"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ProfileHeader from "./components/ProfileHeader";
import PersonalInfoCard from "./components/PersonalInfoCard";
import AccountInfoCard from "./components/AccountInfoCard";
import PasswordChangeCard from "./components/PasswordChangeCard";
import { useProfile } from "./hooks/useProfile";

export default function ProfilePage() {
  const {
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
  } = useProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isRequestingRoleChange, setIsRequestingRoleChange] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const success = await updateProfile();
    setIsSaving(false);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleChangePassword = async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    setIsChangingPassword(true);
    await changePassword(currentPassword, newPassword, confirmPassword);
    setIsChangingPassword(false);
  };

  const handleRequestRoleChange = async () => {
    setIsRequestingRoleChange(true);
    await requestRoleChange();
    setIsRequestingRoleChange(false);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Failed to load profile</p>
          <Button onClick={fetchProfile} className="mt-4">
            Retry
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ProfileHeader />

        <PersonalInfoCard
          isEditing={isEditing}
          isSaving={isSaving}
          firstName={firstName}
          lastName={lastName}
          email={email}
          gender={gender}
          location={location}
          profileImage={profileImage}
          interests={interests}
          bio={bio}
          onEdit={() => setIsEditing(true)}
          onCancel={() => setIsEditing(false)}
          onSubmit={handleUpdateProfile}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setEmail={setEmail}
          setGender={setGender}
          setLocation={setLocation}
          setProfileImage={setProfileImage}
          setInterests={setInterests}
          setBio={setBio}
        />

        <AccountInfoCard
          profile={profile}
          isRequestingRoleChange={isRequestingRoleChange}
          onRequestRoleChange={handleRequestRoleChange}
        />

        <PasswordChangeCard
          isChangingPassword={isChangingPassword}
          onSubmit={handleChangePassword}
        />
      </div>
    </DashboardLayout>
  );
}
