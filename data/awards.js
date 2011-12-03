var defaultInfo = {
  name: 'unknown',
  account: 'unknown',
  balance: 'unknown',
  status: 'member',
  statusMiles: 'unknown',
  expiration: 'unknown'
}

function setPrograms(programs, accounts) {
  try {
    var pl = []
    for (var p in programs) {
      prg = programs[p];
      for (var a in accounts) {
        if (accounts[a].hostname == prg.hostname) {
          var key = accounts[a].hostname+"#"+accounts[a].username;
          var data = localStorage.getItem(key);
          if (data) {
            try {
              data = JSON.parse(data);
            } catch(e) {
              data = defaultInfo;
            }
          }
          else
            data = defaultInfo;
          pl.push({
            program: prg,
            account: accounts[a],
            data: data
          });
        }
      }
    }
    awards.console.log("set programs with data "+JSON.stringify(pl));
    $("#programs-list").empty();
    $("#programs-tmpl").tmpl({programs: pl}).appendTo("#programs-list");
    $("div.links .refresh").click(function(evt) {
      var i = $(this).attr('data-for');
      awards.refresh(pl[i]);
    });
    $('button[type="link"]').click(function(evt) {
      var url = $(this).attr('data-for');
      window.open(url);
    });
  } catch(e) {
    awards.console.log("problem: "+e.toString());
  }
}

$(document).ready(function() {
  awards.ready();
  awards.console.log("awards.js is loaded\n");
});