document.addEventListener("DOMContentLoaded", function () {
    fetchWebsites();
});

function fetchWebsites() {
    fetch("http://localhost:8080/api/activity/user-report/test-user-123")
        .then(response => response.json())
        .then(data => {
            console.log("Received websites:", data);
            if (!Array.isArray(data)) {
                throw new Error("Invalid data format received");
            }
            displayWebsites(data);
        })
        .catch(error => console.error("Error fetching websites:", error));
}

function displayWebsites(websites) {
    const websiteList = document.getElementById("websiteList");
    websiteList.innerHTML = ""; // Clear old data

    if (!websites || websites.length === 0) {
        websiteList.innerHTML = "<tr><td colspan='2'>No tracked websites found.</td></tr>";
        return;
    }

    websites.forEach(site => {
        const row = document.createElement("tr")
        const urlCell = document.createElement("td");
        urlCell.textContent = `${site.url}`;
        const durationCell = document.createElement("td");
        durationCell.textContent = `${site.duration} sec`;
        const timeCell = document.createElement("td");
        timeCell.textContent = ` ${new Date(site.timestamp).toLocaleString()}`;
        
        row.appendChild(urlCell);
        row.appendChild(durationCell);
        row.appendChild(timeCell);
        websiteList.appendChild(row);
    });
}
