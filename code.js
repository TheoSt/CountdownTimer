var timerSection = document.getElementById("timerSection");
var mainSection = document.getElementById("mainSection");
var timeDisplay = document.getElementsByClassName("timeDisplay");
var inputs = document.getElementsByClassName("inputs");
var mainDateSpan = document.getElementById("mainDateSpan");
var expDisplay = document.getElementById("expDisplay");
var errorDisplay = document.getElementById("errorDisplay");

var start = document.getElementById("startButton");
var clear = document.getElementById("clearButton");
var back = document.getElementById("backButton");
var stop = document.getElementById("stopButton");
var chritmasButton = document.getElementById("chritmasButton");
var newyearsButton = document.getElementById("newyearsButton");
var easterButton = document.getElementById("easterButton");

var inputsTime = ["","","","","",""];

var stopBool = false;

chritmasButton.addEventListener("click", function() {
  inputs[0].value = "25";
  inputs[1].value = "Dec";
  inputs[2].value = "2020";
  inputs[3].value = "00";
  inputs[4].value = "00";
  inputs[5].value = "00";
});

newyearsButton.addEventListener("click", function() {
  inputs[0].value = "1";
  inputs[1].value = "Jan";
  inputs[2].value = "2021";
  inputs[3].value = "00";
  inputs[4].value = "00";
  inputs[5].value = "00";
});

easterButton.addEventListener("click", function() {
  inputs[0].value = "2";
  inputs[1].value = "May";
  inputs[2].value = "2021";
  inputs[3].value = "00";
  inputs[4].value = "00";
  inputs[5].value = "00";
});

//clear the selects
clear.addEventListener("click",function() {
  for(var i=0; i<inputs.length; i++) {
    inputs[i].value ="";
  }
})

//stop the timer
stop.addEventListener("click",function() {
  stopBool = true;
});

//start the timer
start.addEventListener("click", function() {
  //dont display the countdown expired text
  expDisplay.style.display ="none";
  for(var i=0; i<inputs.length; i++) { //take the values from the inputs
    inputsTime[i] = inputs[i].value;
  }

  //select the number of the month we want
  var month = monthCalc(inputsTime[1]);

  //check if the selected day is ok with selected month eg February hasnt 30 days
  if(inputsTime[0]<= (new Date(inputsTime[2],month,0).getDate())) {
    var endDate = new Date(inputsTime[1]+" "+inputsTime[0]+", "+inputsTime[2]+" "+inputsTime[3]+":"+inputsTime[4]+":"+inputsTime[5]) //construct the countdown date
    var endTime = endDate.getTime(); //get the time of the date in ms

    mainDateSpan.innerHTML = endDate; //show the end date in a text

    //begin the timer
    var x = setInterval(function() {
      var currentDate = new Date().getTime(); //take the current date
      var distance = endTime - currentDate; //calc the distance between the end date and the current in ms

      var finalTime = timeCalc(distance); //calc the final distance in a date format(distance is in ms)

      if(stopBool) { //If we pressed the stop button stop the timer
        clearInterval(x);
      }
      else { //if time is below zero it means that we reached the time we want
        if(finalTime[0]<0 || finalTime[1]<0 || finalTime[2]<0 || finalTime[3]<0) {
          clearInterval(x); //stop the timer
          timeDisplay[0].innerHTML = "00"; //display zeros in timer
          timeDisplay[1].innerHTML = "00";
          timeDisplay[2].innerHTML = "00";
          timeDisplay[3].innerHTML = "00";
          expDisplay.style.display ="block"; //display the countdown expired text
        }
        else {
          timeDisplay[0].innerHTML = finalTime[0]; //else show the current time
          timeDisplay[1].innerHTML = finalTime[1];
          timeDisplay[2].innerHTML = finalTime[2];
          timeDisplay[3].innerHTML = finalTime[3];
        }
      }
    },1000); //timer updates every second

    mainSection.style.display = "none"; //hide the selects
    timerSection.style.display = "block"; //show the timer section
  }
  else { //if we have an error with the selects
    var text = inputsTime[1]+" hasn't "+inputsTime[0]+" days!"; //the mainly error in the selects are the wrong days of a month eg february hasnt 30 days
    errorDisplay.innerHTML = text;  //show the error text
    errorDisplay.style.display="block";
  }
});

//go back to the main section with selects
back.addEventListener("click",function() {
  for(var i=0; i<inputsTime.length; i++) { //init the time of the inputs
    inputsTime[i] = "";
  }
  stopBool = false;
  timerSection.style.display="none"; //show the main section and hide the timer
  mainSection.style.display = "block";
});


function timeCalc(distance) { //calcs the distance time in date format
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
  var minutes = Math.floor((distance%(1000*60*60))/(1000*60));
  var seconds = Math.floor((distance%(1000*60))/1000);

  var finalTime = [days,hours,minutes,seconds];
  var temp = "";
  for(var i=0; i<finalTime.length; i++) { //if the final day,hour,minutes seconds are less than 10 show them with zero in front
    if(finalTime[i]<10 && finalTime[i]>=0) { //if time is less than 10 or greater than zero eg if its 1 make it 01
      temp = "0"+finalTime[i];
      finalTime[i] = temp;
    }
  }
  return finalTime;
}

function monthCalc(month) {
  var temp = 0;
  switch(month) {
    case 'Jan':
      temp = 1;
      break;
    case 'Feb':
        temp = 2;
        break;
    case 'Mar':
        temp = 3;
        break;
    case 'Apr':
        temp = 4;
        break;
    case 'May':
        temp = 5;
        break;
    case 'Jun':
        temp = 6;
        break;
    case 'Jul':
        temp = 7;
        break;
    case 'Aug':
        temp = 8;
        break;
    case 'Sep':
        temp = 9;
        break;
    case 'Oct':
        temp = 10;
        break;
    case 'Nov':
        temp = 11;
        break;
    case 'Dec':
        temp = 12;
        break;
  }

  return temp;
}
