const menu={
    intro: false,
    menu: true,
    attacks: false,
    item: false,
    resume: false,
    final: false,
}
let texts={};

let randExp;
let moneyReturn;
let victory;
let turn = 'player'
let player;
let opponent;
class Battle extends Phaser.Scene{
    constructor(){
        super({key: 'Battle'})
    }

    preload(){
        this.load.image(`${currentOponnent.fig}`, `assets/${currentOponnent.fig}.png`);
        this.load.image('player', 'assets/bandit.png');
        this.load.image('bg', 'assets/battleBg.png')
        this.load.image('gymBg', 'assets/gym/gymLeaderBg.png');
        this.load.image('bg2', 'assets/battlebg2.png');
    }

    create(){
        //Variables
        console.log(currentOponnent)
        moneyReturn= currentOponnent.moneyReturn;
        randExp= Math.floor(Math.random()*10)+50;
        //Background Image
        if(currentOponnent.type==='Trainer'){
            const bgImage= this.add.image(0,0,'bg').setOrigin(0);
        }else if(currentOponnent.type==="GymLeader"){
            this.add.image(0,0,'gymBg').setOrigin(0)
        }else if(currentOponnent.type==='Bug'){
            this.add.image(0,0, 'bg2').setOrigin(0)
        }
        
        //Opponent
        opponent= this.add.image(w*0.75,h*0.38 , `${currentOponnent.fig}`).setScale(4).setOrigin(0.5);
        texts.opponentName = this.add.text(w*0.75, h*0.25, currentOponnent.name, {fontSize: 28}).setOrigin(0.5)
        texts.opponentLevel = this.add.text(w*0.69, h*0.29, `Lvl: ${currentOponnent.level}`, {fontSize: 20}).setOrigin(0.5);
        this.actualHp=currentOponnent.hp;
        texts.opponentHp= this.add.text(w*0.85, h*0.29, `Hp: ${this.actualHp}/${currentOponnent.hp}`, {fontSize: 20}).setOrigin(0.5)

        //Player
        player= this.add.image(w*0.13, h*0.83, 'player').setScale(4).setOrigin(0.5);
        texts.playerName= this.add.text(w*0.13,h*0.63, 'Player 1', {fontSize: 28}). setOrigin(0.5);
        texts.playerLevel = this.add.text(h*0.13, h*0.7, `Lvl: ${playerStats.level}`, {fontSize: 20}).setOrigin(0.5)
        texts.playerHp= this.add.text(h*0.35, h*0.7, `Hp: ${playerStats.hp}`, {fontSize: 20}).setOrigin(0.5)
        
        //Camera
        this.cameras.main.fadeIn(1000);
    }

    update(){
        this.menuHandling();
        //Update HP texts
        texts.playerHp.setText(`Hp: ${playerStats.hp}`);
        texts.opponentHp.setText(`Hp: ${this.actualHp}/${currentOponnent.hp}`)
    }

    
        
    
    menuHandling(){
        //Menu
        if(menu){
            const playerRect = this.add.rectangle(w*0.25, h*0.625, w*0.375, h*0.15, 0xFFFFFF).setOrigin(0).setInteractive();
            if(menu.intro){
                
            }else if(menu.menu){
                const attackText = this.add.text(playerRect.x+w*0.025, h*0.65, 'Attacks', {fontSize: 20*0.5625, color: 'black'}).setInteractive();
                attackText.on('pointerdown',()=>{
                    menu.menu=false;
                    menu.attacks=true;
                })
                const itemText = this.add.text(playerRect.x+w*0.025, h*0.725, 'Item', {fontSize: 20*0.5625, color: 'black'}).setInteractive();
                const quitText = this.add.text(playerRect.x+w*0.25, h*0.6875, 'Quit', {fontSize: 20*0.5625, color: 'black'}).setInteractive();
                quitText.on('pointerdown', ()=>{
                    currentScene='Level2'
                    this.scene.stop();
                    this.scene.resume('Level2')
                })
            }else if(menu.attacks){
                if(turn==='player'){
                    //Player attacking turn
                    const attack1Damage= playerStats.attackBase+playerStats.level+Math.floor(Math.random()*playerStats.level)
                    const attack1= this.add.text(playerRect.x+w*0.03125, h*0.65, 'Tackle', {fontSize: 20*0.5625, color: 'black'}).setInteractive();
                    attack1.on('pointerdown', ()=>{
                        if(this.actualHp-attack1Damage<=0){
                            victory=true;
                            menu.attacks=false;
                            this.actualHp=0;
                            menu.resume=true;
                        }else{
                            this.actualHp-=attack1Damage
                        }
                        turn='next'
                        this.tweens.add({
                            targets:player,
                            x: opponent.x-w*0.125,
                            y: opponent.y+h*0.125,
                            ease: 'Linear',
                            duration:250 ,
                            repeat: 0,
                            yoyo: true,
                        })
                    })
                    const attack2 = this.add.text(playerRect.x+w*0.03125, h*0.725, 'Recover', {fontSize: 20*0.5625, color: 'black'}).setInteractive();
                    const attack2Recover=playerStats.recoverBase+playerStats.level+Math.floor(Math.random()*playerStats.level)
                    attack2.on('pointerdown', ()=>{
                        if(playerStats.hp+attack2Recover>=playerStats.maxHp){
                            victory=false
                            playerStats.hp=playerStats.maxHp
                        }else{
                            playerStats.hp+=attack2Recover;
                        }
                        turn='next'
                    })
                    const quitText = this.add.text(playerRect.x+w*0.25, h*0.6875, 'Back', {fontSize: 20*0.5625, color: 'black'}).setInteractive();
                    quitText.on('pointerdown', ()=>{
                        menu.attacks=false;
                        menu.menu=true
                    })
                }else if(turn==='opponent'){
                    //Opponent attacking turn
                    const attack1= this.add.text(playerRect.x+w*0.03125, h*0.65, 'Tackle', {fontSize: 20*0.5625, color: 'black'})
                    const attack2 = this.add.text(playerRect.x+w*0.03125, h*0.725, 'Recover', {fontSize: 20*0.5625, color: 'black'})
                    const quitText = this.add.text(playerRect.x+w*0.25, h*0.65, 'Back', {fontSize: 20*0.5625, color: 'black'})
                    const opponentDamage= this.handleOpponentDamage()
                    this.tweens.add({
                        targets:opponent,
                        x: player.x+w*0.125,
                        y: player.y-h*0.125,
                        ease: 'Linear',
                        duration:250 ,
                        repeat: 0,
                        yoyo: true,
                    })
                    
                    if(playerStats.hp-opponentDamage<=0){
                        //If player will die with attack
                        playerStats.hp=0
                        turn='player'
                        menu.attacks=false;
                        menu.final=true;
                        victory=false

                    }else{
                        //If attack doesnt kill the player
                        playerStats.hp-=opponentDamage;
                        turn='player'
                        menu.attacks=false;
                        menu.menu=true

                    }
                    
                }else{
                    playerRect.on('pointerdown', ()=>turn='opponent')
                }
                
            }else if(menu.resume){
                this.add.text(playerRect.x+w*0.03125, h*0.65, 'You won!', {fontSize: 20*0.5625, color: 'black'});
                this.add.text(playerRect.x+w*0.03125, h*0.675, `You got ${moneyReturn}€`, {fontSize: 20*0.5625, color: 'black'});
                this.add.text(playerRect.x+w*0.03125, h*0.7, `and ${randExp} xp`, {fontSize: 20*0.5625, color: 'black'});
                playerRect.on('pointerdown', ()=>{
                    menu.resume=false;
                    menu.final=true
                })
            }else if(menu.final){
                playerRect.on('pointerdown', ()=>{
                    if(victory){
                        if(currentOponnent.type==='Bug'){
                            handleItemsReward()
                        }else{
                            handleBattleReward(randExp, moneyReturn)
                        }
                        
                        if(currentOponnent.type==="Trainer"){
                            defeatedOpponents.push(currentOponnent.id);
                        }else if(currentOponnent.type==="GymLeader"){
                            defeatedGyms.push(currentOponnent.id)
                        }
                        menu.final=false;
                        menu.menu=true;
                        currentScene='Level2'
                        this.scene.stop();
                        this.scene.resume('Level2')
                        console.log('playerStats: ', playerStats)
                    }else{
                        handleBattleReward(randExp*0.2, 0-moneyReturn)
                        //playerStats.money-=moneyReturn;
                        //playerStats.xp+=randExp*0.2;
                        menu.final=false;
                        menu.menu=true;
                        currentScene='Hospital'
                        this.scene.stop();
                        //Add recover scene
                        this.scene.launch('RecoverScene')
                        console.log('playerStats: ', playerStats)
                    }
                    
                })
            }
        }
    }

    handleOpponentDamage(){
        let damage;
        if(currentOponnent.type==='GymLeader'){
            damage=currentOponnent.level+Math.floor(Math.random()*currentOponnent.level)+(Math.floor(Math.random()*5))
        }else if(currentOponnent.type==='Trainer'){
            damage=3+currentOponnent.level+Math.floor(Math.random()*currentOponnent.level)
        }else if(currentOponnent.type==='Bug'){
            damage=Math.floor(Math.random()*(currentOponnent.level+3))
        }
        return damage
    }
}