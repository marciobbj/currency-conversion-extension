chrome.runtime.onMessage.addListener((request) => {
  if (request.message === "get-selection-data") {
    // app entry point, receiver the first message when the content.js sends get-selection-data
    // and sets the popup
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tabId = tabs[0].id;
      chrome.action.setPopup({ tabId: tabId, popup: "popup.html" });
    });
  } else if (request.message === "delete-item") {
    chrome.storage.sync.remove(request.key);
  } else if (request.message === "add-item") {
    chrome.storage.sync.set({ [request.key]: request.value });
  }
  return true;
});
