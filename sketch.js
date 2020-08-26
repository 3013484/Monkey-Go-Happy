var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver, restart;

var monkey, monkey_running;
var invisibleGround;
var backdrop;
var bananaGroup, bananaImage;
var stoneGroup, stoneImage;
var score = 0;

function preload(){
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  backdrop = loadImage("jungle.jpg")
}

function setup() {
  createCanvas(400, 400);
  monkey = createSprite(50,180,20,50);
  monkey.addAnimation("running",trex_running);
  monkey.scale = 0.5;
  invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;
  backdrop = createSprite(400,400,400,400);
  bananaGroup = new Group();
  stoneGroup = new Group();
}

function draw() {
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:" + score,300,50);
  
  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate()/60);
    if(keyDown("space")) {
      monkey.velocityY = -10;
    }
    monkey.velocityY = monkey.velocityY + 0.8
    if (backdrop.x < 0){
      backdrop.x = backdrop.width/2;
    }
    spawnBananas();
    spawnStones();
    monkey.collide(invisibleGround);
    
    if(bananaGroup.isTouching(monkey)) {
      score = score + 5;
      destroyBanana();
      switch(score) {
        case 10: monkey.scale = 0.52;
        break;
        case 20: monkey.scale = 0.54;
        break;
        case 30: monkey.scale = 0.56;
        break;
        case 40: monkey.scale = 0.58;
        break;
        default: break;
      }
    }
    if(stoneGroup.isTouching(monkey)) {
      score = score - 20;
      player.scale = 0.2;
    }
    if(score <= 0) {
      gameState = END;
    }
  
  if (gameState === END) {
    backdrop.velocityX = 0;
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    stoneGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    stoneGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    if(mousePressedOver(monkey)) {
      reset();
    }
  }
  drawSprites();
}

function reset() {
  gameState = PLAY;
  stoneGroup.destroyEach();
  bananaGroup.destroyEach();
  score = 0;
  backdrop.velocityX = -5;
}

function spawnBananas() {
  if (frameCount %60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.velocityX = -4;
    banana.y = Math.round(random(300,350));
    bananaGroup.add(banana);
    banana.addImage(bananaImage);
    banana.scale = 0.75;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    bananaGroup.setLifetimeEach = 100;
  }
}
  
function spawnStones() {
  if (frameCount %60 === 0) {
    var stone = createSprite(600,165,40,10);
    stone.velocityX = -5;
    }
    stone.scale = 0.5;
    stoneGroup.setLifetimeEach = 300;
    stoneGroup.add(stone);
}