chrome.runtime.onMessage.addListener((request, sender) => {
    console.log(request);
    if (!sender.url.includes("chrome://")) {
      if (request.message === "get-selection-data") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          let tabId = tabs[0].id;
          chrome.scripting.executeScript(
            {
              target: { tabId: tabId },
              function: getSelectionText,
            },
            (resp) => {
              const b = resp[0].result;
              console.log("setting value of selection in storage");
              chrome.storage.sync.set({ value: b });
              chrome.action.setPopup({ tabId: tabId, popup: "popup.html" });
              console.log("setting popup")
            }
          );
        });
      }
    }
    return true;
  });
  
  function getSelectionText() {
    let selection = document.getSelection().toString();
    //validate selection
    if (isNaN(Number(selection))) {
      selection = 0;
    } else {
      selection = Number(selection);
    }
    return selection;
  }
  