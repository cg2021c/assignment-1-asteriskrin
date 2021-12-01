export default class MyObject {
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
}