// js/events.js

const Events = [
    {
      name: "Shadow Figure",
      description: "A shadowy figure appears behind you.",
      sound: "ghost_sound",
      image: "ghost.png",
      effect: (game) => {
        game.updateSanity(-10);
        game.playSound('ghost_sound');
        game.flashScreen();
        game.showImage('ghost.png', 2000);
      }
    },
    {
      name: "Whispers in the Dark",
      description: "You hear eerie whispers that unsettle you.",
      sound: "whisper.mp3", // Add a whisper sound if available
      image: null,
      effect: (game) => {
        game.updateSanity(-5);
        game.playSound('whisper.mp3');
        game.showNotification("Whispers surround you...", 3000);
      }
    },
    {
      name: "Jump Scare",
      description: "A sudden fright jolts you!",
      sound: "jump_scare.mp3",
      image: "ghost.png",
      effect: (game) => {
        game.updateSanity(-15);
        game.playSound('jump_scare.mp3');
        game.flashScreen(1000);
        game.showImage('ghost.png', 1000);
      }
    },
    // Add more events as desired
  ];
  