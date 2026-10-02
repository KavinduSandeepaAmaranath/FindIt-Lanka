import { FiShield, FiCheck } from "react-icons/fi";

function MyReturnsHeader() {
  return (
    <div className="flex items-start gap-3.5">
      <div className="relative w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-sm mt-0.5">
        <FiShield className="w-6 h-6 stroke-[2.2]" />
        <FiCheck className="w-3 h-3 stroke-[3] text-blue-600 absolute" />
      </div>

      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1e293b] tracking-tight leading-tight">
          My Returns
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Items you have found and returned to their owners.
        </p>
      </div>
    </div>
  );
}

export default MyReturnsHeader;
