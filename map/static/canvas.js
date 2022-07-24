const canvas = document.getElementById('draw_canvas');
const ctx = canvas.getContext('2d');

// Disable right-click.
document.oncontextmenu = function () {
    return false;
}

// Cursor coordinates.
let cursorX;
let cursorY;
let prevCursorX;
let prevCursorY;

// Distance from origin.
let offsetX = 0;
let offsetY = 0;

// Zoom.
let scale = 1;

// Convert coordinates from screen coord to scaled coord.
function toScreenX(xTrue) {
    return (xTrue + offsetX) * scale;
}
function toScreenY(yTrue) {
    return (yTrue + offsetY) * scale;
}

// Convert coordinates from scaled coord to screen coord.
function toTrueX(xScreen) {
    return (xScreen / scale) - offsetX;
}
function toTrueY(yScreen) {
    return (yScreen / scale) - offsetY;
}
function trueHeight() {
    return canvas.clientHeight / scale;
}
function trueWidth() {
    return canvas.clientWidth / scale;
}

let drawGrid = function () {
    let step = 50;
    for (var x = (offsetX % step) * scale; x <= canvas.width; x += step * scale) {
        if (x < 0) {
            continue
        };

        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }

    for (var y = (offsetY % step) * scale; y <= canvas.height; y += step * scale) {
        if (y < 0) {
            continue
        };

        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }

    ctx.strokeStyle = "#222222";
    ctx.stroke();
}


let tile1 = { x: 650, y: 500 };
let tile2 = { x: 650, y: 435 };
let tile3 = { x: 650, y: 370 };
let tile4 = { x: 650, y: 305 };
let tile5 = { x: 715, y: 305 };
let tile6 = { x: 715, y: 240 };
let tile7 = { x: 585, y: 500 };
let tiles = [tile1, tile2, tile3, tile4, tile5, tile6, tile7];

function drawTiles() {
    let tile_width = 50 * scale;
    for (i = 0; i < tiles.length; i++) {
        let tile = tiles[i]
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(toScreenX(tile.x), toScreenY(tile.y), tile_width, tile_width);
    }
}

// Draw canvas.
function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    ctx.fillStyle = '#191919';
    ctx.fillRect(0, 0, canvas.width, canvas.height)


    drawGrid();

    drawTiles();

    // ctx.fillStyle = "#fff";
    // ctx.fillRect(toScreenX(775), toScreenY(575), 50 * scale, 50 * scale);
    // ctx.fillRect(toScreenX(675), toScreenY(475), 50 * scale, 50 * scale);
    // ctx.fillRect(toScreenX(675), toScreenY(575), 50 * scale, 50 * scale);
    // ctx.fillRect(toScreenX(775), toScreenY(475), 50 * scale, 50 * scale);
}

redrawCanvas();

// if the window changes size, redraw the canvas
window.addEventListener("resize", (event) => {
    redrawCanvas();
});

// Mouse Event Handlers
canvas.addEventListener('wheel', onMouseWheel, false);

// mouse functions
let leftMouseDown = false;
let rightMouseDown = false;
// function onMouseDown(event) {
//     console.log(event);

//     // detect left clicks
//     if (event.button == 0) {
//         leftMouseDown = true;
//         rightMouseDown = false;
//     }
//     // detect right clicks
//     if (event.button == 2) {
//         rightMouseDown = true;
//         leftMouseDown = false;
//     }

//     // update the cursor coordinates
//     cursorX = event.pageX;
//     cursorY = event.pageY;
//     prevCursorX = event.pageX;
//     prevCursorY = event.pageY;
// }
// function onMouseMove(event) {
//     // get mouse position
//     cursorX = event.pageX;
//     cursorY = event.pageY;
//     // const scaledX = toTrueX(cursorX);
//     // const scaledY = toTrueY(cursorY);
//     // const prevScaledX = toTrueX(prevCursorX);
//     // const prevScaledY = toTrueY(prevCursorY);

//     if (leftMouseDown) {

//         // move the screen
//         offsetX += (cursorX - prevCursorX) / scale;
//         offsetY += (cursorY - prevCursorY) / scale;
//         redrawCanvas();
//     }
//     // if (rightMouseDown) {
//     //     // move the screen
//     //     offsetX += (cursorX - prevCursorX) / scale;
//     //     offsetY += (cursorY - prevCursorY) / scale;
//     //     redrawCanvas();
//     // }
//     prevCursorX = cursorX;
//     prevCursorY = cursorY;
// }
// function onMouseUp() {
//     leftMouseDown = false;
//     rightMouseDown = false;
// }


function onMouseWheel(event) {
    const max_scale = 2;
    const min_scale = .1;
    // console.log(event);
    event.preventDefault();

    if (event.ctrlKey) {
        // scale -= event.deltaY / 100;
        // // offsetX -= cursorX;
        // // offsetY -= cursorY;

        // redrawCanvas();

        // // Scale the scroll because fuck all.
        const scaleAmount = -event.deltaY / 500;
        scale = scale * (1 + scaleAmount);

        // Limit scale.
        if (scale >= max_scale) {
            scale = max_scale;
            return;
        } else if (scale <= min_scale) {
            scale = min_scale;
            return;
        }

        // Zoome the page based on cursor location.
        var distX = event.pageX / canvas.clientWidth;
        var distY = event.pageY / canvas.clientHeight;

        // Figure out how far to zoom.
        const unitsZoomedX = trueWidth() * scaleAmount;
        const unitsZoomedY = trueHeight() * scaleAmount;

        const unitsAddLeft = unitsZoomedX * distX;
        const unitsAddTop = unitsZoomedY * distY;

        offsetX -= unitsAddLeft;
        offsetY -= unitsAddTop;

        redrawCanvas();
    } else {
        cursorX = event.deltaX;
        cursorY = event.deltaY;

        // offsetX -= cursorX * scale;
        // offsetY -= cursorY * scale;
        offsetX -= cursorX;
        offsetY -= cursorY;

        redrawCanvas();

        prevCursorX = cursorX;
        prevCursorY = cursorY;
    }

    // // Distance scrolled vertically.
    // const deltaY = event.deltaY;

    // // Scale the scroll because fuck all.
    // const scaleAmount = -deltaY / 500;
    // scale = scale * (1 + scaleAmount);

    // // Zoome the page based on cursor location.
    // var distX = event.pageX / canvas.clientWidth;
    // var distY = event.pageY / canvas.clientHeight;

    // // Figure out how far to zoom.
    // const unitsZoomedX = trueWidth() * scaleAmount;
    // const unitsZoomedY = trueHeight() * scaleAmount;

    // const unitsAddLeft = unitsZoomedX * distX;
    // const unitsAddTop = unitsZoomedY * distY;

    // offsetX -= unitsAddLeft;
    // offsetY -= unitsAddTop;
}

// // touch functions
// const prevTouches = [null, null]; // up to 2 touches
// let singleTouch = false;
// let doubleTouch = false;
// function onTouchStart(event) {
//     if (event.touches.length == 1) {
//         singleTouch = true;
//         doubleTouch = false;
//     }
//     if (event.touches.length >= 2) {
//         singleTouch = false;
//         doubleTouch = true;
//     }

//     // store the last touches
//     prevTouches[0] = event.touches[0];
//     prevTouches[1] = event.touches[1];

// }
// function onTouchMove(event) {
//     event.preventDefault();
//     // get first touch coordinates
//     const touch0X = event.touches[0].pageX;
//     const touch0Y = event.touches[0].pageY;
//     const prevTouch0X = prevTouches[0].pageX;
//     const prevTouch0Y = prevTouches[0].pageY;

//     // const scaledX = toTrueX(touch0X);
//     // const scaledY = toTrueY(touch0Y);
//     // const prevScaledX = toTrueX(prevTouch0X);
//     // const prevScaledY = toTrueY(prevTouch0Y);

//     if (singleTouch) {
//         console.log('Single touch');
//     }

//     if (doubleTouch) {
//         // get second touch coordinates
//         const touch1X = event.touches[1].pageX;
//         const touch1Y = event.touches[1].pageY;
//         const prevTouch1X = prevTouches[1].pageX;
//         const prevTouch1Y = prevTouches[1].pageY;

//         // get midpoints
//         const midX = (touch0X + touch1X) / 2;
//         const midY = (touch0Y + touch1Y) / 2;
//         const prevMidX = (prevTouch0X + prevTouch1X) / 2;
//         const prevMidY = (prevTouch0Y + prevTouch1Y) / 2;

//         // calculate the distances between the touches
//         const hypot = Math.sqrt(Math.pow((touch0X - touch1X), 2) + Math.pow((touch0Y - touch1Y), 2));
//         const prevHypot = Math.sqrt(Math.pow((prevTouch0X - prevTouch1X), 2) + Math.pow((prevTouch0Y - prevTouch1Y), 2));

//         // calculate the screen scale change
//         var zoomAmount = hypot / prevHypot;
//         scale = scale * zoomAmount;
//         const scaleAmount = 1 - zoomAmount;

//         // calculate how many pixels the midpoints have moved in the x and y direction
//         const panX = midX - prevMidX;
//         const panY = midY - prevMidY;
//         // scale this movement based on the zoom level
//         offsetX += (panX / scale);
//         offsetY += (panY / scale);

//         // Get the relative position of the middle of the zoom.
//         // 0, 0 would be top left. 
//         // 0, 1 would be top right etc.
//         var zoomRatioX = midX / canvas.clientWidth;
//         var zoomRatioY = midY / canvas.clientHeight;

//         // calculate the amounts zoomed from each edge of the screen
//         const unitsZoomedX = trueWidth() * scaleAmount;
//         const unitsZoomedY = trueHeight() * scaleAmount;

//         const unitsAddLeft = unitsZoomedX * zoomRatioX;
//         const unitsAddTop = unitsZoomedY * zoomRatioY;

//         offsetX += unitsAddLeft;
//         offsetY += unitsAddTop;

//         redrawCanvas();
//     }
//     prevTouches[0] = event.touches[0];
//     prevTouches[1] = event.touches[1];
// }
// function onTouchEnd(event) {
//     singleTouch = false;
//     doubleTouch = false;
// }