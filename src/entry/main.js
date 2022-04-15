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
            console.log(prices)
            chrome.storage.sync.set({ prices: prices });
            chrome.action.setPopup({ tabId: tabId, popup: "popup.html" });
          }
        );
      });
    }
    return true;
  });
// buf.toString('base64')
function getSupportedQuotes() {
    const url = `http://localhost:8001/quotes/` 
    let username = 'Th3B3sTuS3RN4m3';
    let password = '2HB9actVqBAg%8!gSE5WFdV3^RMKpKca9f^8364X7npC7Q';
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
    let response = fetch(url, {method: 'GET', headers: headers}).then(response => response.json()).then(data => data)
    return response
}
  
  