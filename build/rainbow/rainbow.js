(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    this.program = this._createProgram();
    this.timeLoad = Date.now();
  };


  Engine.prototype.render = function () {
    this._renderPlayground();
  };

    Engine.prototype.renderAnimate = function () {
    this._renderPlayground();
    window.requestAnimationFrame(this.renderAnimate.bind(this));
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
      In fragment shader to access x,y of a fragment use gl_PointCoord
    */

  Engine.prototype._renderPlayground = function () {

    var timeFrame = Date.now();
    var time = (timeFrame - this.timeLoad) / 1000.0;

    var resolutionLocation = this.gl.getUniformLocation(this.program, 'u_resolution');
    this.gl.uniform2f(resolutionLocation, this.props.canvas.scrollWidth, this.props.canvas.scrollHeight);

    var timeLocation = this.gl.getUniformLocation(this.program, 'u_time');
    this.gl.uniform1f(timeLocation, time);

    this.gl.drawArrays(this.gl.POINTS, 0, 1);
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

   module.exports = Engine;
})();
},{"./shader.frag":2,"./shader.vert":3}],2:[function(require,module,exports){
/*jshint multistr: true */
var fragmentShader = '\n\
precision mediump float;\n\
  void main() {\n\
      gl_FragColor = vec4(1.0, 0.5, 1.0, 1.0);\n\
  }';

module.exports = fragmentShader;
},{}],3:[function(require,module,exports){
/*jshint multistr: true */
var vertexShader = '\n\
  precision mediump float; \n\
  uniform vec2 u_resolution;\n\
  uniform float u_size;\n\
  uniform float u_time;\n\
  void main() { \n\
     gl_PointSize = min(u_resolution.x, u_resolution.y) / 2.0; \n\
     gl_Position = vec4(0.0, 0.0, 0.0, 1.0); \n\
}';

module.exports = vertexShader;
},{}],4:[function(require,module,exports){
/*jshint multistr: true */
var fragmentShader = '\n\
  precision mediump float;\n\
  \n\
  #define PI 3.14159265359\n\
  \n\
  uniform vec2 u_resolution;\n\
  uniform float u_time;\n\
  \n\
  void main() {\n\
    vec2 st = gl_PointCoord.xy;\n\
    float blue = abs(sin(gl_PointCoord.x * PI * 4.0)); \n\
    float green = abs(sin(gl_PointCoord.x * PI * 2.0)); \n\
    float red = abs(sin(gl_PointCoord.x * PI)); \n\
    gl_FragColor = vec4(blue, green, red, 1.0);\n\
  }';

module.exports = fragmentShader;
},{}],5:[function(require,module,exports){
var Engine = require('../../engine/engine');


  var engine = new Engine({
    canvas: document.getElementById('canvas'),
    fragmentShader: require('./rainbow.frag')
  });

engine.render();
},{"../../engine/engine":1,"./rainbow.frag":4}]},{},[5]);
