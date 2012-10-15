
self.port.on('program', function(account) {
  //if ($('.alertBox')) {
  //  self.port.emit('loginFailure');
  //  return;
  //}
  console.log('hilton data '+JSON.stringify(account));
  if (document.formSignIn) {
    $('input[name="username"]').val(account.username);
    $('input[name="password"]').val(account.password);
    document.formSignIn.submit();
    return;
  }
  let accturl = 'https://secure3.hilton.com/en/hh/customer/account/index.htm';
  if (unsafeWindow.location != accturl) {
    unsafeWindow.location = accturl;
    return;
  }

  var stays = $('.progress_bar_nav .Stays').text();
  var nights = $('.progress_bar_nav .Nights').text();
  var basePoints = $('.progress_bar_nav .Points').text();

  let data = {
    name: $("#my_account_grid_intro > h2").text().trim(),
    account: $("#account_info .acct_number").text().trim(),
    balance: $("#account_info .points").text().trim(),
    status: $("#account_info  .member_level").text().trim(),
    statusMiles: /([\d,]+)/.exec(stays)[1]+"s / "+/([\d,]+)/.exec(nights)[1]+"n / "+/([\d,]+)/.exec(basePoints)[1]+"bp",
    expiration: ""
  }
  
  self.port.emit('data', data);
});
self.port.on('signout', function() {
  unsafeWindow.location = '../login/logout.htm';
});

console.log("hilton pageMod loaded");
self.port.emit('ready');
