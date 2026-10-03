const FormActions = () => {
  const handleSubmit = () => {
    console.log("Submit Report");
  };

  const handleCancel = () => {
    console.log("Cancel");
  };

  return (
    <div className="flex flex-col sm:flex-row justify-end gap-4 mt-10">

      {/* Submit */}

      <button
        onClick={handleSubmit}
        className="
          w-full
          sm:w-auto
          bg-blue-600
          hover:bg-blue-700
          text-white
          font-medium
          px-10
          py-3
          rounded-xl
          transition
          duration-300
          hover:shadow-lg
        "
      >
        Submit Report
      </button>

      {/* Cancel */}

      <button
        onClick={handleCancel}
        className="
          w-full
          sm:w-auto
          bg-gray-500
          hover:bg-gray-600
          text-white
          font-medium
          px-10
          py-3
          rounded-xl
          transition
          duration-300
          hover:shadow-lg
        "
      >
        Cancel
      </button>

    </div>
  );
};

export default FormActions;