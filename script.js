'use strict';

// Selecting elements

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//=====================Function#1========================//
let scores, currentScore, activePlayer, playing;
const initialFunction = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

initialFunction();

//=====================Function#2========================//

// We are using this same function 2 times in our code so we make this a function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Now we will write the logic to swith player backgroud
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//========================Rolling the dice functionality========================//

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Gererating random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice); //  To check whether our output is right or not

    // 2. Display image
    diceEl.classList.remove('hidden');

    // 3. Display the dice number according to the image
    diceEl.src = `dice-${dice}.png`; // we use this syntax to display different images using source of image

    // 4. check if rolled number is 1? if true, Switch to the next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to the next player
      /*
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    // Now we will write the logic to swith player backgroud
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    */
      switchPlayer();
    }
  }
});

//==================Holding button functionality============================//

btnHold.addEventListener('click', function () {
  if (playing) {
    console.log('holding button'); // To check our eventhanlder working

    // 1. Add current score to the total score
    scores[activePlayer] += currentScore; // score[0 or 1] = score[0] or score[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    console.log(scores[activePlayer]); // To check we are getting the right output

    // 2. Check if player's score is >=50
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden'); // Again we do that tooooo hide the dice when the game is finished
      //document.getElementById(`name--${activePlayer}`).textContent = 'You Wins 🎉';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3. Switch to the next player
      switchPlayer();
    }
  }
});

//=================New Game Button functionality=====================//

btnNew.addEventListener('click', initialFunction);
