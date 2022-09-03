// deno-lint-ignore-file no-var no-unused-vars

function SimpleShader(vertextShaderID, fragmentShaderID) {
  // Instance variables (Convention: all instance variables: mVariables)
  this.mCompiledShader = null; // reference to the compiled shader in webgl context
  this.mShaderVertexPositionAttribute = null; // reference to ShaderVertexPosition in shader
  this.mPixelColor = null; // reference to the uPixelColor uniform in the fragment shader

  var gl = gEngine.Core.getGL();

  // Start constructor code
  //
  // Step A: load and compile vertex and fragment shaders
  var vertexShader = this._loadAndCompileShader(vertextShaderID, gl.VERTEX_SHADER);
  var fragmentShader = this._loadAndCompileShader(fragmentShaderID, gl.FRAGMENT_SHADER);

  // Step B: Create and link the shaders into a program
  this.mCompiledShader = gl.createProgram();
  gl.attachShader(this.mCompiledShader, vertexShader);
  gl.attachShader(this.mCompiledShader, fragmentShader);
  gl.linkProgram(this.mCompiledShader);

  // Step C: Check for errors
  if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
    alert("Error linking shader");
    return null;
  }

  // Step D: Get a reference to the aSwuareVertexPosition attribute
  this.mShaderVertexPositionAttribute = gl.getAttribLocation(this.mCompiledShader, "aSquareVertexPosition");

  // Step E: Activates the vertex buffer loaded in Engine.Core_VertexBuffer
  gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());

  // Step F: Describe the characteristic of the vertex position attribute
  gl.vertexAttribPointer(this.mShaderVertexPositionAttribute,
    3,        // each element is a 3-float (x, y, z)
    gl.FLOAT, // data type is FLOAT
    false,    // if the content is normalized vectors
    0,        // number of bytes to skip in between elements
    0);       // offsets to the first element
  
  // Step G: Get a reference to the uniform variable uPixelColor in the fragment shader
  this.mPixelColor = gl.getUniformLocation(this.compileShader, "uPixelColor");
}

// Returns a compiled shader from a shader in the dom
// The id is the id of the script in the html tag
SimpleShader.prototype._loadAndCompileShader = function(filePath, shaderType) {
  var shaderSource, compiledShader;
  var gl = gEngine.Core.getGL();

  // Step A: Load the shader source with XML request
  xmlReq = new XMLHttpRequest();
  xmlReq.open("GET", filePath, false);
  try {
    xmlReq.send();
  } catch (error) {
    alert("Failed to load shader: " + filePath);
    return null;
  }
  shaderSource = xmlReq.responseText;
  if (shaderSource === null) {
    alert("WARNING: Loading of: " + filePath + " failed!");
    return null;
  }

  // Step B: Create the shader based on teh shader theype: vertex of fragment
  compiledShader = gl.createShader(shaderType);

  // Step C: Compile the created shader
  gl.shaderSource(compiledShader, shaderSource);
  gl.compileShader(compiledShader);

  // Step D: Check for errors and return the results (null if there is an error)
  // The log info is how shader compilation errors are typically displayed
  // This is useful for debugging the shaders.
  if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
    alert("A shader compiling error occured: " + gl.getShaderLogInfo(compiledShader));
  }

  return compiledShader;
};

SimpleShader.prototype.activateShader = function(pixelColor) {
  var gl = gEngine.Core.getGL();
  gl.useProgram(this.mCompiledShader);
  gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
  gl.uniform4fv(this.mPixelColor, pixelColor);
};

SimpleShader.prototype.getShader = function() { return this.mCompiledShader; };