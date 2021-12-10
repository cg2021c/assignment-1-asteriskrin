/**
 * Class Camera
 * 
 * @class Camera
 */
export default class Camera {
    cameraX = 0.0;
    cameraY = 0.0;
    cameraZ = 0.0;
    lookX = 0.0;
    viewMatrix = null;

    constructor() {
        // Instantiate view matrix
        this.viewMatrix = glMatrix.mat4.create();
    }

    setPosition(x, y, z) {
        this.cameraX = x;
        this.cameraY = y;
        this.cameraZ = z;
        this.#updateViewMatrix();
    }

    moveCamera(dX, dY, dZ) {
        this.cameraX += dX;
        this.cameraY += dY;
        this.cameraZ += dZ;
        this.#updateViewMatrix();
    }

    moveCameraLookX(dX) {
        this.lookX += dX;
        this.#updateViewMatrix();
    }

    #updateViewMatrix() {
        // Interactive graphics with keyboard
        glMatrix.mat4.lookAt(
            this.viewMatrix,
            [this.cameraX, this.cameraY, this.cameraZ],     // the location of the eye or the camera
            [this.lookX, 0.0, -10.0],                       // the point where the camera look at
            [0.0, 1.0, 0.0]
        );
    }
}