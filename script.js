"use strict";
const modalTitle = document.getElementById("modal-title");
const allFields = document.querySelectorAll(".field");
allFields.forEach((field, index) => {
  field.addEventListener("click", () => {
    if (game.board.getField(index) !== null) {
      return;
    }
    if (!game.gameOver) {
      const img = document.createElement("img");
      img.src =
        game.turn.marker === "X" ? game.player1.icon : game.player2.icon;
      field.appendChild(img);

      game.playTurn(index);
    }
  });
});
const modal = document.getElementById("modal");

const modalImage = document.getElementById("modal-img");
const restartButton = document.getElementById("modal-button");
restartButton.addEventListener("click", () => {
  game.board.clearBoard();
  game = new Game();
  modal.style.display = "none";
  chooseModal.style.display = "flex";
  allCharacters.forEach((character) => {
    let imgElement = character.querySelector("img");
    imgElement.style.display = "block";
  });
});

const chooseModal = document.getElementById("choose-modal");
const chooseModalTitle = document.getElementById("choose-modal-title");

const allCharacters = document.querySelectorAll(".character");
allCharacters.forEach((character, index) => {
  character.addEventListener("click", () => {
    const laugh = game.laughs[index];
    let imgElement = character.querySelector("img");

    game.choosePlayers(character.textContent, imgElement.src, laugh);
    imgElement.style.display = "none";
    chooseModalTitle.textContent = "Player 2";
  });
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
    this.player1 = null;
    this.player2 = null;
    this.turn = this.player1;
    this.gameOver = false;
    this.audioElement = document.querySelector("audio");
    this.laughs = [
      "img/luffy-laugh.mp3",
      "img/zoro-laugh.mp3",
      "img/nami-laugh.mp3",
      "img/usopp-laugh.mp3",
      "img/sanji-laugh.mp3",
      "img/chopper-laugh.mp3",
      "img/robin-laugh.mp3",
      "img/franky-laugh.mp3",
      "img/brook-laugh.mp3",
    ];
  }
  choosePlayers(player, icon, laugh) {
    if (this.player1 === null) {
      this.player1 = new Player(player, "X", icon, laugh);
      this.turn = this.player1;
    } else {
      this.player2 = new Player(player, "O", icon, laugh);
      chooseModal.style.display = "none";
      this.audioElement.play();
    }
  }

  playTurn(index) {
    if (this.gameOver) {
      return;
    }
    if (this.board.addMarker(this.turn.marker, index)) {
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
      this.endGame(this.turn.nick);

      modal.style.display = "flex";
    } else {
      if (this.board.board.every((field) => field !== null)) {
        modal.style.display = "flex";
        this.endGame("draw");
      }
    }
  }
  endGame(status) {
    this.gameOver = true;
    if (status !== "draw") {
      modalImage.src = this.turn.icon;
      modalTitle.textContent = "The winner is";
      const sound = document.createElement("audio");
      sound.src = this.turn.laugh;
      sound.play();
    } else {
      modalImage.src = "img/draw.png";
      modalImage.style.width = "250px";
      modalImage.style.height = "175px";
      modalTitle.textContent = "It's a draw!";
    }
    this.audioElement.pause();
  }
}
class Player {
  constructor(nick, marker, icon, laugh) {
    this.nick = nick;
    this.marker = marker;
    this.icon = icon;
    this.laugh = laugh;
  }
}
let game = new Game();

const gameBoardGrid = document.getElementById("board-grid");
