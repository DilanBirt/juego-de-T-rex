var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage;
var obstaclesGroup, obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var score;
var END=0;
var PLAY=1;
var gameState =PLAY;
var cloudsGroup;
var gameOverImg,restartImg
var a=[3,5,9,6,7,8];

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
 obstacle1=loadImage("obstacle1.png");
 obstacle2=loadImage("obstacle2.png");
 obstacle3=loadImage("obstacle3.png");
 obstacle4=loadImage("obstacle4.png");
 obstacle5=loadImage("obstacle5.png");
 obstacle6=loadImage("obstacle6.png");
 gameOverImg=loadImage("gameOver.png");
 restartImg=loadImage("restart.png");
}


function setup() {

  createCanvas(windowWitdth,windowHeight);

  
  //crear sprite de trex
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided", trex_collided);
  //crear sprite de suelo
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  //game over y restart//
gameOver= createSprite(300,100);
gameOver.addImage(gameOverImg);
gameOver.scale=2.0;
restart= createSprite(300,140);
restart.addImage(restartImg);
restart.scale=0.5;
//crear grupos de obstaculos
obstaclesGroup=createGroup();
cloudsGroup=createGroup()
 score=0;
  
 trex.setCollider("circle",0,0,40);
 trex.debug=false;

  //crear suelo invisible
  invisibleGround = createSprite(width/2,height-10,width,10);
  invisibleGround.visible = false;
  var rand=Math.round(random(1,100));
 console.log(rand);
}

function draw() {
  //establecer color de fondo
  background("black");
  text("puntuacion:"+score,500,50);

 console.log(a);
  console.log("este es", gameState);
 
if(gameState ===PLAY){
 gameOver.visible=false;
 restart.visible=false;

  //moviendo el suelo 
ground.velocityX=-(4+3* score/100);
//puntuacion
score=score + Math.round(getFrameRate()/60);
if((tounches.length > 0 || keyDown("space"))&&trex.y >= 100){
jumpSound.play();
trex.velocityY= -12;
tounches =[]

}

if (ground.x < 0){
  ground.x = ground.width/2;
}
//trex salte
if(keyDown("space")&& trex.y >= 100) {
  trex.velocityY = -10;
}

spawnClouds();
spawnObstacles();
if(obstaclesGroup.isTouching(trex)){

gameState=END;
}

}
if(gameState === END){
ground.velocityX=0;
trex.velocityY=0;
restart.visible=true;
gameOver.visible=true;
if(mousePressedOver(restart)){
  console.log("reinicia el juego");
  reset();
} 

//cambio de animacion//
trex.changeAnimation("collided", trex_collided);
//life time para que los juegos no se destruyan
obstaclesGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);

obstaclesGroup.setVelocityXEach(0);
cloudsGroup.setVelocityXEach(0);
}

//gravedad//
trex.velocityY=trex.velocityY+0.8;
//sEvita quel trex se caiga//
trex.collide(invisibleGround);




drawSprites();
  
}

 function reset(){
  gameState= PLAY;
  gameOver.visible=false;
  restart.visible=false;

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
trex.changeAnimation(trex_running);
score=0;

 }
function spawnClouds() {
  if(frameCount % 60==0){
cloud=createSprite(600,100,40,10);
cloud.addImage(cloudImage);
cloud.scale=0.4;
cloud.y=Math.round(random(10,60));
cloud.velocityX=-3;

cloud.lifetime=200;

 cloud.depth=trex.depth;
 trex.depth=trex.depth+1;
console.log(cloud.depth);
console.log(trex.depth);

cloudsGroup.add(cloud);

  }
}
function spawnObstacles(){
  if(frameCount % 60==0){
var obstacle = createSprite(400,165,10,40);
obstacle.velocityX=-6


// generar objetos al azar//
var rand =Math.round(random(1,6));
switch(rand){
  case 1: obstacle.addImage(obstacle1);
        break
        case 2: obstacle.addImage(obstacle2);
        break
        case 3: obstacle.addImage(obstacle3);
        break
        case 4: obstacle.addImage(obstacle4);
        break
        case 5: obstacle.addImage(obstacle5);
        break
        case 6: obstacle.addImage(obstacle6);
        break
        default: break;
}
obstacle.scale=0.5;
obstacle.lifetime=300;
//agregar el obstaculo al grupo//
obstaclesGroup.add(obstacle);

  }

}