import engine from "../engine/index.js";
import * as m from "../lib/m.js";

class MyGame {
  constructor(htmlCanvasID) {
    // Step A: Initialize the webGL context
    engine.init(htmlCanvasID);

    // Step B: Create the Renderable objects
    this.mWhiteSq = new engine.Renderable();
    this.mWhiteSq.setColor([1.0, 1.0, 1.0, 1.0]);
    this.mRedSq = new engine.Renderable();
    this.mRedSq.setColor([1.0, 0.0, 0.0, 1.0]);

    // Step C: Draw!
    engine.clearCanvas([0.0, 0.8, 0.0, 1.0]);
    
    // Create a new identity transform operator
    let trsMatrix = m.create();

    // Step D: Compute the white square transform
    m.translate(trsMatrix, m.vector3(-0.25, 0.25, 0.0));
    m.rotateZ(trsMatrix, 0.2); // rotation is in radians
    m.scale(trsMatrix, m.vector3(1.2, 1.2, 1.0));
    
    // // Step E: Draw the white quare with the computed transform
    this.mWhiteSq.draw(trsMatrix);
    
    // Step F: Compute the red sqaure transform
    m.identity(trsMatrix); // restart
    m.translate(trsMatrix, m.vector3(0.27, -0.46, 0.0));
    m.rotateZ(trsMatrix, -0.785); // about ~45-degrees
    m.scale(trsMatrix, m.vector3(0.4, 0.4, 1.0));

    // Step G: Draw the red square with the computed transform
    this.mRedSq.draw(trsMatrix);
  }
}

window.onload = function() {
  new MyGame("GLCanvas");
}