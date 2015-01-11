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
    }
  })
  });
}