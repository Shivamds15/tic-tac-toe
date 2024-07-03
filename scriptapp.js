let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
const confirmButton = document.getElementById("confirm-yes");
const cancelButton = document.getElementById("confirm-no");
const confirmBox = document.querySelector(".confirm-bg");
const startScreen = document.querySelector(".start-screen");
const gameContainer = document.querySelector(".game-container");
const playWithFriendBtn = document.getElementById("play-with-friend");
const playWithComputerBtn = document.getElementById("play-with-computer");

let turnO = true;
let drawcount = 0;
let playWithComputer = false;
resetbtn.disabled = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

playWithFriendBtn.addEventListener("click", () => {
  startGame(false);
});

playWithComputerBtn.addEventListener("click", () => {
  startGame(true);
});

const startGame = (computerPlayer) => {
  playWithComputer = computerPlayer;
  startScreen.classList.add("hide");
  gameContainer.classList.remove("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      box.innerText = turnO ? "O" : "X";
      turnO = !turnO;
      box.disabled = true;
      resetbtn.disabled = false;
      drawcount++;
      // Script for Tic Tac Toe Game
      // Created by Shivam Singh - July 2024
      if (checkWinner().win) {
        showWinner(checkWinner().value);
      } else if (drawcount === 9) {
        showDraw();
      } else if (playWithComputer) {
        setTimeout(computerMove, 500);
      }
    }
  });
});

const computerMove = () => {
  let availableBoxes = Array.from(boxes).filter((box) => box.innerText === "");
  if (availableBoxes.length > 0) {
    let randomBox =
      availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
    randomBox.innerText = "X";
    randomBox.disabled = true;
    turnO = !turnO;
    drawcount++;
    if (checkWinner().win) {
      showWinner(checkWinner().value);
    } else if (drawcount === 9) {
      showDraw();
    }
  }
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
      return { win: true, value: pos1val };
    }
  }
  return { win: false, value: null };
};

const showWinner = (winner) => {
  msg.style.backgroundColor = "#4caf50";
  msg.innerText = `Winner : ${winner}`;
  msgcontainer.classList.remove("hide");
  disableBoxes();
};

const showDraw = () => {
  msg.style.backgroundColor = "#f44336;";
  msg.innerText = "It's a Draw";
  msgcontainer.classList.remove("hide");
};

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const resetGame = () => {
  enableBoxes();
  turnO = true;
  drawcount = 0;
  resetbtn.disabled = true;
  msgcontainer.classList.add("hide");
  startScreen.classList.remove("hide");
  gameContainer.classList.add("hide");
};

resetbtn.addEventListener("click", resetGame);

newbtn.addEventListener("click", () => {
  confirmBox.style.display = "block";
});

confirmButton.addEventListener("click", () => {
  resetGame();
  confirmBox.style.display = "none";
});

cancelButton.addEventListener("click", () => {
  confirmBox.style.display = "none";
});
