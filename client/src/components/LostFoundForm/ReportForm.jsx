import ItemDetails from "./ItemDetails";
import Location from "./Location";
import DateTime from "./DateTime";
import UploadImages from "./UploadImages";
import Description from "./Description";
import SafetyReminder from "./SafetyReminder";
import FormActions from "./FormActions";

const ReportForm = ({ formData }) => {
  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-5 sm:p-8 lg:p-10">

      {/* Item Details */}
      <ItemDetails formData={formData} />

      {/* Location */}
      <Location formData={formData} />

      {/* Date & Time */}
      <DateTime formData={formData} />

      {/* Upload Images */}
      <UploadImages formData={formData} />

      {/* Description */}
      <Description formData={formData} />

      {/* Safety Reminder */}
      <SafetyReminder formData={formData} />

      {/* Form Buttons */}
      <FormActions />

    </div>
  );
};

export default ReportForm;