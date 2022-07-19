let debug_button = document.getElementById("debug");
let debug_section = document.getElementById("debug_section");

let debug_enabled = false;

debug_button.onclick = function () {
    debug_enabled = !debug_enabled;
    debug_button.classList.toggle("filled_control");
    debug_button.classList.toggle("outlined_control");
    debug_section.classList.toggle("hidden");
}