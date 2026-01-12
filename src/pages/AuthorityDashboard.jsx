import { useEffect, useState } from "react";
import { IssueList } from "../components/IssueList";
import { db } from "../lib/firebase";
import { collection, getDocs, orderBy, query, updateDoc, doc } from "firebase/firestore";

export const AuthorityDashboard = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchIssues = async () => {
        setLoading(true);
        try {
            // For complex sorting (upvotes length), client-side sorting is often easier/cheaper for small datasets
            // as Firestore doesn't support sorting by array length directly.
            const q = query(collection(db, "issues"));
            const querySnapshot = await getDocs(q);
            const issuesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Client-side Sort: Priority (Upvotes) -> Recency
            issuesData.sort((a, b) => {
                const upvotesA = (a.upvotes || []).length;
                const upvotesB = (b.upvotes || []).length;
                if (upvotesB !== upvotesA) return upvotesB - upvotesA;

                return (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0);
            });

            setIssues(issuesData);
        } catch (error) {
            console.error("Error fetching issues:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await updateDoc(doc(db, "issues", id), {
                status: newStatus
            });
            // Optimistic update
            setIssues(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status");
            fetchIssues(); // Revert on fail
        }
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    const activeIssues = issues.filter(i => ["pending", "in progress"].includes(i.status?.toLowerCase()));
    const resolvedIssues = issues.filter(i => i.status?.toLowerCase() === "resolved");

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center border-b pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Authority Controls</h1>
                    <p className="text-gray-500 mt-1">Manage and resolve reported issues globally.</p>
                </div>
                <button
                    onClick={fetchIssues}
                    className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium shadow-sm transition-colors"
                >
                    Refresh Data
                </button>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 border border-blue-100 shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 shadow-lg shadow-blue-500/50"></span>
                    Active Issues
                </h2>
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <IssueList issues={activeIssues} isAuthority={true} onStatusUpdate={handleStatusUpdate} />
                )}
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 border border-emerald-100 shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center">
                    <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3 shadow-lg shadow-emerald-500/50"></span>
                    Resolved Issues
                </h2>
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <IssueList issues={resolvedIssues} isAuthority={true} onStatusUpdate={handleStatusUpdate} />
                )}
            </div>
        </div>
    );
};
