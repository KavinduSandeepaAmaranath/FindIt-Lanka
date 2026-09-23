import { useState } from "react";
import SectionTitle from "./SectionTitle";

const UploadImages = ({
  formData,
  formValues,
  setFormValues, 
}) => {
  const Icon = formData.sections.upload.icon;

  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const upload = formData.upload;

  // Upload Image
  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // File Type Validation
    if (!upload.acceptedTypes.includes(file.type)) {
      alert("Only JPG and PNG images are allowed.");
      return;
    }

    // File Size Validation
    if (file.size > upload.maxFileSize * 1024 * 1024) {
      alert(`Maximum ${upload.maxFileSize}MB allowed.`);
      return;
    }

    setFormValues({
      ...formValues,
      images: [...formValues.images, file],
    });

    const newImage = {
      id: Date.now(),
      preview: URL.createObjectURL(file),
    };

    setImages((prev) => {
      if (prev.length >= upload.maxImages) {
        alert(`Maximum ${upload.maxImages} images allowed.`);
        return prev;
      }

      return [...prev, newImage];
    });

    e.target.value = "";
  };

  // Remove Image
  const removeImage = (id) => {
      const index = images.findIndex((img) => img.id === id);

      const updatedPreviewImages = images.filter(
          (img) => img.id !== id
      );

      const updatedFormImages = [...formValues.images];

      updatedFormImages.splice(index, 1);

      setImages(updatedPreviewImages);

      setFormValues({
          ...formValues,
          images: updatedFormImages,
      });

      const pages = Math.max(
          1,
          Math.ceil(updatedPreviewImages.length / upload.imagesPerPage)
      );

      if (currentPage > pages) {
          setCurrentPage(pages);
      }
  };

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(images.length / upload.imagesPerPage)
  );

  const startIndex =
    (currentPage - 1) * upload.imagesPerPage;

  const currentImages = images.slice(
    startIndex,
    startIndex + upload.imagesPerPage
  );

  return (
    <section className="mb-8">

      {/* Section Title */}
      <SectionTitle
        icon={Icon}
        title={formData.sections.upload.title}
      />

      {/* Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {currentImages.map((image) => (
          <div
            key={image.id}
            className="relative h-56 rounded-2xl overflow-hidden border border-gray-300 shadow-sm"
          >
            <img
              src={image.preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />

            <button
              onClick={() => removeImage(image.id)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
            >
              ✕
            </button>
          </div>
        ))}

        {/* Upload Card */}
        {images.length < upload.maxImages && (
          <label
            className="
              h-56
              rounded-2xl
              border-2
              border-dashed
              border-blue-300
              bg-blue-50
              flex
              flex-col
              items-center
              justify-center
              cursor-pointer
              hover:bg-blue-100
              transition
            "
          >
            <Icon className="text-5xl text-blue-400 mb-4" />

            <h3 className="font-semibold text-slate-700">
              {upload.title}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {upload.subtitle}
            </p>

            <input
                type="file"
                accept={upload.acceptedTypes.join(",")}
                onChange={handleUpload}
                className="hidden"
            />
          </label>
        )}

      </div>

      {/* Pagination */}
      {images.length > upload.imagesPerPage && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">

          <button
            onClick={() =>
              setCurrentPage((page) =>
                Math.max(page - 1, 1)
              )
            }
            disabled={currentPage === 1}
            className="px-5 py-2 border rounded-lg disabled:opacity-40 hover:bg-blue-600 hover:text-white transition"
          >
            Previous
          </button>

          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}

            <span className="ml-4">
              {images.length} / {upload.maxImages} Uploaded
            </span>
          </div>

          <button
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(page + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
            className="px-5 py-2 border rounded-lg disabled:opacity-40 hover:bg-blue-600 hover:text-white transition"
          >
            Next
          </button>

        </div>
      )}

    </section>
  );
};

export default UploadImages;