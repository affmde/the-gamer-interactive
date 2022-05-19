class GymLeaderIntro extends Phaser.Scene{
    constructor(){
        super({key: 'GymLeaderIntro'})
    }

    preload(){
        this.load.image('leader', 'assets/leader1.png')
    }

    create(){
        const rectBg= this.add.rectangle(0,0,w,h, 0x000000).setOrigin(0);
        const leader= this.add.image(w*0.5, h*0.5, 'leader')
            .setOrigin(0.5)
            .setScale(5)
            .setInteractive()
        const dialog= new DialogBox(this, "Ohh I am surprised you are already here. Better you be prepared to loose!", "Battle",null,"GymLeaderIntro")
       /* leader.on('pointerdown',()=>{
            this.scene.start('Battle')
        })*/
    }

    update(){
        
    }
}