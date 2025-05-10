(function () {
    if (typeof userProgress === 'undefined') {
        console.warn('userProgress not defined.');
        return;
    }

    if (userProgress.kayce) {
        document.getElementById("kayce-sprite").src = "/static/img/kayce.png";
    }

    if (userProgress.kinsley) {
        document.getElementById("kinsley-sprite").src = "/static/img/kinsley.png";
    }

    if (userProgress.kalia) {
        document.getElementById("kalia-sprite").src = "/static/img/kalia.png";
    }

    // Add others here...
})();
