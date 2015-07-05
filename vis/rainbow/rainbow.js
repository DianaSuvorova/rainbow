var Engine = require('../../engine/engine');


  var engine = new Engine({
    canvas: document.getElementById('canvas'),
    fragmentShader: require('./rainbow.frag')
  });

engine.render();