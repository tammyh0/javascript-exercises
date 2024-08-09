// UI PART UNFINISHED

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 5, 6],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Factory Function
function createPlayer(name, symbol) {
  let occupiedSquares = [];

  return {
    name,
    symbol,
    getCurrentSquares() {
      return occupiedSquares;
    },
    updateCurrentSquares(square) {
      occupiedSquares.push(square);
    },
    resetSquares() {
      occupiedSquares = [];
    },
  };
}

// IIFE
const Gameboard = (function () {
  const gameboard = ['', '', '', '', '', '', '', '', ''];

  return {
    getRemainingSquaresCount: () => {
      let count = 0;
      for (let i = 0; i < gameboard.length; i++) {
        gameboard[i] === '' && count++;
      }
      return count;
    },
    resetBoard: () => {
      for (let i = 0; i < gameboard.length; i++) {
        gameboard[i] = '';
      }
    },
    squareOccupancyAvailable: (index) => {
      return gameboard[index] === '';
    },
    populateSquare: (index, symbol) => {
      gameboard[index] = symbol;
    },
    getCurrentBoard: () => {
      return gameboard;
    },
  };
})();

// Regular function + UI Display
const TicTacToe = function (playerOne, playerTwo) {
  let currentPlayer = playerOne;
  let result = '';

  const startBtn = document.querySelector('button');
  const playerOneTitle = document.querySelector('.player-one');
  const playerTwoTitle = document.querySelector('.player-two');
  const squares = document.querySelectorAll('.square');
  const resultTxt = document.querySelector('.result');

  squares.forEach(square => {
    square.addEventListener('click', makeMove);
  });

  function makeMove(event) {
    const index = event.target.id;
    if (Gameboard.squareOccupancyAvailable(index)) {
      Gameboard.populateSquare(index, currentPlayer.symbol);
      currentPlayer.updateCurrentSquares(index);
      checkForResult();

      if (result) {
        annouceResult();
        resetGame();
      } else {
        switchPlayer();
      }
    }
  }

  // const makeMove = (event) => {
  //   let validMove = false;
  //   while (!validMove) {
  //     console.log(`Current Gameboard: ${Gameboard.getCurrentBoard()}`);
  //     const userInput = parseInt(prompt(`${currentPlayer.name} - Please enter index of spot:`));
  //     if (Gameboard.squareOccupancyAvailable(userInput)) {
  //       Gameboard.populateSquare(userInput, currentPlayer.symbol);
  //       currentPlayer.updateCurrentSquares(userInput);
  //       validMove = !validMove;
  //     }
  //   }
  // };

  const checkForWinner = (currentPlayer) => {
    const currentPlayerSquares = currentPlayer.getCurrentSquares();
    console.log(`Current Squares: ${currentPlayerSquares}`);
    return WINNING_COMBOS.some((combo) =>
      containsAllNumbers(currentPlayerSquares, combo)
    );
  };

  const checkForTie = () => {
    return Gameboard.getRemainingSquaresCount() === 0;
  };

  const switchPlayer = () => {
    currentPlayer === playerOne
      ? (currentPlayer = playerTwo)
      : (currentPlayer = playerOne);
  };

  const checkForResult = () => {
    if (checkForWinner(currentPlayer)) {
      result = 'Winner';
    } else if (checkForTie()) {
      result = 'Tie';
    }
  };

  const annouceResult = () => {
    if (result === 'Winner') {
      resultTxt.innerText(`Winner is ${currentPlayer.name}`);
    } else if (result === 'Tie') {
      resultTxt.innerText('It is a tie!');
    }
  };

  const resetGame = () => {

    // const response = prompt('Play again?');
    // if (response == 'y') {
    //   currentPlayer = playerOne;
    //   result = '';
    //   playerOne.resetSquares();
    //   playerTwo.resetSquares();
    //   Gameboard.resetBoard();
    //   game.playRound();
    // }
  };

  const playRound = () => {
    while(!result) {
      makeMove();
      // checkForResult();

      // if (result) {
      //   annouceResult();
      //   resetGame();
      // } else {
      //   switchPlayer();
      // }
    }
  };

  return {
    startGame: () => {
      startBtn.addEventListener('click', () => {
        startBtn.style.display = 'none';
        playerOneTitle.classList.add('current');
        // playRound();
      });
    },
  };
};

function containsAllNumbers(currentNums, winningCombo) {
  return winningCombo.every((num) => currentNums.includes(num));
}

// Initialize game
const playerOne = createPlayer('Player One', 'X');
const playerTwo = createPlayer('Player Two', 'O');
const game = TicTacToe(playerOne, playerTwo);
game.startGame();
