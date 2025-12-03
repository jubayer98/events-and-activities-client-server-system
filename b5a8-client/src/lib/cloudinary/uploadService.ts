import { cloudinaryConfig } from './config';

interface UploadResponse {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Upload image directly to Cloudinary from Next.js
 * @param file - Image file to upload
 * @param folder - Optional folder name (e.g., 'user_profiles', 'event_images')
 * @returns Promise with upload result containing URL or error
 */
export const uploadImageToCloudinary = async (
  file: File,
  folder: string = 'user_profiles'
): Promise<UploadResponse> => {
  try {
    // Validate file
    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return { success: false, error: 'Please select an image file' };
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return { success: false, error: 'Image size must be less than 5MB' };
    }

    // Validate Cloudinary config
    if (!cloudinaryConfig.cloudName || !cloudinaryConfig.uploadPreset) {
      return {
        success: false,
        error: 'Cloudinary is not configured. Please check your environment variables.',
      };
    }

    // Create FormData for Cloudinary upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryConfig.uploadPreset);
    formData.append('folder', folder);

    // Upload directly to Cloudinary
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`;
    
    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error?.message || 'Failed to upload image to Cloudinary',
      };
    }

    const data = await response.json();
    
    return {
      success: true,
      url: data.secure_url,
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload image',
    };
  }
};

/**
 * Validate image file before upload
 * @param file - File to validate
 * @returns Error message if invalid, null if valid
 */
export const validateImageFile = (file: File): string | null => {
  if (!file) {
    return 'No file selected';
  }

  if (!file.type.startsWith('image/')) {
    return 'Please select an image file';
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return 'Image size must be less than 5MB';
  }

  return null;
};

