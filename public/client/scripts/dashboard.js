////////////////////////////
// Login to the Spark Cloud
////////////////////////////

function sparkLogin() {  
  spark.login({
    accessToken: token
  });
}

/////////////////////////////////////////////////////
// Save number of devices and general device details 
/////////////////////////////////////////////////////

function getDevices() {
  saveDevices();
  //saveLength();
}

///////////////////////////////////
// List all devices general details
///////////////////////////////////

function sparkList() {
  sparkLogin();
  var devicesPr = spark.listDevices();
  devicesPr.then(
    function(devices) {
      console.log('Devices: ', devices);
    }
  );
}

/////////////////////////
// Save length of devices
/////////////////////////

function saveLength() {
  var listDevices = spark.listDevices();

  listDevices.then(
    function(devices) {
      var devNum = devices["length"];
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
  );
}

////////////////////////////////////////
// Save general info about all devices
////////////////////////////////////////

var devCounter = 0;

function saveDevices() {
  //start spinner
  var spinner = new Spinner(opts).spin();
  var target = document.getElementById('spinner');
  $(target).html(spinner.el);
  sparkLogin();
  var devicesPr = spark.listDevices();
  devicesPr.then(
    function(devices) {
      var devNum = devices.length;
      var i = 0;
      var idWindow = 'window.device' + i + 'id';
      var nameWindow = 'window.device' + i + 'name';
      var conWindow = 'window.device' + i + 'con';
      if (devCounter < devNum) {
        i = devCounter;
        idWindow = devices[i].id;
        nameWindow = devices[i].name;
        conWindow = devices[i].connected;
      } else {
        console.log('Devices: ', devices);
        console.log('Saving devices done.');
        $('#spinner').hide().empty();
        return;
      }

      if (i === 0) {

        $.ajax({
          type: 'POST',
          url: '/savedevice0',
          data: {
            deviceid: idWindow,
            devicename: nameWindow,
            devicecon: conWindow
          },
          success: function() {
            if (i < devNum) {
              devCounter++;
              saveDevices();
            } else {
              console.log('saveDevices: Device0 failed');
            }
          }
        });
      } else if (i === 1) {
        $.ajax({
          type: 'POST',
          url: '/savedevice1',
          data: {
            deviceid: idWindow,
            devicename: nameWindow,
            devicecon: conWindow
          },
          success: function() {
            if (i < devNum) {
              devCounter++;
              saveDevices();
            } else {
              console.log('saveDevices: Device1 failed');
            }
          }
        });
      } else if (i === 2) {
        $.ajax({
          type: 'POST',
          url: '/savedevice2',
          data: {
            deviceid: idWindow,
            devicename: nameWindow,
            devicecon: conWindow
          },
          success: function() {
            if (i < devNum) {
              devCounter++;
              saveDevices();
            } else {
              console.log('saveDevices: Device2 failed');
            }
          }
        });
      } else if (i === 3) {
        $.ajax({
          type: 'POST',
          url: '/savedevice3',
          data: {
            deviceid: idWindow,
            devicename: nameWindow,
            devicecon: conWindow
          },
          success: function() {
            if (i < devNum) {
              devCounter++;
              saveDevices();
            } else {
              console.log('saveDevices: Device3 failed');
            }
          }
        });
      } else {
        console.log('saveDevices: failed');
      }
    }
  );
}

////////////////////////////////////////
// Rename a device
////////////////////////////////////////

function pencil(deviceNumber) {
  var showHide = document.querySelector(".input-group.rename" + deviceNumber);
  if (showHide.style.display == "" || showHide.style.display == "none") {
    showHide.style.display = "table";
  } else {
    showHide.style.display = "none";
  }
}

function renameDevice(anyDevice, deviceNumber) {
  var renameTo = document.getElementById(deviceNumber + 'renameto');
  var showHide = document.querySelector(".input-group.rename" + deviceNumber);
  $.ajax({
    type: 'PUT',
    url: 'https://api.spark.io/v1/devices/' + anyDevice + '/?access_token=' + token,
    data: {
      name: renameTo.value
    },
    success: function(data) {
      if (data.ok === false) {
        console.log(data);
        console.log('Renaming device failed: ' + data.errors[0]);
      } else {
        console.log('Renamed device: ' + anyDevice);
        showHide.style.display = "none";
        saveDevices();
      }
    },
    error: function(err) {
      console.log('renameDevice ajax failed: ', err);
    }
  });
}

////////////////////////////////////////
// Get details on individual devices
////////////////////////////////////////

function getDetails(anyDevice, deviceNumber) {

  //start spinner
  var spinner = new Spinner(opts).spin();
  var target = document.getElementById('spinner');
  $(target).html(spinner.el);

  var requestURL = 'https://api.spark.io/v1/devices/' + anyDevice + '/?access_token=' + token;
  $.getJSON(requestURL, function(device) {
      console.log(device);
      console.log('ID: ' + device.id);
      console.log('Name: ' + device.name);
      console.log('Version: ' + device.cc3000_patch_version);
      console.log('Connected: ' + device.connected);
      console.log('Variables: ' + device.variables);
      console.log('Functions: ' + device.functions);

      // Save version to Stormpath
      var verWindow = 'window.device' + deviceNumber + 'id';
      verWindow = device.cc3000_patch_version;
      $.ajax({
        type: 'POST',
        url: '/saveversion' + deviceNumber,
        data: {
          devicever: verWindow
        },
        success: function(data) {
          console.log(data);
          console.log('Saved device' + deviceNumber + 'version: ' + verWindow + ' to Stormpath.');
        },
        error: function(err) {
          console.log('getDetails: version ajax failed: ', err);
        }
      });

      if (device.connected === false) {
        console.log('Device not currently online.');
      } else {
        // Save device0 "variables" and "functions" to Stormpath
        window.device0var = device.variables;
        window.device0fun = device.functions;
        $.ajax({
          type: 'POST',
          url: '/checkdevice',
          data: {
            device0var: window.device0var,
            device0fun: window.device0fun
          },
          success: function() {
            console.log('Saved device0fun to Stormpath: ' + device0fun);
            console.log('Saved device0var to Stormpath: ' + device0var);
            var vari = device.variables;
            var func = device.functions;
            for (var element in vari) {
              console.log(element + ": " + vari[element]);
            }
            for (var element in func) {
              console.log(element + ": " + func[element]);
            }
          }
        });
      }
    })
    .done(function() {
      // spinner gets stopped after saveDevices()
      // $('#spinner').hide().empty();
      saveDevices();

    })
    .fail(function() {
      console.log("getDetails request failed");
      $('#spinner').hide().empty();
    });
}