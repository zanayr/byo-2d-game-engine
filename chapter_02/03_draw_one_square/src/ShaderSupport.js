// deno-lint-ignore-file no-var no-unused-vars
"use strict";

var gSimpleShader = null;
var gShaderVertexPositionAttribute = null;

function loadAndComplieShader(id, shaderType) {
  var shaderText, shaderSource, compiledShader;

  // Get the shader source from index.html
  shaderText = document.getElementById(id);
  shaderSource = shaderText.firstChild.textContent;

  // Create the shader based on the source type: vertex of fragment
  compiledShader = gGL.createShader(shaderType);

  // Complie the created shader
  gGL.shaderSource(compiledShader, shaderSource);
  gGL.compiledShader(compiledShader);

  // Check for errors and return result
  if (!gGL.getShaderParameter(compiledShader, gGL.COMPILE_STATUS)) {
    alert("A shader compiling error occurred: " + gGL.getShaderInfoLog(compiledShader));
  }
  
  return compiledShader;
}

function initSimpleShader(vertextShaderID, fragmentShaderID) {
  // Load and compile the vertex and fragment shaders
  var vertexShader = loadAndComplieShader(vertextShaderID, gGL.VERTEX_SHADER);
  var fragmentShader = loadAndComplieShader(fragmentShaderID, gGL.FRAGMENT_SHADER);

  // Create and link the shaders into a program
  gSimpleShader = gGL.createProgram();
  gGL.attachShader(gSimpleShader, vertexShader);
  gGL.attachShader(gSimpleShader, fragmentShader);
  gGL.linkProgram(gSimpleShader);

  // Check for an error
  if (!gGL.getProgramParameter(gSimpleShader, gGL.LINK_STATUS)) {
    alert("Error linking shader");
  }

  // Get a reference to the aSquareVertexPosition attribute
  gShaderVertexPositionAttribute = gGL.getAttribLocation(gSimpleShader, "aSquareVertexPosition");

  // Activate the vertex buffer loaded in VertexBuffer.js
  gGL.bindBuffer(gGL.ARRAY_BUFFER, gSquareVertexBuffer);

  // Describe the characteristics of the vertex position attribute
  gGL.vertexAttribPointer(gShaderVertexPositionAttribute,
    3,          // each vertex element is a 3-float (x, y, z)
    gGL.FLOAT,  // data type is float
    false,      // if the content is normalized vectors
    0,          // number of bytes to skip in between elements
    0);         // offsets to the first element
}