$(document).ready(function(){
  chrome.storage.sync.get(["links"], function (linkarr) {
    try {
      for (element of linkarr.links)
      {
        //alert(element);
        document.getElementById("textinput").value += element + "\n";
      }
    }
    catch (err) {
      //nothing to iterate over
      return;
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


