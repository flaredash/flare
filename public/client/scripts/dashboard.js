////////////////////////////
// Login to the Spark Cloud
////////////////////////////

function sparkLog() {  
  spark.login({
    accessToken: token
  });
}

/////////////////////////////////////////////////////
// Save number of devices and general device details 
/////////////////////////////////////////////////////

function getDevices() {
  saveDevices();
  saveLength();
}

///////////////////////////////////
// List all devices general details
///////////////////////////////////

function sparkList() {
  sparkLog();
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
  sparkLog();
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
        //window.location.reload();  // comment for better debug (console won't refresh)
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
  var showHide = document.querySelector('.input-group.rename' + deviceNumber);
  if (showHide.style.display == '' || showHide.style.display == 'none') {
    showHide.style.display = 'table';
  } else {
    showHide.style.display = 'none';
  }
}

function renameDevice(anyDevice, deviceNumber) {
  var renameTo = document.getElementById(deviceNumber + 'renameto');
  var showHide = document.querySelector('.input-group.rename' + deviceNumber);
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

  //get device details
  var requestURL = 'https://api.spark.io/v1/devices/' + anyDevice + '/?access_token=' + token;
  $.getJSON(requestURL, function(device) {
      console.log(device);

      //save version to Stormpath
      var verWindow = 'window.device' + deviceNumber + 'id';
      verWindow = device.cc3000_patch_version;
      $.ajax({
        type: 'POST',
        url: '/saveversion' + deviceNumber,
        data: {
          devicever: verWindow
        },
        success: function(data) {
          console.log('Saved device' + deviceNumber + 'version: ' + verWindow + ' to Stormpath.');
        },
        error: function(err) {
          console.log('getDetails: version ajax failed: ', err);
        }
      });

      //save variables to Stormpath
      if (device.connected === 'false') {
        console.log('Device not currently online.');
      } else {
        var vari = device.variables;
        var variNum = Object.keys(vari).length;
        var variArr = Object.keys(vari);
        console.log('Device' + deviceNumber + ' variables: ' + variArr); //variable array
        $.ajax({
          type: 'POST',
          url: '/savevar' + deviceNumber,
          data: {
            devicevar0: variArr[0],
            devicevar1: variArr[1],
            devicevar2: variArr[2],
            devicevar3: variArr[3],
            devicevar4: variArr[4],
            devicevar5: variArr[5],
            devicevar6: variArr[6],
            devicevar7: variArr[7],
            devicevar8: variArr[8],
            devicevar9: variArr[9],
            devicevar10: variArr[10],
          },
          success: function() {
            console.log('Saved device' + deviceNumber + ' variables: ' + variArr);
          }
        });

        //save functions to Stormpath
        if (device.connected === 'false') {
          console.log('Device not currently online.');
        } else {
          var func = device.functions;
          $.ajax({
            type: 'POST',
            url: '/savefun' + deviceNumber,
            data: {
              devicefun0: func[0],
              devicefun1: func[1],
              devicefun2: func[2],
              devicefun3: func[3],
            },
            success: function() {
              console.log('Saved device' + deviceNumber + ' functions: ' + func);
            }
          });
        }
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

////////////////////////////////////////
// Get variable values
////////////////////////////////////////

function getVarVal(anyDevice, anyVariable, deviceNumber, variableNumber) {
  var requestURL = 'https://api.spark.io/v1/devices/' + anyDevice + '/' + anyVariable + '?access_token=' + token;
  $.getJSON(requestURL, function(value) {
    var valueDiv = '.varval.device' + deviceNumber + 'var' + variableNumber;
    var lastHeardDiv = '.lastheard.device' + deviceNumber + 'var' + variableNumber;
    $(valueDiv).html(value.result);
    $(lastHeardDiv).html(value.coreInfo.last_heard);
  });
}

////////////////////////////////////////
// Run function
////////////////////////////////////////
function runFunc(anyDevice, anyFunction, deviceNumber, functionNumber) {
  var lol = document.getElementById('device' + deviceNumber + 'fun' + functionNumber);
  $.post('https://api.spark.io/v1/devices/' + anyDevice + '/' + anyFunction + '/', {
      'access_token': token,
      'args': lol.value
    },
    function(result) {
      console.log(result.return_value);
    });
}

////////////////////////////////////////
// Draw panels on dash load
////////////////////////////////////////

$(window).load(function() {
  var showPanel0 = document.querySelector('.device0.panel');
  var showPanel1 = document.querySelector('.device1.panel');
  var showPanel2 = document.querySelector('.device2.panel');
  var showPanel3 = document.querySelector('.device3.panel');
      if (length == 1) {
        showPanel0.style.display = 'block';
        drawD0Con();
      } else if (length == 2) {
        showPanel0.style.display = 'block';
        showPanel1.style.display = 'block';
        drawD0Con();
        drawD1Con();
      } else if (length == 3) {
        showPanel1.style.display = 'block';
        showPanel2.style.display = 'block';
        showPanel3.style.display = 'block';
        drawD0Con();
        drawD1Con();
        drawD2Con();
      } else if (length == 4) {
        showPanel1.style.display = 'block';
        showPanel2.style.display = 'block';
        showPanel3.style.display = 'block';
        showPanel4.style.display = 'block';
        drawD0Con();
        drawD1Con();
        drawD2Con();
        drawD3Con();
      }
});

function drawD0Con() {
  if (device0con === 'true') {
    $("div.device0.panel").removeClass("panel-warning").addClass("panel-success");
    $("div.device0pow").removeClass("powOff").addClass("powOn");
  }
}

function drawD1Con() {
  if (device1con === 'true') {
    $("div.device1.panel").removeClass("panel-warning").addClass("panel-success");
    $("div.device1pow").removeClass("powOff").addClass("powOn");
  }
}

function drawD2Con() {
  if (device2con === 'true') {
    $("div.device2.panel").removeClass("panel-warning").addClass("panel-success");
    $("div.device2pow").removeClass("powOff").addClass("powOn");
  }
}

function drawD3Con() {
  if (device3con === 'true') {
    $("div.device3.panel").removeClass("panel-warning").addClass("panel-success");
    $("div.device3pow").removeClass("powOff").addClass("powOn");
  }
}
