// retrieve dialog element
const dialog = document.getElementById('dialog')

//retrieve start game button
const button = document.getElementById('start-btn')

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




