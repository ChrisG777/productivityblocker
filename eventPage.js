function blocker()
{
  alert("Page has been blocked!");
}

var link;

// function sendCurrentUrl() {
//   chrome.tabs.query(
//       {active: true, currentWindow: true},
//       (tabs) => {
//         var tablink = tabs[0].url;
//         chrome.storage.sync.set({ link: tablink});
//         console.log(tablink);
//       });
// }


chrome.alarms.onAlarm.addListener(function(alarm) {
  chrome.tabs.query(
      {active: true, currentWindow: true},
      (tabs) => {
          chrome.scripting.executeScript(
              {
                  target: { tabId: tabs[0].id},
                  func: blocker,
              }
          );
      });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) run(tab);
});

chrome.tabs.onActivated.addListener(info => {
  chrome.tabs.get(info.tabId, run);
});

const processingTabId = {};

function run(tab) {
  if (processingTabId[tab.id]) return;
  processingTabId[tab.id] = true;
  if (tab.url) {
    let newUrl = new URL(tab.url);
    currentHost = newUrl.host;
    currentUrl = tab.url;
    console.log(currentUrl);
  }
  
  // doSomeAsyncStuff(() => {
  //   //................................
  //   // when all done:
  //   delete processingTabId[tab.id];
  // });
}


