
self.port.on('program', function(account) {
  //console.log('american data '+JSON.stringify(account));
  if ($('#ctl00_ErrorDisplay').css('display') != 'none') {
    self.port.emit('loginFailure');
    return;
  }
  if ($('#ctl00_phMain_loginModule_ctl00_loginForm_Login').length) {
    if (!account.username) {
      var memberNumber = $('input[type="text"].txtlogin').val();
      if (!memberNumber) {
        self.port.emit('loginFailure');
        return;
      }
    }
    if (account.username) {
      $('input[type="text"].txtlogin').val(account.username);
    }
    $('input[type="password"].txtlogin').val(account.password);
    
    unsafeWindow.eval(unescape($('#ctl00_phMain_loginModule_ctl00_loginForm_Login').attr('href')))
    return;
  }

  var name = $('#ctl00_phMain_yourAccountModule_ctl00_dmName').text().trim();
  var acct = $('#ctl00_phMain_yourAccountModule_ctl00_dmNumber').text().trim();
  var status = $('#ctl00_phMain_yourAccountModule_ctl00_dmStatus').text().trim();
  var statusMiles = $('#ctl00_phMain_yourAccountModule_ctl00_dmFutureMileStatus').text().trim();
  var balance = $('#ctl00_phMain_yourAccountModule_ctl00_dmAccountBalance').text().trim();
  let data = {
    name: name,
    account: acct,
    balance: balance,
    status: status || 'member',
    statusMiles: statusMiles,
    expiration: ""
  }
  
  self.port.emit('data', data);
});
self.port.on('signout', function() {
  unsafeWindow.location = '/Logout.aspx';
});

console.log("usairways pageMod loaded");
self.port.emit('ready');
