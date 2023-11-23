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
const gridContainer = document.querySelector(".grid-container");
let cards = []
let firstCard, secondCard;
let lockBoard = false; //variable to use when comparing cards
let score = 0; 

document.querySelector(".score").textContent = score;

fetch("./images/pilots/cards-front.json")
.then((res)=> res.json())
.then((pilots) => {
cards = [...pilots,...pilots];
shuffleCards();
generateCards();
})

function shuffleCards() {
    let currentIndex = cards.length, 
    randomIndex, 
    temporaryValue;
    while(currentIndex !==0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex-=1
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}

function generateCards() {
    for (let card of cards) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-name', card.name);
        cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener('click', flipCard);
    }
}

function flipCard(){
if (lockBoard) return;
if (this===firstCard) return;

this.classList.add('flipped');

if(!firstCard){
    firstCard=this;
    return;
}

secondCard = this;
score++;
document.querySelector(".score").textContent=score;
lockBoard=true;

checkForMatch();
}

function checkForMatch(){
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards(){
    setTimeout(()=>{
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    firstCard=null;
    secondCard=null; 
    lockBoard=false; 
}

function restart() {
    resetBoard();
    shuffleCards();
    score=0; 
    document.querySelector(".score").textContent= score; 
    gridContainer.innerHTML="";
    generateCards()
}

