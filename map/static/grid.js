let grid = document.getElementById("grid");
let grid_context = canvas.getContext("2d");

grid.width = window.innerWidth;
grid.height = window.innerHeight;


let grid_width = grid.width;
let grid_height = grid.height;
let grid_offset_x;
let grid_offset_y;

let get_grid_offset = function () {
    let grid_offsets = grid.getBoundingClientRect();
    grid_offset_x = grid_offsets.left;
    grid_offset_y = grid_offsets.top;
}

get_offset();

let p = 0;
let grid_step = 25;
let drawGrid = function () {
    console.log('grid');
    for (var x = 0; x <= grid_width; x += grid_step) {
        grid_context.moveTo(0.5 + x + p, p);
        grid_context.lineTo(0.5 + x + p, grid_height + p);
    }

    for (var x = 0; x <= grid_height; x += grid_step) {
        grid_context.moveTo(p, 0.5 + x + p);
        grid_context.lineTo(grid_width + p, 0.5 + x + p);
    }

    grid_context.strokeStyle = "#333333";
    grid_context.stroke();
}

drawGrid();

grid.onscroll = function () { get_grid_offset(); drawGrid(); };