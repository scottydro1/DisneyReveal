const mysteryTimeouts = [];

function clearMysteryTimeouts() {
    mysteryTimeouts.forEach(clearTimeout);
    mysteryTimeouts.length = 0;
}

function startMysteriousGirlTask() {
    byId("taskPrompt").innerText = "  Sigh School...😔"

    document.getElementById("school_front").classList.add("d-none");
    document.getElementById("hallway_mystery").classList.remove("d-none");

    const options = document.getElementById("mysteryOptions");

    const promptTimeout = setTimeout(() => {
        document.getElementById("amiya2").classList.remove("d-none");

        byId("taskPrompt").innerText = "  Amiya: \"Hey Kalia, you coming to my party this weekend ? \""
    }, 2000);
    mysteryTimeouts.push(promptTimeout);

    const optionTimeout = setTimeout(() => {
        options.classList.remove("d-none");
    }, 4000);
    mysteryTimeouts.push(optionTimeout);

    document.querySelectorAll(".mystery-btn").forEach(btn => {
        btn.disabled = false;
        btn.onclick = () => {
            clearMysteryTimeouts();
            const text = btn.innerText;
            if (text.includes("float by")) {
                showMysterySuccess();
            } else {
                showMysteryFail();
            }
        };
    });
}

function showMysteryFail() {
    const modal = new bootstrap.Modal(document.getElementById("failMysteryModal"));
    modal.show();
    setTimeout(() => location.reload(), 3000);
}

function showMysterySuccess() {
    const modal = new bootstrap.Modal(document.getElementById("successMysteryModal"));
    modal.show();
    setTimeout(() => {
        modal.hide();
        document.getElementById("amiya2").classList.add("d-none");
        document.getElementById("mysteryOptions").classList.add("d-none");

        startHaydenMysteryTask();
    }, 3000);

}


function startHaydenMysteryTask() {
    // Hide Amiya and her options
    byId("amiya2").classList.add("d-none");
    byId("mysteryOptions").classList.add("d-none");

    // Update prompt and show Hayden
    byId("taskPrompt").innerText = 'Hayden: "Kalia… did you know someone *likes* you?"';
    byId("hayden2").classList.remove("d-none");

    // Show her options
    const haydenTimeout = setTimeout(() => {
        byId("mysteryHaydenOptions").classList.remove("d-none");
    }, 2000);
    mysteryTimeouts.push(haydenTimeout);

    // Button logic
    document.querySelectorAll(".mystery-hayden-btn").forEach(btn => {
        btn.disabled = false;
        btn.onclick = () => {
            clearMysteryTimeouts();
            const text = btn.innerText;
            if (text.includes("universe whispers")) {
                showHaydenMysterySuccess();
            } else {
                showHaydenMysteryFail();
            }
        };
    });
}

function showHaydenMysteryFail() {
    const modal = new bootstrap.Modal(byId("failMysteryHaydenModal"));
    modal.show();
    setTimeout(() => location.reload(), 3000);
}
function showHaydenMysterySuccess() {
    const modal = new bootstrap.Modal(byId("successMysteryHaydenModal"));
    modal.show();

    setTimeout(() => {
        modal.hide();
        byId("hayden2").classList.add("d-none");
        byId("mysteryHaydenOptions").classList.add("d-none");

        startMysteryMeanGirlsTask();
    }, 3000);
}


function startMysteryMeanGirlsTask() {
    byId("taskPrompt").innerText = "The mean girls are coming… They look ready to talk trash.";

    byId("meanMystery").classList.remove("d-none");

    const meanTimeout = setTimeout(() => {
        byId("mysteryMeanOptions").classList.remove("d-none");
    }, 2000);
    mysteryTimeouts.push(meanTimeout);

    document.querySelectorAll(".mean-mystery-btn").forEach(btn => {
        btn.disabled = false;
        btn.onclick = () => {
            clearMysteryTimeouts();
            const line = btn.innerText;
            if (line.includes("opinion of many")) {
                showMysteryMeanSuccess();
            } else {
                showMysteryMeanFail();
            }
        };
    });
}

function showMysteryMeanFail() {
    const modal = new bootstrap.Modal(byId("failMysteryMeanModal"));
    modal.show();
    setTimeout(() => location.reload(), 3000);
}

function showMysteryMeanSuccess() {
    const modal = new bootstrap.Modal(byId("successMysteryMeanModal"));
    modal.show();
    setTimeout(() => {
        modal.hide();
        byId("hallway_mystery").classList.add("d-none");
        byId("outside").classList.remove("d-none");

        byId("taskPrompt").innerText = "You ghosted through that like a legend. Time for the reveal.";

        setTimeout(() => {
            window.location.href = "/complete/kalia";
        }, 3000);
    }, 3000);
}
