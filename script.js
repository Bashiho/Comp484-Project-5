/* 
Locations:
Chaparral Hall [34.23858918388787, -118.52726290595731], [34.23787269516686, -118.52670362006702]
Jacaranda Hall [34.24214234976054, -118.52945907953603], [34.24099310198939, -118.52779240838052]
University Library [34.24042584147259, -118.53006689290308], [34.2394566513524, -118.52860872952115]
SRC [34.24062509423244, -118.5252023482621], [34.23930151915201, -118.52469897337525]
B6 [34.24444603467655, -118.53278827155322], [34.2428719928213, -118.53183447850506]
*/

// TBD
// Use Markers to set areas
// Implement Quiz features
// Add Timer

let map;
let AdvancedMarkerElement;
var correct = 0, progress = 0, intervalID, minutes, seconds, dispms;
var questions = [
    "Please Select Chapparal Hall",
    "Please Select Jacaranda Hall",
    "Please Select the University Library",
    "Please Select the SRC",
    "Please Select the Black House (B6 parking lot)"
];

var answers = [
    "Chaparral Hall",
    "Jacaranda Hall",
    "University Library",
    "SRC",
    "Black Box / B6"
]

const question = document.getElementById("question");
const theTimer = document.querySelector("#timer");
const startButton = document.querySelector("#start-button");
const history = document.querySelector("#history");

function formatNumbers(minutes, seconds, dispms) {
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    dispms = dispms < 10 ? "0" + dispms : dispms;
    return minutes, seconds, dispms;
}

// Run a standard minute/second/hundredths timer:
function startTimer() {
    var timer = 0;
    intervalID = setInterval(function () {
        dispms = parseInt(timer % 100,10);
        seconds = parseInt(timer / 100, 10);
        minutes = parseInt(seconds / 60, 10);
        seconds = parseInt(seconds % 60, 10);
        minutes, seconds, dispms = formatNumbers(minutes, seconds, dispms);
        theTimer.textContent = minutes + ":" + seconds + ":" + dispms;
        timer++;
    }, 10);
}

async function initMap() {
    // Create map centered and zoomed in on campus, disable controls to keep static
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 34.24081025172055, lng: -118.5290930627435 },
        zoom: 17,
        mapId: "254148e87cb3fe3fa76cbf1f",
        disableDoubleClickZoom: true,
        draggable: false,
        keyboardShortcuts: false,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        cameraControl: false,
    });

    initMarkers();
}

function startQuiz() {
    clearInterval(intervalID);
    correct = 0, progress = 0;
    startTimer();
    const newQ = document.createElement("p");
    newQ.innerHTML = questions[0];
    history.innerHTML = "";
    history.appendChild(newQ);
}

async function initMarkers() {
    // Import necessary libraries
    const [{ AdvancedMarkerElement }] = await Promise.all([
      google.maps.importLibrary('marker'),
      google.maps.importLibrary('maps'),
    ]);

    // Create markers and pins for them
    const chaparral = new AdvancedMarkerElement({
        position: {lat: 34.23822009039914, lng: -118.5269965247036},
        map: map
    });
    
    const jacaranda = new AdvancedMarkerElement({
        position: {lat: 34.241580993898395, lng: -118.52863508166485},
        map: map
    });

    const library = new AdvancedMarkerElement({
        position: {lat: 34.24007748602232, lng: -118.52932506799283},
        map: map
    });
    
    const src = new AdvancedMarkerElement({
        position: {lat: 34.23992150661859, lng: -118.52492825461486},
        map: map
    });

    const b6 = new AdvancedMarkerElement({
        position: {lat: 34.2435518743337, lng: -118.5323985627839},
        map: map
    });

    const liveOak = new AdvancedMarkerElement({
        position: {lat: 34.23828679880837, lng: -118.5282017225823},
        map: map
    });

    const sierra = new AdvancedMarkerElement({
        position: {lat: 34.23828679880837, lng: -118.53071934679699},
        map: map
    });
    
    const bayramian = new AdvancedMarkerElement({
        position: {lat: 34.240459997214515, lng: -118.53089817109509},
        map: map
    });

    const arena = new AdvancedMarkerElement({
        position: {lat: 34.241785102898056, lng: -118.52632455032473},
        map: map
    });

    const store = new AdvancedMarkerElement({
        position: {lat: 34.23751629015868, lng: -118.52817475575785},
        map: map
    });

    const soraya = new AdvancedMarkerElement({
        position: {lat: 34.236133262828886, lng: -118.52817882245182},
        map: map
    });

    // Add event listeners for clicking on the markers
    google.maps.event.addListener(chaparral, 'click', (evt) => {
        checkAnswer("Chaparral Hall")
    });

    google.maps.event.addListener(jacaranda, 'click', (evt) => {
        checkAnswer("Jacaranda Hall")
    });

    google.maps.event.addListener(library, 'click', (evt) => {
        checkAnswer("University Library")
    });

    google.maps.event.addListener(src, 'click', (evt) => {
        checkAnswer("SRC")
    });

    google.maps.event.addListener(b6, 'click', (evt) => {
        checkAnswer("Black Box / B6")
    });
 
    google.maps.event.addListener(liveOak, 'click', (evt) => {
        checkAnswer("Live Oak")
    });
    
    google.maps.event.addListener(sierra, 'click', (evt) => {
        checkAnswer("Sierra Hall")
    });
    
    google.maps.event.addListener(bayramian, 'click', (evt) => {
        checkAnswer("Bayramian Hall")
    });
    
    google.maps.event.addListener(arena, 'click', (evt) => {
        checkAnswer("Premier America Credit Union Arena")
    });

    google.maps.event.addListener(store, 'click', (evt) => {
        checkAnswer("Campus Store")
    });

    google.maps.event.addListener(soraya, 'click', (evt) => {
        checkAnswer("The Soraya")
    });
}

function checkAnswer(answer) {
    if(answer === answers[progress]){
        correct++;
        progress++;
        const newP = document.createElement("p");
        newP.innerHTML = answer + " is correct!";
        newP.classList.add("correct");
        history.appendChild(newP);
    }
    else{
        progress++;
        const newP = document.createElement("p");
        newP.innerHTML = answer + " is incorrect!";
        newP.classList.add("incorrect");
        history.appendChild(newP);
    }

    // Append new question
    if(progress < 5){
        const newQ = document.createElement("p");
        newQ.innerHTML = questions[progress];
        history.appendChild(newQ);
    }

    // Stop time when quiz is done
    if(progress == 5){
        clearInterval(intervalID);
        question.innerHTML = "Score: " + correct + " / 5";
    }
}

startButton.addEventListener('click', function(e){
    startQuiz();
})

window.addEventListener('DOMContentLoaded', initMap);