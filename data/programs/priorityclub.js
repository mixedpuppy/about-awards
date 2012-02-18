
info_re = /(.*) \d+/;

// form id's
// UHF_header_loginform
// walletLoginForm
self.port.on('program', function(account) {
  //console.log('ich data '+JSON.stringify(account));
  if ($('.error').text()) {
    self.port.emit('loginFailure');
    return;
  }
  
  if ($('#walletLoginForm')[0]) {
    $('input[name="emailOrPcrNumber"]').val(account.username);
    $('input[name="password"]').val(account.password);
    $('#signInButton').click();
    return;
  }
  
  // sigh, no classes or id's that make this easy
  var fullName = $($('.guestAndPcrInfo > div')[0]).text().trim();
  var memberNumber = $($('.guestAndPcrInfo > .value')[0]).text().trim();

  var statusNights = $($('#ytdWrapper .value')[0]).text().trim();
  var statusPoints = $($('#ytdWrapper .value')[1]).text().trim();

  var accountBalance = $($('.pointsBalanceLabel .value')[0]).text().trim();
  var memberLevel = $($('.pointsBalanceLabel .value')[1]).text().trim();

  let data = {
    name: fullName,
    account: memberNumber,
    balance: accountBalance,
    status: memberLevel,
    statusMiles: statusNights+" / "+statusPoints,
    expiration: ""
  }
  //console.log(JSON.stringify(data));
  
  self.port.emit('data', data);
});
self.port.on('signout', function() {
  unsafeWindow.location = '/h/d/pc/1/en/logoutm?logoutType=explicit&logoutSuccessURL=/';
});

console.log("ich pageMod loaded");
self.port.emit('ready');