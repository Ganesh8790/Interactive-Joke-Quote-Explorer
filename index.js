const favoritesLink = document.getElementById('favorites-link');
const favoritesSection = document.getElementById('favorites-section');
const cards = document.querySelectorAll('.card');

favoritesLink.addEventListener('click', (event) => {
  
    favoritesSection.style.display = favoritesSection.style.display === 'none' || favoritesSection.style.display === '' ? 'block' : 'none';
});



cards.forEach((button, index) => {
button.addEventListener('click', () => toggleCard(index));
 
});


cards.forEach((card) => {
    card.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('like-button')) {
            handleLikeButtonClick(card);
            
        } else {
            toggleCard(card);
        }
    });
});

function handleLikeButtonClick(card) {
    
    const isJoke = card.getAttribute('data-isJoke') === 'true';
    const jokeText = card.querySelector('.joke-text').textContent;
    const quoteText = card.querySelector('.quote-text').textContent;
    const listItem = document.createElement('li');
   listItem.textContent = `Joke: ${jokeText} | Quote: ${quoteText}`;
  
   
  
    favoritesList.appendChild(listItem);
}



let audio;
function playSound() {
if (audio) {
audio.pause();
audio.currentTime = 0; // Rewind to the beginning
}
audio = new Audio('rickroll.wav');
audio.play();
}
function toggleCard(card) {

playSound();
const isJoke = card.getAttribute('data-isJoke') === 'true';
const jokeText = card.querySelector('.joke-text');
const quoteText = card.querySelector('.quote-text');

if (isJoke) {
    getJoke().then((joke) => {
        jokeText.textContent = joke;
    });
} else {
    getQuote().then((quote) => {
        quoteText.textContent = `"${quote.content}" - ${quote.author}`;
    });
}

card.setAttribute('data-isJoke', isJoke ? 'false' : 'true');
}

const likeButtons = document.querySelectorAll('.like-button');
const favoritesList = document.getElementById('favorites-list');



async function populateCardWithJoke(card) {
const jokeTextElement = card.querySelector('.joke-text');
const joke = await getJoke();
jokeTextElement.textContent = joke;
}

// Get all the cards and populate them with jokes
cards.forEach(card => {
populateCardWithJoke(card);
});



async function getJoke() {
const response = await fetch('https://official-joke-api.appspot.com/random_joke', {
    headers: {
        'Accept': 'application/json'
    }
});
const jokeObj = await response.json();
return jokeObj.setup;
}

async function getQuote() {
const response = await fetch('https://api.quotable.io/random');
const quoteObj = await response.json();
return quoteObj;
}


const favoritessSection = document.getElementById('favorites-section');
const backButton = document.getElementById('back-button');

backButton.addEventListener('click', () => {
favoritesSection.style.display = 'none';
});


cards.forEach(card => {
card.addEventListener('click', async () => {
    card.classList.toggle('is-flipped');

    const isJoke = card.getAttribute('data-isJoke') === 'true';
    const jokeText = card.querySelector('.joke-text');
    const quoteText = card.querySelector('.quote-text');

    if (isJoke) {
        const joke = await getJoke();
        jokeText.textContent = joke;
    } else {
        const quote = await getQuote();
        quoteText.textContent = `"${quote.content}" - ${quote.author}`;
    }

    card.setAttribute('data-isJoke', isJoke ? 'false' : 'true');
});
});
