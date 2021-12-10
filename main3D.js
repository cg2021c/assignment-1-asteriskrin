import Camera from "./lib/3D/Camera.js";
import ChargerObject from "./lib/3D/ChargerObject.js";
import ChargerObjectPlastic from "./lib/3D/ChargerObjectPlastic.js";
import LightObject from "./lib/3D/LightObject.js";
import Plane from "./lib/3D/Plane.js";
import World from "./lib/3D/World.js";

function main() {
    // Access the canvas through DOM: Document Object Model
    var canvas = document.getElementById('myCanvas');   // The paper
    var gl = canvas.getContext('webgl');                // The brush and the paints

    var camera = new Camera();
    camera.setPosition(0.3, 0.5, 2.1);

    var cube = new LightObject(gl);
    cube.setPosition([0.0, 0.0, -5.0]);
    cube.setScale([0.075, 0.075, 0.075]);
    cube.setRotation([45.0/180.0*Math.PI, 45.0/180.0*Math.PI, 45.0/180.0*Math.PI]);
    cube.setIntensity(0.200+0.063); // The last 3 digits of my NRP is 063, then the intensity is set to 0.200 + 0.063 = 0.263

    var charger = new ChargerObjectPlastic(gl);
    charger.setPosition([-3.0, 0.0, -5.0]);
    charger.setScale([1.0, 1.0, 1.0]);
    charger.setRotation([50.0/180.0*Math.PI, 120.0/180.0*Math.PI, 15.0/180.0*Math.PI]);

    var charger2 = new ChargerObject(gl);
    charger2.setPosition([3.0, 0.0, -5.0]);
    charger2.setScale([1.0, 1.0, 1.0]);
    charger2.setRotation([0.0/180.0*Math.PI, 260.0/180.0*Math.PI, 330.0/180.0*Math.PI]);

    var plane = new Plane(gl);
    plane.setScale([20.0, 20.0, 20.0]);
    plane.setPosition([-5.0, -1.0, -12.5]);
    plane.setRotation([0.0/180.0*Math.PI, 0.0/180.0*Math.PI, 0.0/180.0*Math.PI]);

    var world = new World(gl);
    world.addObject(charger);
    world.addObject(charger2, false); // No need to push vertex for the 2nd charger
    world.addObject(plane);
    world.addObject(cube);
    world.updateBuffer();
    function render() {
        world.render(cube, camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    
    // Update camera location text in the HTML document
    document.getElementById("cameraX").innerHTML = camera.cameraX;
    document.getElementById("cameraY").innerHTML = camera.cameraY;
    document.getElementById("cameraZ").innerHTML = camera.cameraZ;
}

window.onload = () => {
    main();
};