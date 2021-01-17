const inAcronymDBFile = document.getElementById("acronym-db-file");
const divStatus = document.getElementById("status");
const cleanDb = document.getElementById("clean-db");

const ACRONYM_LOADED_STATUS = "Ready";

function readImage(file) {
  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    const content = event.target.result;
    const items = content
      .split("\n")
      .filter((line) => line && line.trim().length > 0)
      .map((line) => {
        return line.replace(/^\"(.*?)\"$/g, "$1").split('","');
      })
      .map((fields) => {
        return { acr: fields[0], val: fields[1] };
      });

    // create the acronym map
    const itemsMap = {};
    items.forEach((item) => (itemsMap[item.acr] = item.val));

    chrome.storage.local.set({ tipname_items: itemsMap }, () => {
      divStatus.className = "ready";
      divStatus.innerText = ACRONYM_LOADED_STATUS;
      cleanDb.className = "clean_db_loaded";
    });
  });
  reader.readAsText(file);
}

function loadState() {
  chrome.storage.local.get("tipname_items", (result) => {
    const items = result && result.tipname_items;
    if (items) {
      divStatus.className = "ready";
      divStatus.innerText = ACRONYM_LOADED_STATUS;
      cleanDb.className = "clean_db_loaded";
    } else {
      divStatus.className = "no_acronym";
      divStatus.innerText = "No acronym loaded";
      cleanDb.className = "clean_db_unloaded";
    }
  });
}

inAcronymDBFile.addEventListener("change", (event) => {
  const files = event.target.files;
  if (files.length === 1) {
    readImage(files[0]);
  }
});

cleanDb.addEventListener("click", (event) => {
  event.preventDefault();
  chrome.storage.local.set({ tipname_items: null }, () => {
    loadState();
  });
});

loadState();
