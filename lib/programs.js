/* -*- Mode: JavaScript; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

const { Cc, Ci, Cm, Cu, components } = require("chrome");

function copy(o){  
  var copy = Object.create( Object.getPrototypeOf(o) );  
  var propNames = Object.getOwnPropertyNames(o);  
  propNames.forEach(function(name){  
                      var desc = Object.getOwnPropertyDescriptor(o, name);  
                      Object.defineProperty(copy, name, desc);  
                    });  
  return copy;  
}

let programs = [
  {
    name: "Aeroplan",
    hostname: 'https://www.aircanada.com',
    pageMod: "aeroplan.js",
    urls: {
      base: 'https://www2.aeroplan.com/',
      login: 'https://www2.aeroplan.com/your_aeroplan.do',//'https://www2.aeroplan.com/log_in.do',
      account: 'https://www2.aeroplan.com/your_aeroplan.do'
    }
  },
  {
    name: "Alaska Airlines",
    hostname: 'https://www.alaskaair.com',
    pageMod: "alaska.js",
    urls: {
      base: 'https://www.alaskaair.com/',
      login: 'https://www.alaskaair.com/www2/ssl/myalaskaair/MyAlaskaAir.aspx?CurrentForm=UCSignInStart',
      account: 'https://www.alaskaair.com/www2/ssl/myalaskaair/MyAlaskaAir.aspx'
    }
  }
];

function getAccounts() {
  var loginManager = Cc["@mozilla.org/login-manager;1"].getService(Ci.nsILoginManager);
  // Find users for the given parameters
  let myprograms = [];
  for (let p in programs) {
    let program = programs[p];
    console.log("looking for "+program.name+" domain "+program.hostname);
    let logins = loginManager.findLogins({}, program.hostname, "", null);
    logins = JSON.parse(JSON.stringify(logins));
    console.log("  found "+logins.length);
    myprograms = myprograms.concat(logins);
    continue;
    // Find user from returned array of nsILoginInfo objects
    for (var i = 0; i < logins.length; i++) {
      let login = logins[i];
      console.log(JSON.stringify(login));
      let prg = copy(program);
      prg.login = login;
      prg.accountInfo = {
        name: '',
        account: '',
        balance: '',
        status: '',
        statusMiles: '',
        expiration: ''
      }
      myprograms.push(prg);
    }      
  }
  console.log("accounts: "+JSON.stringify(myprograms));
  return myprograms;
}


exports.Programs = programs;
exports.getAccounts = getAccounts;