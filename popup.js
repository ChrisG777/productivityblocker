var alarmClock = {
        setup: function() {
             chrome.alarms.create("sitetimer", {delayInMinutes: 1, periodInMinutes: 1} );
                window.close();
        }
};

function doToggleAlarm() {
    alarmClock.setup();
    chrome.alarms.getAll(function(alarms) {
       var hasAlarm = alarms.some(function(a) {
         alert(a.name);
       });
    });
}

$('#toggleAlarm').on('click', doToggleAlarm);

// document.addEventListener('DOMContentLoaded', function () {
//     alarmClock.setup();
// });