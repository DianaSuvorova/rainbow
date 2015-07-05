var Engine = require('../../engine/engine');


  var engine = new Engine({
    canvas: document.getElementById('canvas'),
    fragmentShader: require('./interactive_rainbow.frag'),
    interactive: true
  });

engine.renderAnimate();