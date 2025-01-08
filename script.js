let workTime = 25;
let breakTime = 5;
let seconds = 0;
let minutes = workTime;
let isRunning = false;
let isWorkTime = true;
let timer;
let originalTitle = document.title;
let notificationInterval;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const toggleButton = document.getElementById('toggle-mode');
const timerSound = document.getElementById('timer-sound');

function updateDisplay() {
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function switchMode() {
    isWorkTime = !isWorkTime;
    minutes = isWorkTime ? workTime : breakTime;
    seconds = 0;
    modeText.textContent = isWorkTime ? '⏱️ 👓 Focus Time' : '⏱️ 😌';
    toggleButton.textContent = isWorkTime ? 'Rest' : 'Work';
    toggleButton.classList.toggle('work-mode', isWorkTime);
    updateDisplay();
}

function startNotification(message) {
    clearInterval(notificationInterval);
    let isOriginalTitle = true;
    
    notificationInterval = setInterval(() => {
        document.title = isOriginalTitle ? `🔔 ${message}` : originalTitle;
        isOriginalTitle = !isOriginalTitle;
    }, 1000);
}

function stopNotification() {
    clearInterval(notificationInterval);
    document.title = originalTitle;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        stopNotification();
        startButton.classList.add('running');
        timer = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    // Timer completed
                    clearInterval(timer);
                    timerSound.play();
                    const message = isWorkTime ? "Break Time!" : "Time to Focus!";
                    startNotification(message);
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
    stopNotification();
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    startButton.classList.remove('running');
    isWorkTime = true;
    minutes = workTime;
    seconds = 0;
    modeText.textContent = '⏱️ 👓';
    updateDisplay();
    stopNotification();
}

function handleModeToggle() {
    if (!isRunning) {
        switchMode();
    }
}

function initSound() {
    timerSound.volume = 0.5;
    timerSound.load();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
toggleButton.addEventListener('click', handleModeToggle);

// Initialize display
updateDisplay();
toggleButton.classList.add('work-mode');
initSound(); 