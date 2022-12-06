var board;
var score = 0;
var rows = 4;
var columns = 4;
//const resultDisplay = document.getElementById('result')


window.onload = function() {
    setGame();
}

function setGame() {
     board = [
     [0, 0, 0, 0],
     [0, 0, 0, 0],
     [0, 0, 0, 0],
     [0, 0, 0, 0]
     ];

   /* board = [
        [2, 2, 2, 2],
        [2, 2, 2, 2],
        [4, 4, 8, 8],
        [4, 4, 8, 8]
    ]*/

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div"); // creates a div tag with tile id
            tile.id = r.toString() + "-" + c.toString(); //creates an id for ea tile that describes its position
            let num = board[r][c]; //num is the value at that tile position
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo(); 
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; //clear the classList
    tile.classList.add("tile"); //basic empty tile

    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("tile"+num.toString()); //specific # tile
        } else {
            tile.classList.add("tile8192");
        }                
    }
}

document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        setTwo(); 
    }
    else if(e.code == "ArrowRight"){
        slideRight(); 
        setTwo(); 
    }
    else if(e.code == "ArrowUp"){
        slideUp(); 
        setTwo(); 

    }
    else if(e.code == "ArrowDown"){
        slideDown(); 
        setTwo(); 

    }

    document.getElementById("score").innerText = score; 
})

function filterZero(row){
    return row.filter(num => num != 0); //creates new array
}
function slide(row){
    //[0, 2, 2, 2]
    row = filterZero(row); //gets rid of zeros --> [2, 2, 2]

    //slide process
    for(let i = 0; i < row.length-1; i++){
        //check every 2 because you slide 2 at a time
        if(row[i] == row[i+1]){
            row[i] *= 2; //new tile gets doubled value
            row[i+1] = 0; //LHS tile is gone
            score += row[i]; //add to score the value of the tile you j created
        } // [2, 2, 2] --> [4, 0, 2]
    }

    row = filterZero(row); //[4, 2]

    //add back the zeros
    while(row.length < columns){
        row.push(0); //now it's [4, 2, 0, 0]
    }

    return row;

}

function slideLeft(){
    for(let r = 0; r < rows; r++){
        let row = board[r];
        row  = slide(row); //the new row will get a row 
        board[r] = row;

        for(let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num); 
        }
    }
    checkFor2048();


}

function slideRight(){
    for(let r = 0; r < rows; r++){
        let row = board[r];
        row.reverse(); 
        row  = slide(row); //the new row will get a row 
        row.reverse(); 
        board[r] = row;

        for(let c = 0; c < columns; c++){ //updates tile colors 
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num); 
        }
    }
    checkFor2048();

}

function slideUp(){
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    checkFor2048();
}

function slideDown(){
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse(); 
        row = slide(row);
        row.reverse(); 
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    checkFor2048();
}

function setTwo() {
    if (!hasEmptyTile()) { //prevents it from running infinitely
        return; 
      }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) { //Is there an open spot? 
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("tile2");
            found = true;
        }
    }
    //checkForGameOver(); 
}

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false;
}

function checkFor2048(){
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if(board[r][c] == 2048){
                document.getElementById('result').innerText = 'You win!'
            }
        }
    }
}

/*function checkForGameOver(){
    let counter = 0
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let save = board[r][c]; 
            if (board[r-1][c] != save && board[r+1][c] != save && board[r][c-1] != save && board[r][c+1] != save) {
                document.getElementById('result').innerText = 'Game over, click reset to try again!'; 
              }
        }
    }

    if (counter == 16) {
        document.getElementById('result').innerText = 'Game over, click reset to try again!'; 
      }
}*/

function refreshPage(){
    window.location.reload();
} 
