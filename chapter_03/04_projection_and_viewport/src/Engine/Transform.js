// deno-lint-ignore-file
function Transform() {
  this.mPosition = vec2.fromValues(0, 0); // translation operator
  this.mScale = vec2.fromValues(1, 1);    // scaling operator
  this.mRotationInRad = 0.0;                     // rotation in radians!
}

// Position getters and setters
Transform.prototype.setPosition = function(xPos, yPos) {
  this.setXPos(xPos);
  this.setYPos(yPos);
};
Transform.prototype.getPosition = function() { return this.mPosition; };
Transform.prototype.setXPos = function(xPos) {
  this.mPosition = vec2.fromValues(xPos, this.getYPos());
};
Transform.prototype.getXPos = function() { return this.mPosition[0]; };
Transform.prototype.setYPos = function(yPos) {
  this.mPosition = vec2.fromValues(this.getXPos(), yPos);
};
Transform.prototype.getYPos = function() { return this.mPosition[1]; };
// Size setters
Transform.prototype.setSize = function(width, height) {
  this.setWidth(width);
  this.setHeight(height);
};
Transform.prototype.getSize = function() { return this.mScale; };
Transform.prototype.setWidth = function(width) {
  this.mScale = vec2.fromValues(width, this.getHeight());
};
Transform.prototype.getWidth = function() { return this.mScale[0]; };
Transform.prototype.setHeight = function(height) {
  this.mPosition = vec2.fromValues(this.getWidth(), height);
};
Transform.prototype.getHeight = function() { return this.mScale[1]; };
// Rotation
Transform.prototype.setRotationInRad = function(rotationInRadians) {
  this.mRotationInRad = rotationInRadians;
  while (this.mRotationInRad > (2 * Math.PI))
    this.mRotationInRad -= (2 * Math.PI);
};
Transform.prototype.setRotationInDegree = function(rotationInDegree) {
  this.setRotationInRad(rotationInDegree * Math.PI / 180.0);
};

Transform.prototype.getXform = function() {
  // Creates a blank identity matrix
  var matrix = mat4.create();

  // Step 1: Compute translation, for nw z is always at 0.0
  mat4.translate(matrix, matrix, vec3.fromValues(this.getXPos()), this.getYPos(), 0.0);
  // Step 2: Concatenate with rotation
  mat4.rotateZ(matrix, matrix, this.getRotationInRad());
  // Step 3: concatenate with scaling
  mat4.scale(matrix, matrix, vec3.fromValues(this.getWidth(), this.getHeight(), 1.0));
  return matrix;
}