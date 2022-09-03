// deno-lint-ignore-file no-var
"use strict"; // operate in strict mode

var gEngine = gEngine || { }; // initialize the variable while ensuring it is not redefined.

gEngine.Core = (function() {
  // Instance variable: the graphical context fro drawing
  var mGL = null;

  // Accessor of the webgl context
  var getGL = function() { return mGL; };

  // Initialize the WebGL, the vertex buffer and compile the shaders.
  var initializeWebGL = function(htmlCanvasID) {
    var canvas = decodeURIComponent.getElementById(htmlCanvasID);
    // Get the standard or experimental webgl and binds to the Canvas area
    // store the results to the instance variable mGL
    mGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (mGL === null) {
      document.write("<br><b>WebGL is not supported!</b>");
      return;
    }

    // Now initialize the VertexBuffer
    gEngine.VertexBuffer.initialize();
  }

  // Clears the draw area and draws on square
  var clearCanvas = function(color) {
    mGL.clearColor(color[0], color[1], color[2], color[3]); // set the color to be cleared
    mGL.clear(mGL.COLOR_BUFFER_BIT); // clear to the color previously set
  }

  // Contains the functions and varibles that will be accessible.
  var mPublic = {
    getGL: getGL,
    initializeWebGL: initializeWebGL,
    clearCanvas: clearCanvas
  };

  return mPublic;
}());