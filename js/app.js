const winningCombos = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6] 
];

console.log(winningCombos);

let board;
let turn;
let winner;
let time;

const squareEls = document.querySelectorAll(".sqr");
console.log(squareEls);
const messageEl = document.getElementById("message");
console.log(messageEl);

function init() {
    console.log("inside game initialized!");
    
    board = [
      "", "", "",
      "", "", "",
      "", "", ""
        // "X", "O", "X",
        // "O", "X", "O",
        // "X", "", "O"
    ];
    turn = "X";
    winner = null;
    tie = false;
  
    render();
}

init();

function updateBoard() {
    board.forEach((value, index) => {
        const square = squareEls[index];
        square.textContent = value;

        if (value === "X") {
            square.style.color = "blue";
        } else if (value === "O") {
            square.style.color = "red";
        } else {
            square.style.color = "black";
        }
    });
}

function updateMessage() {
    if (!winner && !tie) {
        messageEl.textContent = `It's ${turn}'s turn!`;
    } else if (winner) {
        messageEl.textContent = `${winner} wins!`;
    } else if (tie) {
        messageEl.textContent = `It's a tie! 🤝`;
    }
}

function render() {
    updateBoard();
    updateMessage();
}

function handleClick(event) {
    const index = event.target.id;
    
    if (board[index] !== "" || winner || tie) return;
  
    placePiece(index);
  
    checkForWinner();
  
    turn = turn === "X" ? "O" : "X";
  
    render();
}

function checkForWinner() {
  winningCombos.forEach(combo => {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          winner = board[a];
          messageEl.textContent = `🎉 ${winner} wins!`;
          return;
      }
  });

  tie = board.every(cell => cell !== "") && !winner;
}


squareEls.forEach(square => {
    square.addEventListener("click", handleClick);
});

function placePiece(index) {
    board[index] = turn;
    console.log(board);  
}
