import GameOfLife from "./gameOfLife.js";
function updateCanvasDimensions(canvas) {
    canvas.height = window.innerHeight * 0.9;
    canvas.width = window.innerWidth * 0.9;
}
function init() {
    const dialog = document.querySelector("dialog");
    dialog.showModal();
    dialog.querySelector("button").onclick = () => dialog.close();
    const canvas = document.querySelector("canvas");
    if (!canvas)
        throw "Canvas not found";
    updateCanvasDimensions(canvas);
    window.addEventListener("resize", () => updateCanvasDimensions(canvas));
    const game = new GameOfLife(canvas);
    let running = false, intervalId = null;
    const btn = document.getElementById("startBtn");
    btn.addEventListener("click", () => {
        running = !running;
        if (running) {
            btn.innerText = "Pause";
            intervalId = setInterval(() => game.cycle(), 300);
        }
        else {
            btn.innerText = "Play";
            clearInterval(intervalId);
        }
    });
}
init();
