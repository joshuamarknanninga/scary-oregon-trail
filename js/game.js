// js/game.js

class ScaryOregonTrail extends Phaser.Scene {
  constructor() {
    super({ key: 'ScaryOregonTrail' });
    this.resources = {
      food: 100,
      water: 100,
      ammo: 50,
      sanity: 100
    };
    this.eventTimer = null;
  }

  preload() {
    // Load images
    this.load.image('background', 'assets/images/background.png');
    this.load.image('ghost', 'assets/images/ghost.png');
    this.load.image('player', 'assets/images/player.png');
    this.load.image('menu', 'assets/images/menu.png');
    
    // Load sounds
    this.load.audio('ambient', 'assets/sounds/ambient.mp3');
    this.load.audio('ghost_sound', 'assets/sounds/ghost_sound.mp3');
    this.load.audio('jump_scare', 'assets/sounds/jump_scare.mp3');
    this.load.audio('whisper', 'assets/sounds/whisper.mp3');
  }

  create() {
    // Background
    this.background = this.add.image(400, 300, 'background');

    // Start Screen Elements
    this.startText = this.add.text(400, 300, 'Click to Start', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
    
    // Input Listener for Starting the Game
    this.input.once('pointerdown', () => {
      this.startText.destroy();
      this.initializeGame();
    });
  }

  initializeGame() {
    // Player (optional for visualization)
    this.player = this.add.image(400, 500, 'player');

    // HUD: Resources
    this.foodText = this.add.text(16, 16, 'Food: 100', { fontSize: '16px', fill: '#fff' });
    this.waterText = this.add.text(16, 36, 'Water: 100', { fontSize: '16px', fill: '#fff' });
    this.ammoText = this.add.text(16, 56, 'Ammo: 50', { fontSize: '16px', fill: '#fff' });
    this.sanityText = this.add.text(16, 76, 'Sanity: 100', { fontSize: '16px', fill: '#fff' });

    // Notifications
    this.notification = this.add.text(400, 550, '', { fontSize: '20px', fill: '#ff0000' }).setOrigin(0.5);
    this.notification.setDepth(1);

    // Ambient Sound
    this.ambientSound = this.sound.add('ambient', { loop: true, volume: 0.5 });
    this.ambientSound.play();

    // Schedule random events
    this.time.addEvent({
      delay: Phaser.Math.Between(5000, 15000), // Random delay between 5-15 seconds
      callback: this.triggerRandomEvent,
      callbackScope: this,
      loop: true
    });

    // Flash overlay
    this.flashOverlay = this.add.rectangle(400, 300, 800, 600, 0xffffff, 0);
    this.flashOverlay.setDepth(2);
  }

  update(time, delta) {
    // Game logic updates can be added here
    // For example, resource consumption over time
  }

  updateSanity(amount) {
    this.resources.sanity += amount;
    if (this.resources.sanity < 0) this.resources.sanity = 0;
    if (this.resources.sanity > 100) this.resources.sanity = 100;
    this.sanityText.setText('Sanity: ' + this.resources.sanity);
    
    // Handle sanity-based effects
    if (this.resources.sanity <= 20) {
      // Example: Screen shakes or visuals change
      this.cameras.main.shake(200, 0.01);
    }
  }

  triggerRandomEvent() {
    const event = Phaser.Utils.Array.GetRandom(Events);
    event.effect(this);
  }

  playSound(soundKey) {
    if (this.sound.get(soundKey)) {
      this.sound.play(soundKey, { volume: 1 });
    }
  }

  flashScreen(duration = 500, color = 0xffffff, alpha = 1) {
    this.flashOverlay.setFillStyle(color, alpha);
    this.tweens.add({
      targets: this.flashOverlay,
      alpha: 0,
      duration: duration,
      ease: 'Power2'
    });
  }

  showImage(imageKey, duration = 2000) {
    if (!imageKey) return;
    const img = this.add.image(400, 300, imageKey);
    img.setAlpha(0);
    this.tweens.add({
      targets: img,
      alpha: 1,
      duration: 500,
      yoyo: true,
      onComplete: () => img.destroy()
    });
  }

  showNotification(message, duration = 3000) {
    this.notification.setText(message);
    this.tweens.add({
      targets: this.notification,
      alpha: 1,
      duration: 500,
      yoyo: true,
      delay: duration,
      onComplete: () => this.notification.setText('')
    });
  }
}

  