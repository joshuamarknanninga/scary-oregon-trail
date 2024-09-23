// js/main.js

window.onload = function() {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'game-container',
      scene: ScaryOregonTrail
    };
  
    const game = new Phaser.Game(config);
  };
  