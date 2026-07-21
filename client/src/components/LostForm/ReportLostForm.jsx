import LostItemDetails from "./LostItemDetails";
import LostLocation from "./LostLocation";
import LostDateTime from "./LostDateTime";
import UploadImages from "./UploadImages";
import Description from "./Description";
import SafetyReminder from "./SafetyReminder";
import FormActions from "./FormActions";

const ReportLostForm = () => {
  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-5 sm:p-8 lg:p-10">

      <LostItemDetails />

      <LostLocation />

      <LostDateTime />

      <UploadImages />

      <Description />

      <SafetyReminder />

      <FormActions />

    </div>
  );
};

export default ReportLostForm;