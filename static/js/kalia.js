const byId = id => document.getElementById(id);
const activeTimeouts = [];
const activeIntervals = [];

let tappedWords = [];
const correctOrder = ["nice", "haircut"];

function clearAllTimeouts() {
    activeTimeouts.forEach(clearTimeout);
    activeTimeouts.length = 0;
}

function clearAllIntervals() {
    activeIntervals.forEach(clearInterval);
    activeIntervals.length = 0;
}

function startPopularGirlTask() {
    byId("taskPrompt").innerText = "Welcome to High School!"
    byId("school_front").classList.add("d-none");
    byId("hallway").classList.remove("d-none");

    const puzzleBox = byId("wordPuzzle");
    const timerDisplay = byId("taskTimer");

    tappedWords = [];
    document.querySelectorAll(".word-btn").forEach(btn => {
        btn.disabled = false;
    });

    // Show prompt
    const promptTimeout = setTimeout(() => {
        byId("taskPrompt").innerText = "Quick! Compliment Hayden before she thinks you're stuck-up!"

        byId("hayden").classList.remove("d-none");

    }, 2000);
    activeTimeouts.push(promptTimeout);

    // Show puzzle and start countdown
    const puzzleTimeout = setTimeout(() => {
        puzzleBox.classList.remove("d-none");
        timerDisplay.classList.remove("d-none");
        startCountdown(6);
    }, 3000);
    activeTimeouts.push(puzzleTimeout);
}

function startCountdown(seconds) {
    let timeLeft = seconds;
    const timerSpan = byId("timerValue");

    timerSpan.textContent = timeLeft;

    const intervalId = setInterval(() => {
        timeLeft--;
        timerSpan.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(intervalId);
            checkWordAnswer();
        }
    }, 1000);
    activeIntervals.push(intervalId);
}

function checkWordAnswer() {
    clearAllTimeouts();
    clearAllIntervals();

    const failModal = new bootstrap.Modal(byId('failModal'));
    const successModal = new bootstrap.Modal(byId('successModal'));

    const success = tappedWords.join(" ") === correctOrder.join(" ");

    if (!success) {
        failModal.show();
        const reloadTimeout = setTimeout(() => location.reload(), 3000);
        activeTimeouts.push(reloadTimeout);
    } else {
        byId("taskTimer").classList.add("d-none");
        byId("wordPuzzle").classList.add("d-none");

        successModal.show();
        const successTimeout = setTimeout(() => {
            successModal.hide();
            startAmiyaTask();

        }, 3000);
        activeTimeouts.push(successTimeout);
    }
}

// Attach word button click handlers once
document.querySelectorAll(".word-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        tappedWords.push(btn.innerText);
        btn.disabled = true;

        if (tappedWords.length === correctOrder.length) {
            checkWordAnswer();
        }
    });
});


function startAmiyaTask() {
    byId("taskPrompt").innerText = "Amiya: \"You like my outfit?\""

    byId("amiya").classList.remove("d-none");

    byId("amiyaTask").classList.remove("d-none");
    let amiyaTime = 5;
    const amiyaTimer = byId("amiyaTimerVal");

    const intervalId = setInterval(() => {
        amiyaTime--;
        amiyaTimer.textContent = amiyaTime;
        if (amiyaTime <= 0) {
            clearInterval(intervalId);
            showAmiyaFail();
        }
    }, 1000);
    activeIntervals.push(intervalId);

    document.querySelectorAll(".emoji-btn").forEach(btn => {
        btn.disabled = false;
        btn.onclick = () => {
            clearInterval(intervalId);
            const emoji = btn.innerText;
            if (emoji === "💖") {
                showAmiyaSuccess();
            } else {
                showAmiyaFail();
            }
        };
    });
}

function showAmiyaFail() {
    clearAllTimeouts();
    clearAllIntervals();
    const modal = new bootstrap.Modal(byId("failAmiyaModal"));
    modal.show();
    setTimeout(() => location.reload(), 3000);
}

function showAmiyaSuccess() {
    clearAllTimeouts();
    clearAllIntervals();
    byId("amiyaTask").classList.add("d-none");
    const modal = new bootstrap.Modal(byId("successAmiyaModal"));
    modal.show();
    setTimeout(() => {
        modal.hide();
        byId("hayden").classList.add("d-none");
        byId("amiya").classList.add("d-none");
        byId("mean").classList.remove("d-none");

        startMeanGirlsTask();

    }, 3000);
}

function startMeanGirlsTask() {

    byId("amiyaTask").classList.add("d-none");
    byId("meanGirlsTask").classList.remove("d-none");

    const insults = [
        "That top is so *last week*.",
        "Did your mom pick that outfit?",
        "You think you’re popular now?"
    ];
    const quote = insults[Math.floor(Math.random() * insults.length)];
    byId("taskPrompt").innerText = `"${quote}"`;

    document.querySelectorAll(".reaction-btn").forEach(btn => {
        btn.disabled = false;
        btn.onclick = () => {
            const choice = btn.innerText.toLowerCase();
            if (choice.includes("clapback")) {
                showMeanGirlsSuccess();
            } else {
                showMeanGirlsFail();
            }
        };
    });
}

function showMeanGirlsFail() {
    clearAllTimeouts();
    clearAllIntervals();
    const modal = new bootstrap.Modal(byId("failMeanGirlsModal"));
    modal.show();
    setTimeout(() => location.reload(), 3000);
}

function showMeanGirlsSuccess() {
    clearAllTimeouts();
    clearAllIntervals();
    byId("meanGirlsTask").classList.add("d-none");
    const modal = new bootstrap.Modal(byId("successMeanGirlsModal"));
    modal.show();
    setTimeout(() => {
        modal.hide();
        byId("hallway").classList.add("d-none")
        byId("outside").classList.remove("d-none")
        byId("taskPrompt").innerText = "  You are done with the school lets see the Big Reveal!"
        // After 2 seconds, tell the server she's complete and go home
        setTimeout(() => {
            window.location.href = "/complete/kalia";
        }, 3000);
    }, 3000);
}
