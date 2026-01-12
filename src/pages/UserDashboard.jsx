import { useEffect, useState } from "react";
import { IssueForm } from "../components/IssueForm";
import { IssueList } from "../components/IssueList";
import { db } from "../lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export const UserDashboard = () => {
    const { user } = useAuth();
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchIssues = async () => {
        setLoading(true);
        try {
            // Need composite index for userId + timestamp desc usually
            // If error, likely index missing. For now, simple client sort if needed, or hope single field query works efficiently enough.
            // Firestore requires index for complex queries.
            // Simplest for robust demo: fetch by userId, then desc sort locally if firestore errors.
            // But let's try order first.
            const q = query(
                collection(db, "issues"),
                where("userId", "==", user.uid),
                orderBy("timestamp", "desc")
            );
            const querySnapshot = await getDocs(q);
            const issuesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setIssues(issuesData);
        } catch (error) {
            console.warn("Index might be missing, falling back to unsorted", error);
            // Fallback
            try {
                const q = query(collection(db, "issues"), where("userId", "==", user.uid));
                const querySnapshot = await getDocs(q);
                const issuesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Sort client side
                issuesData.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
                setIssues(issuesData);
            } catch (e) {
                console.error("Error fetching", e);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchIssues();
    }, [user]);

    const activeIssues = issues.filter(i => ["pending", "in progress"].includes(i.status?.toLowerCase()));
    const resolvedIssues = issues.filter(i => i.status?.toLowerCase() === "resolved");

    return (
        <div className="space-y-8 animate-fade-in-up">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
                <p className="text-gray-500 mt-2">Report and track local issues in your area.</p>
            </header>

            <IssueForm onIssueAdded={fetchIssues} />

            <div>
                <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center border-b border-slate-200 pb-3">
                    <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-xs mr-3 shadow-sm">ACTIVE</span>
                    Pending & In Progress
                </h2>
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-300"></div>
                    </div>
                ) : (
                    <IssueList issues={activeIssues} />
                )}
            </div>

            <div>
                <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center border-b border-slate-200 pb-3">
                    <span className="bg-emerald-100 text-emerald-700 py-1 px-3 rounded-full text-xs mr-3 shadow-sm">ARCHIVE</span>
                    Resolved History
                </h2>
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-300"></div>
                    </div>
                ) : (
                    <IssueList issues={resolvedIssues} />
                )}
            </div>
        </div>
    );
};
