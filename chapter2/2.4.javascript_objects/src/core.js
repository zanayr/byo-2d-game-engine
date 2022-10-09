"use strict";
import * as vertexBuffer from "./vertex_buffer.js";
import * as simpleShader from "./shader_support.js";

let mGL = null;
function getGL() { return mGL; }

function initWebGL(htmlCanvasID) {
  let canvas = document.getElementById(htmlCanvasID);

  // Get standard or experimental webgl and bind to the Canvas area
  // Store the results to the instance variable mGL
  mGL = canvas.getContext("webgl2") ||
        canvas.getContext("experimental-webgl2");
  
  if (mGL === null) {
    document.write("<br><b>WebGL 2 is not supported!</b>");
    return;
  }
  mGL.clearColor(0.0, 0.8, 0.0, 1.0); // set the color to be cleared

  // 1. Initialize buffer with vertex positions for the unit square
  vertexBuffer.init(); // function defined in the vertex_buffer.js

  // 2. Now load and compile the vertex and fragment shaders
  simpleShader.init("VertexShader", "FragmentShader"); // function defined in shader_support.js
  // The two shaders are defined in the index.html file
}

function clearCanvas() {
  mGL.clear(mGL.COLOR_BUFFER_BIT);
}

function drawSquare() {
  // Step A: Activate the shader
  simpleShader.activate();

  // Step B: Draw with the above settings
  mGL.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
}

window.onload = function() {
  initWebGL("GLCanvas");
  clearCanvas();
  drawSquare();
}

export { getGL }