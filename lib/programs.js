/* -*- Mode: JavaScript; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

const { Cc, Ci, Cm, Cu, components } = require("chrome");

let programs = [
  {
    // Name for display
    name: "Aegean",
    // Hostname used for password manager lookup
    hostname: 'https://www.aegeanair.com',
    // Primary domain for the award program
    domain: 'https://www.aegeanair.com',
    // favico url
    icon: "https://www.aegeanair.com/favicon.ico",
    // Scanner implentation
    pageMod: "aegean.js",
    // Important urls used by the scanner
    urls: {
      login: 'https://milesandbonus.aegeanair.com/WEBSITE/Login.jsp?activeLanguage=EN',//'https://www2.aeroplan.com/log_in.do',
      account: 'https://www.aegeanair.com/milesandbonus/Logout',
    },
    // Links used in the dashboard display
    links: [
      {
        title: 'reservations',
        href: 'https://www.aegeanair.com/milesandbonus/RequestAwardTicket/'
      },
      {
        title: 'program',
        href: 'https://www.aegeanair.com/milesandbonus/'
      },
      {
        title: 'flyertalk',
        href: 'http://www.flyertalk.com/forum/aegean-airlines-miles-bonus-694/'
      }
    ]
  },  {
    // Name for display
    name: "Aeroplan",
    // Hostname used for password manager lookup
    hostname: 'https://www.aircanada.com',
    // Primary domain for the award program
    domain: 'https://www2.aeroplan.com',
    // favico url
    icon: "https://www2.aeroplan.com/favicon.ico",
    // Scanner implentation
    pageMod: "aeroplan.js",
    // Important urls used by the scanner
    urls: {
      login: 'https://www2.aeroplan.com/your_aeroplan.do',//'https://www2.aeroplan.com/log_in.do',
      account: 'https://www2.aeroplan.com/your_aeroplan.do',
    },
    // Links used in the dashboard display
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
    domain: 'https://www.alaskaair.com',
    hostname: 'https://www.alaskaair.com',
    icon: "https://www.alaskaair.com/favicon.ico",
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
    name: "American AAdvantage",
    // https://secure.priorityclub.com/
    // https://secure.ichotelsgroup.com/
    hostname: 'https://www.aa.com',
    domain: 'https://www.aa.com',
    icon: "https://www.aa.com/favicon.ico",
    pageMod: "aadvantage.js",
    urls: {
      login: 'https://www.aa.com/myAccount/myAccountAccess.do',
      account: 'https://www.aa.com/myAccount/myAccountAccess.do',
    },
    links: [
      {
        title: 'reservations',
        href: 'https://www.aa.com/reservation/reservationsHomeAccess.do'
      },
      {
        title: 'program',
        href: 'https://www.aa.com/myAccount/myAccountAccess.do'
      },
      {
        title: 'flyertalk',
        href: 'http://www.flyertalk.com/forum/american-aadvantage-445/'
      }
    ]
  },
  {
    name: "Club Carlson",
    domain: 'https://www.clubcarlson.com',
    hostname: 'https://www.clubcarlson.com',
    icon: "https://cache.carlsonhotels.com/glb/favicons/Carlson_Favicon_Test3-16.ico",
    pageMod: "clubcarlson.js",
    urls: {
      login: 'https://www.clubcarlson.com/secure/login.do',
      account: 'https://www.clubcarlson.com/myaccount/secure/',
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
    name: "Marriott",
    domain: 'https://www.marriott.com',
    hostname: 'https://www.marriott.com',
    icon: "https://www.marriott.com/favicon.ico",
    pageMod: "marriott.js",
    urls: {
      login: 'https://www.marriott.com/signIn.mi',
      //https://www.marriott.com/default.mi
      account: 'https://www.marriott.com/rewards/myAccount/activity.mi',
    },
    links: [
      {
        title: 'reservations',
        href: 'https://www.marriott.com/'
      },
      {
        title: 'program',
        href: 'https://www.marriott.com/signIn.mi'
      },
      {
        title: 'flyertalk',
        href: 'http://www.flyertalk.com/forum/marriott-rewards-427/'
      }
    ]
  },
  {
    name: "Priority Club",
    // https://secure.priorityclub.com/
    // https://secure.ichotelsgroup.com/
    hostname: 'https://secure.priorityclub.com',
    domain: 'https://secure.ichotelsgroup.com',
    icon: "https://secureimages.ichotelsgroup.com/cq/etc/media_library/favicon/pc.Par.0001.Image.jpg",
    pageMod: "priorityclub.js",
    urls: {
      login: 'https://secure.ichotelsgroup.com/h/d/pc/1/en/login',
      account: 'https://secure.ichotelsgroup.com/h/d/pc/1/en/tpaccount',
    },
    links: [
      {
        title: 'reservations',
        href: 'http://www.ichotelsgroup.com/h/d/pc/1/en/advancedsearch'
      },
      {
        title: 'program',
        href: 'https://secure.ichotelsgroup.com/h/d/pc/1/en/login'
      },
      {
        title: 'flyertalk',
        href: 'http://www.flyertalk.com/forum/intercontinental-hotels-priority-club-inter-continental-ambassador-426/'
      }
    ]
  },
  {
    name: "Starwood",
    domain: 'https://www.starwoodhotels.com',
    hostname: 'https://www.starwoodhotels.com',
    icon: "https://www.starwoodhotels.com/favicon.ico",
    pageMod: "starwood.js",
    urls: {
      login: 'https://www.starwoodhotels.com/preferredguest/account/sign_in.html',
      account: 'https://www.starwoodhotels.com/preferredguest/account/index.html',
    },
    links: [
      {
        title: 'reservations',
        href: 'https://www.starwoodhotels.com/'
      },
      {
        title: 'program',
        href: 'https://www.starwoodhotels.com/preferredguest/account/sign_in.html'
      },
      {
        title: 'flyertalk',
        href: 'http://www.flyertalk.com/forum/starwood-preferred-guest-429/'
      }
    ]
  },
  {
    name: "United Mileage Plus",
    domain: 'https://mobile.united.com',
    hostname: 'https://mobile.united.com',
    icon: "https://www.united.com/favicon.ico",
    pageMod: "united.js",
    urls: {
      login: 'https://mobile.united.com/FrequentFlyer',
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
  },
  {
    name: "US Airways Dividend Miles",
    domain: 'https://membership.usairways.com',
    hostname: 'https://membership.usairways.com',
    icon: "http://content.usairways.com/common/resources/_images/icons/favicon.ico",
    pageMod: "usairways.js",
    urls: {
      login: 'https://membership.usairways.com/Login.aspx',
      account: 'https://membership.usairways.com/Manage/AccountSummary.aspx',
    },
    links: [
      {
        title: 'reservations',
        href: 'https://www.usairways.com'
      },
      {
        title: 'program',
        href: 'https://www.usairways.com/en-US/dividendmiles/default.html'
      },
      {
        title: 'flyertalk',
        href: 'http://www.flyertalk.com/forum/us-airways-dividend-miles-612/'
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
    //logins = JSON.parse(JSON.stringify(logins));
    myprograms = myprograms.concat(logins);
  }
  return myprograms;
}


exports.Programs = programs;
exports.getAccounts = getAccounts;
