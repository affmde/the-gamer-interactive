let newGame=false;
let device;
class StartScene extends Phaser.Scene{
    constructor(){
        super({key: 'StartScene'})
    }

    preload(){

    }

    create(){
        const savedGame= localStorage.getItem('monsterThatSaveGame')
        const title= this.add.text(w/2, h*0.32, 'MonsterThat', {fontSize: 40}).setOrigin(0.5);
        savedGame && this.add.text(w/2, h*0.56, 'Continue saved Game', {fontSize: 25}).setOrigin(0.5).setInteractive().on('pointerdown', ()=>{
            newGame=false
            this.scene.stop();
            this.scene.start('Level2')
        });
        const newGameText= this.add.text(w/2, h*0.68, 'New game', {fontSize: 25}).setOrigin(0.5).setInteractive();
        newGameText.on('pointerdown', ()=>{
            newGame=true;
            this.scene.stop();
            this.scene.start('Level2')
        })
        device=this.deviceType()
    }

    update(){

    }

    deviceType = () => {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return "tablet";
        }
        else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return "mobile";
        }
        return "desktop";
    };
    
}
