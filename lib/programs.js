/* -*- Mode: JavaScript; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

const { Cc, Ci, Cm, Cu, components } = require("chrome");

let programs = [
  {
    name: "Aeroplan",
    hostname: 'https://www.aircanada.com',
    pageMod: "aeroplan.js",
    urls: {
      login: 'https://www2.aeroplan.com/your_aeroplan.do',//'https://www2.aeroplan.com/log_in.do',
      account: 'https://www2.aeroplan.com/your_aeroplan.do',
    },
    links: [
      {
        title: 'reservations',
        href: 'https://www.aircanada.com'
      },
      {
        title: 'program',
        href: 'https://www2.aeroplan.com/'
      },
      {
        title: 'flyertalk',
        href: 'http://www.flyertalk.com/forum/air-canada-aeroplan-375/'
      }
    ]
  },
  {
    name: "Alaska Airlines",
    hostname: 'https://www.alaskaair.com',
    pageMod: "alaska.js",
    urls: {
      login: 'https://www.alaskaair.com/www2/ssl/myalaskaair/MyAlaskaAir.aspx?CurrentForm=UCSignInStart',
      account: 'https://www.alaskaair.com/www2/ssl/myalaskaair/MyAlaskaAir.aspx',
    },
    links: [
      {
        title: 'reservations',
        href: 'https://www.alaskaair.com'
      },
      {
        title: 'program',
        href: 'https://www.alaskaair.com/www2/ssl/myalaskaair/MyAlaskaAir.aspx'
      },
      {
        title: 'flyertalk',
        href: 'http://www.flyertalk.com/forum/alaska-airlines-mileage-plan-442/'
      }
    ]
  },
  {
    name: "Club Carlson",
    hostname: 'https://www.clubcarlson.com',
    pageMod: "clubcarlson.js",
    urls: {
      login: 'https://www.clubcarlson.com/secure/login.do',
      account: 'https://www.clubcarlson.com/myaccount/secure/home.do',
    },
    links: [
      {
        title: 'reservations',
        href: 'https://www.clubcarlson.com/'
      },
      {
        title: 'program',
        href: 'https://www.clubcarlson.com/secure/login.do'
      },
      {
        title: 'flyertalk',
        href: 'http://www.flyertalk.com/forum/club-carlson-formerly-radisson-goldpoints-plus-428/'
      }
    ]
  },
  {
    name: "United Mileage Plus",
    hostname: 'https://mobile.united.com',
    pageMod: "united.js",
    urls: {
      login: 'https://mobile.united.com/Account/LogOn',
      account: 'https://mobile.united.com/FrequentFlyer',
    },
    links: [
      {
        title: 'reservations',
        href: 'https://www.united.com'
      },
      {
        title: 'program',
        href: 'https://www.ua2go.com/ci/Login.jsp?return_to=mp_review'
      },
      {
        title: 'flyertalk',
        href: 'http://www.flyertalk.com/forum/united-mileage-plus-consolidated-681/'
      }
    ]
  }
];

function getAccounts() {
  var loginManager = Cc["@mozilla.org/login-manager;1"].getService(Ci.nsILoginManager);
  // Find users for the given parameters
  let myprograms = [];
  for (let p in programs) {
    let program = programs[p];
    let logins = loginManager.findLogins({}, program.hostname, "", null);
    logins = JSON.parse(JSON.stringify(logins));
    myprograms = myprograms.concat(logins);
  }
  return myprograms;
}


exports.Programs = programs;
exports.getAccounts = getAccounts;