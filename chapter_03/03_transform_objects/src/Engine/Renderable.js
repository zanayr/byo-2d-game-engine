// deno-lint-ignore-file
function Renderable(shader) {
  this.mShader = shader; // the shader for shading this object
  this.mColor = [1.0, 1.0, 1.0, 1.0] // color for fragment shader
}

Renderable.prototype.draw = function(modelTransform) {
  var gl = gEngine.Core.getGL();
  this.mShader.activateShader(this.mColor);
  this.mShader.loadObjectTransform(modelTransform);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

Renderable.prototype.setColor = function(color) { this.mColor = color; };
Renderable.prototype.getcolor = function() { return this.mColor; };