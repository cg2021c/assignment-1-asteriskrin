export default class Space {
    shapeGroups = [];
    gl;
    shaderProgram;
    vertexShaderSource = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uChange;
        void main() {
            vec2 position = vec2(aPosition.x + uChange, aPosition.y + uChange);
            gl_Position = vec4(position, 0.0, 1.0);
            vColor = aColor;
        }
    `;

    fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;
    constructor(canvas) {
        this.gl = canvas.getContext('webgl'); // The brush and the paints

        // Create .c in GPU
        var vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, this.vertexShaderSource);
        var fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShader, this.fragmentShaderSource);

        // Compile .c into .o
        this.gl.compileShader(vertexShader);
        this.gl.compileShader(fragmentShader);

        // Prepare an .exe shell (shader program)
        this.shaderProgram = this.gl.createProgram();

        // Put the two .o files into the shell
        this.gl.attachShader(this.shaderProgram, vertexShader);
        this.gl.attachShader(this.shaderProgram, fragmentShader);

        // Link the two .o files together so they can be a runnable program/context
        this.gl.linkProgram(this.shaderProgram);

        // Start using the context (analogy: start using the paints and the brush)
        this.gl.useProgram(this.shaderProgram);
    }

    // Add shape group
    addShapeGroup(shapeGroup) {
        this.shapeGroups.push(shapeGroup);
    }
    
    // Render shapes
    render() {
        // Fill the canvas with red color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.shapeGroups.forEach((shapeGroup, i) => {
            shapeGroup.getShapes().forEach((shape, j) => {
                // Create a linked-list for storing the vertices data
                var buffer = this.gl.createBuffer();
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(shape.getPoints()), this.gl.STATIC_DRAW);
            
                /*
                    Teach the computer how to collect
                    the positional values from ARRAY_BUFFER
                    to each vertex
                */
                var aPosition = this.gl.getAttribLocation(this.shaderProgram, "aPosition");
                this.gl.vertexAttribPointer(aPosition, 2, this.gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
                this.gl.enableVertexAttribArray(aPosition);
                var aColor = this.gl.getAttribLocation(this.shaderProgram, "aColor");
                this.gl.vertexAttribPointer(aColor, 3, this.gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
                this.gl.enableVertexAttribArray(aColor);
            
                var primitive = this.gl.TRIANGLE_FAN;
                var offset = 0;
                var nVertex = shape.getPoints().length / 5;
            
                // Draw vertex and fragment
                this.gl.drawArrays(primitive, offset, nVertex);
            });
        });
    }
}