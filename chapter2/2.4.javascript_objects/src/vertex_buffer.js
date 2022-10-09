"use strict";
import * as core from "./core.js";

let mGLVertextBuffer = null;
function get() { return mGLVertextBuffer; }

let mVerticesOfSquare = [
   0.5,  0.5,  0.0,
  -0.5,  0.5,  0.0,
   0.5, -0.5,  0.0,
  -0.5, -0.5,  0.0,
];

function init() {
  let gl = core.getGL();

  // Step A: Create a buffer on the gl context for our vertex positions
  mGLVertextBuffer = gl.createBuffer();

  // Step B: Activate vertexBuffer
  gl.bindBuffer(gl.ARRAY_BUFFER, mGLVertextBuffer);

  // Step C: Loads mVerticesOfSquare inot the vertexBuffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mVerticesOfSquare), gl.STATIC_DRAW);
}

export { init, get }