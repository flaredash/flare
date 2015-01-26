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


// function saveDevices() {
//   // Login to Spark first, then
//   spark.login({accessToken: token}).then(
//     function(obj, err){
//       console.log('API call completed on promise resolve: ', obj);
//       // List devices on Spark cloud, then
//       spark.listDevices().then(
//         function(devices, err) {
//           console.log('Devices: ', devices);
//           var devNum = devices["length"];


//           // iterate through devices and save details
//           for (i = 0; i < devNum; i++) {
//             var idWindow = 'window.device' + i + 'id';
//             var nameWindow = 'window.device' + i + 'name';
//             var conWindow = 'window.device' + i + 'con';
//             idWindow = devices[i]["id"];
//             nameWindow = devices[i]["name"];
//             conWindow = devices[i]["connected"];
//             console.log('Device' + i + ' name: ' + nameWindow);
//             console.log('Device' + i + ' id: ' + idWindow);
//             $.ajax({
//               type: 'POST',
//               url: '/savedevice' + i,
//               data: {
//                 deviceid: idWindow,
//                 devicename: nameWindow,
//                 devicecon: conWindow
//               },
//               success: function() {
//                 console.log('Saved device' + i + ': ' + nameWindow);
//               }
//             })
//           }
//         },
//         function(err) {
//           console.log('Listing of devices failed: ', err);
//         }
//       );
//     },
//     function(err) {
//       console.log('API call completed on promise fail: ', err);
//     }
//   );
// };

i = 0;

function saveDevices() {
  sparkLogin();
  var devicesPr = spark.listDevices();

  devicesPr.then(
    function(devices) {
      console.log('Devices: ', devices);
      var devNum = devices["length"];
      if (i < devNum) {
        var idWindow = 'window.device' + i + 'id';
        var nameWindow = 'window.device' + i + 'name';
        var conWindow = 'window.device' + i + 'con';
        idWindow = devices[i]["id"];
        nameWindow = devices[i]["name"];
        conWindow = devices[i]["connected"];
        console.log(i);
      } else {
        console.log('Saving devices done.');
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
              i++;
              console.log("Moving to next device, i = " + i);
              saveDevices();
            } else {
              console.log("All done!");
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
              i++;
              console.log('Moving to next device, i = ' + i);
              saveDevices();
            } else {
              console.log("All done!");
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
              i++;
              console.log('Moving to next device, i = ' + i);
              saveDevices();
            } else {
              console.log("All done!");
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
              i++;
              console.log('Moving to next device, i = ' + i);
              saveDevices();
            } else {
              console.log("All done!");
            }
          }
        });
      } else {
        console.log('All done with Ajax!!');
      }
    }
  );
}

////////////////////////////////////////
// Rename a device
////////////////////////////////////////

// Need to handle non-network errors like name already in use

function renameDevice(anyDevice) {
        $.ajax({
            type: 'PUT',
            url: 'https://api.spark.io/v1/devices/' + anyDevice + '/?access_token=' + token,
            data: {
            name: 'testname456'
            },
            success: function() {
              console.log('Renamed device: ' + anyDevice);
              saveDevices();
            },
            error: function(err) {
              console.log('Something went wrong: ', err);
            }
        })
}

////////////////////////////////////////
// Get details on individual devices
////////////////////////////////////////

function getDetails(anyDevice) {

  //start spinner
  var spinner = new Spinner(opts).spin();
  var target = document.getElementById('spinner');
  $(target).html(spinner.el);

  var requestURL = "https://api.spark.io/v1/devices/" + anyDevice + "/?access_token=" + token;
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
        url: '/checkdevice',
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