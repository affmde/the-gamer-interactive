class RewardBox extends Phaser.GameObjects.Container{
    constructor(scene,stoneKey, stone, meatKey, meat, waterKey, water, woodKey, wood, herbsKey, herbs, moneyKey, money ){
        super(scene)
        this.stoneKey=stoneKey;
        this.stone=stone;
        this.meatKey=meatKey;
        this.meat=meat;
        this.waterKey= waterKey;
        this.water= water;
        this.woodKey=woodKey;
        this.wood=wood;
        this.herbsKey=herbsKey;
        this.herbs= herbs;
        this.moneyKey= moneyKey;
        this.money= money

        const rectangle= this.scene.add.rectangle(w*0.36,h*0.38,w*0.38,h*0.55, 0xFFFFFF)
            .setOrigin(0)
            .setScrollFactor(0)
            .setInteractive()
        const title= this.scene.add.text(w*0.56, h*0.4, 'Your rewards', {fontSize: 25, color: 'black'})
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setInteractive()
        //Item keys
        const stoneImage= this.scene.add.image(w/2, h*0.47, this.stoneKey).setScrollFactor(0).setScale(0.5*0.5625).setOrigin(0.5);
        const meatImage= this.scene.add.image(w/2, h*0.47+h*0.08, this.meatKey).setScrollFactor(0).setScale(0.5*0.5625).setOrigin(0.5);
        const waterImage= this.scene.add.image(w/2, h*0.47+h*0.16, this.waterKey).setScrollFactor(0).setScale(0.5*0.5625).setOrigin(0.5);
        const woodImage= this.scene.add.image(w/2, h*0.47+h*0.24, this.woodKey).setScrollFactor(0).setScale(0.5*0.5625).setOrigin(0.5);
        const herbsImage= this.scene.add.image(w/2, h*0.47+h*0.32, this.herbsKey).setScrollFactor(0).setScale(0.5*0.5625).setOrigin(0.5);
        const moneyImage= this.scene.add.image(w/2, h*0.47+h*0.40, this.moneyKey).setScrollFactor(0).setScale(0.5*0.5625).setOrigin(0.5);

        //Item Values
        const stoneValue= this.scene.add.text(w*0.63, h*0.47, `x${this.stone}`, {fontSize: 25*0.5625, color: 'black'}).setScrollFactor(0).setOrigin(0.5);
        const meatValue= this.scene.add.text(w*0.63, h*0.47+h*0.08, `x${this.meat}`, {fontSize: 25*0.5625, color: 'black'}).setScrollFactor(0).setOrigin(0.5);
        const waterValue= this.scene.add.text(w*0.63, h*0.47+h*0.16, `x${this.water}`, {fontSize: 25*0.5625, color: 'black'}).setScrollFactor(0).setOrigin(0.5);
        const woodValue= this.scene.add.text(w*0.63, h*0.47+h*0.24, `x${this.wood}`, {fontSize: 25*0.5625, color: 'black'}).setScrollFactor(0).setOrigin(0.5);
        const herbsValue= this.scene.add.text(w*0.63, h*0.47+h*0.32, `x${this.herbs}`, {fontSize: 25*0.5625, color: 'black'}).setScrollFactor(0).setOrigin(0.5);
        const moneyValue= this.scene.add.text(w*0.63, h*0.47+h*0.40, `x${this.money}`, {fontSize: 25*0.5625, color: 'black'}).setScrollFactor(0).setOrigin(0.5);
        
        const closeBtn= this.scene.add.text(w*0.71, h*0.39, 'x', {fontSize: 20, color: 'red'})
            .setScrollFactor(0)
            .setInteractive()
            .on('pointerup', ()=>{
                currentScene="Level2"
                rectangle.destroy();
                title.destroy();
                stoneImage.destroy();
                meatImage.destroy();
                waterImage.destroy();
                woodImage.destroy();
                herbsImage.destroy();
                moneyImage.destroy();
                stoneValue.destroy();
                meatValue.destroy();
                waterValue.destroy();
                woodValue.destroy();
                herbsValue.destroy();
                moneyValue.destroy();
                closeBtn.destroy()
            })

    }
}