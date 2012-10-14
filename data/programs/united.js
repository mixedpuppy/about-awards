

self.port.on('program', function(account) {
  console.log('united data '+JSON.stringify(account));
  if ($('div.validation-summary-errors:visible')[0]) {
    self.port.emit('loginFailure');
    return;
  }

  var username = document.getElementById('UserName');
  if (username) {
    username.value = account.username;
    var passwordField = document.getElementById('Password');
    passwordField.value = account.password;
    var button = $('input[type="submit"]');
    button.click();
    
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        console.log(mutation.type);
        if ($('#VUID_FrequentFlyer_Index')[0]) {
          console.log("parsing data");
          var name =$("#VUID_FrequentFlyer_Index #mainContent h3").text().trim();
          var acct = /:\s+([\w\d]+)/.exec($(".ui-li[role='heading']").text())[1];
          var fields = $('.ui-grid-a > .ui-block-b');
          let data = {
            name: name,
            account: acct,
            balance: $(fields[0]).text().trim(),
            status: $(fields[3]).text().trim(),
            statusMiles: $(fields[4]).text().trim() + " / " + $(fields[5]).text().trim(),
            expiration: $(fields[1]).text().trim()
          }
          self.port.emit('data', data);
          observer.disconnect();
        }
      });   
    });
      
    // pass in the target node, as well as the observer options
    observer.observe(unsafeWindow.document.body, { attributes: true, childList: true, characterData: true });

    return;
  }
});
self.port.on('signout', function() {
  unsafeWindow.location = '/Account/LogOff';
});

console.log("united pageMod loaded");
self.port.emit('ready');
