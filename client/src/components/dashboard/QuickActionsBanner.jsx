import { FiSend} from "react-icons/fi";

function QuickActionBanner() {

    return(
        <div className="bg-gradient-to-r from-blue-700 to to-blue-900 rounded-2xl px-6 py-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="text-center md:text-left">
                <h2 className="text-xl font-extrabold text-white">Quick Actions</h2>
                <p className="text-sm text-blue-100 mt-1">
                    Lost something or found someone&apos;s property? Start here.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold transition-colors whitespace-nowrap">
                    <FiSend className="w-4 h-4"/>
                    Report Lost Item
                </button>

                <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-blue-50 text-blue-900 text-sm font-semibold transition-colors whitespace-nowrap">
                    <FiSend className="w-4 h-4"/>
                    Report Found Item
                </button>
            </div>
        </div>

    );

}

export default QuickActionBanner;