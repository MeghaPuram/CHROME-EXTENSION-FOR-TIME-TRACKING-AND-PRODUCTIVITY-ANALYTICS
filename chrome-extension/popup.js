
document.getElementById("refresh").addEventListener("click", fetchWeeklyReport);

let chartInstance = null;
function fetchWeeklyReport() {
    fetch("http://localhost:8080/api/activity/weekly-report/test-user-123")
        .then(response => response.json())
        .then(data => {
            console.log('Received data:', data);
            if (!data || typeof !data.totalProductiveTime === "undefined" || typeof !data.totalUnproductiveTime === "undefined") {
                console.error('Invalid data received:', data);
                return;
            } renderChart(data)
        })
        .catch(err => console.error("Error fetching report:", err));
}

function renderChart(data) {

    const ctx = document.getElementById("myChart").getContext("2d");

    if (chartInstance !== null) {
        chartInstance.destroy();
    }
    
    chartInstance = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Productive Time", "Unproductive Time"],
            datasets: [{
                data: [data.totalProductiveTime || 0, data.totalUnproductiveTime || 0],
                backgroundColor: ["#4CAF50", "#F44336"]
            }]
        },
        options: {
            title: {
                display: true,
                text: "Weekly Productivity Report"
            }
        }
    });
}