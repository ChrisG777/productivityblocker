function doInCurrentTab(tabCallback) {
    chrome.tabs.query(
        { currentWindow: true, active: true },
        function (tabArray) { tabCallback(tabArray[0]); }
    );
}

function blocker()
{
  alert("Page has been blocked!");
}

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
  console.log("Here");
});

