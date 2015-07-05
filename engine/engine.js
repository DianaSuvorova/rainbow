;(function () {
  
  function Engine () {
    this.initialize.apply(this, arguments);
    return this;
  }

  Engine.prototype = {};

  Engine.prototype.defaults = {
    vertexShader: require('./shader.vert'),
    fragmentShader: require('./shader.frag')
  };

  Engine.prototype.initialize = function (o) {
    this.props = o || {};
    this.props.vertexShader = this.props.vertexShader || this.defaults.vertexShader;
    this.props.fragmentShader = this.props.fragmentShader || this.defaults.fragmentShader;
    
    this.gl = this._getWebGl();
    if (!this.gl) this._noWebGlMessage();
    else {
      this.program = this._createProgram();
      this.timeLoad = Date.now();
      this.mouse = {x: null, y: null};
      if (this.props.interactive) this._attachMouseListeners();
    }
  };

  Engine.prototype.render = function () {
    if (this.gl) this._renderPlayground();
  };

    Engine.prototype.renderAnimate = function () {
    if (this.gl) {
      this._renderPlayground();
      window.requestAnimationFrame(this.renderAnimate.bind(this));
    }
  };

  Engine.prototype._createProgram = function () {
    var program = this.gl.createProgram();
    var vertexShader = this._createShader(this.props.vertexShader, this.gl.VERTEX_SHADER);
    var fragmentShader = this._createShader(this.props.fragmentShader, this.gl.FRAGMENT_SHADER);

    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);

    this.gl.linkProgram(program);

    this.gl.useProgram(program);
    return program;
  };

  Engine.prototype._createShader = function (source, type) {
    var shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    var compiled = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (!compiled) {
      lastError = this.gl.getShaderInfoLog(shader);
      console.error("Error compiling shader '" + this.gl.getShaderSource(shader) + "':" + lastError);
    }

    return shader;
  };

    /*
      full-canvas-sized playground comes with 
      u_resolution : vec2(width, height)
      u_time : float(sec since page engine was created)
      u_mouse: vec2(x, y) mouse coordinates
      In fragment shader to access x,y of a fragment use gl_PointCoord
    */

  Engine.prototype._renderPlayground = function () {

    var timeFrame = Date.now();
    var time = (timeFrame - this.timeLoad) / 1000.0;
    var rect = this.props.canvas.getBoundingClientRect();

    var resolutionLocation = this.gl.getUniformLocation(this.program, 'u_resolution');
    this.gl.uniform2f(resolutionLocation, this.props.canvas.scrollWidth, this.props.canvas.scrollHeight);

    var timeLocation = this.gl.getUniformLocation(this.program, 'u_time');
    this.gl.uniform1f(timeLocation, time);

    var mouseLocation = this.gl.getUniformLocation(this.program, 'u_mouse');
    this.gl.uniform2f(mouseLocation, this.mouse.x - rect.left, this.props.canvas.height-(this.mouse.y-rect.top));

    //gotta have atleast one varying attribute to be compatible with OpenGL 1.0 

    var vertices = new Float32Array([0.0, 0.0, 0.0]),
    vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

    // Bind position data to attribute 0.
    this.gl.bindAttribLocation(this.program, 0, 'a_position');

    // Assign pointer.
    this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(0);

    this.gl.drawArrays(this.gl.POINTS, 0, 1);
  };

  Engine.prototype._attachMouseListeners = function () {
    document.addEventListener('mousemove', function (e) {
      this.mouse.x = e.clientX || e.pageX;
      this.mouse.y = e.clientY || e.pageY;
    }.bind(this), false);
  };

  Engine.prototype.whatGl = function () {
    var params = {
      vendor: 'VENDOR',
      version: 'VERSION',
      renderer: 'RENDERER',
      shading_language_version: 'SHADING_LANGUAGE_VERSION',
      red_bits: 'RED_BITS',
      green_bits: 'GREEN_BITS',
      blue_bits: 'BLUE_BITS',
      alpha_bits: 'ALPHA_BITS',
      max_vertex_attribs: 'MAX_VERTEX_ATTRIBS',
      max_varying_vectors: 'MAX_VARYING_VECTORS',
      max_vertex_uniform_attributes: 'MAX_VERTEX_UNIFORM_VECTORS',
      max_combined_texture_image_units: 'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
      max_texture_size: 'MAX_TEXTURE_SIZE',
      max_renderbuffer_size: 'MAX_RENDERBUFFER_SIZE',
      max_viewport_dims: 'MAX_VIEWPORT_DIMS',
      aliased_line_width_range: 'ALIASED_LINE_WIDTH_RANGE',
      aliased_point_size_range: 'ALIASED_POINT_SIZE_RANGE'
    };
    var webGlParams = [];

    for (var prop in params) {
      if (params.hasOwnProperty(prop)) {
        webGlParams[prop] = this.gl.getParameter(this.gl[params[prop]]);
      }
    }
    return webGlParams;
  };

  Engine.prototype._getWebGl = function () {
    var gl = null;
    try { gl = this.props.canvas.getContext("webgl") || this.props.canvas.getContext("experimental-webgl"); }
    catch (x) { gl = null; }
    return gl;
  };
  
  Engine.prototype._noWebGlMessage = function () {
    var context = canvas.getContext("2d");
    context.fillStyle = "black";
    context.font = "10px Arial";
    context.fillText("Sorry....This browser doesn't support webGL", 0, 10);
    context.fillText("And text support is also kind of blurry :)", 0, 20);
  };
  
   module.exports = Engine;
})();