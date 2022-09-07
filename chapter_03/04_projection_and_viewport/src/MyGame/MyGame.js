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

  // Step E: set the white `Renderable` object's transform
  this.mWhiteSq.getXform().setPosition(-0.25, 0.25);
  this.mWhiteSq.getXform().setRotationInRad(0.2); // in radians
  this.mWhiteSq.getXform().setSize(1.2, 1.2)
  // Step F: draws the white square
  this.mWhiteSq.draw();

  // Step G: set the red square transform
  this.mRedSq.getXform().getXPos(0.25); // to show alternative to `setPosition`
  this.mRedSq.getXform().getYPos(-0.25); // it is possible to set X/Y separately
  this.mRedSq.getXform().setRotationInDegree(45); // this is in degree
  this.mRedSq.getXform().setWidth(0.4); // to show alternative to setSize
  this.mRedSq.getXform().setHeight(0.4); // that it is possible to set width/height separately
  // Step H: draw the red square (transform in the object)
  this.mRedSq.draw();
}