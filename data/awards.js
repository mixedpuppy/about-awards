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
              data = $.extend({}, defaultInfo);
              data.account = accounts[a].username || "unknown";
            }
          }
          else {
            data = $.extend({}, defaultInfo);
            data.account = accounts[a].username || "unknown";
          }
          pl.push({
            program: prg,
            account: accounts[a],
            data: data
          });
        }
      }
    }
    //awards.console.log("set programs with data "+JSON.stringify(pl));
    $("#programs-list").empty();
    $("#programs-tmpl").tmpl({programs: pl}).appendTo("#programs-list");
    $("div.links .refresh").click(function(evt) {
      var visible = $("#dev_visible").attr('checked')===true;
      awards.console.log("make this visible? "+visible+" : "+$("#dev_visible").attr('checked'));
      var i = $(this).attr('data-for');
      awards.refresh(pl[i], visible);
    });
    $('button[type="link"]').click(function(evt) {
      var url = $(this).attr('data-for');
      window.open(url);
    });
    $('#dev_reset').click(function(evt) {
      localStorage.clear();
      awards.ready();
    });
  } catch(e) {
    awards.console.log("problem: "+e.toString());
  }
}

$(document).ready(function() {
  awards.ready();
  awards.console.log("awards.js is loaded\n");
});