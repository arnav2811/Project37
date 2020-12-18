class Food{
    constructor(){
        this.image = loadImage("Milk.png")
       
        var lastFed
    }
    display(){
        //imageMode(CENTER)
        
        //image(this.image, 50, 250, 95, 95)
        //console.log(foodStock);
        if(foodStock !=0){
            var x = 80
            var y= 80
            for(var i=0; i<foodStock; i++){
                x=x+30;
               if(i%10 === 0){
                    var x = 80
                    var y= y+80
               }
                image(this.image, x, y, 50, 50)
               
            }
        }
    }
    getFoodStock(){
       //return this.foodStock;
    var foodStockRef = database.ref('Food');
    foodStockRef.on("value", function(data){
        foodStock = data.val();
    })
    return foodStock;
    }
    updateFoodStock(food){
     database.ref('/').update({
         Food: food
     })
    }
    deductFood(abc){

    database.ref('/').update({
        Food: abc
    })
    }
    bedroom(){
    background(bedImg, 550, 500)
    }
    garden(){
    background(gardenImg, 550, 500)
    }
    washroom(){
    background(washroomImg, 550, 500)
    }
}