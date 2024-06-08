let startStopButton = document.getElementById('startStop');
let lapButton = document.getElementById('lap');
let resetButton = document.getElementById('reset');
let display = document.getElementById('display');
let laps = document.getElementById('laps');

let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapTimes = [];

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1);
        startStopButton.innerHTML = 'Stop';
        running = true;
    } else {
        clearInterval(tInterval);
        startStopButton.innerHTML = 'Start';
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    running = false;
    display.innerHTML = '00:00:00';
    startStopButton.innerHTML = 'Start';
    laps.innerHTML = '';
    lapTimes = [];
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    display.innerHTML = hours + ':' + minutes + ':' + seconds;
}

function recordLap() {
    if (running) {
        let lapTime = display.innerHTML;
        lapTimes.push(lapTime);
        displayLaps();
    }
}

function displayLaps() {
    laps.innerHTML = '';
    lapTimes.forEach((lap, index) => {
        let lapElement = document.createElement('p');
        lapElement.innerHTML = `Lap ${index + 1}: ${lap}`;
        laps.appendChild(lapElement);
    });
}

startStopButton.addEventListener('click', startStopwatch);
lapButton.addEventListener('click', recordLap);
resetButton.addEventListener('click', resetStopwatch);
