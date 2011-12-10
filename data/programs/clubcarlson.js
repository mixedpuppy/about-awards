
info_re = /(.*) member (.*) Gold Points/;

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

  var fields = $('div.gpbalance p');
  var text = $('div.gpbalance').text();
  var info = info_re.exec(text);

  let data = {
    name: $(fields[0]).text().trim(),
    account: $(fields[1]).text().trim(),
    balance: info[2],
    status: info[1],
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