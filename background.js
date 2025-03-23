chrome.runtime.onInstalled.addListener(() => {
    console.log("Extensão instalada");
    chrome.storage.local.set({key: {"extensionState": true}}, null);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.copyToClipboard) {
        navigator.clipboard.writeText(request.copyToClipboard).then(() => {
            sendResponse({ success: true });
        }).catch(err => {
            sendResponse({ success: false, error: err });
        });
    }
});