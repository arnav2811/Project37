//Create variables here
var database
var foodS, foodStock
var dogImg, dogImg1, dog
var feed, addFood
var fedTime, lastFed
var foodObj
var name
var changegameState, readgameState
var bedImg, gardenImg, washroomImg
var gameState
var currentTime

function preload()
{
  //load images here
  dogImg1 = loadImage("dogImg1.png")
  dogImg = loadImage("dogImg.png")
  bedImg = loadImage("virtual pet images/Bed Room.png")
  gardenImg = loadImage("virtual pet images/Garden.png")
  washroomImg = loadImage("virtual pet images/Wash Room.png")
}

function setup() {
  
  database = firebase.database()
  
  createCanvas(600, 500);
  dog = createSprite(500, 300, 10, 10)
  dog.addImage(dogImg)
  dog.scale = 0.3

  foodStock1 = database.ref('Food');
  foodStock1.on("value", readStock)
  foodObj = new Food()
   
  //read data from database
  readgameState = database.ref('gameState')
  readgameState.on("value", function(data){
    gameState = data.val()
  })

  feed = createButton("Feed Dog")
  feed.position(200, 95)
  feed.mousePressed(feedDog)
 
  addFood = createButton("Add Food")
  addFood.position(300, 95)
  addFood.mousePressed(addFoodS)
 nam = new Form()

}


function draw() {  
  background(rgb(46, 139, 87))
  foodObj.getFoodStock();
  foodObj.display()
  
  fedTime = database.ref('FeedTime');
  fedTime.on('value',function(data){
    lastFed = data.val()
  })
  if(gameState!== "Hungry"){
    feed.hide()
    addFood.hide()
    dog.remove()
  }else {
    feed.show()
    addFood.show()
    dog.addImage(dogImg)
  }
  currentTime = hour()
  if(currentTime === (lastFed+1)){
    database.ref('/').update({
      gameState: "Playing"
    })
    //update("Playing")
    foodObj.garden()
  }else if(currentTime === (lastFed+2)){
    database.ref('/').update({
      gameState: "Sleeping"
    })
    //update("Sleeping")
    foodObj.bedroom()
  }else if(currentTime > (lastFed+3)&& currentTime <= (lastFed+4)){
    database.ref('/').update({
      gameState: "Bathing"
    })
    //update("Bathing")
    foodObj.washroom()
  }else{
    database.ref('/').update({
      gameState: "Hungry"
    })
    //update("Hungry")
    foodObj.display()
  }

  drawSprites();
  nam.display()
  textSize(20)
    stroke("black")
    fill("white")
    text("FOOD LEFT : " + foodS, 40, 30)
    if(lastFed >= 12){
      text("Last Feed : " + lastFed%12 + "PM", 300, 30);
    }else if(lastFed === 0){
      text("Last Feed : 12 PM", 300, 30);
    }else {
      text("Last Feed : " + lastFed + "AM", 300, 30);
    }  
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}
function writeStock(x){

if(x<= 0 ){
  x =0
} else {
x = x-1
}
  database.ref('/').update({
  Food: x
})
}
function addFoodS(){
dog.addImage(dogImg)
  foodS ++
database.ref('/').update({
  Food: foodS
})
}
function feedDog(){
  dog.addImage(dogImg1)
 
  //food1 = foodObj.getFoodStock()
  //console.log(foodObj.getFoodStock())
  //foodObj.updateFoodStock(food1-1),
  database.ref('/').update({
    Food: foodObj.getFoodStock()-1,
    FeedTime: hour()
  })
   foodObj.getFoodStock();
  foodObj.display();
}
function feed1(){
  console.log(foodObj.getFoodStock())
  foodleft = foodObj.getFoodStock() -1;
  foodObj.deductFood(foodleft);
}