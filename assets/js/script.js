// retrieve dialog element
const dialog = document.getElementById('dialog')

// retrieve driver name input
const driverNameInput = document.getElementById('driver-name-input')

// retrieve driver name element
const driverName = document.getElementById('driver-name')

//retrieve driver photo upload
const driverPhotoInput = document.getElementById('driver-photo-input')

// retrieve driver photo element
const driverPhoto = document.getElementById('driver-photo')

// Open Modal 
function openModal() {
    dialog.showModal();
}

function closeModal() {
    dialog.close();
    dialog.style.display = "none";
}

// transmitting Photo to Div with class="card-driver" in HTML - credit to https://stackoverflow.com/questions/71608101/how-to-fill-a-div-with-an-image-the-user-uploads
const img = document.getElementById('tosubmit')
const input = document.getElementById('driver-photo-input');
input.onchange = function (ev) {
    const file = ev.target.files[0]; // get the file
    const blobURL = URL.createObjectURL(file);
    img.src = blobURL;
}

// Timer - activated when form is submitted - credit to https://stackoverflow.com/questions/55031097/how-do-i-start-a-timer-on-a-click
let min = 00;
let sec = 00;

function myTimer(){
    timer.innerHTML = min +":"+sec;
    sec++;
    if (sec>=60){
        sec=0;min++;
    }
}


//Start the timer and close the modal
var button = document.getElementById('start-btn').addEventListener('click',() => {
    setInterval(myTimer, 1000); 
    //close modal 
    dialog.style.display = "none";
}, { once: true });


// Toggle On Off created thanks to https://stackoverflow.com/questions/55018585/how-to-turn-on-audio-on-click-icon-play-pause
function togglePlay() {
    let audio = document.getElementsByTagName("audio")[0];

    if (audio) {
        if (audio.paused) {
            audio.play();
            document.getElementById("button").src = "assets/images/circle-stop-regular.svg";
        } else {
            audio.pause();
            document.getElementById("button").src = "assets/images/circle-play-regular.svg";
        }
    }
}

// Cards Area 



