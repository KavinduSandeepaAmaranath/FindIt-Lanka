import { useMemo, useState } from "react";

import {
  claimTableData,
  claimTableIcons,
} from "../../../data/AdminModuleData/ClaimManagement";

import Pagination from "../Pagination";

const ClaimsTable = ({ searchValue = "", activeTab = "All" }) => {
  const [selectedClaim, setSelectedClaim] = useState(null);

  const rowsPerPage = 7;

  // =================================
  // FILTER CLAIMS
  // =================================

  const filteredClaims = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return claimTableData.filter((claim) => {
      const matchesSearch =
        !query ||
        [
          claim.itemName,
          claim.owner,
          claim.finder,
          claim.type,
          claim.status,
        ].some((value) =>
          value?.toLowerCase().includes(query)
        );

      let matchesStatus = true;

      if (activeTab === "Submitted") {
        matchesStatus =
          claim.status === "Submitted" ||
          claim.status === "In Progress";
      } else if (activeTab === "Handover") {
        matchesStatus =
          claim.status === "Handover Arranged";
      } else if (activeTab !== "All") {
        matchesStatus = claim.status === activeTab;
      }

      return matchesSearch && matchesStatus;
    });
  }, [searchValue, activeTab]);

  // =================================
  // PAGINATION
  // =================================

  const filterKey = `${activeTab}-${searchValue
    .trim()
    .toLowerCase()}`;

  const [pageState, setPageState] = useState({
    filterKey: "",
    page: 1,
  });

  // Automatically show page 1 when
  // search or tab filter changes
  const currentPage =
    pageState.filterKey === filterKey
      ? pageState.page
      : 1;

  const totalPages = Math.max(
    Math.ceil(filteredClaims.length / rowsPerPage),
    1
  );

  const handlePageChange = (nextPage) => {
    setPageState((previous) => {
      const current =
        previous.filterKey === filterKey
          ? previous.page
          : 1;

      const resolvedPage =
        typeof nextPage === "function"
          ? nextPage(current)
          : nextPage;

      return {
        filterKey,
        page: Math.min(
          Math.max(resolvedPage, 1),
          totalPages
        ),
      };
    });
  };

  const startIndex = (currentPage - 1) * rowsPerPage;

  const visibleClaims = filteredClaims.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  // =================================
  // TABLE
  // =================================

  return (
    <>
      <div className="mt-8 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="w-full overflow-x-auto">

          <table className="w-full min-w-[1050px]">

            {/* =================================
                TABLE HEADER
            ================================= */}

            <thead>
              <tr className="border-b border-gray-200">

                {/* Items */}

                <th
                  className="
                    border-r
                    border-gray-200
                    px-3
                    py-4
                    text-left
                    text-sm
                    font-semibold
                    text-[#2A3B63]
                    underline
                  "
                >
                  Items
                </th>

                {/* Type */}

                <th
                  className="
                    border-r
                    border-gray-200
                    px-3
                    py-4
                    text-left
                    text-sm
                    font-semibold
                    text-[#2A3B63]
                    underline
                  "
                >
                  Type
                </th>

                {/* Owner */}

                <th
                  className="
                    border-r
                    border-gray-200
                    px-3
                    py-4
                    text-left
                    text-sm
                    font-semibold
                    text-[#2A3B63]
                    underline
                  "
                >
                  Owner
                </th>

                {/* Finder */}

                <th
                  className="
                    border-r
                    border-gray-200
                    px-3
                    py-4
                    text-left
                    text-sm
                    font-semibold
                    text-[#2A3B63]
                    underline
                  "
                >
                  Finder
                </th>

                {/* Date */}

                <th
                  className="
                    border-r
                    border-gray-200
                    px-3
                    py-4
                    text-left
                    text-sm
                    font-semibold
                    text-[#2A3B63]
                    underline
                  "
                >
                  Date
                </th>

                {/* Status */}

                <th
                  className="
                    border-r
                    border-gray-200
                    px-3
                    py-4
                    text-left
                    text-sm
                    font-semibold
                    text-[#2A3B63]
                    underline
                  "
                >
                  Status
                </th>

                {/* Actions */}

                <th
                  className="
                    px-3
                    py-4
                    text-center
                    text-sm
                    font-semibold
                    text-[#2A3B63]
                    underline
                  "
                >
                  Actions
                </th>

              </tr>
            </thead>

            {/* =================================
                TABLE BODY
            ================================= */}

            <tbody>

              {visibleClaims.map((claim) => (
                <tr
                  key={claim.id}
                  className="
                    border-b
                    border-gray-200
                    transition-colors
                    duration-200
                    hover:bg-gray-50
                  "
                >

                  {/* =================================
                      ITEM
                  ================================= */}

                  <td
                    className="
                      border-r
                      border-gray-200
                      px-3
                      py-3
                    "
                  >
                    <div className="flex items-center gap-3">

                      <img
                        src={claim.image}
                        alt={claim.itemName}
                        className="
                          h-12
                          w-12
                          shrink-0
                          rounded-lg
                          object-cover
                        "
                      />

                      <span
                        className="
                          text-sm
                          font-medium
                          text-[#29292D]
                        "
                      >
                        {claim.itemName}
                      </span>

                    </div>
                  </td>

                  {/* =================================
                      TYPE
                  ================================= */}

                  <td
                    className="
                      border-r
                      border-gray-200
                      px-3
                      py-3
                    "
                  >
                    <ClaimTypeBadge type={claim.type} />
                  </td>

                  {/* =================================
                      OWNER
                  ================================= */}

                  <td
                    className="
                      border-r
                      border-gray-200
                      px-3
                      py-3
                    "
                  >
                    <Person
                      image={claim.ownerImage}
                      name={claim.owner}
                    />
                  </td>

                  {/* =================================
                      FINDER
                  ================================= */}

                  <td
                    className="
                      border-r
                      border-gray-200
                      px-3
                      py-3
                    "
                  >
                    <Person
                      image={claim.finderImage}
                      name={claim.finder}
                    />
                  </td>

                  {/* =================================
                      DATE
                  ================================= */}

                  <td
                    className="
                      border-r
                      border-gray-200
                      px-3
                      py-3
                      whitespace-nowrap
                      text-sm
                      text-[#29292D]
                    "
                  >
                    {claim.date}
                  </td>

                  {/* =================================
                      STATUS
                  ================================= */}

                  <td
                    className="
                      border-r
                      border-gray-200
                      px-3
                      py-3
                    "
                  >
                    <ClaimStatusBadge
                      status={claim.status}
                    />
                  </td>

                  {/* =================================
                      ACTION
                  ================================= */}

                  <td className="px-3 py-3">

                    <div className="flex items-center justify-center">

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedClaim(claim)
                        }
                        className="
                          inline-flex
                          items-center
                          gap-1
                          rounded-full
                          bg-[#2563EB]
                          px-3
                          py-1.5
                          text-xs
                          font-semibold
                          text-white
                          transition-all
                          duration-200
                          hover:bg-[#0F3292]
                          hover:shadow-md
                          active:scale-95
                          focus:outline-none
                          focus:ring-2
                          focus:ring-[#2563EB]/30
                        "
                      >
                        <claimTableIcons.view
                          size={13}
                        />

                        View
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {/* =================================
            EMPTY STATE
        ================================= */}

        {visibleClaims.length === 0 && (
          <div className="py-14 text-center">

            <p className="font-semibold text-[#263A63]">
              No claims found
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Try another search or filter.
            </p>

          </div>
        )}

        {/* =================================
            PAGINATION
        ================================= */}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredClaims.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          itemName="claims"
        />

      </div>

      {/* =================================
          VIEW CLAIM MODAL
      ================================= */}

      {selectedClaim && (
        <ViewClaimModal
          claim={selectedClaim}
          onClose={() => setSelectedClaim(null)}
        />
      )}
    </>
  );
};

// =================================
// PERSON
// =================================

const Person = ({ image, name }) => {
  return (
    <div className="flex items-center gap-3">

      <img
        src={image}
        alt={name}
        className="
          h-10
          w-10
          shrink-0
          rounded-full
          object-cover
        "
      />

      <span
        className="
          whitespace-nowrap
          text-sm
          font-medium
          text-[#29292D]
        "
      >
        {name}
      </span>

    </div>
  );
};

// =================================
// CLAIM TYPE BADGE
// =================================

const ClaimTypeBadge = ({ type }) => {
  const isLost = type === "Lost";

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        text-white
        ${
          isLost
            ? "bg-[#EF4444]"
            : "bg-[#009B50]"
        }
      `}
    >
      {type}
    </span>
  );
};

// =================================
// CLAIM STATUS BADGE
// =================================

const ClaimStatusBadge = ({ status }) => {
  const statusStyles = {
    Accepted:
      "bg-[#17409A] text-white",

    "Handover Arranged":
      "bg-[#62B8EF] text-white",

    Completed:
      "bg-[#009B50] text-white",

    Rejected:
      "bg-[#B63838] text-white",

    "In Progress":
      "bg-[#F28C28] text-white",

    Submitted:
      "bg-[#2563EB] text-white",
  };

  const iconMap = {
    Accepted:
      claimTableIcons.accepted,

    "Handover Arranged":
      claimTableIcons.handover,

    Completed:
      claimTableIcons.completed,

    Rejected:
      claimTableIcons.rejected,

    "In Progress":
      claimTableIcons.progress,

    Submitted:
      claimTableIcons.submitted,
  };

  const Icon = iconMap[status];

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        gap-1
        whitespace-nowrap
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${
          statusStyles[status] ||
          "bg-gray-500 text-white"
        }
      `}
    >
      {Icon && <Icon size={12} />}

      {status}
    </span>
  );
};
// =================================
// VIEW CLAIM MODAL
// =================================

const ViewClaimModal = ({
  claim,
  onClose,
}) => {
  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
        backdrop-blur-sm
      "
      onClick={onClose}
    >

      <div
        className="
          w-full
          max-w-lg
          rounded-2xl
          bg-white
          p-6
          shadow-2xl
        "
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* =================================
            MODAL HEADER
        ================================= */}

        <div className="flex items-center justify-between">

          <h2
            className="
              text-2xl
              font-bold
              text-[#2A3B63]
            "
          >
            Claim Details
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-full
              p-2
              text-gray-500
              transition
              hover:bg-gray-100
              hover:text-[#2A3B63]
            "
            aria-label="Close modal"
          >
            <claimTableIcons.reject
              size={20}
            />
          </button>

        </div>

        {/* =================================
            ITEM IMAGE
        ================================= */}

        <img
          src={claim.image}
          alt={claim.itemName}
          className="
            mt-5
            h-48
            w-full
            rounded-xl
            object-cover
          "
        />

        {/* =================================
            ITEM DETAILS
        ================================= */}

        <div className="mt-5 space-y-4">

          <h3
            className="
              text-lg
              font-semibold
              text-[#2A3B63]
            "
          >
            {claim.itemName}
          </h3>

          {/* TYPE */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <span
              className="
                text-sm
                font-medium
                text-[#64748B]
              "
            >
              Type
            </span>

            <ClaimTypeBadge
              type={claim.type}
            />
          </div>

          {/* STATUS */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <span
              className="
                text-sm
                font-medium
                text-[#64748B]
              "
            >
              Status
            </span>

            <ClaimStatusBadge
              status={claim.status}
            />
          </div>

          {/* OWNER */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <span
              className="
                text-sm
                font-medium
                text-[#64748B]
              "
            >
              Owner
            </span>

            <span
              className="
                text-right
                text-sm
                font-medium
                text-[#29292D]
              "
            >
              {claim.owner}
            </span>
          </div>

          {/* FINDER */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <span
              className="
                text-sm
                font-medium
                text-[#64748B]
              "
            >
              Finder
            </span>

            <span
              className="
                text-right
                text-sm
                font-medium
                text-[#29292D]
              "
            >
              {claim.finder}
            </span>
          </div>

          {/* DATE */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <span
              className="
                text-sm
                font-medium
                text-[#64748B]
              "
            >
              Submitted Date
            </span>

            <span
              className="
                text-right
                text-sm
                font-medium
                text-[#29292D]
              "
            >
              {claim.date}
            </span>
          </div>

        </div>

        {/* =================================
            CLOSE BUTTON
        ================================= */}

        <button
          type="button"
          onClick={onClose}
          className="
            mt-6
            w-full
            rounded-xl
            bg-[#2563EB]
            px-4
            py-3
            text-base
            font-semibold
            text-white
            transition
            hover:bg-[#0F3292]
          "
        >
          Close
        </button>

      </div>

    </div>
  );
};

export default ClaimsTable;