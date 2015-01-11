//// Let's connect

function start() {

    document.getElementById("colorSpan").innerHTML = "Waiting for your Spark to update...";
    document.getElementById("scoreSpan").innerHTML = "Waiting for your Spark to update...";   

    // debug
    //var deviceID = "xxxx"; 
    //var accessToken = "xxxx";

    var eventSource = new EventSource("https://api.spark.io/v1/devices/" + device0ID + "/events/?access_token=" + token);

    eventSource.addEventListener('open', function(e) {
        console.log("Portal Opened!"); },false);

    eventSource.addEventListener('error', function(e) {
        console.log("Portal Error :("); },false);

    // Box 1 Current Color

    eventSource.addEventListener('currentColor', function(e) {
        var rawData = JSON.parse(e.data);
        var colorSpan = document.getElementById("colorSpan");
        var timeSpan   = document.getElementById("colorTimeSpan");
        colorIDSpan.innerHTML = "Core ID: " + rawData.coreid; // coreID and "data" from JSON output
        colorIDSpan.style.fontSize = "9px";
        colorSpan.innerHTML = " Color: " + rawData.data;
        colorSpan.style.fontSize = "9px";
        colorTimeSpan.innerHTML = "Time Published: " + rawData.published_at; // time published
        colorTimeSpan.style.fontSize = "9px";
    }, false);

     // Box 2 Current Score

    eventSource.addEventListener('currentScore', function(e) {
        var rawData = JSON.parse(e.data);
        var scoreSpan   = document.getElementById("scoreSpan");
        var timeSpan   = document.getElementById("scoreTimeSpan");
        scoreIDSpan.innerHTML = "Core ID: " + rawData.coreid;
        scoreIDSpan.style.fontSize = "9px";
        scoreSpan.innerHTML = " Score: " + rawData.data;
        scoreSpan.style.fontSize = "9px";
        scoreTimeSpan.innerHTML = "Time Published: " + rawData.published_at;
        scoreTimeSpan.style.fontSize = "9px";
    }, false);
}