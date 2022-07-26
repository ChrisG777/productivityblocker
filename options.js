$(document).ready(function(){
  chrome.storage.sync.get(["links"], function (linkarr) {
      for (element of linkarr.links)
      {
        //alert(element);
        document.getElementById("textinput").value += element + "\n";
      }
  });

  document.getElementById("form1").addEventListener("submit", function(e){
      e.preventDefault();
      var mytext = document.getElementById("textinput").value; 
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
      chrome.storage.sync.set({"links": actuallinks}, function() {
      alert("Saved");
      });
  });
});


