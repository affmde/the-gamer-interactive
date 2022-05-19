let keyObj;
let isDown;
let cursors;
let animation='idle';
let allOpponents;
let saving=false;


function loadGame(){
    const load= localStorage.getItem('monsterThatSaveGame')
    const parsed= JSON.parse(load);
    if(parsed){
        console.log(parsed)
        return parsed
    }else{
        return 
    }
}
let playerStartingStats={
    player:{
        level: 1,
        money: 100,
        hp: 25,
        maxHp: 25,
        items:{
            stone: 0,
            meat: 0,
            water: 0,
            wood: 0,
            herbs: 0
        },
        xp: 0,
        attackBase: 4,
        recoverBase: 10
    }
    
}
const loadData= loadGame()!==undefined ? loadGame() : playerStartingStats;
console.log(loadData)

let currentOponnent={};
let currentHospital={};
let currentShop= {};


let playerStats={
    level: loadData.player.level || 1,
    money: loadData.player.money || 100,
    hp: loadData.player.hp || 25,
    maxHp: loadData.player.maxHp || 25,
    items:{
        stone: loadData.player.items.stone || 0,
        meat: loadData.player.items.meat || 0,
        water: loadData.player.items.water || 0,
        wood: loadData.player.items.wood || 0,
        herbs: loadData.player.items.herbs || 0
    },
    xp: loadData.player.xp || 0,
    attackBase: loadData.player.attackBase || 4,
    recoverBase: loadData.player.recoverBase || 10
}

const defeatedOpponents=loadData.defeatedOpponents || []
const oppenedBaus=loadData.oppenedBaus || [];
const defeatedGyms= loadData.defeatedGyms || []

class Level1 extends Phaser.Scene{
    constructor(){
        super({key: 'Level1'})
    }

    preload(){
        this.load.image('classicTileset', 'assets/ClassicRPG_SHEET.png');
        this.load.image('medievalTileset', 'assets/medieval_tilesheet.png');
        this.load.image('tilemap', 'assets/tilemap.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/map.json');
        this.load.atlas('bandit', 'assets/players/bandit.png', 'assets/players/bandit_atlas.json');
        this.load.animation('bandit_anim', 'assets/players/bandit_anim.json');
        this.load.image('ranger', 'assets/ranger.png');
    }

    create(){
        console.log(playerStats)
        //Tilemap creation
        const map = this.make.tilemap({ key: 'tilemap', tileWidth:16, tileHeight: 16 })
        const tileset = map.addTilesetImage('ClassicRPG_Sheet', 'classicTileset');
        const tileset2= map.addTilesetImage('tilemap', 'tilemap')
        map.createLayer('background', tileset);
        const forest= map.createLayer('forest', tileset);
        const sea= map.createLayer('sea', tileset);
        const grass= map.createLayer('grass', tileset);
        const ground= map.createLayer('ground', tileset);
        const buildings= map.createLayer('buildings', tileset2)
        //Player creation
        this.player=this.physics.add.sprite(loadData.x || 250,loadData.y || 250, 'bandit');
        this.player.setSize(16,16)
        this.player.setOffset(8,16)
        //Other trainers creation
        allOpponents= this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Characters').objects.forEach(trainer=>{
            const newTrainer = allOpponents.create(trainer.x, trainer.y, 'ranger');
            newTrainer.properties= trainer.properties;
            this.physics.add.collider(newTrainer, this.player, (opponent, player)=>{
                if(this.checkDefeatedTrainers(trainer.id)){
                    return
                }else{
                    this.saveGame()
                    currentOponnent=opponent.properties;
                    currentOponnent.id=trainer.id
                    player.setBounce(0.5)
                    this.scene.stop('Level1');
                    this.scene.start('Battle');
                    this.checkDefeatedTrainers(trainer.id)
                }
                
            })
        })
        forest.setCollisionByExclusion([0, -1]);
        sea.setCollisionByExclusion([0, -1]);
        buildings.setCollisionByExclusion([0, -1, 283]);
        this.physics.add.collider(this.player, forest)
        this.physics.add.collider(this.player, sea)
        this.physics.add.collider(this.player, buildings)

        //cursors
        cursors = this.input.keyboard.createCursorKeys();

        //cameras
        this.cameras.main.startFollow(this.player)
        this.cameras.main.setBounds(0,0, 800, 800);
        this.cameras.main.fadeIn(1000);

        //Save game
        keyObj = this.input.keyboard.addKey('S');  // Get key object
        isDown = keyObj.isDown;
        
    }

    update(){
        if(cursors.up.isDown){
            this.player.setVelocityY(-150)
            animation='walk'
        }else if(cursors.down.isDown){
            this.player.setVelocityY(150);
            animation='walk';
        }else{
            this.player.setVelocityY(0)
            animation='idle'
        }

        if(cursors.left.isDown){
            this.player.setVelocityX(-150);
            animation='walk';
            this.player.flipX=true;
        }else if(cursors.right.isDown){
            this.player.setVelocityX(150);
            this.player.flipX=false;
            animation='walk';
        }else{
            this.player.setVelocityX(0)
            animation='idle'
        }
        this.checkAnimation();
        if(keyObj.isDown){
            this.saveGame();  
        }

        playerStats.level=this.playerLevel()
        /*if(this.player.y<0){
            map.destroy();
            tileset.destroy();
            tileset2.destroy();
            this.scene.stop();
            this.scene.start('Level2')
        }*/
        
    }//end of Update

    checkAnimation(){
        if(animation==='idle'){
            this.player.anims.play('bandit_idle', true)
        }else if(animation==='walk'){
            this.player.anims.play('bandit_walk', true)
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

    saveGame(){
        const saveFile={
            player: playerStats,
            x: this.player.x,
            y: this.player.y,
            defeatedOpponents: defeatedOpponents
        }
        localStorage.setItem('monsterThatSaveGame', JSON.stringify(saveFile));
    }

    playerLevel(){
        if(playerStats.xp<1000){
            return 1
        }else if(playerStats.xp<2000){
            return 2
        }else if(playerStats.xp<3250){
            return 3
        }else if(playerStats.xp<5000){
            return 4
        }else if(playerStats.xp <7000){
            return 5
        }else if(playerStats.xp< 9000){
            return 6
        }else{
            return 7
        }
    }

}

const checkLevel = ()=>{
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

const handleBattleReward = (xp, money) =>{
    playerStats.xp+=xp;
    playerStats.money+=money
    const lvl=playerStats.level;
    playerStats.level=checkLevel()
    if(lvl<playerStats.level){
        playerStats.maxHp+=5+playerStats.level*2
    }
}

const handleItemsReward = () =>{
    const reward={
        wood: Math.floor(Math.random()*(playerStats.level+5)),
        meat: Math.floor(Math.random()*(playerStats.level+5)),
        stone: Math.floor(Math.random()*(playerStats.level+5)),
        water: Math.floor(Math.random()*(playerStats.level+5)),
        herbs: Math.floor(Math.random()*(playerStats.level+5)),
        money: Math.floor(Math.random()*(playerStats.level+100))
    }
    
    playerStats.items={
        stone: playerStats.items.stone+=reward.stone,
        meat: playerStats.items.stone+=reward.meat,
        water: playerStats.items.stone+=reward.water,
        wood: playerStats.items.stone+=reward.wood,
        herbs: playerStats.items.stone+=reward.herbs
    }

    return reward
}
