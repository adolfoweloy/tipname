function findAcronym(selection, callback) {
  chrome.storage.local.get("items", (result) => {
    if (result && !result.items) {
      alert("There is no acronym DB loaded");
    }
    const items = result && result.items;
    const itemFound = items[selection];
    if (itemFound) {
      callback(itemFound);
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
    onclick: (info, tab) => {
      findAcronym(info.selectionText, (value) => {
        alert(value);
      });
    },
  });
});
