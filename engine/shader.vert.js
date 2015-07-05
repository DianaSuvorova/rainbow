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