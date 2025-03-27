const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.8;
canvas.height = 500;

let painting = false;
let mode = "freehand";
let startX, startY;
let brushColor = "#000000";
let brushSize = 5;
let fillShape = false;

// Start Drawing
canvas.addEventListener("mousedown", (e) => {
    painting = true;
    startX = e.clientX - canvas.offsetLeft;
    startY = e.clientY - canvas.offsetTop;

    if (mode !== "freehand") {
        ctx.beginPath();
    }
});

// Stop Drawing
canvas.addEventListener("mouseup", (e) => {
    if (mode !== "freehand") {
        drawShape(e);
    }
    painting = false;
    ctx.beginPath();
});

// Drawing Function
canvas.addEventListener("mousemove", (e) => {
    if (painting && mode === "freehand") {
        ctx.lineWidth = brushSize;
        ctx.lineCap = "round";
        ctx.strokeStyle = brushColor;
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }
});

// Draw Shapes (Rectangle, Circle, Line)
function drawShape(e) {
    let endX = e.clientX - canvas.offsetLeft;
    let endY = e.clientY - canvas.offsetTop;
    
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = brushColor;
    ctx.fillStyle = brushColor;
    
    if (mode === "rectangle") {
        let width = endX - startX;
        let height = endY - startY;
        ctx.beginPath();
        if (fillShape) {
            ctx.fillRect(startX, startY, width, height);
        } else {
            ctx.strokeRect(startX, startY, width, height);
        }
    } else if (mode === "circle") {
        let radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.closePath();
        if (fillShape) {
            ctx.fill();
        } else {
            ctx.stroke();
        }
    } else if (mode === "line") {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }
}

// Set Drawing Mode
function setMode(selectedMode) {
    mode = selectedMode;
}

// Change Brush Color
document.getElementById("colorPicker").addEventListener("change", (e) => {
    brushColor = e.target.value;
});

// Change Brush Size
document.getElementById("brushSize").addEventListener("input", (e) => {
    brushSize = e.target.value;
});

// Fill Shape Toggle
document.getElementById("fillColor").addEventListener("change", (e) => {
    fillShape = e.target.checked;
});

// Clear Canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Save Canvas as Image
function saveCanvas() {
    let image = canvas.toDataURL("image/png");
    let link = document.createElement("a");
    link.href = image;
    link.download = "drawing.png";
    link.click();
}
