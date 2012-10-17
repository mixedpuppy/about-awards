
self.port.on('program', function(account) {
  //console.log('alaska data '+JSON.stringify(account));
  if ($('div.errorText:visible')[0]) {
    self.port.emit('loginFailure');
    return;
  }
  if (document.smlogin_login) {
    var un = account.username.split("|");
    $("#skyMilesNumber").val(un[0])
    $("#dashpin").val(account.password);
    $("#lastName").val(un[1]);
    document.smlogin_login.submit();
    return;
  }
  
  // gather our data now and send it back
  var username = $("#displayMbrName").text().trim();
  var acct = /(\d+)/.exec($("#smNumber").text())[1];
  var balance = /([\d,]+)/.exec($("#smMiles").text().trim())[1];
  var status = $("#levelDisplay").text().trim();
  var fields = $("#accountSummary td");
  var MQM = $("#milesDisplay").text().trim();
  var MQS = $("#segmentsDisplay").text().trim();

  let data = {
    name: username,
    account: acct,
    balance: balance,
    status: status,
    statusMiles: MQM + " / "+ MQS,
    expiration: ''
  }
  
  self.port.emit('data', data);
});
self.port.on('signout', function() {
  unsafeWindow.location = '/smlogin/skymiles_logout.action';
});

console.log("delta pageMod loaded");
self.port.emit('ready');
