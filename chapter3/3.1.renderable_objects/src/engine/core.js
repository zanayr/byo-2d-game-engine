"use strict";
import * as vertexBuffer from "./vertex_buffer.js";
import SimpleShader from "./simple_shader.js";

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
}

function clearCanvas(color) {
  mGL.clearColor(color[0], color[1], color[2], color[3]);
  mGL.clear(mGL.COLOR_BUFFER_BIT); // clear to the color set
}

// The Shader
let mShader = null;
function createShader() {
  mShader = new SimpleShader(
    "src/glsl_shaders/simple_vs.glsl",  // path to Vertex Shader
    "src/glsl_shaders/simple_fs.glsl"    // path to Fragment Shader
  );
}

function init(htmlCanvasID) {
  initWebGL(htmlCanvasID);  // setup mGL
  vertexBuffer.init();      // setup `mGLVertexBuffer`
  createShader();
}

function drawSquare(color) {
  // Step A: Activate the shader
  mShader.activate(color);

  // Step B: Draw with currently activated geometry and shader
  mGL.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
}

export { getGL, init, clearCanvas, drawSquare }