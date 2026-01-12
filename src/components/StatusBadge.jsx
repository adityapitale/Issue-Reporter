import { clsx } from "clsx";

export const StatusBadge = ({ status }) => {
    const styles = {
        pending: "bg-amber-100 text-amber-700 border-amber-200",
        "in progress": "bg-blue-100 text-blue-700 border-blue-200",
        resolved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    };

    return (
        <span className={clsx("px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm", styles[status.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-200")}>
            {status}
        </span>
    );
};
