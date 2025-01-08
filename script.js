let workTime = 25;
let breakTime = 5;
let seconds = 0;
let minutes = workTime;
let isRunning = false;
let isWorkTime = true;
let timer;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const toggleButton = document.getElementById('toggle-mode');

function updateDisplay() {
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function switchMode() {
    isWorkTime = !isWorkTime;
    minutes = isWorkTime ? workTime : breakTime;
    seconds = 0;
    modeText.textContent = isWorkTime ? '��️ 👓 Focus Time' : '⏱️ 😌';
    toggleButton.textContent = isWorkTime ? 'Rest' : 'Work';
    toggleButton.classList.toggle('work-mode', isWorkTime);
    updateDisplay();
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startButton.classList.add('running');
        timer = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    // Timer completed
                    clearInterval(timer);
                    switchMode();
                    startTimer();
                    return;
                }
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            updateDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    startButton.classList.remove('running');
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    startButton.classList.remove('running');
    isWorkTime = true;
    minutes = workTime;
    seconds = 0;
    modeText.textContent = '��️ 👓 Focus Time';
    updateDisplay();
}

function handleModeToggle() {
    if (!isRunning) {
        switchMode();
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
toggleButton.addEventListener('click', handleModeToggle);

// Initialize display
updateDisplay();
toggleButton.classList.add('work-mode'); 