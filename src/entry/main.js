chrome.runtime.onMessage.addListener((request) => {
    if (request.message === "get-selection-data") {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let tabId = tabs[0].id;
        chrome.scripting.executeScript(
          {
            target: { tabId: tabId },
            function: getSupportedQuotes,
          },
          (response) => {
            const prices = response[0].result;
            chrome.storage.sync.set({ prices: prices });
            chrome.action.setPopup({ tabId: tabId, popup: "popup.html" });
          }
        );
      });
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
  