class GameBoard {
  constructor() {
    this.board = ["", "", "", "", "", "", "", "", ""];
  }
  addMarker(marker, index) {
    if (this.board[index] === "") {
      this.board[index] = marker;
      return true;
    } else {
      console.log("You can't put it there");
      return false;
    }
  }
}
class Game {
  constructor() {
    this.board = new GameBoard();
    this.player1 = new Player("X");
    this.player2 = new Player("O");
    this.turn = this.player1;
  }
  playTurn(index) {
    if (this.board.addMarker(this.turn.marker, index)) {
      this.turn = this.turn === this.player1 ? this.player2 : this.player1;
    }
  }
}
class Player {
  constructor(marker) {
    this.marker = marker;
  }
}
const game = new Game();

game.playTurn(0);
game.playTurn(1);
game.playTurn(2);
game.playTurn(2);
game.playTurn(3);
game.playTurn(4);
game.playTurn(5);
game.playTurn(5);
game.playTurn(6);
game.playTurn(7);
game.playTurn(8);

console.log(game);
