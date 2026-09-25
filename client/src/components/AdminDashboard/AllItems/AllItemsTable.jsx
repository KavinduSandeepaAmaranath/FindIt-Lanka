
import { useState } from "react";

import {
  allItemsTableData,
  allItemsTableIcons,
  allItemsTableColumns,
} from "../../../data/AdminModuleData/AllItems";

import Pagination from "../Pagination";

const AllItemsTable = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  const totalItems = allItemsTableData.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;

  const currentItems = allItemsTableData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  return (
    <>
      <section className="mt-8 w-full">

        {/* table */}
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse">

              {/* table headers */}
              <thead>
                <tr className="border-b border-gray-300 bg-gray-50">
                  {allItemsTableColumns.map((column, index) => (
                    <th
                      key={column.key}
                      className={`${tableHeaderClass} ${
                        column.align === "center"
                          ? "text-center"
                          : "text-left"
                      } ${
                        index !== allItemsTableColumns.length - 1
                          ? "border-r border-gray-300"
                          : ""
                      }`}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* table body */}
              <tbody>
                {currentItems.map((item) => (
                  <tr
                    key={item.id}
                    className="
                      border-b
                      border-gray-200
                      transition-all
                      duration-200
                      hover:bg-blue-50/40
                    "
                  >
                    {/* item column */}
                    <td className="border-r border-gray-200 px-4 py-2.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            h-10
                            w-10
                            shrink-0
                            overflow-hidden
                            rounded-md
                            border
                            border-gray-200
                            bg-gray-100
                          "
                        >
                          <img
                            src={item.image}
                            alt={item.itemName}
                            className="h-full w-full object-cover"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />
                        </div>

                        <span
                          className="
                            whitespace-nowrap
                            text-sm
                            font-medium
                            text-[#29292D]
                          "
                        >
                          {item.itemName}
                        </span>
                      </div>
                    </td>

                    {/* type column */}
                    <td className="border-r border-gray-200 px-4 py-2.5">
                      <div className="flex justify-center">
                        <TypeBadge type={item.type} />
                      </div>
                    </td>

                    {/* location column */}
                    <td className="border-r border-gray-200 px-4 py-2.5">
                      <span className="text-sm text-[#29292D]">
                        {item.location}
                      </span>
                    </td>

                    {/* date column */}
                    <td className="border-r border-gray-200 px-4 py-2.5">
                      <span className="whitespace-nowrap text-sm text-[#29292D]">
                        {item.date}
                      </span>
                    </td>

                    {/* item status column */}
                    <td className="border-r border-gray-200 px-4 py-2.5">
                      <div className="flex justify-center">
                        <ItemStatusBadge status={item.itemStatus} />
                      </div>
                    </td>

                    {/* claim status column */}
                    <td className="border-r border-gray-200 px-4 py-2.5">
                      <div
                        className="
                          flex
                          min-h-[38px]
                          items-center
                          justify-center
                        "
                      >
                        {item.claimStatus ? (
                          <ClaimStatusBadge
                            status={item.claimStatus}
                          />
                        ) : (
                          <span className="text-lg font-medium text-[#64748B]">
                            —
                          </span>
                        )}
                      </div>
                    </td>

                    {/* action column */}
                    <td className="px-4 py-2.5">
                      <div className="flex justify-center">
                        <ViewButton
                          onClick={() => setSelectedItem(item)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* empty state */}
          {currentItems.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p className="text-base font-semibold text-[#2A3B63]">
                No items found
              </p>

              <p className="mt-1 text-sm text-[#64748B]">
                Try changing your search or filter options.
              </p>
            </div>
          )}
        </div>

        {/* pagination sec */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          rowsPerPage={rowsPerPage}
          onPageChange={setCurrentPage}
          itemName="items"
        />
      </section>

      {/* view item btn modal */}
      {selectedItem && (
        <ViewItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
};

//type badge

const TypeBadge = ({ type }) => {
  const isLost = type === "Lost";

  return (
    <span
      className={`
        inline-flex
        min-w-[42px]
        items-center
        justify-center
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${
          isLost
            ? "bg-[#F04450] text-white"
            : "bg-[#08A568] text-white"
        }
      `}
    >
      {type}
    </span>
  );
};

//item status badge

const ItemStatusBadge = ({ status }) => {
  const StatusIcon =
    status === "Returned"
      ? allItemsTableIcons.returned
      : allItemsTableIcons.active;

  const statusStyles = {
    Returned: "bg-[#2F9418] text-white",
    Active: "bg-[#2F66E8] text-white",
  };

  return (
    <span
      className={`
        inline-flex
        min-w-[112px]
        items-center
        justify-center
        gap-1.5
        whitespace-nowrap
        rounded-full
        px-3
        py-2
        text-xs
        font-medium
        ${statusStyles[status]}
      `}
    >
      <StatusIcon size={13} strokeWidth={2.5} />
      {status}
    </span>
  );
};

//claim status badge

const ClaimStatusBadge = ({ status }) => {
  const StatusIcon =
    status === "Claimed"
      ? allItemsTableIcons.claimed
      : allItemsTableIcons.unclaimed;

  const statusStyles = {
    Claimed: "bg-[#08A568] text-white",
    Unclaimed: "bg-[#BE3B40] text-white",
  };

  return (
    <span
      className={`
        inline-flex
        min-w-[102px]
        items-center
        justify-center
        gap-1.5
        whitespace-nowrap
        rounded-full
        px-3
        py-2
        text-xs
        font-medium
        ${statusStyles[status]}
      `}
    >
      <StatusIcon size={13} strokeWidth={2.5} />
      {status}
    </span>
  );
};

//view btn

const ViewButton = ({ onClick }) => {
  const ViewIcon = allItemsTableIcons.view;

  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        min-w-[72px]
        items-center
        justify-center
        gap-1.5
        rounded-full
        bg-[#2563EB]
        px-4
        py-2
        text-xs
        font-semibold
        text-white
        transition-all
        duration-200
        hover:bg-[#0F3292]
        hover:shadow-md
        active:scale-95
      "
    >
      <ViewIcon size={14} strokeWidth={2.5} />
      <span>View</span>
    </button>
  );
};

//view item model displaying popup sec when click view btn

const ViewItemModal = ({ item, onClose }) => {
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
        px-4
        py-6
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        className="
          w-full
          max-w-[350px]
          rounded-2xl
          border-[10px]
          border-[#0F3292]
          bg-white
          px-4
          py-5
          shadow-2xl
          sm:max-w-[370px]
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/*title*/}

        <h2
          className="
            mb-2
            text-[24px]
            font-semibold
            text-[#2A3B63]
          "
        >
          Item Details
        </h2>

        {/*item summery*/}

        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-gray-300
            bg-gray-50
            p-3
          "
        >
          {/* item image */}

          <div
            className="
              h-[90px]
              w-[90px]
              shrink-0
              overflow-hidden
              bg-gray-100
            "
          >
            <img
              src={item.image}
              alt={item.itemName}
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>

          {/* summery details */}

          <div className="space-y-1 text-sm">
            <p className="font-medium text-[#173B80]">
              {item.itemName}
            </p>

            <p className="text-[#173B80]">
              <span className="mr-2">Type:</span>

              <span
                className={
                  item.type === "Lost"
                    ? "text-[#BE3B40]"
                    : "text-[#08A568]"
                }
              >
                {item.type}
              </span>
            </p>

            <p className="text-[#173B80]">
              <span className="mr-2">Item Status:</span>

              <span
                className={
                  item.itemStatus === "Active"
                    ? "text-[#08A568]"
                    : "text-[#BE3B40]"
                }
              >
                {item.itemStatus}
              </span>
            </p>

            <p className="text-[#173B80]">
              <span className="mr-2">Claim Status:</span>

              <span
                className={
                  item.claimStatus === "Claimed"
                    ? "text-[#08A568]"
                    : "text-[#BE3B40]"
                }
              >
                {item.claimStatus || "Unclaimed"}
              </span>
            </p>
          </div>
        </div>

        {/* item info */}

        <div
          className="
            mt-1
            rounded-xl
            border
            border-gray-300
            bg-gray-50
            px-3
            py-2
          "
        >
          <h3
            className="
              mb-3
              text-[14px]
              font-medium
              text-[#2A3B63]
              underline
              underline-offset-2
            "
          >
            Item Information
          </h3>

          <div className="space-y-2 text-[13px] text-[#173B80]">
            <p>
              <span>Type: </span>
              {item.type}
            </p>

            <p>
              <span>Location: </span>
              {item.location}
            </p>

            <p>
              <span>Date Reported: </span>
              {item.date}
            </p>

            <p>
              <span>Description: </span>
              {item.description || "No description available."}
            </p>
          </div>
        </div>

        {/*report info */}

        <div
          className="
            mt-2
            rounded-xl
            border
            border-gray-300
            bg-gray-50
            px-3
            py-2
          "
        >
          <h3
            className="
              mb-3
              text-[14px]
              font-medium
              text-[#2A3B63]
              underline
              underline-offset-2
            "
          >
            Report Information
          </h3>

          <div className="space-y-2 text-[13px] text-[#173B80]">
            <p>
              <span>Reported By: </span>
              {item.reportedBy || "Not available"}
            </p>

            <p>
              <span>Contact: </span>
              {item.contact || "Not available"}
            </p>
          </div>
        </div>

        {/*done btn */}

        <button
          type="button"
          onClick={onClose}
          className="
            mx-auto
            mt-7
            block
            w-[180px]
            rounded-xl
            bg-[#2563EB]
            px-4
            py-2
            text-sm
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-[#0F3292]
            hover:shadow-md
            active:scale-[0.98]
          "
        >
          Done
        </button>
      </div>
    </div>
  );
};

//table styles

const tableHeaderClass = `
  px-4
  py-4
  text-xs
  font-semibold
  text-[#2A3B63]
  underline
  underline-offset-2
`;

export default AllItemsTable;