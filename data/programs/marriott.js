
// 0=,8=153470646,41=US,22=Logged in ,9=Basic
memnum_re = /8=(\d+),/;
// Balance: 5,139 points
balance_re = /Balance:\s+([\d,]*)\s+points/;
nights_re = /8=(\d+),/;

self.port.on('program', function(account) {
  //console.log('marriott data '+JSON.stringify(account));
  if (unsafeWindow.location == 'https://www.marriott.com/signInError.mi') {
    self.port.emit('loginFailure');
    return;
  }
  if (document.signInForm) {
    if (!account.username) {
      var memberNumber = $('input[name="visibleUserName"]').val();
      if (!memberNumber) {
        self.port.emit('loginFailure');
        return;
      }
    }
    if (account.username) {
      $('input[name="visibleUserName"]').val(account.username);
    }
    $('input[name="j_password"]').val(account.password);
    document.myalaskaair.submit();
    //$('button[name="btnSubmit"]').click();
    //document.signInForm.submit();
    //unsafeWindow.logIn();
    return;
  }
  if (unsafeWindow.location == 'https://www.marriott.com/default.mi') {
    // move ourselves to the page we want
    unsafeWindow.location = 'https://www.marriott.com/rewards/myAccount/activity.mi';
    return;
  }
  
  var fullName = $("#account-name > a").text().trim();
  var memberNumber = memnum_re.exec($("#omniEvars").val())[1];
  var other = $("#account-information li");
  var accountBalance = balance_re.exec($(other[3]).text().trim())[1];
  var memberLevel = $(other[0]).text().trim();

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
self.port.on('signout', function() {
  unsafeWindow.location = '/SignOutServlet?logoutExitPage=%2fdefault.mi';
});

console.log("marriott pageMod loaded");
self.port.emit('ready');