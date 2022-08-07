$(document).ready(function(){
  chrome.storage.sync.get(["links", "timertime", "blocktime"], function (linkarr) {
    
    if (linkarr.links != null)
    {
      for (element of linkarr.links)
      {
        document.getElementById("textinput").value += element + "\n";
      }
    }
    if (linkarr.timertime != null)
    {
      document.getElementById("timermins").value = linkarr.timertime;
    }
    if (linkarr.blocktime != null)
    {
      document.getElementById("blockermins").value = linkarr.blocktime;
    }
  });

  document.getElementById("form1").addEventListener("submit", function(e){
      e.preventDefault();
      var mytext = document.getElementById("textinput").value; 
      var blocktime = document.getElementById("blockermins").value;
      var timertime = document.getElementById("timermins").value;
      var newlinks = mytext.split("\n");
      var actuallinks = [];
      for (i=0; i<newlinks.length; i++)
      {
        newlinks[i] = newlinks[i].trim();
        if (newlinks[i].length != 0)
        {
          actuallinks.push(newlinks[i]);
        }
      }
      chrome.storage.sync.set({"links": actuallinks, "timertime": timertime, "blocktime": blocktime}, function() {
      alert("Saved");
      });
  });
});


