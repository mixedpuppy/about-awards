/* -*- Mode: JavaScript; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

const addon = require("self");
const unload = require("unload");
const pageWorkers = require("page-worker");
const pageMod = require("page-mod");
const { Cc, Ci, Cm, Cu, components } = require("chrome");
let tmp = {};
Cu.import("resource://gre/modules/Services.jsm", tmp);
Cu.import("resource://gre/modules/XPCOMUtils.jsm", tmp);
let { Services, XPCOMUtils } = tmp;
var tabs = require("tabs");

let unloaders = [];

const NS_XUL = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";

const { Programs, getAccounts } = require("programs");

function loginPrompt(program, account) {
  let updated = false;
  let username = {};
  let password = {};
  var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                          .getService(Components.interfaces.nsIPromptService);
  var result = prompts.promptUsernameAndPassword(null,
                                                 program.name + " Login",
                                                 "Enter your username and password for "+program.name+", this will be saved in the Password Manager.",
                                                 username, password, null, {});
  if (result) {
    var loginManager = Cc["@mozilla.org/login-manager;1"].getService(Ci.nsILoginManager);
    let nsLoginInfo = new Components.Constructor("@mozilla.org/login-manager/loginInfo;1", Components.interfaces.nsILoginInfo, "init");
    username = username.value;
    password = password.value;
    
    // do we already have a matching old login that needs updating?
    let logins = loginManager.findLogins({}, program.hostname, "", null);
    if (account) {
      for (var i=0; i < logins.length; i++) {
        let oldLogin = logins[i];
        if (oldLogin.username == account.username && oldLogin.password == account.password) {
          console.log("updating user account for "+program.name);
          let newLogin = oldLogin.clone();
          newLogin.username = username;
          newLogin.password = password;
          loginManager.modifyLogin(oldLogin, newLogin);
          updated = true;
        }
      }
    }
    if (!updated) {
      console.log("creating user account for "+program.name);
      let aLogin = new nsLoginInfo(program.hostname,
                                   program.hostname, /* TODO get the right url here */
                                   null, username, password,
                                   "", ""); /* TODO get the proper form field names */
      loginManager.addLogin(aLogin);
      updated = true;
    }
  }
  return updated;
}

function programScanner(worker, args) {
  this.worker = worker;
  this.args = args;
  
  if (!args.account.username || !args.account.password) {
    if (!loginPrompt(this.args.program, this.args.account))
      return;
  }
  this.init();
}
programScanner.prototype = {
  init: function() {

    let scanner = this;
    var url = this.args.program.urls.login;
    var contentScriptFile = [addon.data.url('jquery-1.4.4.min.js'),
                      addon.data.url('programs/'+this.args.program.pageMod)]

    if (this.args.visible) {
      tabs.open({
        url: url,
        onReady: function onOpen(tab) {
          // do stuff like listen for content
          // loading.
          //console.log("tab has been opened "+tab.url);
          var tworker = tab.attach({
            contentScriptFile: contentScriptFile
          });
          //scanner.initWorker(tworker);
          tworker.port.on('ready', function() {
            console.log("hidden scanner ready");
            tworker.port.emit('program', scanner.args.account);
          });
          tworker.port.on('data', function(data) {
            console.log("scanner got data "+JSON.stringify(data));
            scanner.args.data = data;
            scanner.worker.port.emit("account-refresh", scanner.args);
            tworker.destroy();
          });
        }
      });
    } else {
      let thePage = pageWorkers.Page({
        contentURL: url
      });

      let page = pageMod.PageMod({
        include: [this.args.program.domain+"/*"],
        contentScriptWhen: 'ready',
        contentScriptFile: contentScriptFile,
        onAttach: function onAttach(worker) {
          //scanner.initWorker(worker);
          worker.port.on('ready', function() {
            console.log("hidden scanner ready");
            worker.port.emit('program', scanner.args.account);
          });
          worker.port.on('data', function(data) {
            console.log("scanner got data "+JSON.stringify(data));
            scanner.args.data = data;
            scanner.worker.port.emit("account-refresh", scanner.args);
            page.destroy();
            thePage.destroy();
          });
        }
      });

    }
  }

}

const AboutAwardsUUID = components.ID("{03e7c639-aa1f-f040-b6d2-910c9adaa297}");
const AboutAwardsContract = "@mozilla.org/network/protocol/about;1?what=awards";
let AboutAwardsFactory = {
  createInstance: function(outer, iid) {
    if (outer != null) throw Cr.NS_ERROR_NO_AGGREGATION;
    return AboutAwards.QueryInterface(iid);
  }
};
let AboutAwards = {
  QueryInterface: XPCOMUtils.generateQI([Ci.nsIAboutModule]),

  getURIFlags: function(aURI) {
    return Ci.nsIAboutModule.ALLOW_SCRIPT;
  },

  newChannel: function(aURI) {
    let ios = Cc["@mozilla.org/network/io-service;1"].
    getService(Ci.nsIIOService);
    let channel = ios.newChannel(
    addon.data.url("awards.html"), null, null);
    channel.originalURI = aURI;
    return channel;
  }
};

function installPageMods() {
  // about:awards pagemod
  var pageMod = require("page-mod");
  pageMod.PageMod({
    include: ["about:awards", "file:///Users/shanec/src/awards/data/awards.html"],
    contentScriptWhen: 'start',
    contentScriptFile: [addon.data.url('awardsapi.js')],
    onAttach: function onAttach(worker) {
      console.log("attaching onto about:awards");
      worker.port.emit('data-url', addon.data.url());
      worker.port.on('ready', function() {
        //console.log("got read from about awards");
        worker.port.emit('programs', Programs);
        worker.port.emit('accounts', getAccounts());
      });
      worker.port.on('refresh', function(args) {
        //console.log("got refresh for "+JSON.stringify(args));
        let scanner = new programScanner(worker, args);
        
      });
      worker.port.on('addProgram', function(program) {
        //console.log("addProgram for "+JSON.stringify(program));
        if (loginPrompt(program)) {
          worker.port.emit('accounts', getAccounts());
        }
      });
    }
  });
  
}


exports.main = function(options, callbacks) {
  console.log(addon.data.url("awards.html"));
  unload.when(shutdown);

  Cm.QueryInterface(Ci.nsIComponentRegistrar).registerFactory(
    AboutAwardsUUID, "About Awards", AboutAwardsContract, AboutAwardsFactory
  );

  unloaders.push(function() {
    Cm.QueryInterface(Ci.nsIComponentRegistrar).unregisterFactory(
      AboutAwardsUUID, AboutAwardsFactory
    );
  });

  installPageMods();

  return;
};

function shutdown(reason) {
  unloaders.forEach(function(unload) {
    if (unload) {
      try {
        unload();
      } catch(ex) {
        console.error("unloader failed:", ex, ex.stack);
      }
    }
  });
}
