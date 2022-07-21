// function getCurrentWindowActiveTabIndex () {
//     return new Promise((resolve, reject) => {
//         chrome.tabs.query({
//             currentWindow: true,
//             active: true,
//         }, (currentWindowActiveTabs = []) => {
//             if (!currentWindowActiveTabs.length) reject();
//             resolve(currentWindowActiveTabs[0].index);
//         });
//     });
// }

chrome.alarms.onAlarm.addListener(function(alarm) {
  // const tabId = getCurrentWindowActiveTabIndex();
  // chrome.scripting.executeScript(
  //     {
  //       target: {tabID: tabID},
  //       files: ['blocker.js'],
  //     });
  console.log("Here");
});

