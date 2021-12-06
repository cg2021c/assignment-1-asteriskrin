/**
 * Class World
 * 
 * @class World
 */
export default class World {
    vertices = [];
    indices = [];
    objects = [];
    constructor(gl) {
        // Store gl
        this.gl = gl;

        // Create a linked-list for storing the vertices data
        this.vertexBuffer = gl.createBuffer();

        // Create a linked-list for storing the indices data
        this.indexBuffer = gl.createBuffer();
    }

    updateBuffer() {
        // Buffer data
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), this.gl.STATIC_DRAW);
    }

    addObject(obj, pushVertex = true) {
        this.objects.push(obj);
        if (pushVertex) {
            obj.setOffset(this.indices.length*2); // long long = 2x4 bytes
            this.indices = this.indices.concat(obj.getIndices(this.vertices.length/9));
            this.vertices = this.vertices.concat(obj.vertices);
        }
    }

    render(lightSource, camera) {
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        this.objects.forEach((obj, i) => {
            obj.draw(this.gl, lightSource, camera.viewMatrix);
        });
    }
}