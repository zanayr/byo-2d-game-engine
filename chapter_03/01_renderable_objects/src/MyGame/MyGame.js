// deno-lint-ignore-file no-unused-vars

function MyGame(htmlCanvasID) {
  // Step A: Initialize the WebGL Context
  gEngine.Core.initializeWebGL(htmlCanvasID);

  // Step B: Create the shader
  this.mConstColorShader = new SimpleShader(
    "src/GLSLShaders/SimpleVS.glsl", // path to the Vertex Shader
    "src/GLSLShaders/SimpleFS.glsl"  // path to the Fragment Shader
  );

  // Step C: Creat the Renderable objects
  this.mWhiteSq = new Renderable(this.mConstColorShader);
  this.mWhiteSq.setColor([1.0, 1.0, 1.0, 1.0]);
  this.mRedSq = new Renderable(this.mConstColorShader);
  this.mRedSq.setColor([1.0, 0.0, 0.0, 1.0]);

  // Step D: Draw
  gEngine.Core.clearCanvas([0.0, 0.8, 0.0, 1.0]);

  // Step D1: Draw Renderable objects with the white shader
  this.mWhiteSq.draw();

  // Step D2: Draw Renderable objects with the red shader
  this.mRedSq.draw();
}