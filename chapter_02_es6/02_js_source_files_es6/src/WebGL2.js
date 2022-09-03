function initializeWebGL() {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("webgl2");

  if (context !== null) {
    context.clearColor(1.0, 1.0, 1.0, 1.0);
  } else {
    console.error(`There was an error initializing the WebGL context.`);
    return null;
  }

  return context;
}

function clearCanvas(context) {
  context.clear(context.COLOR_BUFFER_BIT);
}

clearCanvas(initializeWebGL());