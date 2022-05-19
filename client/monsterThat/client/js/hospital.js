class Hospital extends Phaser.Scene{
    constructor(){
        super({key: 'Hospital'})
    }

    preload(){
        this.load.image('hospitalbg', 'assets/hospitalBg2.png')
    }

    create(){
        const cost= 10+playerStats.level*3;
        this.add.image(0,0,'hospitalbg').setOrigin(0);
        this.add.text(w*0.025, h*0.125, 'Do you want our recovering services?', {fontSize: 25*0.5625});
        this.add.text(w*0.025, h*0.1875, `It will cost you ${cost}€`, {fontSize :25*0.5625})

        const ansA= this.add.text(w*0.1,h*0.375, 'Yes', {fontSize: 25*0.5625} ).setInteractive();
        const ansB= this.add.text(w*0.325,h*0.375, 'No', {fontSize: 25*0.5625} ).setInteractive();

        ansA.on('pointerdown', ()=>{
            playerStats.money-=cost;
            playerStats.hp=playerStats.maxHp;
            currentScene='Level2';
            setTimeout(()=>{
                this.scene.stop()
                this.scene.resume('Level2')
            },1000)
        })

        ansB.on('pointerdown', ()=>{
            currentScene='Level2';
            this.scene.resume('Level2')
            this.scene.stop();
        })
    }

    update(){

    }
}