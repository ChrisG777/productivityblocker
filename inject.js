function blocker()
{
  // making all the html elements needed for the countdown
  var elem = document.createElement('div');
  elem.style.cssText = 'position:absolute;z-index:1001;top:32%;left:32%;width:300px;border:3px solid blue;padding:70px;text-overflow: ellipsis;';
  elem.id = "countdown_box";
  document.body.appendChild(elem);

  var title = document.createElement('div');
  title.style.cssText = 'font-family: tahoma;font-weight: bold;z-index:1002;color: white;font-size: 18px;';
  title.id = "countdown_title";
  title.innerHTML = "Tab is frozen";
  elem.appendChild(title);
 
  var countdown_text = document.createElement('div');
  countdown_text.style.cssText = 'font-family: tahoma;z-index:1002;font-weight: bold;color: white;font-size: 56px;';
  countdown_text.id = "countdown_div";
  elem.appendChild(countdown_text);

  var locker = document.createElement('div');
  locker.style.cssText = 'position:absolute;top:0;left:0; z-index:1000;opacity:1.0;width:100%;height:10000%;color:white;background-color:black';
  locker.id = "uiLockId";
  document.body.appendChild(locker);

  var duration = 10;
  update_clock(duration+1);
}


function format_as_time(seconds) {
    var minutes = parseInt(seconds/60);
    var seconds = seconds - (minutes*60);

    if (minutes <  10) {
      minutes = "0"+minutes;
    }

    if (seconds <  10) {
      seconds = "0"+seconds;
    }

    var return_var = minutes+':'+seconds;
    return return_var;
}

function remove_elt(elt_name)
{
  var elem = document.getElementById(elt_name);
  elem.parentElement.removeChild(elem);
}
function update_clock(value) {
    new_time = value - 1;
    var cd_div = document.getElementById('countdown_div');
    if (new_time > 0) {
      cd_div.innerHTML = format_as_time(new_time);
      var t=setTimeout(update_clock.bind(null, new_time), 1000);
    } 
    else {
      //unlock UI
      remove_elt('uiLockId');
      remove_elt("countdown_div");
      remove_elt("countdown_title");
      remove_elt("countdown_box");
    }
}

blocker();
