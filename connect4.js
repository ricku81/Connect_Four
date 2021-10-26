/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

const makeBoard = () => {
	// set "board" to empty HEIGHT x WIDTH matrix array
	const newArr = [];
	for (let x = 0; x < WIDTH; x++) {
		newArr.push(null);
	}
	for (let y = 0; y < HEIGHT; y++) {
		board.push(newArr);
	}
};

/** makeHtmlBoard: make HTML table and row of column tops. */
const makeHtmlBoard = () => {
	// get "htmlBoard" variable from the item in HTML w/ID of "board"
	const htmlBoard = document.querySelector('#board');
	// create 'tr' element w/ID #column-top and a 'click' event listener
	const top = document.createElement('tr');
	top.setAttribute('id', 'column-top');
	top.addEventListener('click', handleClick);
	// create 'td' elements inside 'top' w/ID of #x and append to htmlBoard
	// quantity === WIDTH
	for (let x = 0; x < WIDTH; x++) {
		let headCell = document.createElement('td');
		headCell.setAttribute('id', x);
		top.append(headCell);
	}
	htmlBoard.append(top);

	// create number of 'tr's w/number of 'td's containing ID based off of y and x indexes in 'for loop' using obj. literals ==> `${y}-${x}`
	// number === WIDTH and HEIGHT respectively
	// append each created row to the htmlBoard
	for (let y = 0; y < HEIGHT; y++) {
		const row = document.createElement('tr');
		for (let x = 0; x < WIDTH; x++) {
			const cell = document.createElement('td');
			cell.setAttribute('id', `${y}-${x}`);
			row.append(cell);
		}
		htmlBoard.append(row);
	}
};

/** findSpotForCol: given column x, return top empty y (null if filled) */

const findSpotForCol = (x) => {
	// TODO: write the real version of this, rather than always returning 0
	let num = 1;
	let y = board.length - num;
	if (y !== null) {
		num++;
	}
	return y;
};

/** placeInTable: update DOM to place piece into HTML table of board */

const placeInTable = (y, x) => {
	// TODO: make a div and insert into correct table cell
	const pieceSpot = document.getElementById(`${y}-${x}`);
	const piece = document.createElement('div');

	piece.classList.add(`piece`);
	piece.classList.add(`p${currPlayer}`);

	pieceSpot.append(piece);
};

/** endGame: announce game end */

const endGame = (msg) => {
	// TODO: pop up alert message
	alert(msg);
};

/** handleClick: handle click of column top to play piece */

const handleClick = (evt) => {
	// get x from ID of clicked cell
	let x = +evt.target.id;

	// get next spot in column (if none, ignore click)
	let y = findSpotForCol(x);
	if (y === null) {
		return;
	}

	// place piece in board and add to HTML table
	placeInTable(y, x);
	// board[y][x] = currPlayer;

	// check for win
	if (checkForWin()) {
		return endGame(`Player ${currPlayer} won!`);
	}

	// check for tie
	// TODO: check if all cells in board are filled; if so call, call endGame

	// switch players
	currPlayer === 1 ? (currPlayer = 2) : (currPlayer = 1);
};

/** checkForWin: check board cell-by-cell for "does a win start here?" */

const checkForWin = () => {
	function _win (cells) {
		// Check four cells to see if they're all color of current player
		//  - cells: list of four (y, x) cells
		//  - returns true if all are legal coordinates & all match currPlayer

		return cells.every(
			(
				[
					y,
					x
				]
			) => y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH && board[y][x] === currPlayer
		);
	}

	// TODO: read and understand this code. Add comments to help you.

	for (let y = 0; y < HEIGHT; y++) {
		for (let x = 0; x < WIDTH; x++) {
			const horiz = [
				[
					y,
					x
				],
				[
					y,
					x + 1
				],
				[
					y,
					x + 2
				],
				[
					y,
					x + 3
				]
			];
			const vert = [
				[
					y,
					x
				],
				[
					y + 1,
					x
				],
				[
					y + 2,
					x
				],
				[
					y + 3,
					x
				]
			];
			const diagDR = [
				[
					y,
					x
				],
				[
					y + 1,
					x + 1
				],
				[
					y + 2,
					x + 2
				],
				[
					y + 3,
					x + 3
				]
			];
			const diagDL = [
				[
					y,
					x
				],
				[
					y + 1,
					x - 1
				],
				[
					y + 2,
					x - 2
				],
				[
					y + 3,
					x - 3
				]
			];

			if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
				return true;
			}
		}
	}
};

makeBoard();
makeHtmlBoard();

// TODO List!
// fix makeBoard function
// fix findSpotForCol
// Add a check for “is the entire board filled”
// [hint: the JS every method on arrays would be especially nice here!]
