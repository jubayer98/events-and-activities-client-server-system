// Cloudinary configuration
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '',
};

// Validate configuration
export const isCloudinaryConfigured = () => {
  return !!(cloudinaryConfig.cloudName && cloudinaryConfig.uploadPreset);
};
