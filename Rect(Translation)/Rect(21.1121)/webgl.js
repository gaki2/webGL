function Log(a) {
  console.log(a);
}

Log("script connection is successful!");

window.onload = play();

function play() {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  // canvas 객체를 body 에 append 한 후에 canvas 의 width 와 height 를 변화시켜도
  // body 에 붙여진 canvas 에 그대로 적용된다.

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const gl = canvas.getContext("webgl");

  gl.clearColor(0.75, 0.85, 0.8, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const program = createProgram(gl);
  draw(gl, program);
}

function createProgram(gl) {
  const vertexShaderSource = document.getElementById("vertex-shader").text;
  const fragmentShaderSource = document.getElementById("fragment-shader").text;
  let vertexShader = gl.createShader(gl.VERTEX_SHADER);
  let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.shaderSource(fragmentShader, fragmentShaderSource);

  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error(
      "vertex Shader COMPLIE ERROR",
      gl.getShaderInfoLog(vertexShader)
    );
  }
  gl.compileShader(fragmentShader);

  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  return program;
}

function draw(gl, program) {
     //Color
  let colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  let color = [];
  for(let i = 0; i < 12; i++) {
      let r1 = Math.random();
      let b1 = Math.random();
      let g1 = Math.random();
      color.push(r1);
      color.push(b1);
      color.push(g1);
      color.push(1);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
  
  let a_ColorLocation = gl.getAttribLocation(program, 'a_color');
  gl.enableVertexAttribArray(a_ColorLocation);
  gl.vertexAttribPointer(
      a_ColorLocation,
      4,
      gl.FLOAT,
      gl.FALSE,
      0,
      0
  )
    //Vertex
  let vertex = [
    -0.5, 0, 0, 0, 0, 0.5, 0, 0, 0.5,
     0, 0, 0.5, 0.5, 0, 0, 0, 0, -0.5, 0, -0.5,
    -0.5, 0, 0, 0,
  ];

  let vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertex), gl.STATIC_DRAW);

  let a_PositionLoaction = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(a_PositionLoaction);
  gl.vertexAttribPointer(
    a_PositionLoaction, // a_position Location
    2, // 1개의 a_position 이 buffer 에서 몇개의 정보를 얻어가는지
    gl.FLOAT,
    gl.FALSE,
    0,
    0
  );

 


  gl.drawArrays(gl.TRIANGLES, 0, 12);
}
