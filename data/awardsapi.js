// this file is injected via pageMod

self.port.on('data-url', function(baseurl) {
  var fileref=document.createElement("link");
  fileref.setAttribute("rel", "stylesheet");
  fileref.setAttribute("type", "text/css");
  fileref.setAttribute("href", baseurl+"style.css");
  document.getElementsByTagName("head")[0].appendChild(fileref);

  fileref=document.createElement("script");
  fileref.setAttribute("type", "text/javascript");
  fileref.setAttribute("src", baseurl+"jquery-1.4.4.min.js");
  document.getElementsByTagName("head")[0].appendChild(fileref);

  fileref=document.createElement("script");
  fileref.setAttribute("type", "text/javascript");
  fileref.setAttribute("src", baseurl+"jquery.tmpl.min.js");
  document.getElementsByTagName("head")[0].appendChild(fileref);

  fileref=document.createElement("script");
  fileref.setAttribute("type", "text/javascript");
  fileref.setAttribute("src", baseurl+"awards.js");
  document.getElementsByTagName("head")[0].appendChild(fileref);
});

var programs, accounts;

self.port.on("programs", function(data) {
  programs = data;
  unsafeWindow.setPrograms(programs);
});

self.port.on("accounts", function(data) {
  accounts = data;
  unsafeWindow.setAccounts(programs, accounts);
});

self.port.on("account-refresh", function(args) {
  var key = args.account.hostname+"#"+args.account.username;
  //console.log("got program-refresh "+key+" = "+JSON.stringify(args));
  localStorage[key] = JSON.stringify(args.data);
  // now, how to update one part of our template easily?
  unsafeWindow.setAccounts(programs, accounts);
})

unsafeWindow.awards = {
  ready: function() {
    //console.log("ready called");
    self.port.emit("ready");
  },
  refresh: function(program, visible) {
    //console.log("refresh called");
    program.visible = visible;
    self.port.emit("refresh", program);
  },
  addProgram: function(name) {
    for (var i=0; i < programs.length; i++) {
      let p = programs[i];
      if (p.name == name) {
        self.port.emit('addProgram', p);
        break;
      }
    }
  },
  console: console
};
console.log("awards api loaded");
