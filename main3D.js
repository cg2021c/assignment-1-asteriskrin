import Camera from "./lib/3D/Camera.js";
import ChargerObject from "./lib/3D/ChargerObject.js";
import LightObject from "./lib/3D/LightObject.js";
import World from "./lib/3D/World.js";

function main() {
    // Access the canvas through DOM: Document Object Model
    var canvas = document.getElementById('myCanvas');   // The paper
    var gl = canvas.getContext('webgl');                // The brush and the paints

    var camera = new Camera();
    camera.setPosition(0.3, 0.5, 3.1);

    var cube = new LightObject(gl);
    cube.setPosition([0.0, 0.0, -5.0]);
    cube.setScale([0.075, 0.075, 0.075]);
    cube.setRotation([45.0/180.0*Math.PI, 45.0/180.0*Math.PI, 45.0/180.0*Math.PI]);
    cube.setIntensity(0.200+0.063); // The last 3 digits of my NRP is 063, then the intensity is set to 0.200 + 0.063 = 0.263

    var charger = new ChargerObject(gl);
    charger.setPosition([-3.0, 0.0, -5.0]);
    charger.setScale([1.0, 1.0, 1.0]);
    charger.setRotation([40.0/180.0*Math.PI, 120.0/180.0*Math.PI, 0.0/180.0*Math.PI]);

    var charger2 = new ChargerObject(gl);
    charger2.setPosition([3.0, 0.0, -5.0]);
    charger2.setScale([1.0, 1.0, 1.0]);
    charger2.setRotation([0.0/180.0*Math.PI, 260.0/180.0*Math.PI, 330.0/180.0*Math.PI]);

    var world = new World(gl);
    world.addObject(charger);
    world.addObject(charger2, false); // No need to push vertex for the 2nd charger
    world.addObject(cube);
    world.updateBuffer();
    function render() {
        world.render(cube, camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    
    var CUBE_MOVE_SPEED = 0.3;
    function onKeydown(event) {
        if (event.keyCode == 65) camera.moveCamera(-0.1, 0.0, 0.0); // A
        if (event.keyCode == 38) camera.moveCamera(0.0, 0.0, -0.1); // Up
        if (event.keyCode == 68) camera.moveCamera(0.1, 0.0, 0.0); // D
        if (event.keyCode == 40) camera.moveCamera(0.0, 0.0, 0.1); // Down
        if (event.keyCode == 87) cube.move([0.0, CUBE_MOVE_SPEED, 0.0]); // W
        if (event.keyCode == 83) cube.move([0.0, -CUBE_MOVE_SPEED, 0.0]); // S
        // Additional key
        if (event.keyCode == 37) cube.move([-CUBE_MOVE_SPEED, 0.0, 0.0]); // Left
        if (event.keyCode == 39) cube.move([CUBE_MOVE_SPEED, 0.0, 0.0]); // Right
        if (event.keyCode == 90) cube.move([0.0, 0.0, -CUBE_MOVE_SPEED]); // Z
        if (event.keyCode == 88) cube.move([0.0, 0.0, CUBE_MOVE_SPEED]); // X
        document.getElementById("cameraX").innerHTML = camera.cameraX;
        document.getElementById("cameraY").innerHTML = camera.cameraY;
        document.getElementById("cameraZ").innerHTML = camera.cameraZ;
    }
    document.addEventListener("keydown", onKeydown);
}

window.onload = () => {
    main();
};