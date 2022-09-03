const squareVertices = [
   0.5,  0.5,  0.0,
  -0.5,  0.5,  0.0,
   0.5, -0.5,  0.0,
  -0.5, -0.5,  0.0,
];

function compileShader(context, id, type) {
  const source = document.getElementById(id).text;

  // Create the shader based on the source type
  const shader = context.createShader(type);

  // Compile the created shader
  context.shaderSource(shader, source);
  context.compileShader(shader);

  // Check for errors
  if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
    console.error(`Error: shader failed to compile: ${context.getShaderInfoLog(shader)}`);
    return null;
  }

  return shader;
}

function createProgram(context, vertexId, fragmentId) {
  // Load and compile the vertex and fragment shaders
  const vertexShader = compileShader(context, vertexId, context.VERTEX_SHADER);
  const fragmentShader = compileShader(context, fragmentId, context.FRAGMENT_SHADER);

  // Create and link the shaders into a program
  const program = context.createProgram();
  context.attachShader(program, vertexShader);
  context.attachShader(program, fragmentShader);
  context.linkProgram(program);

  // Check for errors
  if (!context.getProgramParameter(program, context.LINK_STATUS)) {
    console.error(`Error: program failed to link: ${context.getProgramInfoLog(program)}`);
    return null;
  }

  return program;
}

function initializeProgram(context, program, vertexBuffer) {
  // Get the location (in memory) of the vertex attribute in the program
  const vertexPositionAttribute = context.getAttribLocation(program, "a_vertex");

  // Activate the vertex buffer
  context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer);

  // Define the vertex pointer that will step through ever vertex in the buffer
  context.vertexAttribPointer(
    vertexPositionAttribute,  // location (in memory) of the `a_vertex` attribute in the program
    3,                        // element count per vertex coordinate (x, y, w)
    context.FLOAT,            // size (in bytes) of each coordinate element
    false,                    // working with normalized vectors
    0,                        // number of bytes to step per vertex
    0,                        // offset of first vertex from beginning of buffer
  );

  return vertexPositionAttribute;
}

function initializeVertexBuffer(context, vertices) {
  const vertexBuffer = context.createBuffer();
  
  context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer);

  context.bufferData(context.ARRAY_BUFFER, new Float32Array(vertices), context.STATIC_DRAW);

  return vertexBuffer;
}

function initializeWebGL() {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("webgl2");

  if (context !== null) {
    context.clearColor(1.0, 1.0, 1.0, 1.0);

    // Initialize the vertex buffer
    const vertexBuffer = initializeVertexBuffer(context, squareVertices);

    // Load and compile the vertex and fragment shaders
    const program = createProgram(context, "vertex", "fragment");
    const attribLocation = initializeProgram(context, program, vertexBuffer);

    return [ context, program, attribLocation ];
  } else {
    console.error(`There was an error initializing the WebGL context.`);
    return null;
  }
}

function drawSquare([context, program, location]) {
  context.clear(context.COLOR_BUFFER_BIT);

  // Activate program
  context.useProgram(program);

  // Enable the vertex position attribute
  context.enableVertexAttribArray(location);

  // Draw
  context.drawArrays(
    context.TRIANGLE_STRIP, // webgl draw mode
    0,                      // offset
    4,                      // size of elements in program (x, y, z, w)
  );
}

drawSquare(initializeWebGL());