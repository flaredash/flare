
////////////////////////////////////////////////////////////////////////
// General check with Spark to get all device IDs, names and con status,
// (can't get variables or functions without specifying a device).
////////////////////////////////////////////////////////////////////////

function getDevices() {
  spark.login({
    accessToken: token
  });

  var devicesPr = spark.listDevices();

  devicesPr.then(
    function(devices) {
      var devNum = devices["length"]; // length for use in iterating
      console.log('Devices: ', devices); // print list of devices
      saveLength();
      saveDevices();

      // Save number of devices
      function saveLength() {
        $.ajax({
            type: 'POST',
            url: '/savelength',
            data: {
              length: devNum
            },
            success: function() {
              console.log('Saved length of ' + devNum);
            }
          })
      }

      function saveDevices() {
        // iterate through devices and save details
        for (i = 0; i < devNum; i++) {
          var idWindow = 'window.device' + i + 'id';
          var nameWindow = 'window.device' + i + 'name';
          var conWindow = 'window.device' + i + 'con';
          idWindow = devices[i]["id"];
          nameWindow = devices[i]["name"];
          conWindow = devices[i]["connected"];
          console.log(i);

          $.ajax({
            type: 'POST',
            url: '/savedevice' + i,
            data: {
              deviceid: idWindow,
              devicename: nameWindow,
              devicecon: conWindow
            },
            success: function() {
              console.log('Saved device: ' + nameWindow);
            }
          })
        }
      }
    }
  );
}

////////////////////////////////////////
// Rename a device (currently D0)
////////////////////////////////////////

function renameDevice() {

spark.login({
    accessToken: token
  });

  var devicesPr = spark.listDevices();

  devicesPr.then(
    function(devices){
      console.log('Devices: ', devices);

        $.ajax({
            type: 'PUT',
            url: 'https://api.spark.io/v1/devices/' + device0id + '/?access_token=' + token,
            data: {
              name: 'Wheee'
            },
            success: function() {
              console.log('Renamed device: ' + device0id);
              getDevices();
            }
          })
    },
    function(err) {
      console.log('API call failed: ', err);
    }
  );
}

////////////////////////////////////////
// Get details on individual devices
////////////////////////////////////////

function getDetails() {

  //start spinner
  var spinner = new Spinner(opts).spin();
  var target = document.getElementById('spinner');
  $(target).html(spinner.el);

  var requestURL = "https://api.spark.io/v1/devices/" + device0id + "/?access_token=" + token;
  $.getJSON(requestURL, function(data) {
      console.log(data);
      console.log('ID: ', data["id"]);
      console.log('Name: ', data["name"]);
      console.log('Version: ', data["cc3000_patch_version"]);
      console.log('Connected: ', data["connected"]);
      console.log('Variables: ', data["variables"]);
      console.log('Functions: ', data["functions"]);

      // Save device0 "variables" and "functions" to Stormpath
      window.device0var = data["variables"];
      window.device0fun = data["functions"];
      $.ajax({
        type: 'POST',
        url: '/checkdevices',
        data: {
          device0var: window.device0var,
          device0fun: window.device0fun
        },
        success: function() {
          console.log('Saved device0fun to Stormpath: ' + device0fun);
          console.log('Saved device0var to Stormpath: ' + device0var);
          var vari = data["variables"];
          var func = data["functions"];
          for (var element in vari) {
            console.log(element + ": " + vari[element]);
          }
          for (var element in func) {
            console.log(element + ": " + func[element]);
          }
        }
      })
    })
    .done(function() {
      //stop spinner
      $('#spinner').hide().empty();
    })
    .fail(function() {
      console.log("getSpark request failed");
    });
}