let playerText = document.getElementById('playerText'); //catch the title
let restartBtn = document.getElementById('restartBtn'); //catch the btn
let turn = document.getElementById('turn');
let boxes = Array.from(document.getElementsByClassName('box')); //gameboard
let winIndic = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const O_TEXT = "O"; //sign O
const X_TEXT = "X";// sign X
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click',boxClicked)); //add EL for each box on GB
}

function boxClicked (e)  {
const id = e.target.id; //catch the id of the box that clicked
if (!spaces[id]){ //check if the box wasnt clicked before
    spaces[id]=currentPlayer;
    e.target.innerText = currentPlayer; //put the sign in the box if poosible

if (playerWin()!= false) { //check if after the sign player has won.
    playerText.innerText = `${currentPlayer} Win!`
    turn.innerText = ``;

    currentPlayer ='';
    let winningBlock = playerWin();
    winningBlock.map( box => boxes[box].style.backgroundColor=winIndic);
    return;
     
}
    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT; //change the sign to the next player
    turn.innerText = `Its ${currentPlayer} Turn`;
}
}



const winningOptions = [ //condition of wiining
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

]

function playerWin () {
    for (const condition of winningOptions ) {
        let [a,b,c] = condition; //destructuring 
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) { //check if the same sign
            return [a,b,c];
        }
    }
        return false;
    
        
        
    }




restartBtn.addEventListener('click', cleanBoard); //click on restart to clean the board
function cleanBoard() {

spaces.fill(null);
boxes.forEach (box =>  {
    box.innerText =''
    box.style.backgroundColor = '';
}
    )
currentPlayer = X_TEXT; //restart the sign to X
playerText.innerText = 'Tic Tac Toe'; //restart the title
turn.innerText = `Its ${currentPlayer} Turn`;

}


startGame();
cleanBoard();
