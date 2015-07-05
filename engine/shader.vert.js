/*jshint multistr: true */
var vertexShader = '\n\
  precision mediump float; \n\
  uniform vec2 u_resolution;\n\
  uniform float u_size;\n\
  uniform float u_time;\n\
  uniform vec2 u_mouse;\n\
  attribute vec4 a_position;\n\
  void main() { \n\
     gl_PointSize = min(u_resolution.x, u_resolution.y) / 2.0; \n\
     gl_Position = a_position; \n\
}';

module.exports = vertexShader;