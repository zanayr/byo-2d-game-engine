precision mediump float; // precision for float computation
// Color of pixel
uniform vec4 uPixelColor;
void main(void) {
  // For every pixel called sets to the user specified color
  gl_FragColor = uPixelColor;
}