import { StatusBadge } from "./StatusBadge";

export const IssueList = ({ issues, onStatusUpdate, isAuthority }) => {
    if (issues.length === 0) {
        return <div className="text-center text-gray-500 py-8">No reports found.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {issues.map((issue) => (
                <div key={issue.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
                    <div className="h-48 w-full bg-slate-100 relative overflow-hidden">
                        {issue.imageUrl ? (
                            <img src={issue.imageUrl} alt={issue.category} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-slate-300">
                                <span className="text-sm">No Evidence</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                        <div className="absolute top-3 right-3 shadow-lg">
                            <StatusBadge status={issue.status} />
                        </div>
                        <div className="absolute bottom-3 left-3">
                            <span className="text-xs font-bold text-white bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
                                {issue.category}
                            </span>
                        </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                                {issue.timestamp?.seconds ? new Date(issue.timestamp.seconds * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Pending...'}
                            </span>
                        </div>
                        <p className="text-slate-700 mb-4 line-clamp-3 text-sm font-medium leading-relaxed flex-1">{issue.description}</p>

                        <div className="text-xs text-slate-500 mt-auto pt-4 border-t border-slate-100 space-y-1">
                            {issue.manualLocation && (
                                <div className="flex items-center">
                                    <span className="mr-1">📍</span>
                                    <span className="truncate">{issue.manualLocation}</span>
                                </div>
                            )}
                            {issue.lat && (
                                <div className="flex items-center" title={`${issue.lat}, ${issue.lng}`}>
                                    <span className="mr-1">🛰️</span>
                                    <span className="font-mono">{issue.lat.toFixed(4)}, {issue.lng.toFixed(4)}</span>
                                </div>
                            )}
                        </div>

                        {isAuthority && (
                            <div className="mt-5 grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => onStatusUpdate(issue.id, "in progress")}
                                    className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 px-3 rounded-xl font-bold transition-colors border border-blue-100"
                                >
                                    Start Work
                                </button>
                                <button
                                    onClick={() => onStatusUpdate(issue.id, "resolved")}
                                    className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-2.5 px-3 rounded-xl font-bold transition-colors border border-emerald-100"
                                >
                                    Resolve
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
