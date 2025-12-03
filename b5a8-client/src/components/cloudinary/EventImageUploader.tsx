"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { uploadImageToCloudinary, validateImageFile } from "@/lib/cloudinary/uploadService";
import { toast } from "sonner";

interface EventImageUploaderProps {
  currentImage?: string | null;
  onUploadSuccess: (url: string) => void;
  onUploadStart?: () => void;
  onUploadError?: (error: string) => void;
}

export default function EventImageUploader({
  currentImage,
  onUploadSuccess,
  onUploadStart,
  onUploadError,
}: EventImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validationError = validateImageFile(file);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    handleUpload(file);
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    
    if (onUploadStart) {
      onUploadStart();
    }

    // Upload to 'event_images' folder in Cloudinary
    const result = await uploadImageToCloudinary(file, 'event_images');

    setIsUploading(false);

    if (result.success && result.url) {
      toast.success("Image uploaded successfully!");
      onUploadSuccess(result.url);
    } else {
      toast.error(result.error || "Failed to upload image");
      if (onUploadError) {
        onUploadError(result.error || "Upload failed");
      }
      // Reset preview on error
      setPreview(currentImage || null);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onUploadSuccess("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      {/* Preview Area - Rectangular Cover Style */}
      <div className="flex flex-col gap-4">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
          {preview ? (
            <img
              src={preview}
              alt="Event cover preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <svg
                className="w-16 h-16 text-gray-400 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No event cover image
              </p>
            </div>
          )}
        </div>

        {/* Upload/Remove Buttons */}
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={handleButtonClick}
            disabled={isUploading}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            {isUploading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {preview ? "Change Cover Image" : "Upload Cover Image"}
              </>
            )}
          </Button>

          {preview && !isUploading && (
            <Button
              type="button"
              onClick={handleRemoveImage}
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:border-red-600"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Remove
            </Button>
          )}
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Recommended: 1200x630px or 16:9 aspect ratio. Max size: 5MB
        </p>
      </div>
    </div>
  );
}
