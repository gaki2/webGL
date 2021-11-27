console.log("init!");

window.onload = init();

function init() {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  const gl = canvas.getContext("webgl");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const program = createProgram(gl);
  draw(gl, program);
}

function createProgram(gl) {
    const vertexShaderText = document.getElementById('vertex-shader').text;
    const fragmentShaderText = document.getElementById('fragment-shader').text;

    vertexShader = gl.createShader(gl.VERTEX_SHADER);
    fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader,vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertexShader);
    let compiled = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
    console.log(compiled);
    let compilationLog = gl.getShaderInfoLog(vertexShader);
    console.log(compilationLog);

    gl.compileShader(fragmentShader);
    let compiled2 = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
    console.log(compiled2);
    let compilationLog2 = gl.getShaderInfoLog(fragmentShader);
    console.log(compilationLog2);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    return program;
}


function draw(gl, program) {
    let triangleVertex = [
        // X Y Z              R G B
        0.0, 0.5, 0.0,      1.0, 1.0, 0.0,
        -0.5, -0.5, 0.0,    0.7, 0.0, 1.0,
        0.5, -0.5, 0.0,     0.1, 1.0, 0.6
    ];

    let triangleVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertex), gl.STATIC_DRAW);

    let vertexPosLocation = gl.getAttribLocation(program, 'a_position');
    let colorLocation = gl.getAttribLocation(program, 'a_color');

    gl.vertexAttribPointer(
        vertexPosLocation,
        3,
        gl.FLOAT,
        gl.FALSE,
        24,
        0
    );
    gl.vertexAttribPointer(
        colorLocation,
        2,
        gl.FLOAT,
        gl.FALSE,
        24,
        12
    )

    gl.enableVertexAttribArray(vertexPosLocation);
    gl.enableVertexAttribArray(colorLocation);


    let matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');


    gl.drawArrays(gl.TRIANGLES, 0, 3);
};