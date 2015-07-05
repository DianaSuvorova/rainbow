(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*jshint multistr: true */
var fragmentShader = '\n\
  precision mediump float;\n\
  uniform vec2 u_resolution;\n\
  uniform vec2 u_mouse;\n\
  #define PI 3.14159265359\n\
  vec3 hsv2rgb( in vec3 c )\n\
  {\n\
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );\n\
    return c.z * mix( vec3(1.0), rgb, c.y);\n\
  }\n\
  vec3 hsv2rgb_smooth( in vec3 c )\n\
  {\n\
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );\n\
    rgb = rgb*rgb*(3.0-2.0*rgb);\n\
    return c.z * mix( vec3(1.0), rgb, c.y);\n\
  }\n\
  void main() {\n\
    float mouse_x = 1.0 - smoothstep(0.0, 0.1,abs((u_mouse.x / u_resolution.x - gl_PointCoord.x))); \n\
    vec3 hsl = vec3( gl_PointCoord.x, 1.0, gl_PointCoord.y); \n\
    vec3 rgb_o = hsv2rgb_smooth( hsl);\n\
    vec3 color = mix(rgb_o, vec3(1.0, 1.0, 1.0), mouse_x);\n\
    gl_FragColor = vec4( color, 1.0 );\n\
  }\n\
 ';


module.exports = fragmentShader;
},{}]},{},[1]);
