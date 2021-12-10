import MyObject from "./MyObject.js";

/**
 * Class Plane
 * 
 * @class Plane
 */
export default class Plane extends MyObject {
    constructor(gl) {
        super(gl);

        // Color #063063 = RGB(6, 48, 99)
        var colorR = 6 / 255;
        var colorG = 48 / 255;
        var colorB = 99 / 255;

        // Define vertices data for a cube
        this.vertices = [
            // Face A    // Color                   // Surface orientation (normal vector)
            0, 0, 0,     colorR, colorG, colorB,    0, 1, 0,    // Index:  0    
            1, 0, 0,     colorR, colorG, colorB,    0, 1, 0,    // Index:  1
            1, 0, 1,     colorR, colorG, colorB,    0, 1, 0,    // Index:  2
            0, 0, 1,     colorR, colorG, colorB,    0, 1, 0,    // Index:  3
        ];

        this.indices = [
            0, 1, 2,     0, 2, 3,     // Face A
        ];
    }
}