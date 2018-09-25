/*
 * Create a list that holds all of your cards
 */


let cardListIconClasses = [
'fa-diamond',
'fa-diamond',
'fa-paper-plane-o',
'fa-paper-plane-o',
'fa-anchor',
'fa-anchor',
'fa-bolt',
'fa-bolt',
'fa-cube',
'fa-cube',
'fa-bomb',
'fa-bomb',
'fa-leaf',
'fa-leaf',
'fa-bicycle',
'fa-bicycle'
];

console.log("shuffle Array cardList Icons", shuffle(cardListIconClasses));

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const cardDeck = document.getElementById('deck');
cardDeck.classList.add('deck');
 let shuffledArray = shuffle(cardListIconClasses);

 for (let i = 0; i < 16; i++) {
   const newElement = document.createElement('li');
   newElement.classList.add('card');
   const iconElement = document.createElement('i');
   iconElement.classList.add('fa' , shuffledArray[i]);
   newElement.appendChild(iconElement);
   cardDeck.appendChild(newElement);
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


 // # of moves(oppening two cards will be considered as a move)

 let counter = 0;

 const numberOfMoves = () => {
   counter ++;
   const movesText = document.querySelector('.moves')
   if (counter === 1) {
     movesText.innerHTML = "1 move"
   } else {
     movesText.innerHTML = `${counter} moves`
   }
 }


 // flipping card

 const allCards = document.querySelectorAll('.card');
 let openCards = [];
 let matchedCards = [];


 allCards.forEach(card => {
   card.addEventListener('click', function (e) {
     if (!card.classList.contains('open') || !card.classList.contains('show')) {
       card.classList.add('show' , 'open');
       openCards.push(card);

       if (openCards.length == 2) {
         numberOfMoves();
         if(openCards[0].childNodes[0].className === openCards[1].childNodes[0].className){
           openCards.forEach(card => {
             card.classList.remove('show', 'open');
             card.classList.add('match');
             matchedCards.push(card);
             if(matchedCards.length === 16) {
               alert("Congratulations .... You win!!");
             }
           })
           openCards=[];
         }else{
           //  hide the flipped grids
           setTimeout(function(){
             openCards.forEach(card => {
               card.classList.remove('show' , 'open');
             })
               openCards=[];
           }, 1000);
         }
      }
     }
   });
 });


 //  reset the game

 const reset = document.querySelector('.restart');

 reset.addEventListener('click', function () {
   const boardGrids = document.querySelectorAll('.card');
   boardGrids.forEach(grid => {
     if (grid.classList.contains('open') || grid.classList.contains('show') || grid.classList.contains('match')) {
       grid.classList.remove('show', 'open', 'match');
     }
   })
   numberOfMoves(counter = -1);
 });
