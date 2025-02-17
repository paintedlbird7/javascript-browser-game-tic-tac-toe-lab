/*-------------------------------- Constants --------------------------------*/
console.log("Hello")
const winningCombos = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
  ];
  
  console.log(winningCombos);

/*---------------------------- Variables (state) ----------------------------*/
//💡 None of these variables will need to hold a value when they are defined.
let board; // represent the state of the squares on the board.
let turn; // track whose turn it is
let winner; // if anyone has won yet
let time; // if the game has ended in a tie.

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.getElementById("message");
console.log(squareEls); 
console.log(messageEl);

/*-------------------------------- Functions --------------------------------*/
/*-------------------------------- Functions --------------------------------*/

function init() {
    console.log("inside game initialized!");
    
    // Initialize the state variables
    // board = ["", "", "", "", "", "", "", "", ""];
    board = [
        "X", "O", "X",
        "O", "X", "O",
        "X", "", "O"
      ];
    turn = "X";
    winner = null;
    tie = false;
  
    render();
  }
  
  init();
  
/*-------------------------------- Functions --------------------------------*/

function updateBoard() {
    board.forEach((value, index) => {
      const square = squareEls[index]; // Get the corresponding square
      square.textContent = value; // Set the text content based on board state
  
      // Apply styling based on the value
      if (value === "X") {
        square.style.color = "blue"; // Style for X
      } else if (value === "O") {
        square.style.color = "red"; // Style for O
      } else {
        square.style.color = "black"; // Default for empty squares
      }
    });
  }
  
  function updateMessage() {
    if (!winner && !tie) {
      messageEl.textContent = `It's ${turn}'s turn!`; // Show whose turn it is
    } else if (winner) {
      messageEl.textContent = `🎉 ${winner} wins!`; // Show winner message
    } else if (tie) {
      messageEl.textContent = `It's a tie! 🤝`; // Show tie message
    }
  }

  function render() {
    updateBoard();  // Update the board UI
    updateMessage(); // Update the game status message
  }
  function handleClick(event) {
    const index = event.target.id; // Get the index of the clicked square
    
    if (board[index] !== "" || winner || tie) return; // Prevent modifying an occupied square or game-over state
  
    placePiece(index); // Call the new placePiece function
  
    checkForWinner(); // Check if there's a winner
  
    turn = turn === "X" ? "O" : "X"; // Switch turn
  
    render(); // Update the board UI
}


/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => {
    square.addEventListener("click", handleClick);
  });

  function placePiece(index){
    board[index] = turn;
    console.log(board);  
  }
