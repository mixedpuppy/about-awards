
// 0=,8=153470646,41=US,22=Logged in ,9=Basic
memnum_re = /8=(\d+),/;
// Balance: 5,139 points
balance_re = /Balance:\s+([\d,]*)\s+points/;
nights_re = /8=(\d+),/;

self.port.on('program', function(account) {
  //console.log('american data '+JSON.stringify(account));
  if ($('.aaModErrorBang:visible')[0]) {
    self.port.emit('loginFailure');
    return;
  }
  if (document.loginForm) {
    if (!account.username) {
      var memberNumber = $('input[name="aadvantageNumber"]').val();
      if (!memberNumber) {
        self.port.emit('loginFailure');
        return;
      }
    }
    if (account.username) {
      $('input[name="aadvantageNumber"]').val(account.username);
    }
    $('input[name="password"]').val(account.password);
    
    document.loginForm.submit();
    return;
  }
  
  var data = $('#summaryData td');
  var EQM = $(data[3]).text().trim();
  var EQS = $(data[5]).text().trim();

  var fullName = $(".aa-personalInfo-name").text().trim();

  var memberNumber = $('.personalInfo li > strong').text().trim();
  var memberLevel = $('.aa-personalInfo-status').text().trim();

  var accountBalance = $($('td.pbnTableTotal')[1]).text().trim();

  let data = {
    name: fullName,
    account: memberNumber,
    balance: accountBalance,
    status: memberLevel,
    statusMiles: EQS + " / " + EQM,
    expiration: ""
  }
  
  self.port.emit('data', data);
});

console.log("american pageMod loaded");
self.port.emit('ready');