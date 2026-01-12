import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { classifyIssue } from "../utils/classifyIssue";
import { Loader2, MapPin } from "lucide-react";

export const IssueForm = ({ onIssueAdded }) => {
    const { user } = useAuth();
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null);
    const [manualLocation, setManualLocation] = useState("");
    const [loading, setLoading] = useState(false);
    const [locating, setLocating] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGetLocation = () => {
        setLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setLocating(false);
                setManualLocation(""); // clear manual if auto found
            },
            (error) => {
                console.error("Error getting location", error);
                setLocating(false);
                alert("Could not get location. Please enter manually.");
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image || (!location && !manualLocation) || !description) return;

        setLoading(true);
        try {
            const category = classifyIssue(description);
            const issueData = {
                userId: user.uid,
                description,
                imageUrl: image, // Base64
                category,
                status: "pending",
                timestamp: serverTimestamp(),
                // Store location data
                ...(location ? { lat: location.lat, lng: location.lng } : { manualLocation })
            };

            await addDoc(collection(db, "issues"), issueData);

            // Reset form
            setDescription("");
            setImage(null);
            setLocation(null);
            setManualLocation("");
            onIssueAdded && onIssueAdded();

        } catch (error) {
            console.error("Error submitting report", error);
            alert("Failed to submit report");
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = image && (location || manualLocation) && description;

    return (
        <div className="relative group perspective-1000 mb-12">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Report Issue</h2>
                        <p className="text-sm text-slate-500 mt-1">Found something wrong? Let us know.</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                        <MapPin className="w-5 h-5" />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Description</label>
                        <textarea
                            className="w-full rounded-xl border-slate-200 bg-slate-50/50 p-4 text-slate-700 shadow-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all font-medium resize-none"
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the issue in detail (e.g., 'Large pothole on Main St near the post office')..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Photo Evidence</label>
                            <div className="relative group/image">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="block w-full text-sm text-slate-500 
                    file:mr-4 file:py-2.5 file:px-4 
                    file:rounded-full file:border-0 
                    file:text-xs file:font-semibold 
                    file:bg-blue-50 file:text-blue-700 
                    hover:file:bg-blue-100 cursor-pointer
                    border border-slate-200 rounded-xl p-1 bg-white"
                                />
                            </div>
                            {image && (
                                <div className="mt-3 relative rounded-xl overflow-hidden shadow-md border border-slate-100 group-hover/image:shadow-lg transition-all h-32 bg-slate-100">
                                    <img src={image} alt="Preview" className="h-full w-full object-cover" />
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Location</label>
                            <div className="flex flex-col space-y-3">
                                <button
                                    type="button"
                                    onClick={handleGetLocation}
                                    disabled={locating}
                                    className="flex items-center justify-center w-full px-4 py-2.5 border border-slate-200 shadow-sm text-sm font-semibold rounded-xl text-slate-600 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all focus:ring-2 focus:ring-offset-1 focus:ring-slate-200"
                                >
                                    {locating ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <MapPin className="h-4 w-4 mr-2 text-blue-500" />}
                                    {locating ? "Acquiring..." : "Auto-Detect Location"}
                                </button>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-slate-200" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white/80 backdrop-blur px-2 text-slate-400">or enter manually</span>
                                    </div>
                                </div>

                                <input
                                    type="text"
                                    placeholder="Street address or landmark..."
                                    value={manualLocation}
                                    onChange={(e) => setManualLocation(e.target.value)}
                                    disabled={!!location}
                                    className={`block w-full rounded-xl border-slate-200 bg-white p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm transition-all ${location ? 'opacity-50 cursor-not-allowed bg-slate-100' : ''}`}
                                />
                                {location && <div className="text-emerald-600 text-xs font-medium flex items-center justify-center animate-pulse"><MapPin className="h-3 w-3 mr-1" /> Coordinates Locked</div>}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!isFormValid || loading}
                        className="w-full relative overflow-hidden group flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-500/30 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Submit Official Report"}
                    </button>
                </form>
            </div>
        </div>
    );
};
