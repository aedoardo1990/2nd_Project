/*jshint esversion: 6 */

// retrieve dialog element
const dialog = document.getElementById('dialog');

// transmitting Photo to Div with class="card-driver" in HTML - credit to https://stackoverflow.com/questions/71608101/how-to-fill-a-div-with-an-image-the-user-uploads
const img = document.getElementById('tosubmit');
const input = document.getElementById('driver-photo-input');
input.onchange = function (ev) {
    const file = ev.target.files[0]; // get the file
    const blobURL = URL.createObjectURL(file);
    img.src = blobURL;
};

let timerCtrl = null; // store the return value of setInterval
let matchCounter = 0;
var totalSeconds = 0;

//Timer - credits to https://stackoverflow.com/questions/69936780/how-to-stop-the-time-automatically-when-all-cards-are-flipped-in-memory-game-usi
function time() {

    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");

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
            var finishTime = setTimeout(() => {
                if (totalSeconds < 20) {
                    document.getElementById("popup-pole").style.display = "block";
                    document.getElementById("show-position").innerHTML = "1st";
                    var song = document.getElementById("winner-song");
                    song.play();                
                }
                else {
                    if (totalSeconds < 30) {
                        console.log('silver');
                        document.getElementById("popup-second").style.display = "block";
                        document.getElementById("show-position").innerHTML = "2nd";
                    }
                    else {
                        if (totalSeconds < 40) {
                            document.getElementById("popup-third").style.display = "block";
                            document.getElementById("show-position").innerHTML = "3rd";
                        }
                        else {
                            if (totalSeconds > 40) {
                                document.getElementById("popup-fourth").style.display = "block";
                            document.getElementById("show-position").innerHTML = "Out of podium";
                            }
                        }
                    }
                }
            }, 2000);
        }
    }
    else {
        unflipCards();
    }
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



