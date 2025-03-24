import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../components/Dashboard";

const Home = () => {
    const [websites, setWebsites] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/activity/weekly-report/test-user-123")

            .then((response) => setWebsites(response.data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="p-6 bg-gray-200 min-h-screen">
            <h1 className="text-4xl font-bold mb-4 text-center">Time Tracker Dashboard</h1>
            <Dashboard />

        </div>
    );
};

export default Home;