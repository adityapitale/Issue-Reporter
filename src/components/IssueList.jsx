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

                        {/* Support Count Display */}
                        <div className="flex items-center space-x-2 mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100/50">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Community Support:</span>
                            <div className="flex items-center space-x-1 text-blue-600">
                                <span className="font-bold text-lg">{(issue.upvotes || []).length}</span>
                                <span className="text-xs font-medium">votes</span>
                            </div>
                        </div>

                        {isAuthority && (
                            <div className="mt-5">
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Update Status</label>
                                <div className="relative">
                                    <select
                                        value={issue.status?.toLowerCase() || 'pending'}
                                        onChange={(e) => onStatusUpdate(issue.id, e.target.value)}
                                        className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-3 px-4 pr-8 rounded-xl font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer shadow-sm hover:border-blue-300"
                                    >
                                        <option value="pending">Pending Review</option>
                                        <option value="in progress">In Progress</option>
                                        <option value="resolved">Resolved</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
