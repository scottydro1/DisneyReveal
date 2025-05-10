const gameState = {
    hasDirt: false,
    hasSeeds: false,
    hasWater: false,
    hasFlower: false,
    hasTree: false,
    hasWeb: false,
    hasLoom: false,
    hasDress: false,
    hasCrown: false,
    hasOpenedBook: false,
    crafedflower: false,
    crafteddress: false
};

const byId = id => document.getElementById(id);


byId("openbookbtnb").onclick = () => {
    document.getElementById("recipeBadge").classList.add("d-none")

    gameState.hasOpenedBook = true;
}

// Item click events
["dirt", "seeds", "water", "spider", "flower"].forEach(id => {

    byId(id).onclick = () => {
        if (gameState.hasOpenedBook == false) {
            return
        }
        if (id === "spider") {
            const cangetspider = gameState.hasFlower;
            if (cangetspider) {
                showAndFadeImage(id);
                byId("webnull").src = "/static/img/web.png";
                gameState.hasWeb = true
                byId("craftDress").removeAttribute("disabled");
                document.getElementById("recipeBadge").classList.remove("d-none")

            }
            return
        }

        gameState["has" + id.charAt(0).toUpperCase() + id.slice(1)] = true;
        showAndFadeImage(id);
        if (id === "flower") {
            document.querySelectorAll(".grass").forEach(el => el.remove());
            byId("flowernull").src = "/static/img/flower.png";
        }
        // Conditional removal
        if (id === "seeds") {
            document.querySelectorAll(".grass").forEach(el => el.remove());
            byId("seednull").src = "/static/img/seeds.png";
        }

        if (id === "dirt") {
            document.querySelectorAll(".rock").forEach(el => el.remove());
            byId("dirtnull").src = "/static/img/dirt.png";

        }
        if (id === "water") {
            byId("waternull").src = "/static/img/water.png";

        }

        // Flower crafting check
        const canCraftFlower = gameState.hasDirt && gameState.hasSeeds && gameState.hasWater;
        if (canCraftFlower && gameState.crafedflower == false) {
            byId("craftFlower").removeAttribute("disabled");
            document.getElementById("recipeBadge").classList.remove('d-none');

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
    }, 2000); // matches animation duration
}



// Crafting logic
byId("craftFlower").onclick = () => {
    if (gameState.hasDirt && gameState.hasSeeds && gameState.hasWater) {
        alert(" A Flower has Grown!");

        byId("flower").classList.remove('d-none')
        byId("page2").classList.remove("d-none");
        gameState.crafedflower = true
        byId("craftFlower").setAttribute("disabled", true);

        byId("craftFlower").innerHTML = "Already Crafted!";

    }
};


byId("craftDress").onclick = () => {
    if (gameState.hasWeb && gameState.hasFlower) {
        alert("Dress crafted!");
        gameState.hasDress = true;
        byId("dress").classList.remove('d-none')

        document.body.classList.remove("bodynight");
        document.body.classList.add("bodyday");

        byId("spider").classList.remove("d-block")
        byId("spider").classList.add("d-none")
        byId("craftDress").setAttribute("disabled", true);
        byId("sun").src = "/static/img/sun.png";

        byId("craftFlower").innerHTML = "Already Crafted!";
    }
};

byId("dress").onclick = () => {
    alert("You are ready for the big reveal!!");

    // Optional: show her final sprite
    byId("kayce").classList.remove("d-none");
    byId("dress").classList.add("d-none");

    // After 2 seconds, tell the server she's complete and go home
    setTimeout(() => {
        window.location.href = "/complete/kayce";
    }, 2000);
};


//change day
byId("sun").onclick = () => {
    togglesun()
};
function togglesun(toggle = false) {
    if (gameState.hasOpenedBook == false || gameState.hasFlower == false) {
        return
    }
    if (document.body.classList.contains("bodyday")) {
        document.body.classList.remove("bodyday");
        document.body.classList.add("bodynight");

        byId("spider").classList.remove("d-none")
        byId("spider").classList.add("d-block")
        byId("sun").src = "/static/img/moon.png";
    } else {
        document.body.classList.remove("bodynight");
        document.body.classList.add("bodyday");

        byId("spider").classList.remove("d-block")
        byId("spider").classList.add("d-none")
        byId("sun").src = "/static/img/sun.png";


    }
}