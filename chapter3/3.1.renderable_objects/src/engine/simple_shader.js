import * as core from "./core.js";
import * as vertexBuffer from "./vertex_buffer.js";

class SimpleShader {
  constructor(vertexShaderID, fragmentShaderID) {
    // Instance variables
    // Convention: All instance variables: mVariables
    this.mCompiledShader = null; // ref to compiled shader in webgl
    this.mVertexPositionRef = null; // ref to VertexPosition in shader
    this.mPixelColorRef = null; // pixel color uniform in fragment shader

    let gl = core.getGL();
    // Step A: Load and compile vertex and fragment shaders
    this.mVertexShader = loadAndCompileShader(vertexShaderID, gl.VERTEX_SHADER);
    this.mFragmentShader = loadAndCompileShader(fragmentShaderID, gl.FRAGMENT_SHADER);

    // Step B: Create and link the shaders inot a program
    this.mCompiledShader = gl.createProgram();
    gl.attachShader(this.mCompiledShader, this.mVertexShader);
    gl.attachShader(this.mCompiledShader, this.mFragmentShader);
    gl.linkProgram(this.mCompiledShader);

    // Step C: Check for errors
    if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
      throw new Error(`Error linking shader`);
    }

    // Step D: Reference to `aVertexPosition` attribute in the shaders
    this.mVertexPositionRef = gl.getAttribLocation(this.mCompiledShader, "aVertexPosition");
    
    // Step E: Gets uniform variable `uPixelColor` in fragment shader
    this.mPixelColorRef = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
  }

  activate(pixelColor) {
    let gl = core.getGL();
    gl.useProgram(this.mCompiledShader);

    // Bind vertex buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
    gl.vertexAttribPointer(this.mVertexPositionRef,
      3,          // each element is a 3-float (x,y,z)
      gl.FLOAT,   // data type is FLOAT
      false,      // of the content is normalized vectors
      0,          // number of bytes to skip in between elements
      0,          // offsets to the first element
    );
    gl.enableVertexAttribArray(this.mVertexPositionRef);

    // Load uniforms
    gl.uniform4fv(this.mPixelColorRef, pixelColor);
  }
}

function loadAndCompileShader(filePath, shaderType) {
  let xmlReq, shaderSource = null, compiledShader = null;
  let gl = core.getGL();

  // Step A: Request the text from the given file location
  xmlReq = new XMLHttpRequest();
  xmlReq.open("GET", filePath, false);
  try {
    xmlReq.send();
  } catch(error) {
    throw new Error(`Failed to load shader: ${filePath} [Hint: you cannot double clikc to run thie project, the index.html file must be loaded by a web-server]`);
  }
  shaderSource = xmlReq.responseText;

  if (shaderSource === null) {
    throw new Error(`WARNING: Loading of ${filePath} failed!`);
  }

  console.log(shaderSource);

  // Step B: Create shader based on type: vertex of fragment
  compiledShader = gl.createShader(shaderType);

  // Step C: Compile the created shader
  gl.shaderSource(compiledShader, shaderSource);
  gl.compileShader(compiledShader);

  // Step D: Check for errors and return results
  // The log info is how shader compilation errors are displayed
  // This is useful for debugging the shaders
  if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
    throw new Error(`A shader compiling error occured: ${gl.getShaderInfoLog(compiledShader)}`);
  }

  return compiledShader;
}

export default SimpleShader;