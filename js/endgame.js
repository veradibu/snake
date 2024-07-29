setTimeout(() => {
    document.getElementById("endgame2").style.display = "block";
}, 500);

setTimeout(() => {
    document.getElementById("endgame3").style.display = "block";
}, 1000);


const start_again_button = document.getElementById("start-again-button");
start_again_button.addEventListener("click", function () {
    window.location.href = '../index.html';
});

