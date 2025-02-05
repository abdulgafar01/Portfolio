// Tic Tac Toe game logic

// Select all the game cells, restart button, and header for updating the UI
const gameBoard = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restartBtn');
const titleHeader = document.getElementById('titleHeader');

const xPlayer = document.querySelector('#xPlayer');
const oPlayer = document.querySelector('#oPlayer');

// Initialize game state variables
let currentPlayer = ''; // Tracks the current player ('X' or 'O')
let computerPlayer = ''; // Tracks the computer's symbol
let board = Array(9).fill(null); // Represents the board state (null for empty cells)
let gameActive = false; // Indicates if the game is ongoing

// Define all possible winning combinations for the Tic Tac Toe board
const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];

// Add event listeners to each cell on the board
for (let i = 0; i < gameBoard.length; i++) {
    gameBoard[i].addEventListener('click', () => handleMove(i)); // Handle clicks on cells
}

// Function to choose a player (either 'X' or 'O')
function choosePlayer(player) {
    gameActive = true;
    if (!gameActive) return; // Ignore if the game is over

    currentPlayer = player; // Set the chosen player
    computerPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Assign the opposite symbol to the computer
    
    // titleHeader.textContent = `${currentPlayer}'s Turn`; // Update the header to indicate the turn

    // Highlight the chosen player
    if (currentPlayer === 'X') {
        xPlayer.classList.add('player-active');
        oPlayer.classList.remove('player-active');
    } else {
        xPlayer.classList.remove('player-active');
        oPlayer.classList.add('player-active');
    }

}

// Function to handle a player's move
function handleMove(index) {
    // Ignore the move if the game is over or the cell is already occupied
    if (!gameActive || board[index]) return;

    board[index] = currentPlayer; // Update the board state
    gameBoard[index].textContent = currentPlayer; // Update the UI with the current player's symbol

    checkGameStatus(); // Check if the move ends the game

    // Switch to the next player's turn if the game is still active
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Toggle between 'X' and 'O'
        titleHeader.textContent =  `${currentPlayer}'s Turn`; // Update the header
        // titleHeader.textContent = currentPlayer === computerPlayer ? "computer's turn" : "your turn";

        // Highlight the current player
    if (currentPlayer === 'X') {
        xPlayer.classList.add('player-active');
        oPlayer.classList.remove('player-active');
    } else {
        xPlayer.classList.remove('player-active');
        oPlayer.classList.add('player-active');
    }

        // If it is the computer's turn, trigger its move
        if (currentPlayer === computerPlayer) {
            computerPlay();
        }
    }
}

// Function to check if the game has been won or ended in a draw
function checkGameStatus() {
    // Loop through all winning combinations to check for a win
    for (let combination of winningCombinations) {
        const [a, b, c] = combination; // Destructure indices for each combination
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false; // Stop the game
            titleHeader.textContent = `${board[a]} Wins!`; // Display the winner

            // titleHeader.textContent = currentPlayer === computerPlayer ? "you lost" : "you won"; // Display the winner
            return;
        }
    }

    // Check for a draw (no empty cells left)
    if (!board.includes(null)) {
        gameActive = false; // Stop the game
        titleHeader.textContent = 'It\'s a Draw!'; // Display the draw message
    }
}

// Function to handle the computer's turn
function computerPlay() {
    setTimeout(() => {
        // Get all available cells
        let availableCells = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                availableCells.push(i);
            }
        }

        // Randomly select one if any are available
        if (availableCells.length > 0) {
            let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
            handleMove(randomIndex); // Execute the move
        }
    }, 1000); // Add a delay to simulate thinking time
}

// Function to restart the game
function restartGame() {
    board.fill(null); // Reset the board state
    gameBoard.forEach(cell => (cell.textContent = '')); // Clear the UI
    gameActive = false; // Reset the game
    currentPlayer = ''; // Reset the current player
    computerPlayer = ''; // Reset the computer player
    titleHeader.textContent = 'Choose'; // Reset the header
    xPlayer.classList.remove('player-active');
    oPlayer.classList.remove('player-active');
    // remove backgroundColor after restartGame
    gameBoard[a].style.backgroundColor = '';
    gameBoard[b].style.backgroundColor = '';
    gameBoard[c].style.backgroundColor = '';
    
}

// Add event listener to the restart button
restartBtn.addEventListener('click', restartGame); // Handle restart button clicks
