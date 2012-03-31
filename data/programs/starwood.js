
info_re = /(.*) \d+/;

self.port.on('program', function(account) {
  //console.log('starwood data '+JSON.stringify(account));
  if ($('div.signInErrorMessaging:visible')[0]) {
    self.port.emit('loginFailure');
    return;
  }

  if (document.stdloginForm) {
    $('input[name="login"]').val(account.username);
    $('input[name="password"]').val(account.password);
    document.stdloginForm.submit();
    return;
  }
  
  var fullName = $("div.fullName").text().trim();
  var memberNumber = $(".memberNumber > b").text().trim();
  var accountBalance = $("#accountBalance > b").text().trim();
  var memberLevel = info_re.exec($("div.memberLevelCopy").text().trim())[1];
  var statusMiles = $('.accountInfo > span > strong').text().trim();

  let data = {
    name: fullName,
    account: memberNumber,
    balance: accountBalance,
    status: memberLevel,
    statusMiles: statusMiles,
    expiration: ""
  }
  
  self.port.emit('data', data);
});
self.port.on('signout', function() {
  unsafeWindow.location = '/preferredguest/account/sign_out.html';
});

console.log("starwood pageMod loaded");
self.port.emit('ready');