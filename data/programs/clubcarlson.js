
info_re = /(.*) member (.*) Gold Points/;

self.port.on('program', function(account) {
  //console.log('carlson data '+JSON.stringify(account));
  if (document.loginForm) {
    var username = $('input[name="userId"]');
    username.value = account.username;
    var passwordField = $('input[name="password"]');
    passwordField.value = account.password;
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

console.log("carlson pageMod loaded");
self.port.emit('ready');