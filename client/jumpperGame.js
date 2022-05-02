class Level extends Phaser.Scene {
    constructor(key) {
      super(key);
      this.levelKey = key
      this.nextLevel = {
        'Level1': 'Level2',
        'Level2': 'Level3',
        'Level3': 'Level4',
        'Level4': 'Level5',
        'Level5': 'Win',
      }
      gameState.lives=3;
      gameState.level=1
    }

  
    preload() {
      this.load.image('platform', 'https://content.codecademy.com/courses/learn-phaser/Codey%20Tundra/platform.png');
      this.load.image('snowflake', 'https://content.codecademy.com/courses/learn-phaser/Codey%20Tundra/snowflake.png');
      this.load.spritesheet('campfire', 'https://content.codecademy.com/courses/learn-phaser/Codey%20Tundra/campfire.png',
        { frameWidth: 32, frameHeight: 32});
      this.load.spritesheet('codey', 'https://content.codecademy.com/courses/learn-phaser/Codey%20Tundra/codey.png', { frameWidth: 72, frameHeight: 90})
  
      this.load.image('bg1', 'https://content.codecademy.com/courses/learn-phaser/Codey%20Tundra/mountain.png');
      this.load.image('bg2', 'https://content.codecademy.com/courses/learn-phaser/Codey%20Tundra/trees.png');
      this.load.image('bg3', 'https://content.codecademy.com/courses/learn-phaser/Codey%20Tundra/snowdunes.png');
      this.load.image('heart', 'media/red-heart.png')
      this.load.image('enemy', 'media/enemy.png')

    }
  
    create() {
      console.log(gameState.level)
      gameState.active = true
      
      gameState.bgColor = this.add.rectangle(0, 0, config.width, config.height, 0x00ffbb).setOrigin(0, 0);
      this.createStars();
      this.createParallaxBackgrounds();
  
      gameState.player = this.physics.add.sprite(125, 110, 'codey').setScale(.5);
      gameState.platforms = this.physics.add.staticGroup();

      gameState.enemy= this.physics.add.sprite(440, 70*4, 'enemy')
      this.physics.add.collider(gameState.enemy, gameState.platforms)
      this.physics.add.collider(gameState.enemy, gameState.platforms)
      this.physics.add.collider(gameState.player, gameState.enemy, ()=>{
        gameState.looseText = this.add.text(config.width/2-100, config.height/2, "You Lost!", {fontSize: 40, color: 'red'});
                gameState.looseText.setScrollFactor(0)
                gameState.playAgain = this.add.text(config.width/2-100, config.height/2+50, "Play Again", {fontSize: 40, color: 'red'})
                gameState.playAgain.setScrollFactor(0)
                gameState.home = this.add.text(config.width/2-100, config.height/2+100, "Home", {fontSize: 40, color: 'red'})
                gameState.home.setScrollFactor(0)
                this.physics.pause();
                gameState.enemy.move.stop();
                gameState.emitter.on=false
                gameState.playAgain.setInteractive();
                gameState.playAgain.on('pointerup', function(){
                  window.location.href = "jumpperGame.html";
            })
                gameState.home.setInteractive();
                gameState.home.on('pointerup', ()=>{
                    window.location.href = "index.html";
                })
                localStorage.setItem('jumperScore', gameState.level)
      })
      gameState.enemy.move= this.tweens.add({
        targets:gameState.enemy,
        x: 620,
        ease: 'Linear',
        duration:1500 ,
        repeat: -1,
        yoyo: true,
      })
      
      this.createAnimations();
  
      this.createSnow();
  
      this.levelSetup();
  
      this.cameras.main.setBounds(0, 0, gameState.bg3.width, gameState.bg3.height);
      this.physics.world.setBounds(0, 0, gameState.width, gameState.bg3.height + gameState.player.height);
  
      this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5)
      gameState.player.setCollideWorldBounds(true);
  
      this.physics.add.collider(gameState.player, gameState.platforms);
      this.physics.add.collider(gameState.goal, gameState.platforms);
  
      gameState.cursors = this.input.keyboard.createCursorKeys();

      //lives
       gameState.hearts=[]

      for(let i= 0; i<gameState.lives; i++){
        gameState.hearts.push(this.add.image(i+20+(i*30),30,'heart').setScrollFactor(0))
      }
      gameState.levelText= this.add.text(config.width-50, 20, `${gameState.level}`, {fontSize: 32, color: 'black'});
      gameState.levelText.setScrollFactor(0)

    }
    
  
    createPlatform(xIndex, yIndex) {
      // Creates a platform evenly spaced along the two indices.
      // If either is not a number it won't make a platform
        if (typeof yIndex === 'number' && typeof xIndex === 'number') {
          gameState.platforms.create((220 * xIndex),  yIndex * 70, 'platform').setOrigin(0, 0.5).refreshBody();
        }
    }

  
    createSnow() {
      gameState.particles = this.add.particles('snowflake');
  
      gameState.emitter = gameState.particles.createEmitter({
        x: {min: 0, max: config.width * 2 },
        y: -5,
        lifespan: 2000,
        speedX: { min:-5, max: -200 },
        speedY: { min: 200, max: 400 },
        scale: { start: 0.6, end: 0 },
        quantity: 10,
        blendMode: 'ADD'
      })
  
      gameState.emitter.setScrollFactor(0);
    }
  
    createAnimations() {
      this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('codey', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });
  
      this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('codey', { start: 4, end: 5 }),
        frameRate: 10,
        repeat: -1
      });
  
      this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('codey', { start: 2, end: 3 }),
        frameRate: 10,
        repeat: -1
      })
  
      this.anims.create({
        key: 'fire',
        frames: this.anims.generateFrameNumbers('campfire'),
        frameRate: 10,
        repeat: -1
      })
    }
  
    createParallaxBackgrounds() {
      gameState.bg1 = this.add.image(0, 0, 'bg1');
      gameState.bg2 = this.add.image(0, 0, 'bg2');
      gameState.bg3 = this.add.image(0, 0, 'bg3');
  
      gameState.bg1.setOrigin(0, 0);
      gameState.bg2.setOrigin(0, 0);
      gameState.bg3.setOrigin(0, 0);
  
      const game_width = parseFloat(gameState.bg3.getBounds().width)
      gameState.width = game_width;
      const window_width = config.width
  
      const bg1_width = gameState.bg1.getBounds().width
      const bg2_width = gameState.bg2.getBounds().width
      const bg3_width = gameState.bg3.getBounds().width
  
      gameState.bgColor.setScrollFactor(0);
      gameState.bg1.setScrollFactor((bg1_width - window_width) / (game_width - window_width));
      gameState.bg2.setScrollFactor((bg2_width - window_width) / (game_width - window_width));
    }
  
    levelSetup() {
      for (const [xIndex, yIndex] of this.heights.entries()) {
        this.createPlatform(xIndex, yIndex);
      } 
      
      // Create the campfire at the end of the level
      gameState.goal = this.physics.add.sprite(gameState.width - 40, 100, 'campfire');
  
      this.physics.add.overlap(gameState.player, gameState.goal, function() {
        this.cameras.main.fade(800, 0, 0, 0, false, function(camera, progress) {
          if (progress > .9) {
            this.scene.stop(this.levelKey);
            this.scene.start(this.nextLevel[this.levelKey]);
            gameState.level++;
          }
        });
      }, null, this);
  
      this.setWeather(this.weather);
    }
  
    update() {
     
      if(gameState.active){
        gameState.goal.anims.play('fire', true);
        if (gameState.cursors.right.isDown) {
          gameState.player.flipX = false;
          gameState.player.setVelocityX(gameState.speed);
          gameState.player.anims.play('run', true);
        } else if (gameState.cursors.left.isDown) {
          gameState.player.flipX = true;
          gameState.player.setVelocityX(-gameState.speed);
          gameState.player.anims.play('run', true);
        }else if (gameState.cursors.up.isDown && gameState.player.body.touching.down) {
            gameState.player.flipX = false;
            gameState.player.setVelocityY(-(gameState.speed+300));
            gameState.player.anims.play('run', true);
          } else {
          gameState.player.setVelocityX(0);
          gameState.player.anims.play('idle', true);
        }

  
        if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space) && gameState.player.body.touching.down) {
          gameState.player.anims.play('jump', true);
          gameState.player.setVelocityY(-gameState.ups);
        }
  
        if (!gameState.player.body.touching.down){
          gameState.player.anims.play('jump', true);
        }
  
        if (gameState.player.y > gameState.bg3.height) {
            if(gameState.lives<=0){
                gameState.looseText = this.add.text(config.width/2-100, config.height/2, "You Lost!", {fontSize: 40, color: 'red'});
                gameState.looseText.setScrollFactor(0)
                gameState.playAgain = this.add.text(config.width/2-100, config.height/2+50, "Play Again", {fontSize: 40, color: 'red'})
                gameState.playAgain.setScrollFactor(0)
                gameState.home = this.add.text(config.width/2-100, config.height/2+100, "Home", {fontSize: 40, color: 'red'})
                gameState.home.setScrollFactor(0)
                this.physics.pause();
                gameState.enemy.move.stop();
                gameState.playAgain.setInteractive();
                gameState.playAgain.on('pointerup', function(){
                  window.location.href = "jumpperGame.html";
            })
                gameState.home.setInteractive();
                gameState.home.on('pointerup', ()=>{
                    window.location.href = "index.html";
                })
                localStorage.setItem('jumperScore', gameState.level)
            }else{
                this.cameras.main.shake(240, .01, false, function(camera, progress) {
                    if (progress > .9) {
                        this.scene.restart(this.levelKey);
                        gameState.lives--;
                    }      
                })
            }
        }

      }

    }
    createStars() {
      gameState.stars = [];
      function getStarPoints() {
        const color = 0xffffff;
        return {
          x: Math.floor(Math.random() * 900),
          y: Math.floor(Math.random() * config.height * .5),
          radius: Math.floor(Math.random() * 3),
          color,
        }
      }
      for (let i = 0; i < 200; i++) {
        const { x, y, radius, color} = getStarPoints();
        const star = this.add.circle(x, y, radius, color)
        star.setScrollFactor(Math.random() * .1);
        gameState.stars.push(star)
      }
    }
  
    setWeather(weather) {
      const weathers = {
  
        'morning': {
          'color': 0xecdccc,
          'snow':  1,
          'wind':  20,
          'bgColor': 0xF8c3aC,
        },
  
        'afternoon': {
          'color': 0xffffff,
          'snow':  1,
          'wind': 80,
          'bgColor': 0x0571FF,
        },
  
        'twilight': {
          'color': 0xccaacc,
          'bgColor': 0x18235C,
          'snow':  10,
          'wind': 200,
        },
  
        'night': {
          'color': 0x555555,
          'bgColor': 0x000000,
          'snow':  0,
          'wind': 0,
        },
      }
      let { color, bgColor, snow, wind } = weathers[weather];
      gameState.bg1.setTint(color);
      gameState.bg2.setTint(color);
      gameState.bg3.setTint(color);
      gameState.bgColor.fillColor = bgColor;
      gameState.emitter.setQuantity(snow);
      gameState.emitter.setSpeedX(-wind);
      gameState.player.setTint(color);
      for (let platform of gameState.platforms.getChildren()) {
        platform.setTint(color);
      }
      if (weather === 'night') {
        gameState.stars.forEach(star => star.setVisible(true));
      } else {
        gameState.stars.forEach(star => star.setVisible(false));
      }
  
      return
    }
  }
  
  class Level1 extends Level {
    constructor() {
      super('Level1')
      this.heights = [4, 7, 5, null, 5, 4, null, 4, 4];
      this.weather = 'afternoon';
    }
  }
  
  class Level2 extends Level {
    constructor() {
      super('Level2')
      this.heights = [5, 4, null, 4, 6, 4, 6, 5, 5];
      this.weather = 'twilight';
    }
  }
  
  class Level3 extends Level {
    constructor() {
      super('Level3')
      this.heights = [6, null, 6, 4, 6, 4, 5, null, 4];
      this.weather = 'night';
    }
  }
  
  class Level4 extends Level {
    constructor() {
      super('Level4')
      this.heights = [4, null, 3, 6, null, 6, null, 5, 4];
      this.weather = 'morning';
    }
  }
  class Level5 extends Level {
    constructor() {
      super('Level5')
      this.heights = [4, null, 3, 6, null, 6, null, 5, 4];
      this.weather = 'morning';
    }
  }
  
  class Credits extends Phaser.Scene {
    constructor() {
      super('Credits')
    }
  
    preload() {
      this.load.spritesheet('codey_sled', 'https://content.codecademy.com/courses/learn-phaser/Codey%20Tundra/codey_sled.png', { frameWidth: 81, frameHeight: 90 });
    }
  
    create() {
      gameState.player = this.add.sprite(config.width / 2, config.height / 2, 'codey_sled');
  
      this.anims.create({
        key: 'sled',
        frames: this.anims.generateFrameNumbers('codey_sled'),
        frameRate: 10,
        repeat: -1
      })
  
      gameState.player.angle = 20;
      gameState.endText = this.add.text(config.width / 2 -120, config.height / 2+100, 'Play Again', {fontSize: 32})
      gameState.endText.setInteractive();
      gameState.endText.on('pointerup', ()=>{
          this.scene.stop('Credits');
          this.scene.start('Level1')
      })
    }
  
    update() {
      gameState.player.anims.play('sled', true);
    }
  }

  class WinPage extends Phaser.Scene{
    constructor(){
      super('Win')
    }

    preload() {
      this.load.spritesheet('codey_sled', 'https://content.codecademy.com/courses/learn-phaser/Codey%20Tundra/codey_sled.png', { frameWidth: 81, frameHeight: 90 });
    }
  
    create() {
      gameState.player = this.add.sprite(config.width / 2, config.height / 2 -150, 'codey_sled');
  
      this.anims.create({
        key: 'sled',
        frames: this.anims.generateFrameNumbers('codey_sled'),
        frameRate: 10,
        repeat: -1
      })


      gameState.winText = this.add.text(config.width / 2 -100, config.height / 2, 'You Won', {fontSize: 32, color: 'black'});
      gameState.livesText = this.add.text(config.width / 2 -180, config.height / 2+50, `You achieved level ${gameState.level-1}`, {fontSize: 32, color: 'black'});
  
      gameState.player.angle = 20;
      gameState.endText = this.add.text(config.width / 2 -120, config.height / 2+100, 'Play Again', {fontSize: 32, color: 'black'})
      gameState.endText.setInteractive();
      gameState.endText.on('pointerup', ()=>{
          this.scene.stop('Win');
          this.scene.start('Level1')
      })
    }
  
    update() {
      gameState.player.anims.play('sled', true);
    }
  }


  
  const gameState = {
    speed: 240,
    ups: 380,
  };
  
  const config = {
    type: Phaser.AUTO,
    parent: 'jumpperGame',
    width: 500,
    height: 600,
    fps: {target: 60},
    backgroundColor: "b9eaff",
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 800 },
        enableBody: true,
  
      }
    },
    dom: {
      createContainer: true
    },
    scene: [Level1, Level2, Level3, Level4, Level5, Credits, WinPage]
  };
  
  const game = new Phaser.Game(config);