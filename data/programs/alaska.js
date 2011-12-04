
info_re = /Member Name:.(.*)Mileage Plan Number:.(.*)Available Miles:.(.*)/;

self.port.on('program', function(account) {
  console.log('alaska data '+JSON.stringify(account));
  var usernameField = document.getElementById(account.usernameField);
  if (!usernameField)
    usernameField = document.getElementById('FormUserControl__signInProfile__userIdControl__userId');
  if (usernameField) {
    var passwordField = document.getElementById(account.passwordField);
    if (!passwordField)
      passwordField = document.getElementById('FormUserControl__signInProfile__passwordControl__password');
    usernameField.value = account.username;
    passwordField.value = account.password;
    var button = document.getElementById('FormUserControl__signIn');
    button.click();
    
    return;
  }
  
  // gather our data now and send it back
  var info = document.getElementById('FormUserControl__myOverview__mileagePlanInfo');
  var content = info.textContent.replace(/\r|\n/g,'');
  console.log(content);
  var info = info_re.exec(content);

  // get tier miles
  // XXX there has got to be a better way
  var statusMiles = $($($('#FormUserControl__myOverview__mileagePlanTierDisplay > div')[1]).find('div')[2]).text();
  // get account values
  var values = unsafeWindow.s;

  let data = {
    name: info[1],
    account: info[2],
    balance: info[3],
    status: values.eVar22 || 'member',
    statusMiles: statusMiles,
    expiration: ''
  }
  
  self.port.emit('data', data);
  // force a logout
  unsafeWindow.location = 'https://www.alaskaair.com/www2/ssl/myalaskaair/MyAlaskaAir.aspx?CurrentForm=UCSignOut';
});

console.log("alaska pageMod loaded");
self.port.emit('ready');