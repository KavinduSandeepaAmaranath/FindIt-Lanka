import { useState, useRef } from "react";
import SectionTitle from "./SectionTitle";
import { FiUploadCloud, FiImage, FiX, FiStar, FiAlertCircle, FiCheck } from "react-icons/fi";

const UploadImages = ({
  formData,
  formValues,
  setFormValues,
}) => {
  const Icon = formData.sections.upload?.icon || FiImage;
  const isFound = formData.type === "found";
  const upload = formData.upload || {
    maxImages: 10,
    maxFileSize: 5,
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
  };

  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadNotice, setUploadNotice] = useState(null);

  // We maintain preview objects paired with the actual files
  const previews = formValues.imagePreviews || [];

  const handleFiles = (incomingFiles) => {
    if (!incomingFiles || incomingFiles.length === 0) return;

    const fileList = Array.from(incomingFiles);
    const validFiles = [];
    const newPreviews = [];
    let notice = null;

    const currentCount = previews.length;
    const remainingSlots = upload.maxImages - currentCount;

    if (remainingSlots <= 0) {
      setUploadNotice(`Maximum of ${upload.maxImages} images already reached.`);
      return;
    }

    const filesToProcess = fileList.slice(0, remainingSlots);

    for (const file of filesToProcess) {
      // Type validation
      if (
        upload.acceptedTypes &&
        !upload.acceptedTypes.includes(file.type) &&
        !file.type.startsWith("image/")
      ) {
        notice = "Only JPG, PNG and WebP images are accepted.";
        continue;
      }

      // Size validation
      if (file.size > upload.maxFileSize * 1024 * 1024) {
        notice = `Some files exceeded the maximum limit of ${upload.maxFileSize}MB.`;
        continue;
      }

      validFiles.push(file);
      newPreviews.push({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        url: URL.createObjectURL(file),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        file,
      });
    }

    if (fileList.length > remainingSlots) {
      notice = `Only ${remainingSlots} more image(s) could be added (max ${upload.maxImages}).`;
    }

    if (validFiles.length > 0) {
      setFormValues((prev) => ({
        ...prev,
        images: [...prev.images, ...validFiles],
        imagePreviews: [...(prev.imagePreviews || []), ...newPreviews],
      }));
    }

    if (notice) {
      setUploadNotice(notice);
      setTimeout(() => setUploadNotice(null), 4000);
    }
  };

  const handleFileInputChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = "";
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
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeImageAt = (index) => {
    const previewToRemove = previews[index];
    if (previewToRemove?.url) {
      try {
        URL.revokeObjectURL(previewToRemove.url);
      } catch {
        // ignore
      }
    }

    const nextPreviews = [...previews];
    nextPreviews.splice(index, 1);

    const nextImages = previewToRemove?.file
      ? formValues.images.filter((f) => f !== previewToRemove.file)
      : [...formValues.images];

    // If removed cover index, reset cover
    let nextCoverIndex = formValues.coverIndex ?? 0;
    if (index === nextCoverIndex) {
      nextCoverIndex = 0;
    } else if (index < nextCoverIndex) {
      nextCoverIndex -= 1;
    }

    setFormValues((prev) => ({
      ...prev,
      images: nextImages,
      imagePreviews: nextPreviews,
      coverIndex: nextCoverIndex,
    }));
  };

  const setCoverImage = (index) => {
    setFormValues((prev) => ({
      ...prev,
      coverIndex: index,
    }));
  };

  return (
    <section className="space-y-6">
      {/* Section Title */}
      <SectionTitle
        icon={Icon}
        title={formData.sections.upload?.title || "Upload Item Images"}
        subtitle="Clear photos help others recognise the item immediately."
      />

      {/* Security Tip for Found Items */}
      {isFound ? (
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <FiAlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            <span className="font-bold">Security Advice:</span> Avoid photographing private identification numbers, full credit card details, or sensitive serials. Genuine owners must be able to describe these details to claim the item.
          </div>
        </div>
      ) : (
        <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
          <FiAlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-blue-900 leading-relaxed">
            <span className="font-bold">Recommendation:</span> Upload multiple angles. If you don't have a photo of your lost item, you can upload a reference image of the same model.
          </div>
        </div>
      )}

      {/* Drag & Drop Upload Zone */}
      {formValues.images.length < upload.maxImages && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? "border-blue-500 bg-blue-100/50 scale-[1.01]"
              : "border-blue-200 bg-blue-50/40 hover:border-blue-400 hover:bg-blue-50/80"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileInputChange}
            className="hidden"
          />

          <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <FiUploadCloud className="w-7 h-7" />
          </div>

          <h4 className="text-base font-bold text-slate-800">
            {isDragging ? "Drop your photos here" : "Click to upload or drag & drop"}
          </h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            JPG, PNG, or WebP up to {upload.maxFileSize}MB each. You can select multiple images at once (up to {upload.maxImages}).
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-blue-200/60 text-xs font-semibold text-blue-700">
            <span>{formValues.images.length} / {upload.maxImages} photos uploaded</span>
          </div>
        </div>
      )}

      {/* Upload Notification Message */}
      {uploadNotice && (
        <div className="bg-amber-50 text-amber-800 text-xs font-medium px-4 py-2.5 rounded-xl border border-amber-200 flex items-center gap-2 animate-in fade-in">
          <span>ℹ️</span> {uploadNotice}
        </div>
      )}

      {/* Uploaded Gallery Grid */}
      {previews.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-sm font-bold text-slate-700">
              Uploaded Photos ({previews.length})
            </h5>
            <span className="text-xs text-slate-400">
              Click ⭐ to set the cover photo
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
            {previews.map((item, index) => {
              const isCover = (formValues.coverIndex ?? 0) === index;

              return (
                <div
                  key={item.id}
                  className={`group relative rounded-2xl overflow-hidden border bg-white shadow-xs transition-all duration-200 aspect-square ${
                    isCover
                      ? "ring-2 ring-blue-600 border-blue-600 shadow-md"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <img
                    src={item.url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Gradient Overlay for controls */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                    {/* Top Row: Remove & Cover Tag */}
                    <div className="flex items-center justify-between">
                      {isCover ? (
                        <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                          <FiCheck className="w-3 h-3" /> Cover
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setCoverImage(index)}
                          title="Set as cover photo"
                          className="bg-black/50 hover:bg-blue-600 text-white text-[10px] font-medium px-2 py-0.5 rounded-full transition"
                        >
                          Set Cover
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => removeImageAt(index)}
                        title="Remove photo"
                        className="w-6 h-6 rounded-full bg-red-600/90 text-white flex items-center justify-center hover:bg-red-700 transition"
                      >
                        <FiX className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Bottom Row: File Info */}
                    <div className="text-[10px] text-white/90 truncate font-medium">
                      {item.size}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default UploadImages;