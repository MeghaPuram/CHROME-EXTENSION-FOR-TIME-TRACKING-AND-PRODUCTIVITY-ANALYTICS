import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const ProductivityChart = ({ userId }) => {
    const chartRef = useRef(null); // Ref to store the canvas element
    const chartInstance = useRef(null); // Ref to store the chart instance
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const userId = "test-user-123"; 
                const response = await fetch(`http://localhost:8080/api/activity/weekly-report/${userId}`);
                const data = await response.json();

                console.log("Received Data:", data); 

                if (!data || data.totalProductiveTime === undefined || data.totalUnproductiveTime === undefined) {
                    throw new Error("Invalid data received");
                }

                // Destroy existing chart if it exists
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                // Create new chart
                const ctx = chartRef.current.getContext("2d");
                chartInstance.current = new Chart(ctx, {
                    type: "doughnut",
                    data: {
                        labels: ["Productive Time", "Unproductive Time"],
                        datasets: [{
                            data: [data.totalProductiveTime, data.totalUnproductiveTime],
                            backgroundColor: ["#4CAF50", "#F44336"]
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });

            } catch (err) {
                console.error("Error fetching report:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Cleanup function to destroy chart when component unmounts
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [userId]); // Re-run when userId changes

    return (
        <div style={{ width: "100%", height: "300px" }}>
            <h3 className="text-xl font-bold my-10 mb-4 ">Weekly Productivity Report</h3>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default ProductivityChart;