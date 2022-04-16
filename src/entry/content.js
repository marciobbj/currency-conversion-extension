chrome.runtime.sendMessage({ message: "get-selection-data" });

// buf.toString('base64')

async function getCurrenciesQuotes() {
  let products;
  products = chrome.storage.sync.get("prices", (result) => {
    products = result.prices;
    if (!products) {
      
      const url = 'http://143.198.147.98/quotes/'

      fetch(url, { method: "GET"})
        .then((response) => response.json())
        .then((data) => {
          chrome.runtime.sendMessage({
            message: "add-item",
            key: "prices",
            value: data,
          });
        });
    } else {
      return products;
    }
  });
  //only create a request if no quote is in the state of the browser
}
getCurrenciesQuotes();
