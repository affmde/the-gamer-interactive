class PauseMenu extends Phaser.Scene{
    constructor(){
        super({key: 'PauseMenu'})
    }

    preload(){
        this.load.image('stone', 'assets/items/stone.png');
        this.load.image('coin', 'assets/items/coin.png');
        this.load.image('water', 'assets/items/water.png');
        this.load.image('meat', 'assets/items/meat.png');
        this.load.image('herbs', 'assets/items/herbs.png');
        this.load.image('wood', 'assets/items/wood.png');
    }

    create(){
        const rectangle= this.add.rectangle(w*0.5,0,w*0.5,h, 0xffffff).setScrollFactor(0).setOrigin(0)
        const title= this.add.text(w*0.75, h*0.125, 'Menu', {fontSize: 38*0.5625, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
        const resume= this.add.text(w*0.75, h*0.9375, 'Resume', {color: 'black'}).setOrigin(0.5).setScrollFactor(0).setInteractive()
        resume.on('pointerdown', ()=>{
            console.log('close detected')
            this.scene.stop();
            this.scene.resume('Level2')
        })
        const stats= this.add.text(w*0.75, h*0.2875, 'Stats', {color: 'black'}).setOrigin(0.5).setScrollFactor(0).setInteractive();
        const items= this.add.text(w*0.75, h*0.35, 'Items', {color: 'black'}).setOrigin(0.5).setScrollFactor(0).setInteractive();
        const save= this.add.text(w*0.75, h*0.4125, 'Save', {color: 'black'}).setOrigin(0.5).setScrollFactor(0).setInteractive();
        this.showMenu={
            stats:false,
            items:false,
            save: false
        }
        stats.on('pointerup', ()=>{
            this.showMenu={
                stats:true,
                items:false,
                save: false
            }
        })
        items.on('pointerup', ()=>{
            this.showMenu={
                stats:false,
                items:true,
                save: false
            }
        })
        save.on('pointerup', ()=>{
            this.showMenu={
                stats:false,
                items:false,
                save: true
            }
            this.saveGame()
        })
    }

    update(){
        if(this.showMenu.stats){
            const rectangle= this.add.rectangle(0,0,w*0.5,h, 0xffffff).setScrollFactor(0).setOrigin(0);
            const statsText= this.add.text(w*0.25, h*0.125, 'Stats', {fontSize: 30*0.5625, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
            const levelText= this.add.text(w*0.25, h*0.3125, `Level: ${playerStats.level}`, {fontSize: 25*0.5625, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
            const hpText= this.add.text(w*0.25, h*0.375, `Hp: ${playerStats.hp}`, {fontSize: 25*0.5625, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
            const maxHpText= this.add.text(w*0.25, h*0.4375, `Max Hp: ${playerStats.maxHp}`, {fontSize: 25*0.5625, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
            const moneyText= this.add.text(w*0.25, h*0.5, `Money: ${playerStats.money}€`, {fontSize: 25*0.5625, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
            const xpText= this.add.text(w*0.25, h*0.5625, `XP: ${playerStats.xp}`, {fontSize: 25*0.5625, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
        }else if(this.showMenu.items){
            const rectangle= this.add.rectangle(0,0,w*0.5,h, 0xffffff).setScrollFactor(0).setOrigin(0);
            const itemsText= this.add.text(w*0.25, h*0.125, 'Items', {fontSize: 30*0.5625, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
            const wood= this.add.image(w*0.25,h*0.25,'wood').setOrigin(0.5).setScrollFactor(0.5).setScale(1*0.5625)
            const woodValue= this.add.text(w*0.375, h*0.25, `x${playerStats.items.wood}`, {fontSize: 25*0.5625, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
            const water= this.add.image(w*0.25,h*0.375,'water').setOrigin(0.5).setScrollFactor(0.5).setScale(1*0.5625)
            const waterValue= this.add.text(w*0.375, h*0.375, `x${playerStats.items.water}`, {fontSize: 25*0.5625, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
            const meat= this.add.image(w*0.25,h*0.5,'meat').setOrigin(0.5).setScrollFactor(0.5).setScale(1*0.5625)
            const meatValue= this.add.text(w*0.375, h*0.5, `x${playerStats.items.meat}`, {fontSize: 25*0.5625, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
            const stone= this.add.image(w*0.25,h*0.625,'stone').setOrigin(0.5).setScrollFactor(0.5).setScale(1*0.5625)
            const stoneValue= this.add.text(w*0.375, h*0.625, `x${playerStats.items.stone}`, {fontSize: 25*0.5625, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
            const herbs= this.add.image(w*0.25,h*0.75,'herbs').setOrigin(0.5).setScrollFactor(0.5).setScale(1*0.5625)
            const herbsValue= this.add.text(w*0.375, h*0.75, `x${playerStats.items.herbs}`, {fontSize: 25*0.5625, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
        }else if(this.showMenu.save){
            const rectangle= this.add.rectangle(0,0,w/0.5,h, 0xffffff).setScrollFactor(0).setOrigin(0);
            const saveText= this.add.text(w*0.25, h*0.125, 'Save', {fontSize: 30*0.5625, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
            const savingText= this.add.text(w*0.25, h*0.5, 'Save completed', {fontSize: 25*0.5625, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
        }
    }

    saveGame(){
        const saveFile={
            player: playerStats,
            x: playerPosition.x,
            y: playerPosition.y,
            defeatedOpponents: defeatedOpponents,
            oppenedBaus: oppenedBaus,
            defeatedGyms: defeatedGyms,
            
        }
        localStorage.setItem('monsterThatSaveGame', JSON.stringify(saveFile));
        console.log('Game Saved')
    }
    
}