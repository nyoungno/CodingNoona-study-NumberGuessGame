//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
//만약에 유저가 랜덤번호는 맞추면, 맞췃습니다.
//랜덤번호가 < 유저번호 Down!!
//랜덤번호가 > 유전번호 up!!
//Rest버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다쓰면 게임이 끝난다. (더이상 추측 불가. 버튼이 disavle)
//유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
//유저가 이미 입력한 숫자를 또입 입력하면, 알려준다. 기회를 깍지 않는다.

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 3;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];
let resultAreaImg = document.querySelector(".main-img");
let historyArea = document.getElementById("history-area");

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNum);
}

function play() {
  if (gameOver) return; // 게임이 종료되었으면 아무것도 하지 않음

  let userValue = parseInt(userInput.value);
  if (isNaN(userValue) || userValue < 1 || userValue > 100) {
    resultAreaImg.src = "./image/Magnifier.png";
    resultArea.textContent = "1~100 사이의 숫자를 입력해 주세요.";
    return;
  }

  if (history.includes(userValue)) {
    let lastValue = history[history.length - 1];
    resultAreaImg.src = "./image/Magnifier.png";
    resultArea.textContent = `이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요.(이전입력:${lastValue})`;
    return;
  }

  for (let i = 1; i <= 2; i++) {
    if (history.length >= i) {
      let lastValue = history[history.length - i];
      if (computerNum > lastValue && userValue <= lastValue) {
        resultAreaImg.src = "./image/up.png";
        resultArea.textContent = `${lastValue}보다 큰 수를 입력해 주세요.`;
        return;
      } else if (computerNum < lastValue && userValue >= lastValue) {
        resultAreaImg.src = "./image/down.png";
        resultArea.textContent = `${lastValue}보다 작은 수를 입력해 주세요.`;
        return;
      }
    }
  }

  history.push(userValue);
  updateHistory();
  chances--;
  chanceArea.textContent = `남은 기회: ${chances}`;

  if (userValue < computerNum) {
    resultAreaImg.src = "./image/up.png";
    resultArea.textContent = "UP";
  } else if (userValue > computerNum) {
    resultAreaImg.src = "./image/down.png";
    resultArea.textContent = "DOWN";
  } else {
    resultAreaImg.src = "./image/success.png";
    resultArea.textContent = `성공! 정답은 ${computerNum}!`;
    gameOver = true;
    playButton.disabled = true;
    return;
  }

  if (chances <= 0) {
    gameOver = true;
    resultAreaImg.src = "./image/failure.png";
    resultArea.textContent = `실패! 정답은 ${computerNum}`;
    playButton.disabled = true;
  }
}

function reset() {
  userInput.value = "";
  pickRandomNum();
  resultAreaImg.src = "./image/100.png";
  resultArea.textContent = "새로운 게임을 시작하세요";
  gameOver = false;
  playButton.disabled = false;
  chances = 3;
  chanceArea.textContent = `남은 기회: ${chances}`;
  history = [];
  historyArea.textContent = "입력한 숫자: " + history.join(", ");
}

function updateHistory() {
  historyArea.textContent = "입력한 숫자: " + history.join(", ");
}

pickRandomNum();
