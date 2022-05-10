let h= window.innerHeight;
let w= window.innerWidth;
let device;
class StartScene extends Phaser.Scene{
    constructor(){
        super({key: 'StartScene'})
    }

    preload(){
        
    }

    create(){
        this.textOver = this.add.text(w/2, h/2, 'The Golem', {fontSize:40}).setOrigin(0.5);
        this.playAgainText = this.add.text(w/2, h/2+(h*0.1), 'Play', {fontSize: 32}).setOrigin(0.5);
        this.playAgainText.setInteractive();
        this.playAgainText.on('pointerdown', ()=>{
            this.scene.stop();
            this.scene.start('GameScene')
        })
        device=this.deviceType();
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

