const saveDiv = document.getElementById('saveDiv')
let over=false;

function preload(){
    this.load.image('basket', 'media/basket2.png');
    this.load.image('platform', "media/platform.png");
    this.load.image('apple', "media/green-apple.png");
    this.load.image('orange', "media/orange.png");
    this.load.image('bomb', "media/bombVertical.png");
    this.load.image('banana', "media/banana.png");
    this.load.image('bg', "media/background.png");
    this.load.image('leftArrow', "media/leftArrow.png");
    this.load.image('rightArrow', "media/rightArrow.png");
}

const gameState = {};
gameState.is_holding={
    left: false,
    right: false,
    direction: false
}

function create(){

    gameState.stats={
        score: 0,
        time: 0,
        over: false,
        apples: 0,
        oranges: 0,
        bananas: 0
    }

    this.add.image(0,0, 'bg').setOrigin(0,0)
    gameState.basket= this.physics.add.sprite(200, 480, 'basket').setOrigin(0, 0).setScale(1);
    gameState.basket.setColliderWorldBounds = true;

    gameState.platform = this.physics.add.staticGroup();
    gameState.platform.create(400, 615, 'platform');

    gameState.cursors = this.input.keyboard.createCursorKeys();
    //Footer 
    this.add.image(220, 600, 'apple')
    gameState.appleCountText= this.add.text(240, 600, 'x0', {fontSize: 20})
    this.add.image(320, 600, 'orange')
    gameState.orangeCountText= this.add.text(340, 600, 'x0', {fontSize: 20})
    this.add.image(420, 600, 'banana')
    gameState.bananaCountText= this.add.text(440, 600, 'x0', {fontSize: 20})
    //Arrows
    this.add.image(55, 600, 'leftArrow');
    this.add.image(745, 600, 'rightArrow');

    gameState.apples=this.physics.add.group();
    gameState.oranges= this.physics.add.group();
    gameState.bananas= this.physics.add.group();
    gameState.bombs= this.physics.add.group();
    
    
    function generateApples(){
        const randomX = Math.random()*800;
        gameState.apples.create(randomX, 0, 'apple');
    }
    function generateOranges(){
        const randomX = Math.random()*800;
        gameState.oranges.create(randomX, 0, 'orange');
    }
    function generateBananas(){
        const randomX = Math.random()*800;
        gameState.bananas.create(randomX, 0, 'banana');
    }
    function generateBombs(){
        const randomX = Math.random()*800;
        gameState.bombs.create(randomX, 0, 'bomb');
    }
    function difficulty(){
        const rand= Math.floor(Math.random()*100)
        if(gameState.stats.time<7){
            if(rand<80){
                generateFruit()
            }else{
                generateBombs()
            }
        }else if(gameState.stats.time<15){
            if(rand<70){
                generateFruit()
            }else{
                generateBombs()
            }
        }else if(gameState.stats.time<30){
            if(rand<55){
                generateFruit()
            }else{
                generateBombs()
            }
        }else if(gameState.stats.time<45){
            if(rand<30){
                generateFruit()
            }else{
                generateBombs()
            }
        }else{
            if(rand<10){
                generateFruit()
            }else{
                generateBombs()
            }
        }
        
    }
    function generateFruit(){

        const rand = Math.floor(Math.random()*100)
            if(rand<50){
                generateApples()
            }else if(rand>=50 && rand<75){
                generateBananas()
            }else{
                generateOranges()
            }
        
    }
    
    //Texts

    gameState.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '30px', fill: '#000000' })
    gameState.timeText = this.add.text(600, 16, 'Time: 0', { fontSize: '30px', fill: '#000000' }) 

    //collisions

    this.physics.add.collider(gameState.basket, gameState.platform);

    this.physics.add.collider(gameState.apples, gameState.platform, function(a){
        a.destroy();
    }, null, this);
    this.physics.add.collider(gameState.oranges, gameState.platform, function(a){
        a.destroy();
    }, null, this);
    this.physics.add.collider(gameState.bananas, gameState.platform, function(a){
        a.destroy();
    }, null, this);
    this.physics.add.collider(gameState.bombs, gameState.platform, function(a){
        a.destroy();
    }, null, this);

    this.physics.add.collider(gameState.apples, gameState.basket, destroyFruit, null, this)
    this.physics.add.collider(gameState.oranges, gameState.basket, destroyFruit, null, this)
    this.physics.add.collider(gameState.bombs, gameState.basket, function(){
        localStorage.setItem('fpScore', gameState.stats.score)
        localStorage.setItem('fpTime', gameState.stats.time)
        fruitsLoop.destroy()
        this.physics.pause();
        gameState.overText = this.add.text(250, 250, 'Game Over!', { fontSize: '35px', fill: '#000000' })
        gameState.bombedText = this.add.text(250, 300, 'Play again!', { fontSize: '35px', fill: '#000000' })
        gameState.homeText = this.add.text(250, 350, 'Home', { fontSize: '35px', fill: '#000000' })
        gameState.stats.over = true;
        over=true
        gameState.bombedText.setInteractive();
        gameState.homeText.setInteractive();
        
        gameState.bombedText.on('pointerup', ()=>{
            gameState.stats.score=0;
            gameState.stats.time=0;
            over=false
            timer= setInterval(()=>{
                gameState.stats.time ++
            },1000)
            this.scene.restart()
        })

        gameState.homeText.on('pointerup', ()=>{
            window.location.href = "index.html";
        })
        

    }, null, this)
    this.physics.add.collider(gameState.bananas, gameState.basket, destroyFruit, null, this)

    
    //Time event

    const fruitsLoop = this.time.addEvent({
        callback: difficulty,
        delay: 100,
        callbackScope: this,
        loop: true,
    })

    //Mobile Controllers

    const zone_left = this.add.zone(0,0,0.45 *800,650);
    zone_left.setOrigin(0,0);
    zone_left.setDepth(1);

    const zone_right = this.add.zone(800,0,0.45 *800,650);
    zone_right.setOrigin(1,0);
    zone_right.setDepth(1);
    
    zone_left.setInteractive();
    zone_left.on('pointerdown', holdLeft, this)
    zone_left.on('pointerup', releaseLeft, this )
    zone_left.on('pointerout', releaseLeft, this )

    zone_right.setInteractive();
    zone_right.on('pointerdown',holdRight, this);
    zone_right.on('pointerup', releaseRight, this);
    zone_right.on('pointerout', releaseRight, this);
    
    
}

const holdLeft=()=>{
    if(over)return;
    gameState.is_holding.left=true;
    gameState.is_holding.direction= 'left'
}
const holdRight=()=>{
    if(over)return;
    gameState.is_holding.right=true;
    gameState.is_holding.direction= 'right'
}
const releaseLeft = () => {
    gameState.is_holding.left=false;

    if(gameState.is_holding.right){
        gameState.is_holding.direction='right'
    }else{
        gameState.is_holding.direction=false;
    }
}
const releaseRight = () => {
    gameState.is_holding.right=false;

    if(gameState.is_holding.left){
        gameState.is_holding.direction='left'
    }else{
        gameState.is_holding.direction=false;
    }
}

function destroyFruit(basket, fruit){
    const fruitType = fruit.texture.key;
    fruit.destroy();
    //control score
    if(fruitType==='orange'){
        gameState.stats.score +=10;
        gameState.stats.oranges++
    }else if(fruitType==='apple'){
        gameState.stats.score +=5;
        gameState.stats.apples++
    }else if(fruitType==='banana'){
        gameState.stats.score +=25;
        gameState.stats.bananas++
    }else{
        gameState.stats.score =0;
    }
    gameState.scoreText.setText(`Score: ${gameState.stats.score}`)
}



function update(){
    if(over===false){
        saveDiv.style.display='none'
    }else{
        saveDiv.style.display='inline-block'
    }

    gameState.appleCountText.setText(`x${gameState.stats.apples}`)
    gameState.orangeCountText.setText(`x${gameState.stats.oranges}`)
    gameState.bananaCountText.setText(`x${gameState.stats.bananas}`)

    if(gameState.cursors.left.isDown){
        if(gameState.stats.over){
            gameState.basket.x += 0;
        }else if(gameState.basket.x>0){
            gameState.basket.x -= 5;
        }else{
            gameState.basket.x =0
        }
    }else if(gameState.cursors.right.isDown){
        if(gameState.stats.over){
            gameState.basket.x += 0;
        }else if(gameState.basket.x<750){
            gameState.basket.x += 5;
        }else{
            gameState.basket.x = 750;
        }
    }else{
        null
    }


    //Mobile move player
    if(gameState.is_holding.direction==='left'){
        if(gameState.stats.over){
            gameState.basket.x += 0;
        }else if(gameState.basket.x>0){
            gameState.basket.x -= 5;
        }else{
            gameState.basket.x =0
        }
    }else if(gameState.is_holding.direction==='right'){
        if(gameState.stats.over){
            gameState.basket.x += 0;
        }else if(gameState.basket.x<750){
            gameState.basket.x += 5;
        }else{
            gameState.basket.x = 750;
        }
    }else{
        return
    }
    
    gameState.timeText.setText(`Time: ${gameState.stats.time}`)

    if(gameState.stats.over===true){
        clearInterval(timer);
    }
}

let timer= setInterval(()=>{
    gameState.stats.time ++
},1000)



const config={
    type: Phaser.AUTO,
    parent: 'game',
    scale: {
        mode: Phaser.Scale.FIT,
        width: 800,
        height: 650,
    },
    backgroundColor: "b9eaff",
    physics:{
        default: 'arcade',
        arcade: {
            gravity:{
                y: 160
            },
            //debug: true,
        }
    },
    scene:{
        preload,
        create,
        update
    },
}


const game = new Phaser.Game(config);

const saveBtn = document.getElementById('save-btn')
const username= document.getElementById('username')
const messageDiv = document.getElementById('messageDiv');

const saveScoreFP =async ()=>{
    const score= parseInt(localStorage.getItem('fpScore'));
    const time= parseInt(localStorage.getItem('fpTime'));
    
    const response = await fetch('/postFoodPaketiScore', {
        method: 'POST',
        headers:{
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        },
        body:JSON.stringify({
            username: username.value,
            score: score,
            time: time,
        })
    });
    const res = await response.json()
    localStorage.removeItem('fpScore')
    over=false;
    messageDiv.style.display='block';
    setTimeout(()=>{
        messageDiv.style.display='none'
    }, 2000)
}


saveBtn.addEventListener('click', saveScoreFP)


