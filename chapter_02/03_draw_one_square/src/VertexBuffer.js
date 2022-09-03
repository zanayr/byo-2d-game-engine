// deno-lint-ignore-file no-var no-unused-vars
"use strict";
var gSquareVertexBuffer = null;

function initSquareBuffer() {
  // Define the vertices for a square
  var verticesOfSquare = [
     0.5,  0.5,  0.0,
    -0.5,  0.5,  0.0,
     0.5, -0.5,  0.0,
    -0.5, -0.5,  0.0
  ];

  // Create a buffer on the gGL context for our vertex positions
  gSquareVertexBuffer = gGL.createBuffer();

  // Activate vertexBuffer
  gGL.bindBuffer(gGL.ARRAY_BUFFER, gSquareVertexBuffer);

  // Load verticesOfSquare into vertex buffer
  gGL.bufferData(gGL.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gGL.STATIC_DRAW);
}