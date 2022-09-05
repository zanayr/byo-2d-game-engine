// deno-lint-ignore-file no-var no-unused-vars

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

  // Create a new identity transform operator
  var xform = mat4.create();

  // Step E: Compute the white square transform
  mat4.translate(xform, xform, vec3.fromValues(-0.25, 0.25, 0.0));
  mat4.rotate(xform, xform, 0.2); // rotation is in radian
  mat4.scale(xform, xform, vec3.fromValues(1.2, 1.2, 1.0));

  // Step F: Draw the white square with the computed transform
  this.mWhiteSq.draw(xform);

  // Step G: Compute the red square transform
  mat4.identity(xform); // restart
  mat4.translate(xform, xform, vec3.fromValues([0.25, -0.25, 0.0]));
  mat4.rotateZ(xform, xform, -0.785); // rotate of about -45 degrees
  mat4.scale(xform, xform, vec3.fromValues([0.4, 0.4, 1.0]));

  // Step H:
  this.mRedSq.draw(xfrom);
}