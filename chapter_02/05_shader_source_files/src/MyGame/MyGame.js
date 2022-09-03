// deno-lint-ignore-file no-var no-unused-vars

function MyGame(htmlCanvasID) {
  // The shader for drawing
  this.mShader = null;

  gEngine.Core.initializeWebGL(htmlCanvasID);

  this.mShader = new SimpleShader(
    "src/GLSLShaders/SimpleVS.glsl", // path to the VertexShader
    "src/GLSLShaders/WhiteFS.glsl"); // path to the FragmentShader

  // Step C1: Clear the canvas
  gEngine.Core.clearCanvas([0.0, 0.8, 0.0, 1.0]);

  // Step C2: Activate the propershader
  this.mShader.activateShader();

  // Step C3: Draw with the currently activated geometry and the activated shader
  var gl = gEngine.Core.getGL();
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}