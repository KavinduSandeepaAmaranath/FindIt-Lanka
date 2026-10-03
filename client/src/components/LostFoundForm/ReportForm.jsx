import { useState } from "react";
import { createLostItem } from "../../services/lostItemService.js";
import { createFoundItem } from "../../services/foundItemService.js";
import ItemDetails from "./ItemDetails";
import Location from "./Location";
import DateTime from "./DateTime";
import UploadImages from "./UploadImages";
import Description from "./Description";
import SafetyReminder from "./SafetyReminder";
import FormActions from "./FormActions";

const ReportForm = ({ formData }) => {
  const [formValues, setFormValues] = useState({
    title: "",
    category: "",
    district: "",
    location: "",
    description: "",
    images: [],
    date: "",
    time: "",
  });

  const handleSubmit = async () => {
    try {
      const combinedDate = new Date(
        `${formValues.date}T${formValues.time}`
      );

      const data = new FormData();

      data.append("title", formValues.title);
      data.append("category", formValues.category);
      data.append("description", formValues.description);
      data.append("district", formValues.district);
      data.append("location", formValues.location);

      formValues.images.forEach((image) => {
        data.append("images", image);
      });

      if (formData.type === "lost") {
        data.append("lostDate", combinedDate.toISOString());
        await createLostItem(data);
      } else {
        data.append("foundDate", combinedDate.toISOString());
        await createFoundItem(data);
      }

      alert("Report submitted successfully!");

      setFormValues({
        title: "",
        category: "",
        district: "",
        location: "",
        description: "",
        images: [],
        date: "",
        time: "",
      });
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Failed to submit report"
      );
    }
  };
  
  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-5 sm:p-8 lg:p-10">

      {/* Item Details */}
      <ItemDetails
        formData={formData}
        formValues={formValues}
        setFormValues={setFormValues}
      />

      {/* Location */}
      <Location 
        formData={formData}
        formValues={formValues}
        setFormValues={setFormValues}
      />

      {/* Date & Time */}
      <DateTime 
        formData={formData}
        formValues={formValues}
        setFormValues={setFormValues}
      />

      {/* Upload Images */}
      <UploadImages 
        formData={formData}
        formValues={formValues}
        setFormValues={setFormValues}
      />

      {/* Description */}
      <Description 
        formData={formData}
        formValues={formValues}
        setFormValues={setFormValues}
      />

      {/* Safety Reminder */}
      <SafetyReminder 
        formData={formData}
        formValues={formValues}
        setFormValues={setFormValues} 
      />

      {/* Form Buttons */}
      <FormActions onSubmit={handleSubmit} />

    </div>
  );
};

export default ReportForm;