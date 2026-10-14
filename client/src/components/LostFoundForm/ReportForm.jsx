import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createLostItem, updateLostItem } from "../../services/lostItemService.js";
import { createFoundItem, updateFoundItem } from "../../services/foundItemService.js";
import ItemDetails from "./ItemDetails";
import Location from "./Location";
import DateTime from "./DateTime";
import UploadImages from "./UploadImages";
import FormStepper from "./FormStepper";
import FormReview from "./FormReview";
import FormActions from "./FormActions";
import { FiCheckCircle, FiAlertCircle, FiArrowRight, FiRotateCcw } from "react-icons/fi";

const ReportForm = ({ formData, editItem, onClose, onSuccess }) => {
  const navigate = useNavigate();

  const isEdit = Boolean(editItem);
  const isRejected = Boolean(
    editItem &&
      (editItem.status?.toLowerCase().includes("reject") ||
        editItem.approvalStatus === "rejected")
  );

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "",
    category: "",
    district: "",
    location: "",
    description: "",
    images: [],
    imagePreviews: [],
    coverIndex: 0,
    date: new Date().toISOString().split("T")[0],
    time: "",
    custodyStatus: "with_me",
  });

  // Pre-fill form values when in edit mode
  useEffect(() => {
    if (editItem) {
      const itemDate =
        editItem.reportedOn ||
        editItem.lostDate ||
        editItem.foundDate ||
        editItem.createdAt;

      let dateStr = "";
      if (itemDate) {
        try {
          dateStr = new Date(itemDate).toISOString().split("T")[0];
        } catch {
          dateStr = itemDate;
        }
      }

      // Populate existing image previews
      const initialPreviews = [];
      if (editItem.images && editItem.images.length > 0) {
        editItem.images.forEach((img, idx) => {
          const imgUrl = img.startsWith("http")
            ? img
            : `http://localhost:5000/${img.replace(/^\//, "")}`;
          initialPreviews.push({
            id: `existing-${idx}`,
            url: imgUrl,
            name: `Photo ${idx + 1}`,
            size: "Existing",
          });
        });
      } else if (editItem.image) {
        initialPreviews.push({
          id: "existing-0",
          url: editItem.image,
          name: "Existing Photo",
          size: "Existing",
        });
      }

      setFormValues({
        title: editItem.title || "",
        category: editItem.category || "",
        district: editItem.district || "",
        location: editItem.location || "",
        description: editItem.description || "",
        images: [],
        imagePreviews: initialPreviews,
        coverIndex: 0,
        date: dateStr || new Date().toISOString().split("T")[0],
        time: editItem.time || "",
        custodyStatus: editItem.custodyStatus || "with_me",
      });
    }
  }, [editItem]);

  // Validate step fields
  const validateStep = (stepNumber) => {
    const newErrors = {};

    if (stepNumber === 1) {
      if (!formValues.title.trim()) {
        newErrors.title = "Item title is required.";
      } else if (formValues.title.trim().length < 3) {
        newErrors.title = "Title must be at least 3 characters.";
      }

      if (!formValues.category) {
        newErrors.category = "Please select a category.";
      }

      if (!formValues.description.trim()) {
        newErrors.description = "Please describe the item.";
      } else if (formValues.description.trim().length < 10) {
        newErrors.description = "Description should be at least 10 characters.";
      }
    }

    if (stepNumber === 2) {
      if (!formValues.district) {
        newErrors.district = "Please select a district.";
      }

      if (!formValues.location.trim()) {
        newErrors.location = "Please enter the location or landmark.";
      }

      if (!formValues.date) {
        newErrors.date = "Please select the date.";
      } else {
        const selectedDate = new Date(formValues.date);
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        if (selectedDate > today) {
          newErrors.date = "Date cannot be in the future.";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps((prev) =>
        prev.includes(currentStep) ? prev : [...prev, currentStep]
      );
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectStep = (step) => {
    if (step > currentStep && !validateStep(currentStep)) {
      return;
    }
    setCurrentStep(step);
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const handleResetForm = () => {
    (formValues.imagePreviews || []).forEach((p) => {
      try {
        if (!p.id?.startsWith("existing")) {
          URL.revokeObjectURL(p.url);
        }
      } catch {
        // ignore
      }
    });

    setFormValues({
      title: "",
      category: "",
      district: "",
      location: "",
      description: "",
      images: [],
      imagePreviews: [],
      coverIndex: 0,
      date: new Date().toISOString().split("T")[0],
      time: "",
      custodyStatus: "with_me",
    });
    setCompletedSteps([]);
    setCurrentStep(1);
    setIsSuccess(false);
    setSubmitError(null);
  };

  const handleSubmit = async () => {
    if (!validateStep(1)) {
      setCurrentStep(1);
      return;
    }
    if (!validateStep(2)) {
      setCurrentStep(2);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const combinedDate = formValues.date
        ? new Date(`${formValues.date}T${formValues.time || "12:00"}`)
        : new Date();

      const data = new FormData();
      data.append("title", formValues.title.trim());
      data.append("category", formValues.category);
      data.append("description", formValues.description.trim());
      data.append("district", formValues.district);
      data.append("location", formValues.location.trim());

      // If user selected new images, append them
      const orderedImages = [...formValues.images];
      const coverIdx = formValues.coverIndex ?? 0;
      if (coverIdx > 0 && coverIdx < orderedImages.length) {
        const coverImg = orderedImages.splice(coverIdx, 1)[0];
        orderedImages.unshift(coverImg);
      }

      orderedImages.forEach((image) => {
        data.append("images", image);
      });

      if (isEdit) {
        const itemId = editItem.id || editItem._id;
        if (formData.type === "lost") {
          data.append("lostDate", combinedDate.toISOString());
          await updateLostItem(itemId, data);
        } else {
          data.append("foundDate", combinedDate.toISOString());
          if (formValues.custodyStatus) {
            data.append("custodyStatus", formValues.custodyStatus);
          }
          await updateFoundItem(itemId, data);
        }
      } else {
        if (formData.type === "lost") {
          data.append("lostDate", combinedDate.toISOString());
          await createLostItem(data);
        } else {
          data.append("foundDate", combinedDate.toISOString());
          if (formValues.custodyStatus) {
            data.append("custodyStatus", formValues.custodyStatus);
          }
          await createFoundItem(data);
        }
      }

      setIsSuccess(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Submit report error:", error);
      const errMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit report. Please check your connection and try again.";
      setSubmitError(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION VIEW
  if (isSuccess) {
    const isFound = formData.type === "found";
    return (
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10 text-center animate-in fade-in zoom-in-95 duration-300 max-w-xl mx-auto my-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-inner">
          <FiCheckCircle className="w-9 h-9 stroke-[2.5]" />
        </div>

        <h3 className="text-2xl font-extrabold text-slate-900">
          {isEdit
            ? isRejected
              ? "Report Resubmitted for Admin Review!"
              : "Report Updated Successfully!"
            : "Report Published Successfully!"}
        </h3>
        <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
          {isEdit
            ? isRejected
              ? `Your changes for "${formValues.title}" have been submitted. The report is now pending verification and our admins will review it promptly.`
              : `Your report for "${formValues.title}" has been updated successfully.`
            : `Your ${isFound ? "found item" : "lost item"} report for "${formValues.title}" is now active. We will alert you immediately if any community match is detected.`}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <button
            type="button"
            onClick={() => {
              if (onClose) onClose();
              navigate("/dashboard/my-reports");
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-md shadow-blue-500/20 inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>View in My Reports</span>
            <FiArrowRight className="w-4 h-4" />
          </button>

          {!isEdit && (
            <button
              type="button"
              onClick={handleResetForm}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <FiRotateCcw className="w-4 h-4 text-slate-500" />
              <span>Report Another Item</span>
            </button>
          )}

          {isEdit && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition cursor-pointer"
            >
              Done
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-5 sm:p-8 lg:p-10 transition-all">
      {/* Rejection Alert Notice if in Resubmit mode */}
      {isRejected && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-900 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 animate-in fade-in">
          <div className="p-2 bg-red-100 rounded-xl text-red-600 shrink-0 mt-0.5">
            <FiAlertCircle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-red-800">
              Admin Rejection Notice
            </h4>
            <p className="text-xs sm:text-sm text-red-700 mt-1 leading-relaxed">
              <span className="font-semibold">Reason:</span>{" "}
              {editItem.rejectionReason ||
                "Duplicate report / Insufficient information"}
            </p>
            <p className="text-xs text-red-600/90 mt-1.5 italic">
              Please review and update the details below to resubmit this report for admin verification.
            </p>
          </div>
        </div>
      )}

      {/* Multi-Step Stepper Header */}
      <FormStepper
        currentStep={currentStep}
        onSelectStep={handleSelectStep}
        completedSteps={completedSteps}
      />

      {/* Global Submit Error Alert */}
      {submitError && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 flex items-start gap-3 animate-in fade-in">
          <FiAlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs sm:text-sm">
            <span className="font-bold">Error submitting report:</span> {submitError}
          </div>
        </div>
      )}

      {/* STEP 1: ITEM DETAILS */}
      {currentStep === 1 && (
        <ItemDetails
          formData={formData}
          formValues={formValues}
          setFormValues={setFormValues}
          errors={errors}
          setErrors={setErrors}
        />
      )}

      {/* STEP 2: LOCATION & DATE */}
      {currentStep === 2 && (
        <div className="space-y-8">
          <Location
            formData={formData}
            formValues={formValues}
            setFormValues={setFormValues}
            errors={errors}
            setErrors={setErrors}
          />

          <DateTime
            formData={formData}
            formValues={formValues}
            setFormValues={setFormValues}
            errors={errors}
            setErrors={setErrors}
          />
        </div>
      )}

      {/* STEP 3: PHOTOS & UPLOADS */}
      {currentStep === 3 && (
        <UploadImages
          formData={formData}
          formValues={formValues}
          setFormValues={setFormValues}
        />
      )}

      {/* STEP 4: REVIEW & CONFIRM */}
      {currentStep === 4 && (
        <FormReview
          formData={formData}
          formValues={formValues}
          onEditStep={(step) => setCurrentStep(step)}
        />
      )}

      {/* STEP ACTIONS BAR */}
      <FormActions
        currentStep={currentStep}
        totalSteps={4}
        onNext={handleNext}
        onBack={handleBack}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
        submitLabel={
          isEdit
            ? isRejected
              ? "Resubmit for Review"
              : "Save Changes"
            : "Publish Report"
        }
      />
    </div>
  );
};

export default ReportForm;