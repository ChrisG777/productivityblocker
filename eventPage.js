const blockedSites = ["youtube.com"];

function timer()
{
  alert("Timer has been set");
}
function blocker()
{
  alert("Page has been blocked!");
}
/* 
listener for alarms
*/
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

/*
creating an alarm
*/
var alarmClock = {
        setup: function(urlName) {
             chrome.alarms.create(urlName, {delayInMinutes: 1} );
        }
};

function doToggleAlarm(curUrl) {
    alarmClock.setup(curUrl);
    chrome.alarms.getAll(function(alarms) {
       var hasAlarm = alarms.some(function(a) {
          chrome.tabs.query(
          {active: true, currentWindow: true},
          (tabs) => {
              chrome.scripting.executeScript(
                  {
                      target: { tabId: tabs[0].id},
                      func: timer,
                  }
              );
          });
       });
    });
}


/*
listeners for tab changes
*/
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) run(tab);
});

chrome.tabs.onActivated.addListener(info => {
  chrome.tabs.get(info.tabId, run);
});

const processingTabId = {};

function checkUrl(curUrl) {
  for (i of blockedSites)
  {
    if (curUrl.includes(i))
    {
      return true;
    }
  }
  return false; 
}

function run(tab) {
  if (processingTabId[tab.id]) return;
  processingTabId[tab.id] = true;
  if (tab.url) {
    let newUrl = new URL(tab.url);
    currentHost = newUrl.host;
    currentUrl = tab.url;
    console.log(currentUrl);
    if (checkUrl(currentUrl))
    {
      doToggleAlarm(currentUrl);
    }
  }
}


