// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "train-time-a2fb5.firebaseapp.com",
  databaseURL: "https://train-time-a2fb5.firebaseio.com",
  projectId: "train-time-a2fb5",
  storageBucket: "train-time-a2fb5.appspot.com",
  messagingSenderId: "907721756168"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Create a variable to reference the database.
var db = firebase.database().ref();

//add event listener on submit
$(document).on("click", "#submit", function (e) {
  e.preventDefault();
  console.log("submit clicked");

  //store user's input in these variables
  var trainNameInput = $("#trainName").val().trim();
  var destinationInput = $("#destination").val().trim();
  //time format moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X")
  var trainTimeInput = moment($("#trainTime").val().trim(), "HH:mm")
    .subtract(1, "years")
    .format();

  var frequencyInput = $("#frequency").val().trim();

  //check if the input comes through when click submit
  console.log(trainNameInput);
  console.log(destinationInput);
  console.log(trainTimeInput); //
  console.log(frequencyInput);
  console.log("_____________________________________");

  //save the info locally
  var input = {
    trainName: trainNameInput,
    destination: destinationInput,
    trainTime: trainTimeInput,
    frequency: frequencyInput,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  };
  // Code for the push
  db.push(input);
  console.log("input object");
  console.log(input);
  //clear all the fields
  $("#trainName").val("");
  $("#destination").val("");
  $("#trainTime").val("");
  $("#frequency").val("");
});

db.on("child_added", function (childsnapshot) {
  console.log("dis work?");

  var childValue = childsnapshot.val();

  var tName = childValue.trainName;
  var tDestination = childValue.destination;
  var tTime = childValue.trainTime;
  var tFrequency = childValue.frequency;
  //variables for calculation using moment.js (tTime, tFrequency - .diff)

  // First Time (pushed back 1 year to make sure it comes before current time)
  console.log(moment(tTime, "HH:mm").format()); //my truth <-------
  var tTimeConverted = moment(tTime, "HH:mm").subtract(1, "years");
  console.log(tTimeConverted); //moment object
  console.log(moment(tTimeConverted).format()); //1 year ago

  var currentTime = moment();
  var tDiff = moment().diff(moment(tTimeConverted), "minutes");

  console.log(moment(tDiff).format("HH:mm"));
  console.log(moment(tDiff).format());
  console.log(tDiff);
  //calculate arrival time
  //append to HTML
  var tRemainder = tDiff % tFrequency;
  console.log("remainder minutes");
  console.log(tRemainder);
  var nextArrival = moment().add(tRemainder, "minutes");
  nextArrival = moment(nextArrival).format("HH:mm");
  console.log("nextArrival");
  console.log(nextArrival);
  // var newTableData =
  $("#timenow").html(moment().format("HH:mm"));
  $("#trainschedule tr:last").after(
    '<tr class="table-active"><td>' +
      tName +
      "</td><td>" +
      tDestination +
      "</td><td>" +
      tFrequency +
      "</td><td>" +
      nextArrival +
      "</td><td>" +
      tRemainder +
      "</td></tr>"
  );
});
