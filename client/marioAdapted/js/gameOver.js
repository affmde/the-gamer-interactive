class GameOver extends Phaser.Scene{
    constructor(){
        super({key: 'GameOver'})
    }

    preload(){

    }

    create(){
        this.levelText= this.add.text(w/2, h*0.2, 'Game Over!', {fontSize: 50}).setOrigin(0.5);
        this.textOver = this.add.text(w/2, h/2-h*0.1, `Level: ${gameStats.level}`, {fontSize:32}).setOrigin(0.5);
        this.textPoints = this.add.text(w/2, h/2, `Your Score: `, {fontSize: 32}).setOrigin(0.5);
        this.textScore = this.add.text(w/2, h/2+h*0.1, gameStats.score, {fontSize: 40}).setOrigin(0.5);
        this.playAgainText = this.add.text(w/2, h/2+h*0.2, 'Play again', {fontSize: 32}).setOrigin(0.5);
        this.playAgainText.setInteractive();
        this.playAgainText.on('pointerdown', ()=>{
            this.scene.stop();
            this.scene.start('GameScene')
            gameStats.lives= 3;
            gameStats.score=0;
            gameStats.level=1
        })
        this.homeText= this.add.text(w/2, h/2+h*0.3, 'Home', {fontSize: 32}).setOrigin(0.5);
        this.homeText.setInteractive()
        this.homeText.on('pointerdown', ()=>{
            window.location.href = "../index.html"
        })
    }

    update(){

    }
}