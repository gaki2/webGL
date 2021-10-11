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

let positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

let positions = [0, 0, 0, 0.5, 0.7, 0];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

let positionAttributeLocation = gl.getAttribLocation(program, "a_position");

//뷰포트 설정
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// canvas를 clear처리
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

// 어느 셰이더 프로그램을 사용할지 지정
gl.useProgram(program);

//사용할 애트리뷰트 지정
gl.enableVertexAttribArray(positionAttributeLocation);

// 위치 버퍼를 바인드 합니다.
// 이 코드 전체를 보면 2번 바인드할 필요는 없지만,
// 의미상...
// 앞서 바인드는 데이터 공급을 위한 것이지만
// 이번 바인드는 애트리뷰트에서 사용할 버퍼를 지정한 것임.
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// positionBuffer (ARRAY_BUFFER)에서 데이터를 가져오는
// 방법을 위치 애트리뷰트에게 알려 줌
var size = 2; // 각 반복마다 2개씩 버퍼 데이타 참조
var type = gl.FLOAT; // 32bit 부동 소수점 값
var normalize = false; // 데이터를 노말라이즈 하지 않는다.
var stride = 0; // 0 = move forward size * sizeof(type) 각 반복마다 다음 위치
var offset = 0; // 버퍼 시작 위치
gl.vertexAttribPointer(
  positionAttributeLocation,
  size,
  type,
  normalize,
  stride,
  offset
);

//GLSL 프로그램을 실행하도록 요청
var primitiveType = gl.TRIANGLES;
var offset = 0;
var count = 3;
gl.drawArrays(primitiveType, offset, count);
