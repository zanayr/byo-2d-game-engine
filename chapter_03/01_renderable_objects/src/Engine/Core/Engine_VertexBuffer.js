// deno-lint-ignore-file no-var
"use strict";

var gEngine = gEngine || { };

// The VertexBuffer object
gEngine.VertexBuffer = (function() {
  // First define the vertices for a square
  var verticesOfSquare = [
     0.5,  0.5,  0.0,
    -0.5,  0.5,  0.0,
     0.5, -0.5,  0.0,
    -0.5, -0.5,  0.0,
  ];

  // Reference to the vertex positions for the square in the gl context
  var mSqaureVertexBuffer = null;

  var getGLVertexRef = function() { return mSqaureVertexBuffer; };

  var initialize = function() {
    var gl = gEngine.Core.getGL();

    // Step A: create a buffer on the gGL context for our vertex positions
    mSqaureVertexBuffer = gl.createBuffer();

    // Step B: Activate vertexBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, mSqaureVertexBuffer);

    // Step C: Loads verticesOfSquares into the vertexBuffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
  };

  var mPublic = {
    initialize: initialize,
    getGLVertexRef: getGLVertexRef
  };

  return mPublic;
}());