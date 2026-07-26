import SectionTitle from "./SectionTitle";

const Description = ({
  formData,
  formValues,
  setFormValues,
}) => {
  const Icon = formData.sections.description.icon;


  return (
    <section className="mb-8">

      {/* Section Title */}
      <SectionTitle
        icon={Icon}
        title={formData.sections.description.title}
      />

      <div>

        <textarea
          value={formValues.description}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              description: e.target.value,
            })
          }
          maxLength={formData.description.maxLength}
          rows={6}
          placeholder={formData.description.placeholder}
          className="
            w-full
            rounded-2xl
            border
            border-gray-300
            px-5
            py-4
            text-sm
            resize-none
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
          "
        />

        <div className="flex justify-end mt-2">

          <span className="text-xs text-gray-500">
            {formValues.description.length} / {formData.description.maxLength}
          </span>

        </div>

      </div>

    </section>
  );
};

export default Description;