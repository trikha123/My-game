var power = 0
var powerUp
var obstacle
var score = 0
var gamestate = "Play"

function preload(){
backgroundIMG = loadImage("Background.jpg")
plr1 = loadImage("player1.png")
plr2 = loadImage("player2.png")
snakePitIMG = loadImage("Snakepit.jpg")
waterIMG = loadImage("Water.png")
trapIMG = loadImage("trap.png")
PowerIMG = loadImage("Power-up.png")
lavaIMG = loadImage("Lava.png")
cactusIMG = loadImage("Cactus.png")
gameOverIMG = loadImage("game_over.png")
resetIMG = loadImage("reset.png")
}

function setup() {
createCanvas(800, 800)
background = createSprite(0, 200, 800, 800)
background.addImage(backgroundIMG)


player1 = createSprite(100, 600, 50, 50)
player1.addImage(plr1)
player1.setCollider("rectangle", 0, 0, 60 , player1.height )
player1.scale = 0.7

reset = createSprite(400, 400, 20, 20)
reset.addImage(resetIMG)
reset.scale = 0.5
reset.visible = false


gameOver = createSprite(400, 200, 40, 40)
gameOver.addImage(gameOverIMG)
gameOver.scale = 1.5
gameOver.visible = false


ObGroup = new Group()
UpPower = new Group()

}

function draw() {
  if(gamestate === "Play"){
    background.velocityX = -4
    if(background.x<-100){
    background.x = 100
    }
    if(keyDown(UP_ARROW)&& player1.y >= 50){
      player1.y = player1.y - 10
    }
    if(keyDown(DOWN_ARROW)&&  player1.y<=750){
      player1.y = player1.y + 10
    }
  spawnOb()
  PowerUp()
  if(player1.isTouching(UpPower)){
    console.log("1");
    power = 1

  }
  console.log("power test" + power)
  if(player1.isTouching(ObGroup)&& power === 0 ){
    reset.visible = true
    gameOver.visible = true
    background.velocityX = 0
    gamestate = "End"
    
    ObGroup.setVelocityXEach(0)
    UpPower.setVelocityXEach(0)
    ObGroup.destroyEach()
    UpPower.destroyEach()
    console.log("END")
    
  }
  if(player1.isTouching(ObGroup)&& power ===1){
    power = 0
    console.log(power)
    console.log("power down")

  }
  score = score + round(frameCount/100)
  } 
  
  if(mousePressedOver(reset)){
    Reset()
    console.log("reset game")
  }
  
  
  drawSprites()
  textSize(30)
  fill("black")
  text("Score: " + score, 600, 50)

}
function spawnOb(){
  if(frameCount% 80 ===0 ){
    obstacle = createSprite(1000, 650, 20, 20)
    obstacle.y = random(100,700)
  obstacle.velocityX=-4
  var number = round(random(1,5))
  switch(number){
    case 1: obstacle.addImage(snakePitIMG)
    break
    case 2: obstacle.addImage(waterIMG)
    break
    case 3: obstacle.addImage(trapIMG)
    break
    case 4: obstacle.addImage(cactusIMG)
    break
    case 5: obstacle.addImage(lavaIMG)
    break
    deafult: break
  }
obstacle.scale = 0.1
ObGroup.add(obstacle)
obstacle.lifetime = 300
}
}
function PowerUp(){
  if(frameCount% 200 ===0 ){
    powerUp = createSprite(1000, 650, 20, 20)
    powerUp.y = random(100,700)
    powerUp.velocityX=-4
    powerUp.setCollider("rectangle", 0, 0, 600, 600)
    powerUp.addImage(PowerIMG)
    powerUp.scale = 0.1
    UpPower.add(powerUp)
  
    console.log(power);

  
  }
}
function Reset(){
  gamestate = "Play"
  score = 0
  reset.visible = false
  gameOver.visible = false

}
