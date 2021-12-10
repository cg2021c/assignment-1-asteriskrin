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
    cube.setPosition([0.0, .0, -3.0]);
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

    var CUBE_MOVE_SPEED = 0.3;
    var CAMERA_MOVE_SPEED = 0.1;
    function onKeydown(event) {
        if (event.keyCode == 32) cube.switchLight(); // Space bar
        // When W key is pressed, the cube (as the light source) moves to Z-.
        else if (event.keyCode == 87) cube.move([0.0, 0.0, -CUBE_MOVE_SPEED]);
        // When S key is pressed, the cube moves to Z+.
        else if (event.keyCode == 83) cube.move([0.0, 0.0, CUBE_MOVE_SPEED]);
        // When A key is pressed, the cube moves to X-.
        else if (event.keyCode == 65) cube.move([-CUBE_MOVE_SPEED, 0.0, 0.0]);
        // When D is pressed, the cube moves to X+.
        else if (event.keyCode == 68) cube.move([CUBE_MOVE_SPEED, 0.0, 0.0]);
        // When Up key is pressed, the camera zooms in.
        else if (event.keyCode == 38) camera.moveCamera(0.0, 0.0, -CAMERA_MOVE_SPEED);
        // When Down key is pressed, the camera zooms out.
        else if (event.keyCode == 40) camera.moveCamera(0.0, 0.0, CAMERA_MOVE_SPEED);
        // When Left or Right key is pressed, the camera move to leftward or right ward respectively 
        //  in an orbital manner about the center of the space. 
        else if (event.keyCode == 37) camera.moveCameraLookX(-0.1); // Left
        else if (event.keyCode == 39) camera.moveCameraLookX(0.1); // Right
    }
    document.addEventListener("keydown", onKeydown);
    
    // Update camera location text in the HTML document
    document.getElementById("cameraX").innerHTML = camera.cameraX;
    document.getElementById("cameraY").innerHTML = camera.cameraY;
    document.getElementById("cameraZ").innerHTML = camera.cameraZ;

    // Interactive orbital rotation with mouse using quaternion concept
    var lastPointOnTrackBall, currentPointOnTrackBall;
    var lastQuat = glMatrix.quat.create();
    function computeCurrentQuat() {
        // Secara berkala hitung quaternion rotasi setiap ada perubahan posisi titik pointer mouse
        var axisFromCrossProduct = glMatrix.vec3.cross(glMatrix.vec3.create(), lastPointOnTrackBall, currentPointOnTrackBall);
        var angleFromDotProduct = Math.acos(glMatrix.vec3.dot(lastPointOnTrackBall, currentPointOnTrackBall));
        var rotationQuat = glMatrix.quat.setAxisAngle(glMatrix.quat.create(), axisFromCrossProduct, angleFromDotProduct);
        glMatrix.quat.normalize(rotationQuat, rotationQuat);
        return glMatrix.quat.multiply(glMatrix.quat.create(), rotationQuat, lastQuat);
    }
    // Memproyeksikan pointer mouse agar jatuh ke permukaan ke virtual trackball
    function getProjectionPointOnSurface(point) {
        var radius = canvas.width / 2;  // Jari-jari virtual trackball kita tentukan sebesar 1/2 lebar kanvas
        var center = glMatrix.vec3.fromValues(canvas.width / 2, canvas.height / 2, 0);  // Titik tengah virtual trackball
        var pointVector = glMatrix.vec3.subtract(glMatrix.vec3.create(), point, center);
        pointVector[1] = pointVector[1] * (-1); // Flip nilai y, karena koordinat piksel makin ke bawah makin besar
        var radius2 = radius * radius;
        var length2 = pointVector[0] * pointVector[0] + pointVector[1] * pointVector[1];
        if (length2 <= radius2) pointVector[2] = Math.sqrt(radius2 - length2); // Dapatkan nilai z melalui rumus Pytagoras
        else {  // Atur nilai z sebagai 0, lalu x dan y sebagai paduan Pytagoras yang membentuk sisi miring sepanjang radius
            pointVector[0] *= radius / Math.sqrt(length2);
            pointVector[1] *= radius / Math.sqrt(length2);
            pointVector[2] = 0;
        }
        return glMatrix.vec3.normalize(glMatrix.vec3.create(), pointVector);
    }
    
    var rotationMatrix = glMatrix.mat4.create();
    var dragging;
    function onMouseDown(event) {
        var x = event.clientX;
        var y = event.clientY;
        var rect = event.target.getBoundingClientRect();
        // When the mouse pointer is inside the frame
        if (
            rect.left <= x &&
            rect.right >= x &&
            rect.top <= y &&
            rect.bottom >= y
        ) {
            dragging = true;
        }
        lastPointOnTrackBall = getProjectionPointOnSurface(glMatrix.vec3.fromValues(x, y, 0));
        currentPointOnTrackBall = lastPointOnTrackBall;
    }
    function onMouseUp(event) {
        dragging = false;
        if (currentPointOnTrackBall != lastPointOnTrackBall) {
            lastQuat = computeCurrentQuat();
        }
    }
    function onMouseMove(event) {
        if (dragging) {
            var x = event.clientX;
            var y = event.clientY;
            currentPointOnTrackBall = getProjectionPointOnSurface(glMatrix.vec3.fromValues(x, y, 0));
            glMatrix.mat4.fromQuat(rotationMatrix, computeCurrentQuat());
            console.log(rotationMatrix);
            cube.rotationMatrix = rotationMatrix;
        }
    }
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
}

window.onload = () => {
    main();
};