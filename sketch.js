var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var fedtime;
var lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  eat=createButton("feed the dog");
 eat.position(700,95);
 eat.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();
 fedtime=database.ref('feedTime');
 fedtime.on("value",function(data){
lastFed=data.val();
 })
 fill("black");
 
 if(lastFed>=12){
          text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){ 
          text("Last Feed : 12 AM",350,30); 
   }else{
          text("Last Feed : "+ lastFed + " AM", 350,30);
       }
  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function feedDog(){
dog.addImage(happyDog);
var foodaval=foodObj.getFoodStock();
if(foodaval<=0){
   foodObj.updateFoodStock(foodaval*0);

}else{
  foodObj.updateFoodStock(foodaval-1);
}
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  feedTime:hour()

})


}
