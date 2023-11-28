// retrieve dialog element
const dialog = document.getElementById('dialog');

// Open Modal 
function openModal() {
    dialog.showModal();
}


// transmitting Photo to Div with class="card-driver" in HTML - credit to https://stackoverflow.com/questions/71608101/how-to-fill-a-div-with-an-image-the-user-uploads
const img = document.getElementById('tosubmit');
const input = document.getElementById('driver-photo-input');
input.onchange = function (ev) {
    const file = ev.target.files[0]; // get the file
    const blobURL = URL.createObjectURL(file);
    img.src = blobURL;
};

// store elapsed time from timer
let timerCtrl = null; // store the return value of setInterval
let matchCounter = 0;

//Timer - credits to https://stackoverflow.com/questions/69936780/how-to-stop-the-time-automatically-when-all-cards-are-flipped-in-memory-game-usi
function time() {
    
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;
    timerCtrl = setInterval(setTime, 1000);
    dialog.style.display = "none"; // closes the modal when form is submitted
    

    function setTime() {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }
}

// Enter Driver Name after submitting form 
function displayName() {
    var driverName = document.getElementById("driver-name-input").value;
    document.getElementById("show-name").innerHTML = driverName;
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

// Cards Area - credits to https://marina-ferreira.github.io/tutorials/js/memory-game/
const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;

    checkForMatch();
}


function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch) {
        matchCounter += 1;
        disableCards();
        if (matchCounter == (cards.length / 2)) {
         var finalTime = clearInterval(timerCtrl); // it will stop the timer when all cards are uncovered
        const finishTime = setTimeout(() => {
            if (timerCtrl < 30000) {
                document.getElementById("popup-pole").style.display = "block";} //should generate onpole popup if time below 30s but not working so far
        })}
    else { unflipCards(); }

}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockBoard = false;
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 8);
        card.style.order = ramdomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


// Assign 1st position + pop up window - if player finishes within 10 second


// Assign 2nd position + pop up window - if player finishes within 20 second


// Assign 3rd position + pop up window - if player finishes within 30 second


// Assign 4th position + pop up window - if player finishes within 40 second



// Assign position to player on grid 


// Pop up window for Position 


// Restart game button
