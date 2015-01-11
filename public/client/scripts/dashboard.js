/*
One issue I've been having (and the reason a few of these sections are commented out) is a 503 timeout on Ajax calls. I'm not sure if this is caused by pushing to Stormpath customdata, some syntax issue or what. It seems to be corrected by only doing one or two data pushes at a time rather than all at once (heroku has a 30 second timeout). I'll plan to break these out into seperate functions rather than batch as I'd like to.
*/

////////////////////////////////////////
// General check with Spark to get all
// device IDs, names and con status.
////////////////////////////////////////

function getDevices() {
  spark.login({accessToken: token});

  var devicesPr = spark.listDevices();

    devicesPr.then(
      function(devices){
        console.log('Devices: ', devices);
        saveDevices();
        // saveD0id();
        // saveD0name();
        // saveD0con();

      // Save (2) devices to Stormpath

      function saveDevices() {
        window.device0id = devices[0]["id"];
        window.device0name = devices[0]["name"];
        window.device0con = devices[0]["connected"];

          if (devices[1] != undefined) {
            window.device1id = devices[1]["id"];
            window.device1name = devices[1]["name"];
            window.device1con = devices[1]["connected"];
          }
          else {
            console.log('Done fetching 1 device.');
          }

          if (devices[2] != undefined) {
            window.device2id = devices[2]["id"];
            window.device2name = devices[2]["name"];
            window.device2con = devices[2]["connected"];
          }
          else {
            console.log('Done fetching 2 devices.');
          }

// , device0name: window.device0name, device0con: window.device0con

          $.ajax({
          type: 'POST',
          url: '/savedevice0',
          data: { device0id: window.device0id },
            success: function() {
              console.log('Saved device0id to Stormpath: ' + device0id);
              // console.log('Saved device0name to Stormpath: ' + device0name);
              // console.log('Saved device0con to Stormpath: ' + device0con);
            }
          })
      }
          },
            function(err) {
              console.log('List devices call failed: ', err);
            }
          );
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

      // // Save device0 "id" to Stormpath
      // window.device0ID = data["id"];
      //   $.ajax({
      //   type: 'POST',
      //   url: '/savedevice0id',
      //   data: { device0ID: window.device0ID },
      //     success: function() {
      //       console.log('Saved device0ID to Stormpath: ' + device0ID);
      //     }
      //   })
      // // Save device0 "name" to Stormpath
      // window.device0name = data["name"];
      //   $.ajax({
      //   type: 'POST',
      //   url: '/savedevice0name',
      //   data: { device0name: window.device0name },
      //     success: function() {
      //       console.log('Saved device0name to Stormpath: ' + device0name);
      //     }                         
      //   })
      // // Save device0 "connection" to Stormpath
      // window.device0con = data["connected"];
      //   $.ajax({
      //   type: 'POST',
      //   url: '/savedevice0con',
      //   data: { device0con: window.device0con },
      //     success: function() {
      //       console.log('Saved device0con to Stormpath: ' + device0con);
      //     }                         
      //   })

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

            //console.log('Saved device0var to Stormpath: ' + device0var);
          }                         
        })
    //   // Save device0 "functions" to Stormpath
    //   window.device0fun = data["functions"];
    //     $.ajax({
    //     type: 'POST',
    //     url: '/savedevice0fun',
    //     data: { device0fun: window.device0fun },
    //       success: function() {
    //         console.log('Saved device0fun to Stormpath: ' + device0fun);
    //       }                         
    //     })
    })
          .done(function() {
            //stop spinner
            $('#spinner').hide().empty();
          })
          .fail(function() {
            console.log( "getSpark request failed" );
          });
}