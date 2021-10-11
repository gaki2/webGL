let vertexShaderText = [
  "precision mediump float;",
  "",
  "attribute vec2 vertPosition;",
  "",
  "void main()",
  "{",
  " gl_Position = vec4(vertPosition, 0.0, 1.0);",
  "}",
].join("\n");

let fragmentShaderText = [
  "precision mediump float;",
  "",
  "void main()",
  "{",
  " gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);",
  "}",
].join("\n");

let InitDemo = function () {
  console.log("This is working");

  let canvas = document.getElementById("canvas");
  let gl = canvas.getContext("webgl");

  if (!gl) {
    gl = canvas.getContext("experimental-webgl");
  }

  if (!gl) {
    alert("Your browser does not support WEBGL");
  }

  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  gl.viewport(0, 0, window.innerWidth, window.innerHeight);

  gl.clearColor(0.2, 0.99, 0.8, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  let vertexShader = gl.createShader(gl.VERTEX_SHADER);
  let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, vertexShaderText);
  gl.shaderSource(fragmentShader, fragmentShaderText);

  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error("ERROR");
  }

  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error("ERROR");
  }

  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Error");
  }

  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error("error");
  }

  //CREATE BUFFER

  var triangleVertices = [0.0, 0.5, -0.5, -0.5, 0.5, -0.5];

  let triangleVertexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(triangleVertices),
    gl.STATIC_DRAW
  );

  var positionAttribLocation = gl.getAttribLocation(program, "vertPosition");
  gl.vertexAttribPointer(
    positionAttribLocation,
    2,
    gl.FLOAT,
    gl.FALSE,
    2 * Float32Array.BYTES_PER_ELEMENT,
    0
    // Size of an individual vertex
    // Offset from the beginning of a single vertex to this attribute
  );

  gl.enableVertexAttribArray(positionAttribLocation);

  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

function vertexShader(vertPosition, vertColor) {
  return {
    fragColor: vertColor,
    gl_Position: [vertPosition.x, vertPosition.y, 0.0, 1.0],
  };
}

InitDemo();
