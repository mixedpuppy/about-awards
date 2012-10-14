header_re = /Welcome,\s+([\w\s]+)\./;
info_re = /Account\s+(\d+)\s+Balance\s+([\d,]+)\s+Tier level\s+(\w+)/;

self.port.on('program', function(account) {
  if ($('div.globalerrors:visible')[0]) {
    self.port.emit('loginFailure');
    return;
  }
  console.log('carlson data '+JSON.stringify(account));
  if (document.loginForm) {
    $('input[name="userId"]').val(account.username);
    $('input[name="password"]').val(account.password);
    document.loginForm.submit();
    return;
  }

  var header = $('.headerrow').text();
  var hinfo = header_re.exec(header);
  var fields = $('.account-balance').text();
  var info = info_re.exec(fields);

  let data = {
    name: hinfo[1],
    account: info[1],
    balance: info[2],
    status: info[3],
    statusMiles: "",
    expiration: ""
  }
  
  self.port.emit('data', data);
});
self.port.on('signout', function() {
  unsafeWindow.location = '/secure/logout.do';
});

console.log("carlson pageMod loaded");
self.port.emit('ready');
