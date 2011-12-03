
self.port.on('program', function(account) {
  console.log('united data '+JSON.stringify(account));
  var username = document.getElementById('UserName');
  if (username) {
    username.value = account.username;
    var passwordField = document.getElementById('Password');
    passwordField.value = account.password;
    var button = $('input[type="submit"]');
    button.click();
    
    return;
  }
  if ($('#VUID_Home_Index')[0]) {
    console.log("try to open account data page");
    unsafeWindow.location = "https://mobile.united.com/FrequentFlyer";
    return;
  }
  var acct =  /(\d+)/.exec($('fieldset > legend').text())[1];
  var fields = $('fieldset td');
  
  let data = {
    name: $(fields[0]).text().trim(),
    account: acct,
    balance: $(fields[2]).text().trim(),
    status: $(fields[4]).text().trim(),
    statusMiles: $(fields[13]).text().trim(),
    expiration: $(fields[11]).text().trim()
  }
  
  self.port.emit('data', data);
});

console.log("united pageMod loaded");
self.port.emit('ready');