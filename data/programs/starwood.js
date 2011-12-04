
info_re = /(.*) \d+/;

self.port.on('program', function(account) {
  //console.log('starwood data '+JSON.stringify(account));
  if (document.stdloginForm) {
    $('input[name="login"]').val(account.username);
    $('input[name="password"]').val(account.password);
    document.stdloginForm.submit();
    return;
  }
  
  var fullName = $("div.fullName").text().trim();
  var memberNumber = $("div.memberNumber > b").text().trim();
  var accountBalance = $("#accountBalance > b").text().trim();
  var memberLevel = info_re.exec($("div.memberLevelCopy").text().trim())[1];

  let data = {
    name: fullName,
    account: memberNumber,
    balance: accountBalance,
    status: memberLevel,
    statusMiles: "",
    expiration: ""
  }
  
  self.port.emit('data', data);
});

console.log("starwood pageMod loaded");
self.port.emit('ready');