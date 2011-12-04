
info_re = /tierCode:(\w+), currentQualMiles:(\d+)/;

self.port.on('program', function(account) {
  //console.log('aeroplan data '+JSON.stringify(account));
  var f1 = document.getElementById('CUST1');
  var f2 = document.getElementById('CUST2');
  var f3 = document.getElementById('CUST3');
  if (f1 && f2 && f3) {
    var un = account.username;
    f1.value = un.substr(0,3);
    f2.value = un.substr(3,3);
    f3.value = un.substr(6,3);
    var passwordField = document.getElementById('pass');
    passwordField.value = account.password;
    var button = document.getElementById('TermsAndConditionsBlockID_button');
    button.click();
    
    return;
  }
  
  // gather our data now and send it back
  var info = info_re.exec(document.documentElement.innerHTML);
  console.log(info);
  let status='';
  if (info[1] == 'P')
    status = "Prestige";
  else if (info[1] == 'E')
    status = "Elite";
  else if (info[1] == 'SE')
    status = "Super Elite";
  let statusMiles = info[2];

  let data = {
    name: $('.name').text().trim(),
    account: $('.number').text().trim(),
    balance: $('.mileage-phrase .mileage').text().trim(),
    status: status,
    statusMiles: statusMiles,
    expiration: $('#date1').contents().first().text().split(':')[1].trim()
  }
  
  self.port.emit('data', data);
});

console.log("aeroplan pageMod loaded");
self.port.emit('ready');