
////////////////////////////////////////////////////////////////////////
// General check with Spark to get all device IDs, names and con status,
// (can't get variables or functions without specifying a device).
////////////////////////////////////////////////////////////////////////

function getDevices() {
  spark.login({accessToken: token});

  var devicesPr = spark.listDevices();

    devicesPr.then(
      function(devices){

        var devNum = devices["length"];  // length for use in iterating more efficiently
        console.log(devNum);  // print length

        console.log('Devices: ', devices);
        saveDevices();

      // Save devices to Stormpath

        function saveDevices() {
          for (i = 0; i < devNum; i++) { 
            // var idHold = window.device + i + 'id';
            // var nameHold = window.device + i + 'name';
            // var conHold = window.device + i + 'con';

            var idWindow = 'window.device' + i + 'id';
            var nameWindow = 'window.device' + i + 'name';
            var conWindow = 'window.device' + i + 'con';
            console.log('window before: ' + idWindow);
            idWindow = devices[i]["id"];
            nameWindow = devices[i]["name"];
            conWindow = devices[i]["connected"];
            console.log('window after: ' + idWindow);

            var idWrite = 'device' + i + 'id';
            var nameWrite = 'device' + i + 'name';
            var conWrite = 'device' + i + 'con';
            
            // var idRead = devices[i]["id"];
            // var nameRead = devices[i]["name"];
            // var conRead = devices[i]["connected"];
            // idHold = idRead;
            // nameHold = nameRead;
            // conHold = conRead;
            
            
            // console.log('idWrite: ' + idWrite);
            // console.log('window: ' + idWindow);

            $.ajax({
            type: 'POST',
            url: '/savedevice' + i,
            // data: { idWrite: devices[i]["id"], nameWrite: devices[i]["name"], conWrite: devices[i]["connected"] },
            // data: { device0id: window.device0id, device0name: window.device0name, device0con: window.device0con },
              success: function() {
                console.log('Saved ' + devNum + ' devices.');
    }
  })
          }
        }
      }


    //     function saveDevices() {
    //       window.device0id = devices[0]["id"];
    //       window.device0name = devices[0]["name"];
    //       window.device0con = devices[0]["connected"];
    //       saveDevice0();

    //         if (devices[1] != undefined) {
    //           window.device1id = devices[1]["id"];
    //           window.device1name = devices[1]["name"];
    //           window.device1con = devices[1]["connected"];
    //           saveDevice1()
    //         }
    //         else {
    //           console.log('Done fetching 1 device.');
    //         }

    //         if (devices[2] != undefined) {
    //           window.device2id = devices[2]["id"];
    //           window.device2name = devices[2]["name"];
    //           window.device2con = devices[2]["connected"];
    //         }
    //         else {
    //           console.log('Done fetching 2 devices.');
    //         }
    //     }
    //   }
    );
}

function saveDevice0() {

  $.ajax({
  type: 'POST',
  url: '/savedevice0',
  data: { device0id: window.device0id, device0name: window.device0name, device0con: window.device0con },
    success: function() {
      console.log('Saved device0id to Stormpath: ' + device0id);
      console.log('Saved device0name to Stormpath: ' + device0name);
      console.log('Saved device0con to Stormpath: ' + device0con);
    }
  })
}

function saveDevice1() {

  $.ajax({
  type: 'POST',
  url: '/savedevice1',
  data: { device1id: window.device1id, device1name: window.device1name, device1con: window.device1con },
    success: function() {
      console.log('Saved device1id to Stormpath: ' + device1id);
      console.log('Saved device1name to Stormpath: ' + device1name);
      console.log('Saved device1con to Stormpath: ' + device1con);
    }
  })
}

////////////////////////////////////////
// Get details on individual devices
////////////////////////////////////////

function getSpark() {

  //start spinner
  var spinner = new Spinner(opts).spin();
  var target = document.getElementById('spinner');
    $(target).html(spinner.el);

  var requestURL = "https://api.spark.io/v1/devices/" + device0id + "/?access_token=" + token;
    $.getJSON(requestURL, function(data) {
      console.log(data);
      console.log('ID: ', data["id"]);
      console.log('Name: ', data["name"]);
      console.log('Connected: ', data["connected"]);
      console.log('Variables: ', data["variables"]);


      // Save device0 "variables" and "functions" to Stormpath
      window.device0var = data["variables"];
      window.device0fun = data["functions"];
        $.ajax({
        type: 'POST',
        url: '/checkdevices',
        data: { device0var: window.device0var, device0fun: window.device0fun },
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
            console.log( "getSpark request failed" );
          });
}