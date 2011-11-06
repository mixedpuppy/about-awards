/* -*- Mode: JavaScript; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

const addon = require("self");
const unload = require("unload");
const { Cc, Ci, Cm, Cu, components } = require("chrome");
let tmp = {};
Cu.import("resource://gre/modules/Services.jsm", tmp);
Cu.import("resource://gre/modules/XPCOMUtils.jsm", tmp);
let { Services, XPCOMUtils } = tmp;

let unloaders = [];

const NS_XUL = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";


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
    include: ["about:awards"],
    contentScriptWhen: 'start',
    contentScriptFile: addon.data.url('awardsapi.js'),
    onAttach: function onAttach(worker) {
      worker.port.emit('data-url', addon.data.url());
    }
  });
  
}


exports.main = function(options, callbacks) {
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
