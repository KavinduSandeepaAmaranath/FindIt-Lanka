import { useState, useRef, useEffect } from "react";
import { FiX, FiUploadCloud, FiTrash2 } from "react-icons/fi";

function ChangePhotoModal({
  isOpen,
  onClose,
  currentPhoto,
  onPhotoChange,
}) {
  const [preview, setPreview] = useState(currentPhoto);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setPreview(currentPhoto);
      setError("");
      setIsDragging(false);
    }
  }, [isOpen, currentPhoto]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleProcessFile = (file) => {
    setError("");
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setError("Please select a valid JPG or PNG image.");
      return;
    }

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleRemovePhoto = () => {
    setPreview(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = () => {
    onPhotoChange(preview);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border-[3px] border-[#1e3a8a] shadow-2xl p-6 sm:p-7 max-w-[420px] w-full relative animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full text-slate-400 hover:bg-red-500 hover:text-white hover:scale-105 transition-all duration-200 cursor-pointer"
          aria-label="Close"
        >
          <FiX className="w-4 h-4" />
        </button>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900">
          Change Profile Photo
        </h3>

        {/* Current / Preview Photo */}
        <div className="flex justify-center mt-3 mb-4">
          {preview ? (
            <img
              src={preview}
              alt="Profile preview"
              className="w-20 h-20 rounded-full object-cover border-2 border-slate-100 shadow-sm"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-slate-200 border-2 border-slate-100 flex items-center justify-center text-slate-400 text-xs font-medium shadow-sm">
              No Photo
            </div>
          )}
        </div>

        {/* Upload section */}
        <div>
          <p className="text-xs font-semibold text-slate-700 mb-2">
            Upload a new photo
          </p>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-5 text-center transition-all ${
              isDragging
                ? "border-blue-500 bg-blue-50/50"
                : "border-blue-200 bg-blue-50/20 hover:bg-blue-50/40"
            }`}
          >
            <FiUploadCloud className="w-8 h-8 text-blue-500 mx-auto mb-1.5" />
            <p className="text-xs text-slate-600 font-medium">
              Drag and drop your photo here
            </p>
            <p className="text-[11px] text-slate-400 my-1">or</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50 text-xs font-semibold transition cursor-pointer"
            >
              Browse Files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>

          <p className="text-[11px] text-slate-400 mt-2">
            Supported formats: JPG, PNG (Max: 5MB)
          </p>

          {error && (
            <p className="text-xs text-red-500 font-medium mt-1.5">{error}</p>
          )}

          <button
            type="button"
            onClick={handleRemovePhoto}
            className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-600 transition cursor-pointer"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
            <span>Remove Photo</span>
          </button>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <FiX className="w-3.5 h-3.5" />
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold transition shadow-sm cursor-pointer"
          >
            Change Photo
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePhotoModal;
