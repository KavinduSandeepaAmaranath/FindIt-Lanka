import { useMemo, useState } from "react";

import {
  claimTableIcons,
} from "../../../data/AdminModuleData/ClaimManagement";

import { approveClaim, rejectClaim } from "../../../services/claimService";
import Pagination from "../Pagination";

const ClaimsTable = ({
  claims = [],
  loading = false,
  error = null,
  onRefresh,
  searchValue = "",
  activeTab = "All",
  claimType = "All",
}) => {
  const [selectedClaim, setSelectedClaim] = useState(null);

  const rowsPerPage = 7;

//filter claim

  const filteredClaims = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return (claims || []).filter((claim) => {
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

      let matchesType = true;
      if (claimType !== "All") {
        matchesType = claim.type?.toLowerCase() === claimType.toLowerCase();
      }

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [claims, searchValue, activeTab, claimType]);

//pagination

  const filterKey = `${activeTab}-${searchValue
    .trim()
    .toLowerCase()}`;

  const [pageState, setPageState] = useState({
    filterKey: "",
    page: 1,
  });

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

//table

  return (
    <>
      <div className="mt-8 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="w-full overflow-x-auto">

          <table className="w-full min-w-[1050px]">

            {/* table head*/}

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

                {/* action*/}

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

            {/*table body */}

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

                  {/* item */}

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

                  {/* type */}

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

                  {/* owner */}

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

                  {/* finder */}

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

                  {/* date */}

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

                  {/* status */}

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

                  {/* action */}

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

        {/* Loading state */}
        {loading && (
          <div className="py-14 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#2563EB] border-r-transparent" />
            <p className="mt-3 font-semibold text-[#263A63]">
              Loading claims from database...
            </p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="py-14 text-center">
            <p className="font-semibold text-red-600">{error}</p>
            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                className="mt-3 rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white shadow transition hover:bg-[#1d4ed8]"
              >
                Retry
              </button>
            )}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && visibleClaims.length === 0 && (
          <div className="py-14 text-center">
            <p className="font-semibold text-[#263A63]">
              No claims found
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Try another search or filter.
            </p>
          </div>
        )}

        {/*pagination */}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredClaims.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          itemName="claims"
        />

      </div>

      {/*view claim */}

      {selectedClaim && (
        <ViewClaimModal
          claim={selectedClaim}
          onClose={() => setSelectedClaim(null)}
          onRefresh={onRefresh}
        />
      )}
    </>
  );
};


//person

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


//claim type

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
        ${
          isLost
            ? "bg-[#FDE7E9] text-[#D95C66]"
            : "bg-[#D9F7EA] text-[#009B50]"
        }
      `}
    >
      {type}
    </span>
  );
};


//claim status

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



// viev claim 


const ViewClaimModal = ({ claim, onClose, onRefresh }) => {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  const handleApprove = async () => {
    const note = window.prompt("Enter approval note:", "Approved by admin");
    if (note === null) return;
    try {
      setActionLoading(true);
      setActionError(null);
      await approveClaim(claim.id, note || "Approved by admin");
      onRefresh?.();
      onClose();
    } catch (err) {
      setActionError(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to approve claim"
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    const note = window.prompt(
      "Enter reason for rejection (required):",
      "Claim details do not match item"
    );
    if (!note || !note.trim()) return;
    try {
      setActionLoading(true);
      setActionError(null);
      await rejectClaim(claim.id, note.trim());
      onRefresh?.();
      onClose();
    } catch (err) {
      setActionError(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to reject claim"
      );
    } finally {
      setActionLoading(false);
    }
  };

  // claim prograss
 

  const progressSteps = [
    {
      title: "Claim Submitted",
      date: claim.date,
      completed: true,
    },

    {
      title: "Finder Accepted",
      date:
        claim.acceptedDate ||
        claim.date,
      completed:
        claim.status === "Accepted" ||
        claim.status === "Handover Arranged" ||
        claim.status === "Completed",
    },

    {
      title: "Handover Arranged",
      date:
        claim.handoverDate ||
        claim.date,
      completed:
        claim.status === "Handover Arranged" ||
        claim.status === "Completed",
    },

    {
      title: "Handed Over",
      date:
        claim.handedOverDate ||
        claim.date,
      completed:
        claim.status === "Completed",
    },

    {
      title: "Completed",
      date:
        claim.completedDate ||
        claim.date,
      completed:
        claim.status === "Completed",
    },
  ];

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

      {/*model*/}

      <div
        className="
          relative
          w-full
          max-w-[520px]
          max-h-[95vh]
          overflow-y-auto
          rounded-2xl
          border-[6px]
          border-[#173F94]
          bg-white
          shadow-2xl
        "
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/*header */}

        <div className="px-4 pt-4">

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={onClose}
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                text-[#2563EB]
                transition
                hover:bg-blue-50
              "
              aria-label="Close"
            >
              <span className="text-2xl leading-none">
                ←
              </span>
            </button>

            <h2
              className="
                text-2xl
                font-bold
                text-[#2A3B63]
              "
            >
              Claim Details
            </h2>

          </div>


          {/* current status */}

          <div className="mt-3">

            <ClaimStatusBadge
              status={claim.status}
            />

          </div>

        </div>


        {/*detail card*/}

        <div
          className="
            mx-3
            mt-4
            overflow-hidden
            rounded-lg
            border
            border-[#C9DCF8]
          "
        >

          <div className="p-4">

            <div className="flex gap-4">

              {/* item img */}

              <img
                src={claim.image}
                alt={claim.itemName}
                className="
                  h-28
                  w-28
                  shrink-0
                  rounded-lg
                  object-cover
                "
              />


              {/* item info */}

              <div className="min-w-0 flex-1">

                <div className="flex flex-wrap items-center gap-3">

                  <h3
                    className="
                      text-lg
                      font-bold
                      text-[#173F94]
                    "
                  >
                    {claim.itemName}
                  </h3>

                  <ClaimTypeBadge
                    type={claim.type}
                  />

                </div>


                {/* date */}

                <div className="mt-3 flex">

                  <span
                    className="
                      w-[110px]
                      text-sm
                      text-[#5074B5]
                    "
                  >
                    Submitted Date
                  </span>

                  <span className="mr-2 text-[#5074B5]">
                    :
                  </span>

                  <span
                    className="
                      text-sm
                      text-[#5074B5]
                    "
                  >
                    {claim.date}
                  </span>

                </div>


                {/* status*/}

                <div className="mt-2 flex items-center">

                  <span
                    className="
                      w-[110px]
                      text-sm
                      text-[#5074B5]
                    "
                  >
                    Status
                  </span>

                  <span className="mr-2 text-[#5074B5]">
                    :
                  </span>

                  <ClaimStatusBadge
                    status={claim.status}
                  />

                </div>

              </div>

            </div>

          </div>


          {/*owner & finder */}

          <div
            className="
              grid
              grid-cols-2
              border-t
              border-[#C9DCF8]
            "
          >

            {/* owner */}

            <div
              className="
                border-r
                border-[#C9DCF8]
                p-4
              "
            >

              <div className="flex items-center gap-2">

                <span
                  className="
                    h-4
                    w-4
                    rounded-full
                    bg-[#8AB2E8]
                  "
                />

                <h4
                  className="
                    text-xs
                    font-bold
                    text-[#173F94]
                  "
                >
                  OWNER
                </h4>

              </div>


              <div className="mt-3 flex items-center gap-2">

                <span className="text-sm">
                  ♟
                </span>

                <span
                  className="
                    text-sm
                    font-medium
                    text-[#173F94]
                  "
                >
                  {claim.owner}
                </span>

              </div>


              <div className="mt-2 flex items-start gap-2">

                <span className="text-xs">
                  ✉
                </span>

                <span
                  className="
                    break-all
                    text-xs
                    text-[#6386C5]
                  "
                >
                  {claim.ownerEmail ||
                    "Email not available"}
                </span>

              </div>

            </div>


            {/* finder */}

            <div className="p-4">

              <div className="flex items-center gap-2">

                <span
                  className="
                    h-4
                    w-4
                    rounded-full
                    bg-[#8AB2E8]
                  "
                />

                <h4
                  className="
                    text-xs
                    font-bold
                    text-[#173F94]
                  "
                >
                  FINDER
                </h4>

              </div>


              <div className="mt-3 flex items-center gap-2">

                <span className="text-sm">
                  ♟
                </span>

                <span
                  className="
                    text-sm
                    font-medium
                    text-[#173F94]
                  "
                >
                  {claim.finder}
                </span>

              </div>


              <div className="mt-2 flex items-start gap-2">

                <span className="text-xs">
                  ✉
                </span>

                <span
                  className="
                    break-all
                    text-xs
                    text-[#6386C5]
                  "
                >
                  {claim.finderEmail ||
                    "Email not available"}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Claim message if present */}
        {claim.message && (
          <div className="mx-3 mt-4 rounded-lg border border-[#C9DCF8] bg-blue-50/40 p-3.5">
            <h4 className="text-xs font-bold text-[#173F94]">
              CLAIM MESSAGE / PROOF
            </h4>
            <p className="mt-1 text-sm text-[#2A3B63]">
              {claim.message}
            </p>
          </div>
        )}

        {/* Review note if present */}
        {claim.reviewNote && (
          <div className="mx-3 mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3.5">
            <h4 className="text-xs font-bold text-gray-700">
              ADMIN REVIEW NOTE
            </h4>
            <p className="mt-1 text-sm text-gray-600">
              {claim.reviewNote}
            </p>
          </div>
        )}

        {/*claim prograss*/}

        <div
          className="
            mx-3
            mt-7
            rounded-lg
            border
            border-[#C9DCF8]
            p-4
          "
        >

          <h3
            className="
              text-sm
              font-bold
              text-[#173F94]
            "
          >
            CLAIM PROGRESS
          </h3>


          <div className="mt-5">

            {progressSteps.map(
              (step, index) => (

                <div
                  key={step.title}
                  className="
                    relative
                    flex
                    gap-4
                  "
                >

                  {/* verticle line */}

                  {index !==
                    progressSteps.length - 1 && (
                    <div
                      className={`
                        absolute
                        left-[11px]
                        top-[24px]
                        h-[52px]
                        w-[2px]
                        ${
                          step.completed
                            ? "bg-[#00A968]"
                            : "bg-gray-200"
                        }
                      `}
                    />
                  )}


                  {/* check table  */}

                  <div
                    className={`
                      relative
                      z-10
                      flex
                      h-6
                      w-6
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      text-sm
                      font-bold
                      ${
                        step.completed
                          ? "bg-[#00A968] text-white"
                          : "bg-gray-200 text-gray-400"
                      }
                    `}
                  >
                    {step.completed
                      ? "✓"
                      : ""}
                  </div>


                  {/*step info*/}

                  <div className="pb-6">

                    <p
                      className={`
                        text-sm
                        font-semibold
                        ${
                          step.completed
                            ? "text-[#173F94]"
                            : "text-gray-400"
                        }
                      `}
                    >
                      {step.title}
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-[#6386C5]
                      "
                    >
                      {step.date ||
                        "Pending"}
                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

        {/* Action Error Banner */}
        {actionError && (
          <div className="mx-3 mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-center text-xs font-semibold text-red-600">
            {actionError}
          </div>
        )}

        {/* Action Buttons for Pending Claims */}
        {(claim.rawStatus === "pending" || claim.status === "Submitted") && (
          <div className="mx-3 mt-4 flex gap-3">
            <button
              type="button"
              disabled={actionLoading}
              onClick={handleApprove}
              className="
                flex-1
                rounded-lg
                bg-[#009B50]
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-[#007D40]
                disabled:opacity-50
                active:scale-95
              "
            >
              {actionLoading ? "Processing..." : "✓ Approve Claim"}
            </button>
            <button
              type="button"
              disabled={actionLoading}
              onClick={handleReject}
              className="
                flex-1
                rounded-lg
                bg-[#B63838]
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-[#962828]
                disabled:opacity-50
                active:scale-95
              "
            >
              {actionLoading ? "Processing..." : "✕ Reject Claim"}
            </button>
          </div>
        )}

        {/*close btn*/}

        <div className="flex justify-center px-4 py-5">

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              border
              border-[#9AAEC8]
              bg-[#C9D5E5]
              px-7
              py-2
              text-sm
              font-semibold
              text-[#334155]
              shadow-sm
              transition
              hover:bg-[#B8C6D8]
              active:scale-95
            "
          >
            ✕ Close
          </button>

        </div>

      </div>

    </div>
  );
};

export default ClaimsTable;