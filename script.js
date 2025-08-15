let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("laps");

function updateDisplay(time) {
  const ms = Math.floor((time % 1000) / 10);
  const sec = Math.floor((time / 1000) % 60);
  const min = Math.floor((time / (1000 * 60)) % 60);

  const formattedTime = 
    `${String(min).padStart(2, '0')}:` +
    `${String(sec).padStart(2, '0')}:` +
    `${String(ms).padStart(2, '0')}`;

  display.textContent = formattedTime;
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay(elapsedTime);
  }, 10);
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateDisplay(0);
  lapsList.innerHTML = '';
  startPauseBtn.textContent = "Start";
  isRunning = false;
}

function addLap() {
  if (!isRunning) return;
  const li = document.createElement("li");
  li.textContent = display.textContent;
  lapsList.appendChild(li);
}

startPauseBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTimer();
    startPauseBtn.textContent = "Pause";
    isRunning = true;
  } else {
    pauseTimer();
    startPauseBtn.textContent = "Start";
    isRunning = false;
  }
});

resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", addLap);
