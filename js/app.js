/*----- constants -----*/ 
const PLAYERS = {
    '1': 'X',
    '-1': 'O',
    'null': ''
};

const COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

/*----- app's state (variables) -----*/ 
let board, turn, winner;

/*----- cached element references -----*/ 
const message = document.querySelector('h2');
const squares = document.querySelectorAll('.square');

/*----- event listeners -----*/ 
document.querySelector('button').addEventListener('click', init);
document.getElementById('game-board').addEventListener('click', handleMove);

/*----- functions -----*/
init();

function init() {
    console.log("game started");
    board = [
        null, null, null,
        null, null, null,
        null, null, null,
    ];
    turn = 1;
    winner = null;
    render(); // clear the gameboard and reset to beginning
}

function handleMove(evt) {
    //1) capture the id value from the clicked div 
    const squareIdx = evt.target.id;
    // Check if the clicked square is empty
    if (board[squareIdx] !== null || winner) {
        return; // Exit the function if the square is not empty or if there is already a winner
    }
    //2) update the board array & place a 1 or -1 in the correct position
    board[squareIdx] = turn;
    console.log(board);
    //3) check if there's a winner
    winner = getWinner();
    
    //4) update the DOM
    render();
    
    // If there's no winner, toggle the turn
    if (!winner) {
        turn *= -1; // Toggle between 1 and -1
    }
}

function getWinner() {
    // loop over combos array
    // for each subarray in combos array, check the corresponding positions in the board array
    for (let combo of COMBOS) {
        const [a, b, c] = combo;
        if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // Return the winner
        }
    }
    return null; // Return null if there is no winner
}

function render() {
    // update squares every time the board is clicked on
    board.forEach((value, index) => {
        squares[index].textContent = PLAYERS[value];
    });

    // Display the winner or current turn
    if (winner) {
        message.textContent = `Player ${PLAYERS[winner]} wins!`;
    } else {
        message.textContent = `Current turn: ${PLAYERS[turn]}`;
    }
}
