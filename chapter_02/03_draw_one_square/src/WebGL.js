// deno-lint-ignore-file no-var no-unused-vars
"use strict";
var gGL = null;

function initializeGL() {
  var canvas = document.getElementById("GLCanvas");

  gGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  if (gGL !== null) {
    gGL.clearColor(0.0, 0.8, 0.0, 1.0);

    // Initialize the vertex buffer
    initSquareBuffer();

    // Now load and compile the vertex and fragment shaders
    initSimpleShader("VertexShader", "FragmentShader");
        // The two shaders are defined in the index.html file
        // initSimpleShader() function is defined in ShaderSupport.js
  } else {
    document.write("<br><b>WebGL is not supported!</b>");
  }
}

function drawSquare() {
  gGL.clear(gGL.COLOR_BUFFER_BIT);

  // Activate the shader to use
  gGL.useProgram(gSimpleShader);

  // Enable the vertex position attribute
  gGL.enableVertexAttribArray(gShaderVertexPositionAttribute);

  // Draw with the above settings
  gGL.drawArrays(gGL.TRIANGLE_STRIP, 0, 4);
}

function doGLDraw() {
  initializeGL();
  drawSquare();
}