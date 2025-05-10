const gameState = {
    hastrophykey: false,
    hasbathkey: false,
    hasdress: false,
    hasteddy: false,
    hasshower: false,
    hasslippers: false,
    hascrown: false,
    haslipgloss: false
};

const byId = id => document.getElementById(id);



function showAndFadeImage(id) {
    const img = document.getElementById(id);
    img.classList.remove('d-none');
    img.classList.add('pop-fade');

    // Reset after animation
    setTimeout(() => {
        img.classList.add('d-none');
        img.classList.remove('pop-fade');
        img.style.zIndex = 10;
    }, 2000); // matches animation duration
}

byId("bedroom_btn").onclick = () => {
    byId("hallway_btn").classList.remove("d-none")
    byId("hall_room").classList.add("d-none")
    byId("bedroom_room").classList.remove("d-none")

};


byId("bathroom_btn").onclick = () => {
    if (gameState.hasbathkey) {
        byId("hallway_btn").classList.remove("d-none")

        byId("hall_room").classList.add("d-none")
        byId("bathroom_room").classList.remove("d-none")

    }
};

byId("trophyroom_btn").onclick = () => {
    if (gameState.hastrophykey) {
        byId("hallway_btn").classList.remove("d-none")
        byId("hall_room").classList.add("d-none")
        byId("trophy_room").classList.remove("d-none")

    }
};

byId("hallway_btn").onclick = () => {
    byId("hallway_btn").classList.add("d-none")
    byId("bedroom_room").classList.add("d-none")
    byId("bathroom_room").classList.add("d-none")

    byId("hall_room").classList.remove("d-none")

    if (gameState.hasbathkey) {
        byId("bathroom_lock").src = "/static/img/kins/unlock.png";
    }
    if (gameState.hastrophykey) {
        byId("trophyroom_lock").src = "/static/img/kins/unlock.png";
    }

};

["dress", "teddy", "slippers", "bathkey", "lipgloss", "shower", "trophykey", "crown"].forEach(id => {
    byId(id).onclick = () => {
        if (id === "teddy") {
            byId('inv_teddy').classList.add("bg-warning")
            byId("teddy").src = "/static/img/kins/teddy.png";
            gameState.hasteddy = true
        }

        if (id === "dress") {
            byId('inv_dress').classList.add("bg-warning")
            byId("dress").src = "/static/img/kins/dress.png";
            gameState.hasdress = true
        }
        if (id === "slippers") {
            byId('inv_slippers').classList.add("bg-warning")
            byId("slippers").src = "/static/img/kins/slippers.png";
            gameState.hasslippers = true
        }

        if (id === "bathkey") {
            byId('inv_bathkey').classList.add("bg-warning")
            byId("bathkey").src = "/static/img/kins/bathkey.png";
            gameState.hasbathkey = true
        }
        if (id === "lipgloss") {
            byId('inv_lipgloss').classList.add("bg-warning")
            byId("lipgloss").src = "/static/img/kins/lipgloss.png";
            gameState.haslipgloss = true
        }
        if (id === "shower") {
            byId('inv_shower').classList.add("bg-warning")
            byId("shower").src = "/static/img/kins/shower.png";
            gameState.hasshower = true
        }
        if (id === "trophykey") {
            byId('inv_trophykey').classList.add("bg-warning")
            byId("trophykey").src = "/static/img/kins/trophykey.png";
            byId("trophyroom_lock").src = "/static/img/kins/unlock.png";

            gameState.hastrophykey = true
        }
        if (id === "crown") {
            byId('inv_crown').classList.add("bg-warning")
            byId("crown").src = "/static/img/kins/crown.png";
            gameState.hascrown = true
            showAndFadeImage(id);
            byId('kinsley').classList.remove("d-none")

            setTimeout(() => {
                done()
            }, 2000);

            return
        }
        showAndFadeImage(id);
        const cangettroph = gameState.hasslippers && gameState.hasbathkey && gameState.hasdress && gameState.hasshower && gameState.hasteddy
            && gameState.haslipgloss;
        if (cangettroph) {
            document.getElementById("trophykey").classList.remove('d-none');

        }
    };

});

function showAndFadeImage(id) {
    const img = document.getElementById(id);
    img.classList.remove('d-none');
    img.classList.add('pop-fade');

    // Reset after animation
    setTimeout(() => {
        img.classList.add('d-none');
        img.classList.remove('pop-fade');
        img.style.zIndex = 10;
    }, 3000); // matches animation duration
}

function done() {
    alert("You are ready for the big reveal!!");

    // After 2 seconds, tell the server she's complete and go home
    setTimeout(() => {
        window.location.href = "/complete/kinsley";
    }, 1000);
}