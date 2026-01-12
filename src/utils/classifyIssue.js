export const classifyIssue = (description) => {
    const text = description.toLowerCase();

    if (text.includes("leak") || text.includes("water") || text.includes("pipe") || text.includes("drain")) {
        return "Water Leakage";
    }
    if (text.includes("garbage") || text.includes("trash") || text.includes("rubbish") || text.includes("waste") || text.includes("dump")) {
        return "Garbage";
    }
    if (text.includes("road") || text.includes("pothole") || text.includes("crack") || text.includes("asphalt")) {
        return "Road Damage";
    }
    if (text.includes("light") || text.includes("lamp") || text.includes("dark") || text.includes("pole")) {
        return "Streetlight";
    }

    return "Other";
};
