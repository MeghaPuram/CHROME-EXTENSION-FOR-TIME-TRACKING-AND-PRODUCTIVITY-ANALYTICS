import React, { useEffect, useState } from "react";

function WebsiteList() {
    const [websites, setWebsites] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/activity/user-report/test-user-123")
            .then(response => response.json())
            .then(data => {
                console.log("Received websites:", data);
                if (!Array.isArray(data)) {
                    throw new Error("Invalid data format received");
                }
                setWebsites(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching website list:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold my-8 mb-4">Tracked Websites</h2>
            <table className="w-full border-collapse border border-gray-300">
           <thead>
             <tr className="bg-gray-400">
               <th className="border border-gray-300 p-2">Website</th>
              <th className="border border-gray-300 p-2">Time Spent (seconds)</th>
              <th className="border border-gray-300 p-2">Timestamp</th>
            </tr>
           </thead>
                <tbody>
                    
                            {websites.map((site, index) => (
                                <tr key={index} className="border border-gray-300">
                                
                                    <td className="p-2">{site.url}</td>
                                    <td className="p-2">{site.duration}</td>
                                    <td className="p-2">{new Date(site.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                       
                </tbody>

            </table>
        </div>

    );
}

export default WebsiteList;
