let timeEventText =undefined;

class DialogBox extends Phaser.GameObjects.Container{
    constructor(scene, text,launchScene, pauseScene, stopScene){
        super(scene)
        this.scene=scene;

        const rectangle= this.scene.add.rectangle(w*0.03, h*0.75, w*0.88, h*0.19, 0xFFFFFF)
            .setOrigin(0)
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(5);
        this.txt= this.scene.add.text(w*0.04, h*0.78, this.typewrite(text), {fontSize: 25*0.5625, color: 'black', wordWrap: { width: 680, useAdvancedWrap: true }})
            .setScrollFactor(0)
            .setOrigin(0)
            .setDepth(5);
        rectangle.on('pointerdown', ()=>{
            if(timeEventText!== undefined){
                
                this.txt.destroy();
                timeEventText.remove(false)
                timeEventText=undefined
                this.txt= this.scene.add.text(w*0.04, h*0.78, text, {fontSize: 25*0.5625, color: 'black', wordWrap: { width: 680, useAdvancedWrap: true }})
                    .setScrollFactor(0)
                    .setOrigin(0)
                    .setDepth(5);
            }else{
                rectangle.destroy();
                this.txt.destroy();
                
                if(pauseScene){
                    this.scene.scene.pause(pauseScene)
                    this.scene.scene.launch(launchScene)
                }else if(stopScene){
                    this.scene.scene.stop(stopScene);
                    this.scene.scene.start(launchScene)
                }
            }
            
        })
        
        
    }


    typewrite(text){
        const lenght= text.length;
        let i=0;

        timeEventText= this.scene.time.addEvent({
            callback: ()=>{
                this.txt.text+=text[i];
                i++
            },
            repeat:lenght-1,
            delay: 50
        })
    }
    


}