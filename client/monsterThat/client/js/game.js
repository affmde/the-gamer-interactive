config={
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.ScaleModes.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 450,
    },
    backgroundColor: "b9baff",
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
        gravity: { y: 0 },
      }
    },
    scene: [StartScene, Level1, Level2, Battle, RecoverScene, Hospital, GymLeaderIntro, Shop, PauseMenu]
}

const game = new Phaser.Game(config);
console.log(game)
const w=game.config.width
const h= game.config.height
console.log(w, h)

