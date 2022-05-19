class RecoverScene extends Phaser.Scene{
    constructor(){
        super({key: 'RecoverScene'})
    }

    preload(){
        this.load.image('hospitalBg', 'assets/hospitalBg.png');
    }

    create(){
        const cost = Math.floor(playerStats.money*(playerStats.level*0.2))
        if(cost<=0){
            this.add.image(0,0, 'hospitalBg').setOrigin(0)
            this.add.text(w*0.025,h*0.125, 'Game Over!', {fontSize: 28*0.5625});
            this.add.text(w*0.025,h*0.3125, 'You had no money to cover your recover', {fontSize: 25*0.5625})
            setTimeout(()=>{
                currentScene='Level2';
                localStorage.removeItem('monsterThatSaveGame')
                this.scene.stop();
                this.scene.stop('Level2')
                this.scene.start('StartScene')
            },3000)
        }else{
            this.add.image(0,0, 'hospitalBg').setOrigin(0)
            this.add.text(w*0.025,h*0.125, 'You were found inconscient in the street \r\n\and brought to the hospital', {fontSize: 28*0.5625});
            this.add.text(w*0.025,h*0.3125, `Your recover costed you: \r\n ${cost}€`, {fontSize: 25*0.5625})

            playerStats.money-=cost;
            playerStats.hp=playerStats.maxHp;
            setTimeout(()=>{
                currentScene='Level2'
                this.scene.stop();
                this.scene.resume('Level2')
            },3000)
        }
    }

    update(){

    }
}