let startTime = 0;
let elapsedTime = 0;
let timerInterval;

function formatTime(time) {
    let ms = time % 1000;
    let totalSeconds = Math.floor(time / 1000);
    let s = totalSeconds % 60;
    let m = Math.floor(totalSeconds / 60) % 60;
    let h = Math.floor(totalSeconds / 3600);

    return (
        (h < 10 ? "0" + h : h) + ":" +
        (m < 10 ? "0" + m : m) + ":" +
        (s < 10 ? "0" + s : s) + "." +
        ms.toString().padStart(3, '0')
    );
}

function start() {
    if (timerInterval) return;

    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        document.getElementById("display").innerText = formatTime(elapsedTime);
    }, 10);
}

function pause() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function reset() {
    pause();
    elapsedTime = 0;
    document.getElementById("display").innerText = "00:00:00.000";
    document.getElementById("laps").innerHTML = "";
}

function lap() {
    if (!timerInterval) return;

    let li = document.createElement("li");
    li.innerText = formatTime(elapsedTime);
    document.getElementById("laps").prepend(li);
}

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault();
        timerInterval ? pause() : start();
    }
    if (e.key.toLowerCase() === "r") reset();
    if (e.key.toLowerCase() === "l") lap();
});