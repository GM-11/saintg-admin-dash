import React from "react";
import { Upload, X } from "lucide-react";

interface PhotoUploaderProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
}

const PhotoUploader = ({ photos, onPhotosChange }: PhotoUploaderProps) => {
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // In a real application, you would upload these files to your backend
    // For now, we'll create object URLs for preview
    const newPhotos = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    );
    onPhotosChange([...photos, ...newPhotos]);
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    onPhotosChange(newPhotos);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">Photos</label>
      <div className="grid grid-cols-4 gap-4">
        <label className="aspect-square bg-gray-800 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 border-2 border-dashed border-gray-600 hover:border-purple-600 transition-colors">
          <Upload size={24} className="text-gray-400" />
          <span className="text-sm mt-2 text-gray-400">Click to upload</span>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
          />
        </label>
        {photos.map((photo, index) => (
          <div key={index} className="aspect-square relative group">
            <img
              src={photo}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => handleRemovePhoto(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} className="text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoUploader;
