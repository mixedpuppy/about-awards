
info_re = /(.*) \d+/;

self.port.on('program', function(account) {
  console.log('ich data '+JSON.stringify(account));
  if ($('.error').text()) {
    self.port.emit('loginFailure');
    return;
  }
  if (document.loginform) {
    $('input[name="login"]').val(account.username);
    $('input[name="password"]').val(account.password);
    document.loginform.submit();
    return;
  }
  
  // sigh, no classes or id's that make this easy
  var data = $(".accountStatusLabels").parent().parent().find('td');
  var fullName = $(data[0]).find('b').text().trim();
  var memberNumber = $(data[2]).text().trim();
  var accountBalance = $(data[4]).find('.accountPointsPositive').text().trim();

  var statusNights = $(data[6]).text().trim();
  var statusPoints = $(data[8]).find('.accountPointsPositive').text().trim();

  var memberLevel = $(data[10]).contents()[0].data.trim()

  let data = {
    name: fullName,
    account: memberNumber,
    balance: accountBalance,
    status: memberLevel,
    statusMiles: statusNights+" / "+statusPoints,
    expiration: "Never"
  }
  
  self.port.emit('data', data);
});

console.log("ich pageMod loaded");
self.port.emit('ready');