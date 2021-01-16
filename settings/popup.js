const inAcronymDBFile = document.getElementById("acronym-db-file");
const divStatus = document.getElementById("status");
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
    chrome.storage.local.set({ items }, () => {
      divStatus.innerText = ACRONYM_LOADED_STATUS;
    });
  });
  reader.readAsText(file);
}

function loadState() {
  chrome.storage.local.get("items", (result) => {
    const items = result && result.items;
    if (items.length > 0) {
      divStatus.innerText = ACRONYM_LOADED_STATUS;
    }
  });
}

inAcronymDBFile.addEventListener("change", (event) => {
  const files = event.target.files;
  if (files.length === 1) {
    readImage(files[0]);
  }
});

loadState();