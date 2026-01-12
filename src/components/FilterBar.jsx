import { clsx } from "clsx";

export const FilterBar = ({
    categories,
    selectedCategory,
    onCategoryChange,
    selectedStatus,
    onStatusChange
}) => {
    const statuses = ["All", "Pending", "In Progress", "Resolved"];

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between bg-white/50 backdrop-blur rounded-2xl p-2 border border-blue-50/50 shadow-sm">
            {/* Category Filter - Scrollable Pill List */}
            <div className="flex overflow-x-auto pb-2 md:pb-0 hide-scrollbar w-full md:w-auto gap-2 px-2">
                <button
                    onClick={() => onCategoryChange("All")}
                    className={clsx(
                        "px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap",
                        selectedCategory === "All"
                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                            : "bg-white text-slate-600 hover:bg-blue-50 text-slate-500"
                    )}
                >
                    All Topics
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => onCategoryChange(cat)}
                        className={clsx(
                            "px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap",
                            selectedCategory === cat
                                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                : "bg-white text-slate-600 hover:bg-blue-50 text-slate-500"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Status Filter - Dropdown or Toggle */}
            <div className="flex items-center space-x-2 px-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status:</span>
                <select
                    value={selectedStatus}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="bg-white border-none text-sm font-semibold text-slate-700 rounded-lg focus:ring-2 focus:ring-blue-100 cursor-pointer py-1.5 pl-3 pr-8 shadow-sm"
                >
                    {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};
