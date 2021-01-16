function findAcronym(selection, callback) {
  chrome.storage.local.get("items", (result) => {
    const items = result && result.items;
    const itemFound = items.find((item) => item.acr === selection);
    if (itemFound) {
      callback(itemFound.val);
    } else {
      callback("Nothing found");
    }
  });
}

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "acronymLookup",
    title: "Lookup for acronym def",
    contexts: ["selection"],
    onclick: () => {
      findAcronym("IMHO", (value) => {
        alert(value);
      });
    },
  });
});
