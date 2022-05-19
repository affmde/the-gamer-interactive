class Shop extends Phaser.Scene{
    constructor(){
        super({key: 'Shop'})
    }

    preload(){
        this.load.image('bg', 'assets/shop.png');
        this.load.image('stone', 'assets/items/stone.png');
        this.load.image('coin', 'assets/items/coin.png');
        this.load.image('water', 'assets/items/water.png');
        this.load.image('meat', 'assets/items/meat.png');
        this.load.image('herbs', 'assets/items/herbs.png');
        this.load.image('wood', 'assets/items/wood.png');
    }

    create(){
        let showMessage=false
        const bg= this.add.image(0,0,'bg').setOrigin(0)
        const rect= this.add.rectangle(w*0.125,h*0.125,w*0.75,h*0.75, 0x000000).setAlpha(0.5).setOrigin(0);
        const backtxt= this.add.text(w*0.8125, h*0.9375, 'Leave shop', {fontSize: 30*0.5625}).setOrigin(0.5).setInteractive().on('pointerup',()=>{
            currentScene='Level2'
            this.scene.stop();
            this.scene.resume('Level2')
        })
        
        //maxHp buy
        const buyHp= this.add.text(w*0.5, h*0.2, 'Max Hp +5', {fontSize: 28*0.5625}).setOrigin(0.5);
        const costHp= this.add.text(w*0.5, h*0.2625, ' This will cost you: ', {fontSize: 18*0.5625}).setOrigin(0.5)
        const hpItems=['wood', 'meat', 'stone']
        hpItems.forEach((item, i)=>{
            this.add.image(w*0.4375+(i*w*0.075), h*0.3125, item).setScale(0.5*0.5625).setOrigin(0.5)
        })
        const hpCosts=[100,50,40]
        hpCosts.forEach((item, i)=>{
            this.add.text(w*0.4375+(w*0.075*i), h*0.3375, `x${item}`).setOrigin(0.5)
        })
        const btnBg= this.add.rectangle(w*0.5, h*0.4, w*0.125, h*0.0375, 0x7FFF00).setInteractive().setOrigin(0.5)
        const buyBtn= this.add.text(w*0.5, h*0.4, 'Buy', {fontSize: 30*0.5625}).setOrigin(0.5)

        btnBg.on('pointerup', ()=>{
            if(playerStats.items.wood-100>0 && playerStats.items.meat-50>0 && playerStats.items.stone-40>0){
                playerStats.items.wood-=100;
                playerStats.items.meat-=50;
                playerStats.items.stone-=40;
                playerStats.maxHp+=5
                const rect2=this.add.rectangle(w*0.5,h*0.5, w*0.5,h*0.25, 0xffffff).setOrigin(0.5).setInteractive();
                const txtMessage= this.add.text(w*0.50625,h*0.50625, 'Bought completed!', {fontSize: 20*0.5625, color:'black', wordWrap: { width: w*0.5, useAdvancedWrap: true }}).setOrigin(0.5)
                const okTxt= this.add.text(w*0.625, rect2.y+h*0.0625, 'Ok', {fontSize: 30*0.5625, color: 'black'}).setInteractive().setOrigin(0.5)
                okTxt.on('pointerup', ()=>{
                    rect2.destroy();
                    txtMessage.destroy();
                    okTxt.destroy();
                })
            }else{
                console.log('no money my friend')
                console.log(playerStats)
                const rect2=this.add.rectangle(w*0.5,h*0.5, w*0.5,h*0.25, 0xffffff).setOrigin(0.5).setInteractive();
                const txtMessage= this.add.text(w*0.50625,h*0.50625, 'You have no enough resources to buy Max Hp right now. Come Later!', {fontSize: 20*0.5625, color:'black', wordWrap: { width: w*0.5, useAdvancedWrap: true }}).setOrigin(0.5)
                const okTxt= this.add.text(w*0.625, rect2.y+h*0.0625, 'Ok', {fontSize: 30*0.5625, color: 'black'}).setInteractive().setOrigin(0.5)
                okTxt.on('pointerup', ()=>{
                    rect2.destroy();
                    txtMessage.destroy();
                    okTxt.destroy();
                })
            }
        })

        //attackBase buy
        const buyAttackBase= this.add.text(w*0.5, h*0.6, 'Increase Attack Base + 5', {fontSize: 28*0.5625}).setOrigin(0.5);
        const costAttackBase= this.add.text(w*0.5, h*0.6625, ' This will cost you: ', {fontSize: 18*0.5625}).setOrigin(0.5)
        const attackBaseItems=[ 'meat', 'stone', 'coin', 'wood']
        attackBaseItems.forEach((item, i)=>{
            this.add.image(w*0.3625+(i*w*0.075), h*0.7125, item).setScale(0.5*0.5625).setOrigin(0)
        })
        const attackBaseCosts=[50,250,50,70]
        attackBaseCosts.forEach((item, i)=>{
            this.add.text(w*0.3625+(w*0.075*i), h*0.75, `x${item}`).setOrigin(0)
        })
        const btnBg2= this.add.rectangle(w*0.5,h*0.8, w*0.125, h*0.0375, 0x7FFF00).setInteractive().setOrigin(0.5)
        const buyBtn2= this.add.text(w*0.5, h*0.8, 'Buy', {fontSize: 30*0.5625}).setOrigin(0.5)

        btnBg2.on('pointerup', ()=>{
            if(playerStats.items.skin-100>0 && playerStats.items.meat-50>0 && playerStats.items.stone-250>0 && playerStats.money-50>0 && playerStats.items.wood-70>0){
                playerStats.items.wood-=70;
                playerStats.items.meat-=50;
                playerStats.items.stone-=250;
                playerStats.money-=50;
                playerStats.attackBase+=5
                const rect2=this.add.rectangle(w*0.5,h*0.5, w*0.5,h*0.25, 0xffffff).setOrigin(0.5).setInteractive();
                const txtMessage= this.add.text(w*0.50625,h*0.50625, 'Bought completed!', {fontSize: 20*0.5625, color:'black', wordWrap: { width: w*0.5, useAdvancedWrap: true }}).setOrigin(0.5)
                const okTxt= this.add.text(w*0.625, rect2.y+h*0.0625, 'Ok', {fontSize: 30*0.5625, color: 'black'}).setInteractive().setOrigin(0.5)
                okTxt.on('pointerup', ()=>{
                    rect2.destroy();
                    txtMessage.destroy();
                    okTxt.destroy();
                })
            }else{
                console.log('no money my friend')
                console.log(playerStats)
                const rect2=this.add.rectangle(w*0.5,h*0.5, w*0.5,h*0.25, 0xffffff).setOrigin(0.5).setInteractive();
                const txtMessage= this.add.text(w*0.50625,h*0.50625, 'You have no enough resources to buy Attack Base right now. Come Later!', {fontSize: 20*0.5625, color:'black', wordWrap: { width: w*0.5, useAdvancedWrap: true }}).setOrigin(0.5)
                const okTxt= this.add.text(w*0.625, rect2.y+h*0.0625, 'Ok', {fontSize: 30*0.5625, color: 'black'}).setInteractive().setOrigin(0.5)
                okTxt.on('pointerup', ()=>{
                    rect2.destroy();
                    txtMessage.destroy();
                    okTxt.destroy();
                })
            }
        })
        
        
    }

    update(){

    }
}