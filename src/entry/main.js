chrome.runtime.onMessage.addListener((event) => {
  if (event.code === "get-selection-data") {
    // app entry point, receiver the first message when the content.js sends get-selection-data
    // and sets the popup
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tabId = tabs[0].id;
      chrome.action.setPopup({ tabId: tabId, popup: "popup.html" });
    });
  } else if (event.code === "delete-item") {
    chrome.storage.sync.remove(event.key);
  } else if (event.code === "add-item") {
    chrome.storage.sync.set({ [event.key]: event.value });
  } else if (event.code === "debug-item") {
    // event based debugger, so nice :D
    console.log("debug message income");
    console.log(event.hi_im_from);
    console.log(event.value);
  }
  return true;
});
