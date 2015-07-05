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