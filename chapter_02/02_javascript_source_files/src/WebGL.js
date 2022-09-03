// deno-lint-ignore-file no-var no-unused-vars
"use strict";
var gGl = null;

function initializeGL() {
  var canvas = document.getElementById("GLCanvas");

  gGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  if (gGl !== null) {
    gGl.clearColor(0.0, 0.8, 0.0, 1.0);
  } else {
    document.write("<br><b>WebGL is not supported!</b>");
  }
}

function clearCanvas() {
  gGl.clear(gGl.COLOR_BUFFER_BIT);
}

function doGLDraw() {
  initializeGL();
  clearCanvas();
}