/////////////////////////////////////////
// Save a token from Spark to Stormpath
/////////////////////////////////////////

function saveToken() {

  sparkLogin(function(data) {
    window.token = data["access_token"];
    console.log('Grabbed token from Spark: ' + token);
    $.ajax({
    type: 'POST',
    url: '/savetoken',
    data: { token: window.token },
    success: function() {
      console.log('Saved token to SP database: ' + token);
      window.location.reload();
    }
  })
  });
}

/////////////////////////////////////////
// Remove token from system
/////////////////////////////////////////

function delToken() {
    noToken = "Token Removed";
    $.ajax({
    type: 'POST',
    url: '/savetoken',
    data: { token: noToken },
    success: function() {
      console.log('Removed token from SP database: ' + noToken);
      window.location.reload();
    }
  });
}