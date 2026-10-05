import { useState } from "react";

import {
  adminProfileData,
} from "../../../data/AdminModuleData/AdminSetting";

const AdminProfile = () => {
  const [name, setName] =
    useState(
      adminProfileData.fields.fullName.value
    );

  const [email, setEmail] =
    useState(
      adminProfileData.fields.email.value
    );

  const [phone, setPhone] =
    useState(
      adminProfileData.fields.phone.value
    );

  return (
    <section
      id="profile"
      className="
        scroll-mt-6
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-4
        shadow-sm
        sm:p-5
        lg:p-6
      "
    >

      {/* Header */}
      <div className="flex items-start gap-3">

        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-blue-50
            text-[#2563EB]
          "
        >
          <adminProfileData.icons.profile
            size={21}
          />
        </div>

        <div>
          <h2
            className="
              text-lg
              font-bold
              text-[#0F3292]
              sm:text-xl
            "
          >
            {adminProfileData.title}
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-[#64748B]
              sm:text-sm
            "
          >
            {adminProfileData.description}
          </p>
        </div>

      </div>

      <div
        className="
          mt-6
          grid
          grid-cols-1
          gap-6
          lg:grid-cols-[130px_1fr]
        "
      >

        {/* Profile Image */}
        <div
          className="
            flex
            flex-col
            items-center
            gap-3
          "
        >

          <div
            className="
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-blue-100
              text-[#2563EB]
              ring-4
              ring-blue-50
            "
          >
            <adminProfileData.icons.profile
              size={48}
            />
          </div>

          <button
            type="button"
            className="
              rounded-lg
              border
              border-[#2563EB]
              bg-white
              px-4
              py-2
              text-xs
              font-semibold
              text-[#2563EB]
              transition
              hover:bg-[#2563EB]
              hover:text-white
            "
          >
            {adminProfileData.changePhotoText}
          </button>

        </div>

        {/* Fields */}
        <div
          className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-2
          "
        >

          <div>
            <label
              className="
                mb-2
                block
                text-xs
                font-semibold
                text-[#2A3B63]
              "
            >
              {adminProfileData.fields.fullName.label}
              {" *"}
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="
                h-11
                w-full
                rounded-lg
                border
                border-blue-100
                px-3
                text-sm
                text-[#29292D]
                outline-none
                focus:border-[#2563EB]
                focus:ring-2
                focus:ring-blue-100
              "
            />
          </div>

          <div>
            <label
              className="
                mb-2
                block
                text-xs
                font-semibold
                text-[#2A3B63]
              "
            >
              {adminProfileData.fields.email.label}
              {" *"}
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                h-11
                w-full
                rounded-lg
                border
                border-blue-100
                px-3
                text-sm
                text-[#29292D]
                outline-none
                focus:border-[#2563EB]
                focus:ring-2
                focus:ring-blue-100
              "
            />
          </div>

          <div>
            <label
              className="
                mb-2
                block
                text-xs
                font-semibold
                text-[#2A3B63]
              "
            >
              {adminProfileData.fields.phone.label}
              {" *"}
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="
                h-11
                w-full
                rounded-lg
                border
                border-blue-100
                px-3
                text-sm
                text-[#29292D]
                outline-none
                focus:border-[#2563EB]
                focus:ring-2
                focus:ring-blue-100
              "
            />
          </div>

          <div className="flex items-end justify-start md:justify-end">
            <button
              type="button"
              className="
                inline-flex
                h-11
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-[#2563EB]
                px-5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#0F3292]
                sm:w-auto
              "
            >
              <adminProfileData.icons.save
                size={16}
              />
              {adminProfileData.saveButton}
            </button>
          </div>

        </div>

      </div>

    </section>
  );
};

export default AdminProfile;