"use strict"; // variables must be declared before used!
import * as core from "./core.js"; // access as core module
import * as vertexBuffer from "./vertex_buffer.js"; // vertexBuffer module

let mCompiledShader = null;
let mVertexPositionRef = null;

function loadAndCompileShader(id, shaderType) {
  let shaderSource = null, compiledShader = null;

  // Step A: Get the shader source from index.html
  let shaderText = document.getElementById(id);
  shaderSource = shaderText.firstChild.textContent;


  let gl = core.getGL();
  // Step B: Create shader based on type: vertex or fragment
  compiledShader = gl.createShader(shaderType);

  // Step C: Compile the created shader
  gl.shaderSource(compiledShader, shaderSource);
  gl.compileShader(compiledShader);

  // Step D: Check for errors and return results (null if error)
  // The log info is how shader cimpilation errors are displayed
  // This is useful for debugging the shaders
  if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
    throw new Error(`A shader compiling error occured: ${gl.getShaderInfoLog(compiledShader)}`);
  }
  return compiledShader;
}

function init(vertexShaderID, fragmentShaderID) {
  let gl = core.getGL();

  // Step A: load and compile vertex and fragment shaders
  console.log(gl.VERTEX_SHADER, gl.FRAGMENT_SHADER);
  let vertexShader = loadAndCompileShader(vertexShaderID, gl.VERTEX_SHADER);
  let fragmentShader = loadAndCompileShader(fragmentShaderID, gl.FRAGMENT_SHADER);

  // Step B: Create and link the shaders into a program
  mCompiledShader = gl.createProgram();
  gl.attachShader(mCompiledShader, vertexShader);
  gl.attachShader(mCompiledShader, fragmentShader);
  gl.linkProgram(mCompiledShader);

  // Step C: Check for errors
  if (!gl.getProgramParameter(mCompiledShader, gl.LINK_STATUS)) {
    throw new Error(`Error linking shader`);
  }

  // Step D: Gets reference to aVertexPosition attribute in the shader
  mVertexPositionRef = gl.getAttribLocation(mCompiledShader, "aVertexPosition");
}

function activate() {
  // Step A: Access to the webgl context
  let gl = core.getGL();

  // Step B: Identify the compiled shader to use
  gl.useProgram(mCompiledShader);

  // Step C: Bind vertex buffer to attribute defined in vvertex shader
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
  gl.vertexAttribPointer(mVertexPositionRef,
    3,        // each element is a 3-float (x,y,z)
    gl.FLOAT, // data type is FLOAT
    false,    // if the content is normalize vectors
    0,        // number of bytes to skip in between elements
    0         // offsets to the first element
  );
  gl.enableVertexAttribArray(mVertexPositionRef);
}

export { init, activate }