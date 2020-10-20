var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage;
var obstacle1;
var obstacle2;
var obstacle3;
var obstacle4;
var obstacle5;
var obstacle6;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var cloudGroup, obstacleGroup;
var gameOver, gameOverImage;
var restart, restartImage;
function preload(){
  trex_running =  loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  cloudImage = loadImage("cloud.png");
  groundImage = loadImage("ground2.png")
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trex_collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  score = 0;
  
  cloudGroup  = new Group();
  obstacleGroup = new Group();
  
  gameOver = createSprite(300, 100, 20, 20);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.6;
  
  restart = createSprite(300,130, 20, 20);
  restart.addImage(restartImage);
  restart.scale = 0.5
}

function draw() {
  background("white");
  
  
  text("score: " + score, 490, 80);
  
  if(gameState === PLAY){
   score = score+ Math.round (getFrameRate()/60); 
ground.velocityX = -2;
  restart.visible = false;
    gameOver.visible = false;
    
    
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  
  spawnObstacles();
  spawnClouds();
    
    if(trex.isTouching(obstacleGroup)){
      gameState= END;
    }
   
  }
  else if(gameState === END){
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(-1);
    trex.changeAnimation("trex_collided", trex_collided);
    score = 0;
    restart.visible = true;
    gameOver.visible = true;
    
    
  }
  if(mousePressedOver(restart)){
    reset();
      
    }
  drawSprites();
  trex.collide(invisibleGround);
}
  


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 220;
    cloudGroup.add(cloud);

    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}


function spawnObstacles(){
  if(frameCount % 120 === 0 ){
    var obstacle = createSprite(600, 160, 20, 20);
    var rand = Math.round(random(1, 6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
        break;
        case 2: obstacle.addImage(obstacle2);
        break;
        case 3: obstacle.addImage(obstacle3);
        break;
        case 4: obstacle.addImage(obstacle4);
        break;
        case 5: obstacle.addImage(obstacle5);
        break;
        case 6: obstacle.addImage(obstacle6);
        break;
        default: break;
        
    }
    obstacle.scale = 0.6
    obstacle.velocityX = -2;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
    
  }
}

function reset(){
  gameState = PLAY;
  restart.visible = false;
  gameOver.visible = false;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("running", trex_running);
}


