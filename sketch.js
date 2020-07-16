var monkey, monkeyanimation;
var ground, groundImage;
var PLAY=1,gameState = PLAY;
var bananagroup, bananaimage;
var rockgroup, rockimage;
var score;
var bg,bgimage;

function preload(){
  monkeyanimation = loadImage("Monkey_01.png","Monkey_02.png","Monkey_03.png");
  bgimage = loadImage("jungle.jpg");
  
    groundImage = loadImage("ground.png");
  
  bananaimage = loadImage("Banana.png");
  
  rockimage = loadImage("stone.png");
}

function setup() {
  createCanvas(600, 200);
  
  bg = createSprite(300,100,600,200)
  bg.addImage(bgimage);
  bg.scale = 0.6; 
  monkey = createSprite(50,180,20,50);
  monkey.addImage(monkeyanimation);
  monkey.scale = 0.05;

  


  
  ground = createSprite(0,180,600,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /1;
  ground.velocityX = -4;
  ground.scale = 0.4;
  
  monkey.debug = true;

  
  bananagroup = new Group();
  rockgroup = new Group();
  
  score = 0;
}

function draw() {
 text("Score: "+ score, 500,50);
  
  if(gameState===PLAY){
  if(monkey.isTouching(bananagroup)){
bananagroup.destroyEach();
  score = score+1;
    monkey.scale = monkey.scale+0.1;
  }
  if(keyDown("space")&&monkey.y>=150){
    monkey.velocityY = -14 ;
  }
    monkey.velocityY = monkey.velocityY + 0.8
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
    spawnbanana();
  spawnrocks();
  if(monkey.isTouching(rockgroup)){
  monkey.scale = 0.2;
  }
  }
  

  
bananagroup.x = rockgroup.x;

  monkey.collide(ground);

  
  drawSprites();
}

function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var Banana = createSprite(600,120,40,10);
    Banana.y = Math.round(random(80,120));
    Banana.addImage(bananaimage);
    Banana.scale = 0.05;
    Banana.velocityX = -4;
    
    Banana.debug = true;
    
     //assign lifetime to the variable
    Banana.lifetime = 200;
    
    //adjust the depth
    Banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;

    
    
    //add each cloud to the group
    bananagroup.add(Banana);
  }
  
}

function spawnrocks() {
  if(frameCount % 60 === 0) {
    var rock = createSprite(600,165,10,40);
    rock.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    

    
    rock.addImage(rockimage);
    
    rock.debug = true;
    
    //assign scale and lifetime to the obstacle           
    rock.scale = 0.1;
    rock.lifetime = 300;
    //add each obstacle to the group
    rockgroup.add(rock);
    rock.depth = monkey.depth
    monkey.depth = monkey.depth + 1;

  }
}

function reset(){
gameState = PLAY;
rockgroup.destroyEach();
bananagroup.destroyEach();
  score = 0;
  ground.velocityX = -4;
}