var END=0;
var PLAY=1;
var gamestate=PLAY
var score=0
function preload(){
groundImg=loadImage("roadside.png");
  boy1=loadAnimation("Geeky-1.png","Geeky-2.png");
  jumpboy=loadAnimation("Geeky-3.png"); 
  boy2=loadAnimation("Geeky-4.png");
  breadImg=loadImage("bread.png");
  butterImg=loadImage("butter.png");
  chilliflakes=loadImage("chilli flakes.png")
  chocolateImg=loadImage("chocolate.png");
  frostingImg=loadImage("frosting.png");
  gCheese=loadImage("grated cheese.png");
  gCapcicum=loadImage("greencapcicum.png");
  lettuceImg=loadImage("lettuce.png");
  mangoImg=loadImage("Mango.png");
  milkImg=loadImage("milk.png");
  mushroomImg=loadImage("mushroom.png");
  oliveImg=loadImage("olive.png");
  onionImg=loadImage("onion.png");
  oreganoImg=loadImage("oregano.jpg");
  paneerImg=loadImage("paneer.png");
  pizzaImg=loadImage("pizza.png");
  pizzabImg=loadImage("pizzabase.png");
  rpasta=loadImage("rawpasta.png");
  tsauce=loadImage("tomato sauce.png");
  gameoverimg=loadImage("gameover.jpg");
  restartimg=loadImage("restart.png")
}

function setup() {
 //canvas       
createCanvas(800,400);
//boy
boy=createSprite(20,340,10,10);
boy.addAnimation("Boy",boy1);
boy.addAnimation("BoyJump",jumpboy);
boy.addAnimation("endGame",boy2);
boy.scale=0.4
//ground
ground=createSprite(280,350,1000,10);
ground.addImage("Ground",groundImg);
ground.velocityX=-4
ground.x = ground.width /2;
//invisible ground
invisibleground=createSprite(280,380,600,10);
invisibleground.visible = false;

//gameover
gameOver = createSprite(300,200);
  gameOver.addImage("gameOver",gameoverimg);
  gameOver.scale = 0.3;
  gameOver.visible = false;

  //restart
  restart = createSprite(300,270);
  restart.addImage("restart",restartimg);
  restart.scale = 0.1;
  restart.visible = false;

//group
ingGroup=new Group ();
obstacleGroup=new Group ();
score=0
}

function draw() {
  background("yellow");
  if(gamestate===PLAY){
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  if(keyDown("space") && boy.y>=340) {
        boy.velocityY = -12;
        boy.changeAnimation("BoyJump",jumpboy);
      }
   // console.log(boy.y);
      boy.velocityY = boy.velocityY + 0.8
      boy.collide(invisibleground);
    if (boy.isTouching(ingGroup)){
            score=score+1
            ingGroup.destroyEach();
    }
    fill("red");
  text("Score:" + score,50,30);
  spawnObstacle();
  ingredients();
  }
     
  if(obstacleGroup.isTouching(boy)){
        gamestate = END;
    }
  
  else if (gamestate === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    boy.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    ingGroup.setVelocityXEach(0);
    
    //change the boy animation
    boy.changeAnimation("endGame",boy2);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    ingGroup.setLifetimeEach(-1);
  
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
 drawSprites();
}
function spawnObstacle(){
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(200,355,10,40);
    obstacle.velocityX=-6
    
    var rand = Math.round(random(1,7));
    switch(rand) {
      case 1: obstacle.addImage(breadImg);
      obstacle.scale = 0.031;
              break;
      case 2: obstacle.addImage(chocolateImg);
      obstacle.scale = 0.041;
              break;
      case 3: obstacle.addImage(frostingImg);
      obstacle.scale = 0.1;
              break;
      case 4: obstacle.addImage(lettuceImg);
      obstacle.scale = 0.031;
              break;
      case 5: obstacle.addImage(mangoImg);
      obstacle.scale = 0.041;
              break;
      case 6: obstacle.addImage(milkImg);
      obstacle.scale = 0.12;
              break;
      case 7: obstacle.addImage(rpasta);
      obstacle.scale = 0.12;
              break;
      default: break;
    }
    obstacleGroup.add(obstacle);
    obstacle.lifetime=100
    obstacle.debug=true
    
  }
}
function ingredients(){
        if(frameCount%60===0){
  var ing = createSprite(200,355,10,40);
ing.x=Math.round(random(100,400))
  ing.velocityX=-6
  var Random=Math.round(random(1,9))
  switch(Random){
          case 1: ing.addImage(butterImg);
          ing.scale=0.2
          break;
          case 2: ing.addImage(chilliflakes);
          ing.scale=0.1
          break;
          case 3: ing.addImage(gCheese);
          ing.scale=0.1
          break;
          case 4: ing.addImage(gCapcicum);
          ing.scale=0.2
          break;
          case 5: ing.addImage(mushroomImg);
          ing.scale=0.01
          break;
          case 6: ing.addImage(oliveImg);
          ing.scale=0.1
          break;
          case 7: ing.addImage(onionImg);
          ing.scale=0.1
          break;
          case 8: ing.addImage(pizzabImg);
          ing.scale=0.1
          break;
          case 9: ing.addImage(tsauce);
          ing.scale=0.1
          break;
         
  }
  ing.lifetime=100
  ingGroup.add(ing);
  //ing.debug=true
        }
}
function reset(){
  gamestate = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  ingGroup.destroyEach();
  
  boy.changeAnimation("Boy",boy1)
 
  
  score = 0;
  
}