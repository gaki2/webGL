

console.log("init!");

window.onload = init();

function init() {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  const gl = canvas.getContext("webgl");
  canvas.width = 500;
  canvas.height = 500;
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  const program = createProgram(gl);
  draw(canvas,gl, program);
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


function draw(canvas, gl, program) {
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
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    let matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
    let matViewUniformLocation = gl.getUniformLocation(program, 'mView');
    let matProjUniformLocation = gl.getUniformLocation(program,'mProj');

    let worldMatrix = mat4();
    let viewMatrix = lookAt([0,0,-3], [0,0,0], [0,1,0]); // view matrix 를 설정해도, projmatrix 를 설정하지 않으면 소용이 없다. 
    let projMatrix = perspective(45, canvas.width / canvas.height, 0.1, 1000.0);


    // let worldMatrix = [1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1];
    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, flatten(worldMatrix));
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, flatten(viewMatrix));
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, flatten(projMatrix));
    
    //Main render loop
    let angle = 0;
    let loop = function() {
        angle = performance.now() / 15 / 6 * 2 * Math.PI;
        worldMatrix = rotate(angle, [0,1,0]);
        gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, flatten(worldMatrix));
        gl.clearColor(0.75, 0.85, 0.8, 1.0);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
};