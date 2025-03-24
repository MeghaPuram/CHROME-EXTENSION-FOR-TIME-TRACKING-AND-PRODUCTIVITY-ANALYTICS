
import React, { useEffect, useState } from "react";
import ProductivityChart from "../components/ProductivityChart";
import WebsiteList from "../components/WebsiteList";

function Dashboard() {
  const userId = "test-user-123"; 
    const [productivityData, setProductivityData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/activity/weekly-report/test-user-123")
            .then(response => response.json())
            .then(data => {
                console.log("Received data:", data);
                if (!data || data.totalProductiveTime === undefined || data.totalUnproductiveTime === undefined) {
                    throw new Error("Invalid data received");
                }
                setProductivityData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching report:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div>
           
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {productivityData && <ProductivityChart data={productivityData} />}

            <WebsiteList />
        </div>
    );
}

export default Dashboard;