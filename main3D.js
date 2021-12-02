import Camera from "./lib/3D/Camera.js";
import ChargerObject from "./lib/3D/ChargerObject.js";
import LightObject from "./lib/3D/LightObject.js";

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
    cube.setIntensity(0.200+0.063); // NRP = 63

    var charger = new ChargerObject(gl);
    charger.setPosition([-3.0, 0.0, -5.0]);
    charger.setScale([1.0, 1.0, 1.0]);
    charger.setRotation([40.0/180.0*Math.PI, 120.0/180.0*Math.PI, 0.0/180.0*Math.PI]);

    var charger2 = new ChargerObject(gl);
    charger2.setPosition([3.0, 0.0, -5.0]);
    charger2.setScale([1.0, 1.0, 1.0]);
    charger2.setRotation([0.0/180.0*Math.PI, 260.0/180.0*Math.PI, 330.0/180.0*Math.PI]);

    // Create a linked-list for storing the vertices data
    var vertexBuffer = gl.createBuffer();
    
    // Create a linked-list for storing the indices data
    var indexBuffer = gl.createBuffer();

    var vertices = [];
    var indices = [];

    indices = indices.concat(charger.getIndices(0));
    vertices = vertices.concat(charger.vertices);
    
    cube.setOffset(charger.indices.length*2); // long long = 2x4 bytes
    indices = indices.concat(cube.getIndices(charger.vertices.length/9));
    vertices = vertices.concat(cube.vertices);

    console.log(indices);
    console.log(vertices);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    function onKeydown(event) {
        if (event.keyCode == 32) freeze = true;
        if (event.keyCode == 65) camera.moveCamera(-0.1, 0.0, 0.0); // A
        if (event.keyCode == 38) camera.moveCamera(0.0, 0.0, -0.1); // Up
        if (event.keyCode == 68) camera.moveCamera(0.1, 0.0, 0.0); // D
        if (event.keyCode == 40) camera.moveCamera(0.0, 0.0, 0.1); // Down
        if (event.keyCode == 87) cube.move([0.0, 0.1, 0.0]); // W
        if (event.keyCode == 83) cube.move([0.0, -0.1, 0.0]); // S
        document.getElementById("cameraX").innerHTML = camera.cameraX;
        document.getElementById("cameraY").innerHTML = camera.cameraY;
        document.getElementById("cameraZ").innerHTML = camera.cameraZ;
    }
    document.addEventListener("keydown", onKeydown);

    function render() {
        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        charger.draw(gl, cube, camera.viewMatrix);
        cube.draw(gl, cube, camera.viewMatrix);
        charger2.draw(gl, cube, camera.viewMatrix);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

window.onload = () => {
    main();
};