// deno-lint-ignore-file
function Renderable(shader) {
  this.mShader = shader; // the shader for shading this object
  this.mColor = [1.0, 1.0, 1.0, 1.0] // color for fragment shader
  this.xForm = new Transform(); // transform opperator for object
}

Renderable.prototype.draw = function() {
  var gl = gEngine.Core.getGL();
  this.mShader.activateShader(this.mColor);
  this.mShader.loadObjectTransform(this.xForm.getXform());
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

Renderable.prototype.setColor = function(color) { this.mColor = color; };
Renderable.prototype.getcolor = function() { return this.mColor; };
Renderable.prototype.getXform = function() { return this.xForm; };