const allFields = document.querySelectorAll(".field");
allFields.forEach((field, index) => {
  field.addEventListener("click", () => {
    if (game.board.getField(index) !== null) {
      console.log("You can't put it there");
      return;
    }
    if (!game.gameOver) {
      field.innerText = game.turn.marker;
      game.playTurn(index);
    }
  });
});
const restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", () => {
  game.board.clearBoard();
  game = new Game();
});
class GameBoard {
  constructor() {
    this.board = new Array(9).fill(null);
  }
  addMarker(marker, index) {
    if (this.board[index] === null) {
      this.board[index] = marker;
      return true;
    } else {
      console.log("You can't put it there");
      return false;
    }
  }
  getField(i) {
    return this.board[i];
  }
  clearBoard() {
    this.board = new Array(9).fill(null);
    allFields.forEach((field) => (field.innerText = ""));
  }
}
class Game {
  constructor() {
    this.board = new GameBoard();
    this.player1 = new Player("X");
    this.player2 = new Player("O");
    this.turn = this.player1;
    this.gameOver = false;
  }
  playTurn(index) {
    if (this.gameOver) {
      console.log("The game has ended.");
      return;
    }
    if (this.board.addMarker(this.turn.marker, index)) {
      console.log(this.board.board);
      if (this.checkGame()) {
        this.endGame();
      } else {
        this.turn = this.turn === this.player1 ? this.player2 : this.player1;
      }
    }
  }

  checkGame() {
    function checkForRows() {
      const rows = [];
      for (let i = 0; i < 3; i++) {
        const row = [];
        for (let j = i * 3; j < i * 3 + 3; j++) {
          row.push(this.board.getField(j));
        }
        rows.push(row);
      }
      return rows.some(
        (row) =>
          row.every((field) => field === "X") ||
          row.every((field) => field === "O")
      );
    }
    function checkForColumns() {
      const columns = [];
      for (let i = 0; i < 3; i++) {
        const column = [];
        for (let j = 0; j < 3; j++) {
          column.push(this.board.getField(i + 3 * j));
        }
        columns.push(column);
      }
      return columns.some(
        (column) =>
          column.every((field) => field === "X") ||
          column.every((field) => field === "O")
      );
    }
    function checkForDiagonals() {
      const diagonal1 = [
        this.board.getField(0),
        this.board.getField(4),
        this.board.getField(8),
      ];
      const diagonal2 = [
        this.board.getField(2),
        this.board.getField(4),
        this.board.getField(6),
      ];
      const diagonals = [diagonal1, diagonal2];
      return diagonals.some(
        (diagonal) =>
          diagonal.every((field) => field === "X") ||
          diagonal.every((field) => field === "O")
      );
    }

    if (
      checkForRows.call(this) ||
      checkForColumns.call(this) ||
      checkForDiagonals.call(this)
    ) {
      this.endGame(`The winner is ${this.turn.marker}!`);
    } else {
      if (this.board.board.every((field) => field !== null)) {
        this.endGame("It's a draw!");
      }
    }
  }
  endGame(status) {
    this.gameOver = true;
    console.log(status);
  }
}
class Player {
  constructor(marker) {
    this.marker = marker;
  }
}
let game = new Game();

// game.playTurn(0);
// game.playTurn(3);
// game.playTurn(2);
// game.playTurn(4);
// game.playTurn(6);
// game.playTurn(1);
// game.playTurn(7);
// game.playTurn(8);
// game.playTurn(5);
// console.log(game);

const gameBoardGrid = document.getElementById("board-grid");

console.log(allFields);
