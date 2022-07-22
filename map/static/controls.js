let debug_button = document.getElementById("debug");
let debug_section = document.getElementById("debug_section");
let view_button = document.getElementById("view");
let zoom_in_button = document.getElementById("zoom_in");
let zoom_out_button = document.getElementById("zoom_out");
let reset_zoom_button = document.getElementById("reset_zoom");

let debug_enabled = false;

debug_button.onclick = function () {
    debug_enabled = !debug_enabled;
    debug_button.classList.toggle("filled_control");
    debug_button.classList.toggle("outlined_control");
    debug_section.classList.toggle("hidden");
}

view_button.onclick = function () {
    view_button.classList.toggle("filled_control");
    view_button.classList.toggle("outlined_control");
    zoom_in_button.classList.toggle("hidden");
    zoom_out_button.classList.toggle("hidden");
    reset_zoom_button.classList.toggle("hidden");
}

reset_zoom_button.onclick = function () {
    scale = 1;
    offsetX = 0;
    offsetY = 0;
    redrawCanvas();
}

zoom_in_button.onclick = function () {
    scale = scale * 1.25;
    redrawCanvas();
}

zoom_out_button.onclick = function () {
    scale = scale / 1.25;
    redrawCanvas();
}