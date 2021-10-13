function main() {
  // Get A WebGL context
  let canvas = document.getElementById("c");
  let gl = canvas.getContext("webgl");

  if (!gl) {
    alert("No Webgl exist!");
    return;
  }
  let program = createProgram(gl, "vertex-shader", "fragment-shader");

  let positionLocation = gl.getAttribLocation(program, "a_position");
  let resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  let colorLocation = gl.getUniformLocation(program, "u_color");

  let positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  let translation = [0, 0];
  let width = 100;
  let height = 100;
  let color = [Math.random(), Math.random(), Math.random(), 1];

  drawScene();

  // Setup a ui.

  function updatePosition(index) {
    return function (event, ui) {
      translation[index] = ui.value;
      drawScene();
    };
  }

  // Draw a the scene;
  function drawScene() {
    resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionLocation);

    // Bind the position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Setup a rectangle
    setRectangle(gl, translation[0], translation[1], width, height);

    let size = 2;
    let type = gl.FLOAT;
    let normalize = false;
    let stride = 0;
    let offset = 0;
    gl.vertexAttribPointer(
      positionLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );

    gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
    gl.uniform4fv(colorLocation, color);

    let primitiveType = gl.TRIANGLES;
    let offset2 = 0;
    let count = 6;
    gl.drawArrays(primitiveType, offset2, count);

    function setRectangle(gl, x, y, width, height) {
      let x1 = x;
      let x2 = x + width;
      let y1 = y;
      let y2 = y + height;
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
        gl.STATIC_DRAW
      );
    }
  }
}

main();
