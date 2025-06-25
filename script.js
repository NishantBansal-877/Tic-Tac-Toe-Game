const resetBtn = document.querySelector(".reset");
const player1Score = document.querySelector(".player-1 .player_display");
const player2Score = document.querySelector(".player-2 .player_display");
const innerTextAll = document.querySelectorAll(".inner_text");
const player = document.querySelectorAll(".player");
const allSections = document.querySelectorAll(".inner_sec");
const winBox = document.querySelector(".win_box");
const winDisplayPlayer = document.querySelector(".win_display_player");
const winDisplayScore = document.querySelector(".win_display_score");
const winText = document.querySelector(".win_text");
const turn = document.querySelectorAll(".turn");

let playerTurn = true;
let score = [0, 0],
  idx1 = 0,
  idx2 = 0;
player[1].style.display = "block";
let player1Sec = new Array();
let player2Sec = new Array();
console.log(turn);
turn[1].style.display = "none";

const resetFunction = function () {
  player1Score.textContent = score[0];
  player2Score.textContent = score[1];
  player1Sec = [];
  idx1 = 0;
  console.log(player1Sec.length);
  player2Sec = [];
  idx2 = 0;
  console.log(player2Sec.length);
  winBox.style.display = "none";
  innerTextAll.forEach((el) => {
    el.textContent = "";
  });
  player[playerTurn ? 1 : 0].style.display = "block";
  turn[playerTurn ? 1 : 0].style.display = "none";
};

resetBtn.addEventListener("click", resetFunction);

const allowedSequence = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
].map((arr) => arr.join(""));

const check = function (arr) {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        const sequence = [arr[i], arr[j], arr[k]]
          .sort((a, b) => a - b)
          .join("");
        if (allowedSequence.includes(sequence)) {
          return true;
        }
      }
    }
  }
  return false;
};

allSections.forEach((el) => {
  const spanText = el.querySelector(".inner_text");

  spanText.addEventListener("click", function () {
    if (spanText.textContent !== "") {
      return;
    }
    playerTurn
      ? (player1Sec[idx1++] = spanText.getAttribute("data-sec"))
      : (player2Sec[idx2++] = spanText.getAttribute("data-sec"));
    spanText.textContent = playerTurn ? "❌" : "⭕";
    playerTurn = !playerTurn;
    player[playerTurn ? 1 : 0].style.display = "block";
    player[playerTurn ? 0 : 1].style.display = "none";
    turn[playerTurn ? 1 : 0].style.display = "none";
    turn[playerTurn ? 0 : 1].style.display = "block";
    if (player1Sec.length > 2) {
      const win = check(player1Sec);
      if (win == true) {
        displayWin();
      }
    }
    if (player2Sec.length > 2) {
      const win = check(player2Sec);
      if (win == true) {
        displayWin();
      }
    }
    console.log(player1Sec.length + player2Sec.length);
    if (player1Sec.length + player2Sec.length == 9) {
      resetFunction();
    }
  });
});

const displayWin = function () {
  player[playerTurn ? 1 : 0].style.display = "none";
  winBox.style.display = "flex";
  winDisplayPlayer.textContent = `PLAYER ${playerTurn ? 2 : 1}`;
  winDisplayScore.textContent = "+ 10";
  score[playerTurn ? 1 : 0] += 10;
  player1Score.textContent = score[0];
  player2Score.textContent = score[1];
};

winText.addEventListener("click", resetFunction);
