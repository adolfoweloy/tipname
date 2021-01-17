function findAcronym(selection, callback) {
  chrome.storage.local.get("tipname_items", (result) => {
    if (result && !result.tipname_items) {
      alert("There is no acronym DB loaded");
      return;
    }
    const items = result && result.tipname_items;
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
