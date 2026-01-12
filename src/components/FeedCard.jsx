import { MapPin, ThumbsUp } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { clsx } from "clsx";

export const FeedCard = ({ issue, currentUserId, onToggleVote }) => {
    const upvotes = issue.upvotes || [];
    const hasVoted = currentUserId ? upvotes.includes(currentUserId) : false;
    const voteCount = upvotes.length;

    return (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* Visual Header */}
            <div className="relative h-56 bg-slate-100">
                {issue.imageUrl ? (
                    <img
                        src={issue.imageUrl}
                        alt={issue.category}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-slate-400 font-medium">
                        No Image Provided
                    </div>
                )}
                <div className="absolute top-4 right-4 shadow-sm">
                    <StatusBadge status={issue.status} />
                </div>
                <div className="absolute bottom-4 left-4">
                    <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                        {issue.category}
                    </span>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="flex items-center text-xs text-slate-500 mb-1 space-x-2">
                            <span>{issue.timestamp?.seconds ? new Date(issue.timestamp.seconds * 1000).toLocaleDateString(undefined, { dateStyle: 'medium' }) : 'Just now'}</span>
                            <span>•</span>
                            <span className="flex items-center text-slate-400">
                                <MapPin className="w-3 h-3 mr-1" />
                                {issue.manualLocation || "Location pinned"}
                            </span>
                        </div>
                        <p className="text-slate-800 text-sm font-medium leading-relaxed line-clamp-3">
                            {issue.description}
                        </p>
                    </div>
                </div>

                {/* Interaction Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-2">
                    <button
                        onClick={() => onToggleVote(issue.id, hasVoted)}
                        disabled={!currentUserId}
                        className={clsx(
                            "flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 group",
                            hasVoted
                                ? "bg-blue-50 text-blue-600 ring-1 ring-blue-100"
                                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                        )}
                    >
                        <ThumbsUp
                            className={clsx(
                                "w-4 h-4 transition-transform group-active:scale-125",
                                hasVoted ? "fill-current" : ""
                            )}
                        />
                        <span className="text-sm font-bold">{voteCount}</span>
                        <span className="text-xs font-medium opacity-80">{voteCount === 1 ? 'Support' : 'Supports'}</span>
                    </button>

                    {!currentUserId && (
                        <span className="text-xs text-slate-400 italic">Login to vote</span>
                    )}
                </div>
            </div>
        </div>
    );
};
