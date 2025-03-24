let activeTabId = null;
let startTime = null;
let currentUrl = "";

chrome.tabs.onActivated.addListener(activeInfo => {
    if (activeTabId && startTime) {
        recordTimeSpent();
    }
    chrome.tabs.get(activeInfo.tabId, tab => {
        if (tab.url) {
            activeTabId = tab.id;
            currentUrl = new URL(tab.url).hostname;
            startTime = Date.now();
        }
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tabId === activeTabId && changeInfo.url) {
        recordTimeSpent();
        currentUrl = new URL(changeInfo.url).hostname;
        startTime = Date.now();
    }
});

chrome.windows.onFocusChanged.addListener(windowId => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        recordTimeSpent();
    }
});

function recordTimeSpent() {
    if (!currentUrl || !startTime) return;
    let duration = Math.floor((Date.now() - startTime) / 1000);
    fetch("http://localhost:8080/api/activity/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: "test-user-123",
            url: currentUrl,
            duration: duration,
            timestamp: new Date().toISOString()
        })
    }).catch(err => console.error("Error sending data:", err));
    startTime = null;
}