chrome.runtime.onMessage.addListener((request, sender) => {
    console.log(request);
    if (!sender.url.includes("chrome://")) {
      if (request.message === "get-selection-data") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          let tabId = tabs[0].id;
          chrome.scripting.executeScript(
            {
              target: { tabId: tabId },
              function: getSupportedQuotes,
            },
            (resp) => {
              const b = resp[0].result;
              console.log("setting value of selection in storage");
              console.log(b)
              chrome.storage.sync.set({ prices: b });
              chrome.action.setPopup({ tabId: tabId, popup: "popup.html" });
              console.log("setting popup")
            }
          );
        });
      }
    }
    return true;
  });
  
  function getSupportedQuotes() {
    // fetch current prices
    return {
      "BRL-USD": 0.21,
      "USD-BRL": 4.69,
      "EUR-USD": 1.09,
      "USD-EUR": 0.92,
      "BRL-EUR": 0.20,
      "EUR-BRL": 5.11,
      "BRL-BRL": 1,
      "EUR-EUR": 1,
      "USD-USD": 1
    };
  }
  