http://dianasuvorova.github.io/rainbow/

A playground to create webGL shaders.

Example of creating and rendering a fragment shader:


```javascript

var Engine = require('../../engine/engine');

  var engine = new Engine({
    canvas: document.getElementById('canvas'),
    fragmentShader: require('./rainbow.frag')
  });

engine.render();

```

rainbow.frag:

```javascript

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

engine.render();
