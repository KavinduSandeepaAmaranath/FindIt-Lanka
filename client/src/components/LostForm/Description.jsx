import { useState } from "react";
import SectionTitle from "./SectionTitle";

import {
  lostFormSections,
  descriptionSettings,
} from "../../data/ReportLost";

const Description = () => {
  const Icon = lostFormSections.description.icon;

  const [description, setDescription] = useState("");

  return (
    <section className="mb-8">

      <SectionTitle
        icon={Icon}
        title={lostFormSections.description.title}
      />

      <div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={descriptionSettings.maxLength}
          rows={6}
          placeholder={descriptionSettings.placeholder}
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
            {description.length} / {descriptionSettings.maxLength}
          </span>

        </div>

      </div>

    </section>
  );
};

export default Description;