import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import { FeedCard } from "../components/FeedCard";
import { FilterBar } from "../components/FilterBar";

export const CommunityFeed = () => {
    const { user } = useAuth();
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");

    const categories = ["Water Leakage", "Garbage", "Road Damage", "Streetlight", "Other"];

    const fetchIssues = async () => {
        setLoading(true);
        try {
            // Fetch all issues, sort by timestamp
            // Ideally we would pagination here, but for now we fetch all
            const q = query(collection(db, "issues"), orderBy("timestamp", "desc"));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setIssues(data);
        } catch (error) {
            console.error("Error fetching feed:", error);
            // Fallback for missing index
            try {
                const q = query(collection(db, "issues"));
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                data.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
                setIssues(data);
            } catch (e) {
                console.error("Fallback failed", e);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    const handleToggleVote = async (issueId, hasVoted) => {
        if (!user) {
            alert("Please login to vote!");
            return;
        }

        // Optimistic UI Update
        setIssues(prevIssues => prevIssues.map(issue => {
            if (issue.id === issueId) {
                const currentUpvotes = issue.upvotes || [];
                return {
                    ...issue,
                    upvotes: hasVoted
                        ? currentUpvotes.filter(uid => uid !== user.uid)
                        : [...currentUpvotes, user.uid]
                };
            }
            return issue;
        }));

        try {
            const issueRef = doc(db, "issues", issueId);
            if (hasVoted) {
                await updateDoc(issueRef, {
                    upvotes: arrayRemove(user.uid)
                });
            } else {
                await updateDoc(issueRef, {
                    upvotes: arrayUnion(user.uid)
                });
            }
        } catch (error) {
            console.error("Error voting:", error);
            // Revert optimistic update if failed (fetching fresh would be better but expensive)
            fetchIssues();
        }
    };

    // Filter Logic
    const filteredIssues = issues.filter(issue => {
        const categoryMatch = selectedCategory === "All" || (issue.category || "Other") === selectedCategory;
        const statusMatch = selectedStatus === "All" || (issue.status || "pending").toLowerCase() === selectedStatus.toLowerCase();
        return categoryMatch && statusMatch;
    });

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Community Pulse</h1>
                <p className="text-slate-500">See what's happening in your neighborhood and support important reports.</p>
            </div>

            <FilterBar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
            />

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                </div>
            ) : filteredIssues.length > 0 ? (
                <div className="space-y-8">
                    {filteredIssues.map(issue => (
                        <FeedCard
                            key={issue.id}
                            issue={issue}
                            currentUserId={user?.uid}
                            onToggleVote={handleToggleVote}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-slate-300">
                    <p className="text-slate-500 font-medium">No reports found matching your filters.</p>
                    <button onClick={() => { setSelectedCategory("All"); setSelectedStatus("All") }} className="mt-4 text-blue-600 font-semibold text-sm hover:underline">
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
};
