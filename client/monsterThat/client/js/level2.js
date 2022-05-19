let opponents1;
let opponents2;
let gyms;
let baus;
let guards;
let polices;
let hospitals;
let shops;
let showStats=false;
let currentScene='Level2'
let playerPosition={}

class Level2 extends Phaser.Scene{
    constructor(){
        super({key: 'Level2'})
    }

    preload(){
        //Loading screen
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        let percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        loadingText.setOrigin(0.5, 0.5);
        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
        });
                    
        this.load.on('fileprogress', function (file) {
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });


        this.load.image('classicTileset', 'assets/ClassicRPG_SHEET.png');
        this.load.image('medievalTileset', 'assets/medieval_tilesheet.png');
        this.load.image('tilemap', 'assets/tilemap.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/world2.json');
        this.load.atlas('bandit', 'assets/players/bandit.png', 'assets/players/bandit_atlas.json');
        this.load.animation('bandit_anim', 'assets/players/bandit_anim.json');
        this.load.image('ranger', 'assets/ranger.png');
        this.load.image('elf', 'assets/elf.png')<
        this.load.image('closedBau', 'assets/closedBau.png');
        this.load.image('openedBau', 'assets/openedBau.png');
        this.load.image('guard', 'assets/guard.png');
        this.load.image('stone', 'assets/items/stone.png');
        this.load.image('coin', 'assets/items/coin.png');
        this.load.image('water', 'assets/items/water.png');
        this.load.image('meat', 'assets/items/meat.png');
        this.load.image('herbs', 'assets/items/herbs.png');
        this.load.image('wood', 'assets/items/wood.png');
        this.load.image('menu', 'assets/menuIcon.png');
        if(device!=='desktop'){
            this.load.image('up', 'assets/gamepad/up.png');
            this.load.image('down', 'assets/gamepad/down.png');
            this.load.image('left', 'assets/gamepad/left.png');
            this.load.image('right', 'assets/gamepad/right.png');
        }
        
    }

    create(){
        console.log('playerStats: ', playerStats)
        console.log(newGame)
        //Tilemap creation
        const map = this.make.tilemap({ key: 'tilemap', tileWidth:16, tileHeight: 16 })
        const tileset = map.addTilesetImage('ClassicRPG_Sheet', 'classicTileset');
        const tileset2= map.addTilesetImage('tilemap', 'tilemap')
        map.createLayer('background', tileset);
        const forest= map.createLayer('forest', tileset);
        const sea= map.createLayer('sea', tileset);
        const ground= map.createLayer('ground', tileset);
        this.grass= map.createLayer('grass', tileset);
        const buildings= map.createLayer('buildings', tileset2)

        //Player creation
        if(newGame===false){
            this.player=this.physics.add.sprite(loadData.x || 6487,loadData.y || 7980, 'bandit');
        }else{
            this.player=this.physics.add.sprite(6487, 7980, 'bandit');
        }
        this.player.setSize(16,16)
        this.player.setOffset(8,16)

        //Tilemap collisions
        forest.setCollisionByExclusion([0, -1]);
        sea.setCollisionByExclusion([0, -1]);
        buildings.setCollisionByExclusion([0, -1, 283, 573, 574]);
        this.grass.setCollisionByExclusion([0,-1])
        this.physics.add.collider(this.player, forest)
        this.physics.add.collider(this.player, sea)
        this.physics.add.collider(this.player, buildings);
        
        //Create opponents
        opponents1= this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Opponent1').objects.forEach(trainer=>{
            const newTrainer = opponents1.create(trainer.x, trainer.y, 'ranger');
            newTrainer.properties= trainer.properties;
            this.physics.add.collider(newTrainer, this.player, (opponent, player)=>{
                if(this.checkDefeatedTrainers(trainer.id)){
                    return
                }else{
                    const dialog = new DialogBox(this, opponent.properties[3].value, 'Battle', 'Level2',null)
                    //this.saveGame()
                    currentOponnent.id=trainer.id
                    currentOponnent.name= trainer.name;
                    currentOponnent.hp=opponent.properties[0].value;
                    currentOponnent.moneyReturn=opponent.properties[2].value;
                    currentOponnent.level=opponent.properties[1].value;
                    currentOponnent.fig= 'ranger';
                    currentOponnent.type='Trainer';
                    currentScene='Battle';
                    this.checkDefeatedTrainers(trainer.id)
                          
                }
                
            })
        })
        opponents2= this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Opponent2').objects.forEach(trainer=>{
            const newTrainer = opponents1.create(trainer.x, trainer.y, 'elf');
            newTrainer.properties= trainer.properties;
            this.physics.add.collider(newTrainer, this.player, (opponent, player)=>{
                if(this.checkDefeatedTrainers(trainer.id)){
                    return
                }else{
                    const dialog = new DialogBox(this, opponent.properties[3].value, 'Battle', 'Level2',null)
                    currentOponnent=opponent.properties;
                    currentOponnent.id=trainer.id
                    currentOponnent.name= trainer.name;
                    currentOponnent.hp=opponent.properties[0].value;
                    currentOponnent.moneyReturn=opponent.properties[2].value;
                    currentOponnent.level=opponent.properties[1].value;
                    currentOponnent.fig= 'elf';
                    currentOponnent.type='Trainer';
                    currentScene='Battle';
                    this.checkDefeatedTrainers(trainer.id)
                }
                
            })
        })


        //Create Baus
        baus= this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('baus').objects.forEach(bau=>{
            let newBau
            if(this.checkBauOpened(bau.id)){
                newBau = opponents1.create(bau.x, bau.y, 'openedBau');
            }else{
                newBau = opponents1.create(bau.x, bau.y, 'closedBau');
            }
            newBau.id=bau.id
            this.physics.add.collider(newBau, this.player, (bau, player)=>{
                if(this.checkBauOpened(bau.id)){
                    return
                }else{
                    currentScene='Bau'
                    bau.setTexture('openedBau')
                    const prizes= handleItemsReward()
                    console.log(prizes)
                    const moneyReward= Math.floor(Math.random()*(100*playerStats.level))
                    playerStats.money+=moneyReward;
                    console.log(playerStats)
                    oppenedBaus.push(newBau.id)
                    const box= new RewardBox(this, 'stone', prizes.stone, 'meat', prizes.meat, 'water', prizes.water, 'wood', prizes.wood, 'herbs', prizes.herbs, 'coin', moneyReward )
                    console.log('new stats: ', playerStats)
                    console.log('openedBaus: ', oppenedBaus)
                }
                
            })
        })

        //create Gyms
        gyms= this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('gyms').objects.forEach(gym=>{
            const newGym = gyms.create(gym.x, gym.y, 'elf').setAlpha(0.1).setOrigin(0,1)
            newGym.properties=gym.properties
            newGym.id=gym.id
            this.physics.add.collider(newGym, this.player, (gym, player)=>{
                if(this.checkDefeatedGyms(newGym.id)){
                    return
                }else{
                    this.saveGame()
                    currentOponnent=gym.properties;
                    currentOponnent.hp=gym.properties[2].value;
                    currentOponnent.moneyReturn=gym.properties[4].value;
                    currentOponnent.level=gym.properties[3].value;
                    currentOponnent.name=gym.properties[0].value
                    currentOponnent.id=gym.id
                    currentOponnent.fig= 'Leader1';
                    currentOponnent.type='GymLeader'
                    currentScene='Battle';
                    this.checkDefeatedGyms(gym.id)
                    const dialog = new DialogBox(this, "Hey boss it seems someone is daring to challenge you!", 'GymLeaderIntro', 'Level2',null)
                }
                
            })
        })

        //Create the guards

        guards= this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Police').objects.forEach(police=>{
            const newGuard = guards.create(police.x, police.y, 'guard');
            newGuard.setOrigin(0,0.8)
            newGuard.gymNumber= police.properties[0].value
            this.physics.add.collider(newGuard, this.player, (opponent, player)=>{
                if(this.checkDefeatedGyms(newGuard.gymNumber)){
                    newGuard.destroy()
                }else{
                    const rec= new DialogBox(this, 'You must defeat the city Gym Leader if you want to go ahead!', null, null)
                }
                
            })
        })

        //Create the Hospitals
        hospitals= this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('hospital').objects.forEach(hospital=>{
            const newHospital = hospitals.create(hospital.x, hospital.y, 'guard').setAlpha(0.1).setOrigin(0,1);
            this.physics.add.collider(newHospital, this.player, (hosp, player)=>{
                currentScene="Hospital"
                currentHospital={
                    x: hospital.x,
                    y: hospital.y
                }
                currentHospital.id=hospital.id
                this.scene.pause();
                this.scene.launch('Hospital');
            })
        })

        //Create Shops
        shops= this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('shops').objects.forEach(shop=>{
            const newShop= shops.create(shop.x,shop.y, 'guard').setAlpha(0.1).setOrigin(0.5,0.8)
            this.physics.add.collider(newShop, this.player, ()=>{
                currentScene="Shop";
                const dialog= new DialogBox(this, 'Hmm.. a shop! Maybe i can buy something here.', 'Shop', 'Level2', null)
            })
        })


        //cursors
        cursors = this.input.keyboard.createCursorKeys();

        //cameras
        this.cameras.main.startFollow(this.player)
        this.cameras.main.setBounds(0,0, 8000, 8000);
        this.cameras.main.fadeIn(1000);
        this.cameras.main.setZoom(1);

        //Save game
        keyObj = this.input.keyboard.addKey('S');  // Get key object
        isDown = keyObj.isDown;

        //Pause Menu
        this.menu= this.add.image(700, 50, 'menu').setScrollFactor(0).setInteractive().setOrigin(0.5).setScale(1*0.5625)
        this.menu.on('pointerup', ()=>{
            console.log(playerPosition)
            this.scene.launch('PauseMenu')
            this.scene.pause();
        })

        //Controlls
        if(device!=='desktop'){
            this.controls={}
            this.controls.left=this.add.image(w*0.1, h*0.8, 'left').setScrollFactor(0).setAlpha(0.6).setInteractive();
            this.controls.up=this.add.image(w*0.1, h*0.8, 'up').setScrollFactor(0).setOrigin(0,1).setAlpha(0.6).setInteractive();
            this.controls.down=this.add.image(w*0.1,h*0.8, 'down').setScrollFactor(0).setOrigin(0,0).setAlpha(0.6).setInteractive();
            this.controls.right=this.add.image(w*0.1,h*0.8, 'right').setScrollFactor(0).setOrigin(-0.5,0.5).setAlpha(0.6).setInteractive();
        }
        
    }//end of create Method

    update(){
        if(currentScene==='Level2'){
            

            this.checkControls();
    
            playerStats.level=this.playerLevel()
    

            if(keyObj.isDown){
                this.saveGame();  
            }

            this.grassWalk();

            playerPosition={
                x: this.player.x,
                y: this.player.y
            }
        }
    }


    checkDefeatedTrainers(id){
        const trainer= defeatedOpponents.find(tnr=>tnr===id)
        if(trainer){
            return true
        } else{
            return false
        }
    }

    checkBauOpened(id){
        const bau= oppenedBaus.find(bau=>bau===id)
        if(bau){
            return true
        }else{
            return false
        }
    }

    checkDefeatedGyms(id){
        const gym= defeatedGyms.find(gym=>gym===id)
            if(gym){
                return true
            }else{
                return false
            }
    }

    saveGame(){
        const saveFile={
            player: playerStats,
            x: this.player.x,
            y: this.player.y,
            defeatedOpponents: defeatedOpponents,
            oppenedBaus: oppenedBaus,
            defeatedGyms: defeatedGyms,
            
        }
        localStorage.setItem('monsterThatSaveGame', JSON.stringify(saveFile));
        console.log('Game Saved')
    }

    playerLevel(){
        if(playerStats.xp<500){
            return 1
        }else if(playerStats.xp<1000){
            return 2
        }else if(playerStats.xp<2250){
            return 3
        }else if(playerStats.xp<4000){
            return 4
        }else if(playerStats.xp <6000){
            return 5
        }else if(playerStats.xp< 8500){
            return 6
        }else{
            return 7
        }
    }


    grassWalk(){
        let grassTile = this.grass.getTileAtWorldXY(this.player.x, this.player.y);
        if(!grassTile)return
        if(grassTile.index===31){
            if(currentScene==='Level2'){
                const rand= Math.floor(Math.random()*1000)
                if(rand<2 && currentScene==="Level2"){
                    currentScene='Battle';
                    currentOponnent.id="A"
                    currentOponnent.name= "Bugger";
                    currentOponnent.hp=Math.floor(Math.random()*25);
                    currentOponnent.moneyReturn=0;
                    currentOponnent.level=Math.floor(Math.random()*playerStats.level)<1 ? 1 : Math.floor(Math.random()*playerStats.level);
                    currentOponnent.fig= 'mashroom';
                    currentOponnent.type='Bug';
                    this.scene.pause();
                    this.scene.launch('Battle'); 
                }
            }
        }
    }

    //Controls
    checkControls(){
        if(device==="desktop"){
            if(cursors.up.isDown){
                this.player.setVelocityY(-110)
                animation='walk'
            }else if(cursors.down.isDown){
                this.player.setVelocityY(110);
                animation='walk';
            }else{
                this.player.setVelocityY(0)
                animation='idle'
            }
    
            if(cursors.left.isDown){
                this.player.setVelocityX(-110);
                animation='walk';
                this.player.flipX=true;
            }else if(cursors.right.isDown){
                this.player.setVelocityX(110);
                this.player.flipX=false;
                animation='walk';
            }else{
                this.player.setVelocityX(0)
                animation='idle'
            }
        }else{
            //Left Button
            this.controls.left.on('pointerdown', ()=>{
                this.player.setVelocityX(-110);
                animation='walk';
                this.player.flipX=true;
            })
            this.controls.left.on('pointerup', ()=>{
                this.player.setVelocityX(0);
                animation='idle';
            })
            this.controls.left.on('pointerleave', ()=>{
                this.player.setVelocityX(0);
                animation='idle';
            })
            //Right Button
            this.controls.right.on('pointerdown', ()=>{
                this.player.setVelocityX(110);
                animation='walk';
                this.player.flipX=false;
            })
            this.controls.right.on('pointerup', ()=>{
                this.player.setVelocityX(0);
                animation='idle';
            })
            this.controls.right.on('pointerleave', ()=>{
                this.player.setVelocityX(0);
                animation='idle';
            })
            //Up Button
            this.controls.up.on('pointerdown', ()=>{
                this.player.setVelocityY(-110);
                animation='walk';
                this.player.flipX=true;
            })
            this.controls.up.on('pointerup', ()=>{
                this.player.setVelocityY(0);
                animation='idle';
            })
            this.controls.up.on('pointerleave', ()=>{
                this.player.setVelocityY(0);
                animation='idle';
            })
            //Down Button
            this.controls.down.on('pointerdown', ()=>{
                this.player.setVelocityY(110);
                animation='walk';
                this.player.flipX=true;
            })
            this.controls.down.on('pointerup', ()=>{
                this.player.setVelocityY(0);
                animation='idle';
            })
            this.controls.down.on('pointerleave', ()=>{
                this.player.setVelocityY(0);
                animation='idle';
            })
        }
        
    }

    
}

