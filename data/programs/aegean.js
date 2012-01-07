
var info_re = /(\d+)\s*\|\s*(.*)/;
var balance_re = /(\d+)/;

self.port.on('program', function(account) {
  //console.log('agean data '+JSON.stringify(account));
  
  var usernameField, passwordField;

  if (account.usernameField)
    usernameField = document.getElementById(account.usernameField);
  if (!usernameField)
    usernameField = document.getElementById('txtUser');
  if (usernameField) {
    if (account.passwordField)
      passwordField = document.getElementById(account.passwordField);
    if (!passwordField)
      passwordField = document.getElementById('txtPass');
    usernameField.value = account.username;
    passwordField.value = account.password;
    var button = document.getElementById('btnLogin');
    button.click();
    
    return;
  }
  
  if (window.location.pathname == "/WEBSITE/Login.jsp") {
    // gather our data now and send it back
    var info = $(".LoginDetails").text().trim();
    //console.log(content);
    var info = info_re.exec(info);
  
    var aw_info = $("#txtAwMil").attr('value').trim();
    var balance = balance_re.exec(aw_info)[1];
  
    let data = {
      name: $(".LoginName").text().trim(),
      account: info[1],
      balance: balance,
      status: info[2],
      statusMiles: '0',
      expiration: ''
    }
    localStorage['__awards_addon_data__'] = JSON.stringify(data);
    unsafeWindow.location = "/WEBSITE/StatusMilesToExpire.jsp";
    return;
  }
  if (window.location.pathname == "/WEBSITE/StatusMilesToExpire.jsp") {
    let data = JSON.parse(localStorage['__awards_addon_data__']);
    data.statusMiles = $($('.MainControl')[0]).text().trim();
    //console.log("agean data "+JSON.stringify(data));
    self.port.emit('data', data);
  }
});
self.port.on('signout', function() {
  unsafeWindow.location = '/milesandbonus/Logout';
});

console.log("aegean pageMod loaded");
$(window).ready(function(){
self.port.emit('ready');
});
