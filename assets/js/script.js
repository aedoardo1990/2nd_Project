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

// Submit Form Function -- sending data to div -- created with help of ChatGTP
function submitForm(){
    const textValue = document.getElementById('driver-name-input').value;
    const photoInput = document.getElementById('driver-photo-input');

// Validate if the image file is selected
if (photoInput.files.length === 0) {
    alert("Please select an image file.");
    return;
}

// Read the selected image file
const photoFile = photoInput.files[0];


// Create an image element to display the selected image
const photoElement = document.createElement('img');
photoElement.src = URL.createObjectURL(photoFile);
photoElement.alt = "Uploaded Photo";
photoElement.style.maxWidth = '100%';

// Create a paragraph element to display the entered text
const textElement = document.createElement('p');
textElement.textContent = `${textValue}`;

// Get the output div and clear its previous content
const outputDiv = document.getElementById('output');
outputDiv.innerHTML = '';

// Append the image and text elements to the output div
outputDiv.appendChild(photoElement);
outputDiv.appendChild(textElement);
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




