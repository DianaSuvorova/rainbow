http://dianasuvorova.github.io/rainbow/

A playground to create webGL shaders.

Example of creating and rendering a fragment shader 
https://github.com/DianaSuvorova/rainbow/tree/master/vis/rainbow


```html

<!DOCTYPE html>
<html>
  <head>
    <title>Rainbow.</title>
    <meta charset="utf-8">
  </head>
  <body>
    <style type="text/css">
      html, body {
        padding: 0;
        margin: 0;
        overflow: hidden;
        width: 100%;
        height: 100%;
      }
      canvas {
        width: 100%;
        height: 100%;
      }
    </style>
    <canvas id="canvas"></canvas>
    <script type="text/javascript" src="rainbow.js"></script>
  </body>
</html>

```

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

```