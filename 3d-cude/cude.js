let canvas = document.getElementById("c");
let gl = canvas.getContext("webgl");

if (!gl) {
  console.log("no web gl is founded");
}

let vertexShaderSource = document.getElementById("vertex-shader").text;
let fragmentShaderSource = document.getElementById("fragment-shader").text;

function createShader(gl, type, source) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

function createProgram(gl, vertexShader, fragmentShader) {
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  let success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

let program = createProgram(gl, vertexShader, fragmentShader);

var vertices = [
  // 앞면(Front face)
  -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,

  // 뒤면(Back face)
  -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,

  // 위면(Top face)
  -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,

  // 아래면(Bottom face)
  -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,

  // 오른쪽면(Right face)
  1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,

  // 왼쪽면(Left face)
  -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
];

var colors = [
  [1.0, 1.0, 1.0, 1.0], // 앞면 : 흰색
  [1.0, 0.0, 0.0, 1.0], // 뒤면 : 빨간색
  [0.0, 1.0, 0.0, 1.0], // 위면 : 녹색
  [0.0, 0.0, 1.0, 1.0], // 아래면 : 파란색
  [1.0, 1.0, 0.0, 1.0], // 오른쪽면 : 노란색
  [1.0, 0.0, 1.0, 1.0], // 왼쪽면 : 보라색
];

var generatedColors = [];

for (j = 0; j < 6; j++) {}
