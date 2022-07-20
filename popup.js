// var alarmClock = {
//         setup: function() {
//              chrome.alarms.create("timer", {delayInMinutes: 1, periodInMinutes: 1} );
//                 window.close();
//         }
// };

function doToggleAlarm() {
    alert("Hi, this works");
    //alarmClock.setup();
}

$('#toggleAlarm').on('click', doToggleAlarm);

// document.addEventListener('DOMContentLoaded', function () {
//     alarmClock.setup();
// });

