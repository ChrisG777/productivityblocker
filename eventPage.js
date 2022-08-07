var blockedSites = [];

function timer()
{
  alert("Timer has been set");
}

//freezing code taken from https://www.sitepoint.com/lock-freeze-web-page-jquery/

/* 
listener for alarms
*/
chrome.alarms.onAlarm.addListener(function(alarm) {
  var curId = alarm.name;
  chrome.tabs.query({}, function (tabs) {
      var found = false;
      var tabnumber;
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].id.toString() == curId.toString()){
                found = true;
                tabnumber = i;
            }
        }
        if (found == false){
            return;
        } 
        chrome.tabs.update(tabs[tabnumber].id, {selected: true});
        chrome.tabs.query(
          {active: true, currentWindow: true},
          (tabs) => {
              chrome.scripting.executeScript(
                  {
                      target: { tabId: tabs[0].id},
                      files: ['inject.js']
                  }
              );
              doToggleAlarm(tabs[tabnumber].url, tabs[tabnumber].id);
          });
  });
});

/*
creating an alarm
*/
var alarmClock = {
        setup: function(curId) {
            chrome.storage.sync.get(["timertime"], function (timer) {
              chrome.alarms.create(curId.toString(), {delayInMinutes: parseInt(timer.timertime)} );
            })
        }
};

function doToggleAlarm(curUrl, curId) {
    alarmClock.setup(curId);

    //check if the alarm was actually set
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

chrome.tabs.onCreated.addListener(function(tab) {
  setTimeout(function() {chrome.tabs.get(tab.id, run);}, 5000);
})

const processingTabId = {};

function checkUrl(curUrl, curId) {
  var flag = false;
  chrome.storage.sync.get(["links"], function (linkarr) {
    try {
      for (var i=0; i<linkarr.links.length; i++)
      {
        var element = linkarr.links[i];
        if (curUrl.includes(element))
        {
          flag = true;
        }
      }
      if (flag)
      {
        chrome.alarms.getAll(function (alarmarr){
          var flag2 = false;
          for (var i=0; i<alarmarr.length; i++)
          {
            if (alarmarr[i].name == curId.toString())
            {
              flag2 = true;
              break;
            }
          }
          if (!flag2)
          {
            doToggleAlarm(currentUrl, curId);
          }
        });
      }
    }
    catch (err) {
      console.log("nothing in options yet");
      return; 
    }
      
});
}

function run(tab) {
  if (processingTabId[tab.id]) return;
  processingTabId[tab.id] = true;
  if (tab.url) {
    let newUrl = new URL(tab.url);
    currentHost = newUrl.host;
    currentUrl = tab.url;
    currentId = tab.id;
    checkUrl(currentUrl, currentId);
  }
  setTimeout(function () {processingTabId[tab.id] = false;}, 1000);
}


