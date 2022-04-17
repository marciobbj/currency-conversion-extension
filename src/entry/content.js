chrome.runtime.sendMessage({ code: "get-selection-data" });

async function getCurrenciesQuotes() {
  let products;
  products = chrome.storage.sync.get("prices", (result) => {
    products = result.prices;
    if (!products) {
      let url = "https://currency-pair-api.digital/api/v1/quotes/";
      fetch(url, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          chrome.runtime.sendMessage({
            code: "add-item",
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

async function getSlugs() {
  const cached_slugs = await chrome.storage.sync.get("slugs");
  let data;
  if (cached_slugs) {
    chrome.runtime.sendMessage({
      code: "add-item",
      key: "slugs",
      value: cached_slugs,
    });
  }
  let url = "https://currency-pair-api.digital/api/v1/slugs/";
  let response = await fetch(url, { method: "GET" });
  data = await response.json();
  chrome.runtime.sendMessage({
    code: "add-item",
    key: "slugs",
    value: data,
  });
  return true;
}
getSlugs();
