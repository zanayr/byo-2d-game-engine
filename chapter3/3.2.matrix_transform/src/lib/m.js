function create() {
  return new Float32Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0,
  ]); 
}

function identity(matrix) {
  matrix = new Float32Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0,
  ]);
}

function rotateZ(matrix, rad) {
  const s = Math.sin(rad);
  const c = Math.cos(rad);
  const prev = [
    matrix[0], matrix[1], matrix[2], matrix[3],
    matrix[4], matrix[5], matrix[6], matrix[7],
  ];

  matrix[0] = prev[0] * c + prev[4] * s;
  matrix[1] = prev[1] * c + prev[5] * s;
  matrix[2] = prev[2] * c + prev[6] * s;
  matrix[3] = prev[3] * c + prev[7] * s;
  matrix[4] = prev[4] * c - prev[0] * s;
  matrix[5] = prev[5] * c - prev[1] * s;
  matrix[6] = prev[6] * c - prev[2] * s;
  matrix[7] = prev[7] * c - prev[3] * s;
}

function scale(matrix, vector) {
  matrix[0]  *= vector[0];
  matrix[1]  *= vector[0];
  matrix[2]  *= vector[0];
  matrix[3]  *= vector[0];
  matrix[4]  *= vector[1];
  matrix[5]  *= vector[1];
  matrix[6]  *= vector[1];
  matrix[7]  *= vector[1];
  matrix[8]  *= vector[2];
  matrix[9]  *= vector[2];
  matrix[10] *= vector[2];
  matrix[11] *= vector[2];
}

function translate(matrix, vector) {
  const prev = [matrix[12], matrix[13], matrix[14], matrix[15]];
  matrix[12] = matrix[0] * vector[0] + matrix[4] * vector[1] + matrix[8]  * vector[2] + prev[0];
  matrix[13] = matrix[1] * vector[0] + matrix[5] * vector[1] + matrix[9]  * vector[2] + prev[1];
  matrix[14] = matrix[2] * vector[0] + matrix[6] * vector[1] + matrix[10] * vector[2] + prev[2];
  matrix[15] = matrix[3] * vector[0] + matrix[7] * vector[1] + matrix[11] * vector[2] + prev[3];
}

function vector3(x, y, z) {
  return new Float32Array([x, y, z]);
}

export { create, identity, rotateZ, scale, translate, vector3 }