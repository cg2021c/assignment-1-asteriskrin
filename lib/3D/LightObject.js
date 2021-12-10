/**
 * Class LightObject
 * 
 * @class LightObject
 */
export default class LightObject {
    status = 'on'; // By default the light is on
    intensity = 1.0;
    rotationMatrix = null;
    // Define vertices data for a cube
    vertices = [
        // Face A       // Red      // Surface orientation (normal vector)
        -1, -1, -1,     1, 1, 1,    0, 0, -1,    // Index:  0    
         1, -1, -1,     1, 1, 1,    0, 0, -1,    // Index:  1
         1,  1, -1,     1, 1, 1,    0, 0, -1,    // Index:  2
        -1,  1, -1,     1, 1, 1,    0, 0, -1,    // Index:  3
        // Face B       // Yellow
        -1, -1,  1,     1, 1, 1,    0, 0, 1,     // Index:  4
         1, -1,  1,     1, 1, 1,    0, 0, 1,     // Index:  5
         1,  1,  1,     1, 1, 1,    0, 0, 1,     // Index:  6
        -1,  1,  1,     1, 1, 1,    0, 0, 1,     // Index:  7
        // Face C       // Green
        -1, -1, -1,     1, 1, 1,    -1, 0, 0,    // Index:  8
        -1,  1, -1,     1, 1, 1,    -1, 0, 0,    // Index:  9
        -1,  1,  1,     1, 1, 1,    -1, 0, 0,    // Index: 10
        -1, -1,  1,     1, 1, 1,    -1, 0, 0,    // Index: 11
        // Face D       // Blue
         1, -1, -1,     1, 1, 1,    1, 0, 0,     // Index: 12
         1,  1, -1,     1, 1, 1,    1, 0, 0,     // Index: 13
         1,  1,  1,     1, 1, 1,    1, 0, 0,     // Index: 14
         1, -1,  1,     1, 1, 1,    1, 0, 0,     // Index: 15
        // Face E       // Orange
        -1, -1, -1,     1, 1, 1,  0, -1, 0,    // Index: 16
        -1, -1,  1,     1, 1, 1,  0, -1, 0,    // Index: 17
         1, -1,  1,     1, 1, 1,  0, -1, 0,    // Index: 18
         1, -1, -1,     1, 1, 1,  0, -1, 0,    // Index: 19
        // Face F       // White
        -1,  1, -1,     1, 1, 1,    0, 1, 0,     // Index: 20
        -1,  1,  1,     1, 1, 1,    0, 1, 0,     // Index: 21
         1,  1,  1,     1, 1, 1,    0, 1, 0,     // Index: 22
         1,  1, -1,     1, 1, 1,    0, 1, 0      // Index: 23
    ];

    indices = [
        0, 1, 2,     0, 2, 3,     // Face A
        4, 5, 6,     4, 6, 7,     // Face B
        8, 9, 10,    8, 10, 11,   // Face C
        12, 13, 14,  12, 14, 15,  // Face D
        16, 17, 18,  16, 18, 19,  // Face E
        20, 21, 22,  20, 22, 23,  // Face F     
    ];

    constructor(gl) {
        var vertexShaderSource = `
            attribute vec3 aPosition;
            attribute vec3 aColor;
            attribute vec3 aNormal;
            varying vec3 vPosition;
            varying vec3 vColor;
            varying vec3 vNormal;
            uniform mat4 uModel;
            uniform mat4 uView;
            uniform mat4 uProjection;
            void main() {
                vec4 originalPosition = vec4(aPosition, 1.);
                gl_Position = uProjection * uView * uModel * originalPosition;
                vPosition = (uModel * originalPosition).xyz;
                vColor = aColor;
                vNormal = aNormal;
            }
        `;

        var fragmentShaderSource = `
            precision mediump float;
            varying vec3 vPosition;
            varying vec3 vColor;
            varying vec3 vNormal;
            uniform vec3 uAmbientConstant;   // Represents the light color
            uniform float uAmbientIntensity;
            uniform vec3 uDiffuseConstant;  // Represents the light color
            uniform vec3 uLightPosition;
            uniform mat3 uNormalModel;
            uniform vec3 uSpecularConstant; // Represents the light color
            uniform vec3 uViewerPosition;
            void main() {
                
                // Calculate the ambient component
                vec3 ambient = uAmbientConstant * uAmbientIntensity;
                
                // Prepare the diffuse components
                vec3 normalizedNormal = normalize(uNormalModel * vNormal);
                vec3 vLight = uLightPosition - vPosition;
                vec3 normalizedLight = normalize(vLight);
                vec3 diffuse = vec3(0., 0., 0.);
                float cosTheta = max(dot(normalizedNormal, normalizedLight), 0.);

                // Prepare the specular components
                vec3 vReflector = 2.0 * cosTheta * vNormal - (vLight);
                // or using the following expression
                // vec3 vReflector = reflect(-vLight, vNormal);
                vec3 vViewer = uViewerPosition - vPosition;
                vec3 normalizedViewer = normalize(vViewer);
                vec3 normalizedReflector = normalize(vReflector);
                float shininessConstant = 100.0;
                vec3 specular = vec3(0., 0., 0.);
                float cosPhi = max(dot(normalizedViewer, normalizedReflector), 0.);
                
                // Calculate the phong reflection effect
                if (cosTheta > 0.) {
                    diffuse = uDiffuseConstant * cosTheta;
                }
                if (cosPhi > 0.) {
                    specular = uSpecularConstant * pow(cosPhi, shininessConstant);
                }
                vec3 phong = ambient + diffuse + specular;

                // Apply the shading
                gl_FragColor = vec4(phong * vColor, 1.);
            }
        `;

        // Create .c in GPU
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexShaderSource);
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentShaderSource);

        // Compile .c into .o
        gl.compileShader(vertexShader);
        gl.compileShader(fragmentShader);

        // Prepare a .exe shell (shader program)
        var shaderProgram = gl.createProgram();

        // Put the two .o files into the shell
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);

        // Link the two .o files, so together they can be a runnable program/context.
        gl.linkProgram(shaderProgram);

        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;
        this.shaderProgram = shaderProgram;
    }

    setIntensity(intensity) {
        this.intensity = intensity;
    }

    setVertices(vertices) {
        this.vertices = vertices;
    }

    setIndices(indices) {
        this.indices = indices;
    }

    getIndices(pivot) {
        var result = [];
        this.indices.forEach((index, i) => {
            result.push(pivot + index);
        });
        return result;
    }

    setOffset(offset) {
        this.offset = offset;
    }

    setPosition(position) {
        this.position = position;
    }

    setScale(scale) {
        this.scale = scale;
    }

    setRotation(rotation) {
        this.rotation = rotation;
    }

    move(position) {
        this.position[0] += position[0];
        this.position[1] += position[1];
        this.position[2] += position[2];
    }

    draw(gl, light, viewMatrix) {

        // Start using the context (analogy: start using the paints and the brushes)
        gl.useProgram(this.shaderProgram);

        // Teach the computer how to collect
        //  the positional values from ARRAY_BUFFER
        //  to each vertex being processed
        var aPosition = gl.getAttribLocation(this.shaderProgram, "aPosition");
        gl.vertexAttribPointer(
            aPosition, 
            3, 
            gl.FLOAT, 
            false, 
            9 * Float32Array.BYTES_PER_ELEMENT, 
            0
        );
        gl.enableVertexAttribArray(aPosition);
        var aColor = gl.getAttribLocation(this.shaderProgram, "aColor");
        gl.vertexAttribPointer(
            aColor,
            3,
            gl.FLOAT,
            false, 
            9 * Float32Array.BYTES_PER_ELEMENT,
            3 * Float32Array.BYTES_PER_ELEMENT
        );
        gl.enableVertexAttribArray(aColor);
        var aNormal = gl.getAttribLocation(this.shaderProgram, "aNormal");
        gl.vertexAttribPointer(
            aNormal,
            3,
            gl.FLOAT,
            false, 
            9 * Float32Array.BYTES_PER_ELEMENT,
            6 * Float32Array.BYTES_PER_ELEMENT
        );
        gl.enableVertexAttribArray(aNormal);

        // Lighting and Shading
        // AMBIENT
        var uAmbientConstant = gl.getUniformLocation(this.shaderProgram, "uAmbientConstant");
        var uAmbientIntensity = gl.getUniformLocation(this.shaderProgram, "uAmbientIntensity");
        // gl.uniform3fv(uAmbientConstant, [1.0, 0.5, 0.0]);    // orange light
        gl.uniform3fv(uAmbientConstant, [1.0, 1.0, 1.0]);       // white light
        if (this.status == 'on') {
            gl.uniform1f(uAmbientIntensity, 0.9); // on
        }
        else {
            gl.uniform1f(uAmbientIntensity, 0.0); // off
        }
        // DIFFUSE
        var uDiffuseConstant = gl.getUniformLocation(this.shaderProgram, "uDiffuseConstant");
        var uLightPosition = gl.getUniformLocation(this.shaderProgram, "uLightPosition");
        var uNormalModel = gl.getUniformLocation(this.shaderProgram, "uNormalModel");
        gl.uniform3fv(uDiffuseConstant, [1.0, 1.0, 1.0]);   // white light
        gl.uniform3fv(uLightPosition, light.position);    // light position

        // Perspective projection
        var uProjection = gl.getUniformLocation(this.shaderProgram, "uProjection");
        var perspectiveMatrix = glMatrix.mat4.create();
        glMatrix.mat4.perspective(perspectiveMatrix, Math.PI/3, 1.0, 0.5, 10.0);
        gl.uniformMatrix4fv(uProjection, false, perspectiveMatrix);

        
        var uView = gl.getUniformLocation(this.shaderProgram, "uView");
        gl.uniformMatrix4fv(uView, false, viewMatrix);
        
        // SPECULAR
        var uSpecularConstant = gl.getUniformLocation(this.shaderProgram, "uSpecularConstant");
        var uViewerPosition = gl.getUniformLocation(this.shaderProgram, "uViewerPosition");
        gl.uniform3fv(uSpecularConstant, [1.0, 1.0, 1.0]);  // white light
        gl.uniform3fv(uViewerPosition, [cameraX, cameraY, cameraZ]);

        var uModel = gl.getUniformLocation(this.shaderProgram, "uModel");
        
        var modelMatrix = glMatrix.mat4.create();
        // Center of rotation = cube position
        glMatrix.mat4.translate(modelMatrix, modelMatrix, this.position);
        glMatrix.mat4.scale(modelMatrix, modelMatrix, this.scale);
        if (this.rotationMatrix != null) {
            glMatrix.mat4.multiply(modelMatrix, modelMatrix, this.rotationMatrix);
            
            console.log(this.rotationMatrix);
        }
        glMatrix.mat4.translate(modelMatrix, modelMatrix, [20.0, 20.0, 20.0]); // Orbit radius = 20.0

        // glMatrix.mat4.rotate(modelMatrix, modelMatrix, this.rotation[0], [1.0, 0.0, 0.0]);   // Rotation about X axis
        // glMatrix.mat4.rotate(modelMatrix, modelMatrix, this.rotation[1], [0.0, 1.0, 0.0]);   // Rotation about Y axis
        // glMatrix.mat4.rotate(modelMatrix, modelMatrix, this.rotation[2], [0.0, 0.0, 1.0]);   // Rotation about Z axis
        gl.uniformMatrix4fv(uModel, false, modelMatrix);
        var normalModelMatrix = glMatrix.mat3.create();
        glMatrix.mat3.normalFromMat4(normalModelMatrix, modelMatrix);
        gl.uniformMatrix3fv(uNormalModel, false, normalModelMatrix);
            
        var primitive = gl.TRIANGLES;

        var offset, nVertex;
        offset = this.offset;
        nVertex = this.indices.length;
        gl.drawElements(primitive, nVertex, gl.UNSIGNED_SHORT, offset);
    }

    switchLight() {
        if (this.status == 'on') this.status = 'off';
        else this.status = 'on';
    }
}