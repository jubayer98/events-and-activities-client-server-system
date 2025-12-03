"use client";

import { useState } from "react";
import ImageUploader from "./ImageUploader";
import { authApi } from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileImageUploaderProps {
  currentImage?: string | null;
  profileImage?: string | null;
  onUpdateSuccess?: () => void;
}

export default function ProfileImageUploader({
  currentImage,
  onUpdateSuccess,
}: ProfileImageUploaderProps) {
  const { user, setUser } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUploadSuccess = async (imageUrl: string) => {
    setIsUpdating(true);

    try {
      // Update profile with new image URL
      const result = await authApi.updateProfile({
        profileImage: imageUrl,
      });

      if (result.error) {
        toast.error(result.error);
      } else {
        // Update user context with new profile image
        if (user) {
          setUser({
            ...user,
            profileImage: imageUrl,
          });
        }
        
        toast.success("Profile image updated successfully!");
        
        if (onUpdateSuccess) {
          onUpdateSuccess();
        }
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile image");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUploadStart = () => {
    setIsUpdating(true);
  };

  const handleUploadError = () => {
    setIsUpdating(false);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Profile Image
      </label>
      
      <ImageUploader
        currentImage={currentImage}
        onUploadSuccess={handleUploadSuccess}
        onUploadStart={handleUploadStart}
        onUploadError={handleUploadError}
      />

      {isUpdating && (
        <p className="text-xs text-blue-600 dark:text-blue-400 text-center">
          Updating your profile...
        </p>
      )}
    </div>
  );
}
