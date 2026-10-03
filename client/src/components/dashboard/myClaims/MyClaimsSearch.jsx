import { useState } from "react";
import { FiSearch } from "react-icons/fi";

function MyClaimsSearch({ searchTerm, onSearch }) {
  const [draft, setDraft] = useState(searchTerm);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(draft.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full lg:w-[380px] flex items-center bg-white rounded-2xl shadow-sm border border-slate-200 px-2 py-1.5 shrink-0"
    >
      <FiSearch className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
      <input
        type="text"
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value);
          if (e.target.value === "") onSearch("");
        }}
        placeholder="Search your Claims..."
        className="flex-1 min-w-0 px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none bg-transparent"
      />
      <button
        type="submit"
        className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold transition-colors shrink-0"
      >
        Search
      </button>
    </form>
  );
}

export default MyClaimsSearch;
