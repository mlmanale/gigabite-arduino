//gamestates
let gameStart = true;
let espresso = false;
let syrup = false;
let fridge = false;
let freezer = false;
let recipes = false;
let gameOver = false;

//timer and order stuff
let orderTimer = 60;
let order1 = false;
let order2 = false;
let order3 = false;
let kitty1Img, kitty2Img, kitty3Img;
let strike1 = false;
let strike2 = false;
let strike3 = false;


//cup variables
let cupW = 50;
let cupH = 75;
let cupBigW = 125;
let cupBigH = 187.5;
let cupSet = false;
let bigcupSet = false;
let setcup;

//syrup imgs
let caramel, vanilla, mocha, brownSugar;
let caramelCoffee = false;
//cold latte images
let cupimg, coldcup, icecup;
//cup with syrup spritesheet
let cupsheet;
let frame = 0;

//espresso machine
let espressoSheet;
let espressoFrame = 0;
let animateEspresso = false;
let espressoShot;
let espressoMade = false;

//trash
let trashcan;
let trashframe = 0;

//fridge and freezer
let fridgeFrame = 0;
let freezeFrame = 0;
let fridgeImg, milk, freezerImg;
let fakeFrame = 0;
let fridgeOpen = false;
let freezerOpen = false;

let noteY = 655;
let backImg, recipeImg;

const sounds = new Tone.Players({
  "click": "sounds/click.mp3",
  "success": "sounds/success.mp3",
  "open": "sounds/open.mp3",
  "trash": "sounds/trash.mp3",
  "cup": "sounds/cup.mp3",
  "back": "sounds/back.mp3",
  "coffee": "sounds/coffee.mp3",
  "syrup": "sounds/syrup.mp3",
  "set": "sounds/set.mp3",
  "ice": "sounds/ice.mp3",
  "milk": "sounds/milk.mp3"
}).toDestination();

//cup class

class Cup {
  constructor() {
    //this.ss = spriteSheet;
    this.spawn = false;
    this.trashed = false;
    this.ice = false;
  }

  draw() {
    if(!this.ice) {
      cupimg = coldcup;
    }
    else if (this.ice){
      cupimg = icecup;
    }

    //cup follows cursor on main page
    if(!espresso && !syrup && !fridge && !freezer && !recipes && !cupSet) {
      image(cupsheet, mouseX, mouseY, cupW, cupH, frame*150, 0, 150, 225 );
    }
    //cup follows cursor on zoomed screens
    else if ((espresso || syrup || fridge || freezer) && !cupSet) {
      image(cupsheet, mouseX, mouseY, cupW*2, cupH*2, frame*150, 0, 150, 225);
    }
    //cup set down on main page
    else if (!espresso && !syrup && !fridge && !freezer && !recipes && cupSet) {
      image(cupsheet, cupDown.x, 285, cupW, cupH, frame*150, 0, 150, 225 );
    }
    //cup set down on espresso screen
    else if(espresso && cupSet) {
      image(cupsheet, bigCupDown.x, 450, cupW*2, cupH*2, frame*150, 0, 150, 225 );
    }

  }

  update() {
    if (this.spawn && !this.trashed) {
      this.draw();
    }
  }
}


//general interactable item class
class Item {
  constructor(img, x, y, w, h) {
    this.img = img;
    this.x = x;
    this.y =y;
    this.w = w;
    this.h = h;
    this.moveable = false;
    this.spawn = true;
  }

  draw() {
    if(this.moveable) {
      image(this.img, mouseX, mouseY, this.w, this.h);
    }
    if(!this.moveable) {
      image(this.img, this.x, this.y, this.w, this.h);
    }
  }

  update() {
    if(this.spawn) {
      this.draw();
    }
  }

}

class AnimatedItem {
  constructor(img, x, y, w, h, frame, scale){
    this.img = img;
    this.x = x;
    this.y =y;
    this.w = w;
    this.h = h;
    this.frame = frame;
    this.scale = scale;
  }
  
  draw() {
    image(this.img, this.x, this.y, this.w, this.h, this.frame*(((this.scale*this.w))), 0, this.scale*this.w,  this.scale*this.h);
  }
}

function preload() {
  //anims and sprites will go here!
  gameFont = loadFont("minecraft.ttf");
  caramel = loadImage("img/caramelbig.png");
  vanilla = loadImage("img/vanillabig.png");
  mocha = loadImage("img/mochabig.png");
  brownSugar = loadImage("img/bsbig.png");
  coldcup = loadImage("img/cup.png");
  icecup = loadImage("img/cupice.png");
  cupsheet = loadImage("img/syrupcup.png");
  trashcan = loadImage("img/trashcan.png");
  cupstack = loadImage("img/coldcupstack.png");
  setcup = loadImage("img/setcup.png");
  filterPic = loadImage("img/filter.png");
  espressoSheet = loadImage("img/espressomachine.png");
  espressoShot = loadImage("img/espresso.png");
  fridgeImg = loadImage("img/fridge.png");
  milkImg = loadImage("img/milk.png");
  freezerImg = loadImage("img/freezer.png");
  kitty1Img = loadImage("img/kitty.png");
  kitty2Img = loadImage("img/kitty2.png");
  kitty3Img = loadImage("img/kitty3.png");
  backImg = loadImage("img/backbutton.png");
  recipeImg = loadImage("img/instructions.png");

  cupDown = new Item(setcup, 200, 310, 80, 50);
  bigCupDown = new Item(setcup, 200, 500, 160, 100);
  coffee = new Cup();
  trash = new AnimatedItem(trashcan, 825, 525, 100, 150, trashframe, 1);
  espressoMachine = new AnimatedItem(espressoSheet, 420, 210, 200, 250, espressoFrame, 3);
  bigEspresso = new AnimatedItem(espressoSheet, 640, 300, 400, 500, espressoFrame, 1.5);
  cups1 = new Item(cupstack, 810, 267.5, 50, 135);
  cups2 = new Item(cupstack, 865, 262.5, 50, 145);
  coffeeFilter = new Item(filterPic, 280, 313, 53, 43);
  smallFridge = new AnimatedItem(fridgeImg, 625, 500, 250, 200, fridgeFrame, 3);
  bigFridge = new AnimatedItem(fridgeImg, 587.5, 375, 625, 500, fridgeFrame, 1.2 )
  bigMilk = new Item(milkImg, 700, 255, 117.5, 182.5);
  smallFreezer = new AnimatedItem(freezerImg, 375, 500, 250, 200, freezeFrame,3);
  bigFreezer = new AnimatedItem(freezerImg, 312.5, 375, 625, 500, freezeFrame, 1.2)
  halfFridge = new AnimatedItem(fridgeImg, 935, 375, 625, 500, fakeFrame, 1.2);
  halfFreezer = new AnimatedItem(freezerImg, -35, 375,  625, 500, fakeFrame, 1.2);
  caramelSyrup = new Item(caramel, 560, 252.5, 50, 165);
  vanillaSyrup = new Item(vanilla, 620, 252.5, 50, 165);
  mochaSyrup = new Item (mocha, 680, 252.5, 50, 165);
  bsSyrup = new Item(brownSugar, 740, 252.5, 50, 165);
  bigCaramel = new Item(caramel, 225, 340, 125, 412.5);
  bigVanilla = new Item(vanilla, 375, 340, 125, 412.5);
  bigMocha = new Item(mocha, 525, 340, 125, 412.5);
  bigBS = new Item(brownSugar, 675, 340, 125, 412.5);
  kitty1 = new Item(kitty1Img, 70, 210, 90, 90);
  kitty2 = new Item(kitty2Img, 170, 210, 90, 90);
  kitty3 = new Item(kitty3Img, 270, 210, 90, 90);
  back = new Item(backImg, 50, 50, 80, 80);
  instructions = new Item(recipeImg, 795, 50, 190, 80);
}

function setup() {
  createCanvas(900, 600);
  textAlign(CENTER);
  rectMode(CENTER);
  imageMode(CENTER);
  textFont(gameFont);
  textSize(22);
}

function draw() {
  background(220);
  if(gameStart) {
   background("black");
    push();
      fill("white");
      text("Press enter to begin!", width/2, height/2);
    pop();
  }

  if (frameCount % 60 == 0 && orderTimer > 0) { 
    orderTimer --;
  }

  if(orderTimer <= 57) {
    order1 = true;
  }

  if(orderTimer <= 50) {
    order2 = true;
  }
  
  if(orderTimer <= 45) {
    order3 = true;
  }

  if(orderTimer == 0) {
    gameOver = true;
  }

  if(!gameStart && !espresso && !syrup && !fridge && !freezer && !recipes & !gameOver) {
    background(150,150,150);
  
  
    stroke("black");
    strokeWeight(2);
    //counter
    fill(66,66,66);
    rect(450, 325, 900, 150)
  
    //counter edge
    fill(36,36,36);
    rect(450, 362.5, 900, 25);
  
    //bottom drawers
    fill("black");
    rect(450, 487.5, 900, 225);
  
    //espresso machine
    espressoMachine.draw();
    //filter
    coffeeFilter.update();
    // console.log(coffeeFilter.x, coffeeFilter.y);
  
    //syrups
    caramelSyrup.update();
    vanillaSyrup.update();
    mochaSyrup.update();
    bsSyrup.update();
  
    //cups
    fill("red");
    cups1.update();
    cups2.update();
    
    //frige and freezer
    freezerOpen = false;
    bigFreezer.frame == 0;
    smallFreezer.draw();
    smallFridge.draw();
  
    //trash
    trash.draw();
  
    //note
    noStroke();
    fill(255, 244, 179);
    rect(135, 495, 250, 220);

    //set cup down
    cupDown.update();

    if(order1) {
      fill("black");
      text("iced caramel latte", 135, 445); 
      kitty1.update();
      if(strike1) {
        fill("red");
        rect(135, 440, 200, 5);
      }
    }

    if(order2) {
      fill("black");
      text("cup of milk", 135, 495);
      kitty2.update();
      if(strike2) {
        fill("red");
        rect(135, 490, 200, 5);
      }
    }

    if(order3) {
      fill("black");
      text("cup of ice", 135, 545);
      kitty3.update();
      if(strike3) {
        fill("red");
        rect(135, 540, 200, 5);
      }
    }
 
  }
  
  //counter for gamestates
  if (espresso || syrup) {
    background("gray");

    //counter
    fill(66,66,66);
    rect(450, 500, 900, 150);

    //counter edge
    fill(36,36,36);
    rect(450, 587.5, 900, 25);
  }
  
  //ESPRESSO
  if (espresso) {
    //espresso machine x2

    bigEspresso.draw();
    bigCupDown.update();
    coffeeFilter.update();
    coffeeFilter.h =  86;
    coffeeFilter.w = 106;
    coffeeFilter.x = 355;
    coffeeFilter.y = 510;

  }

  //SYRUP
  if (syrup) {
    //syrups - original size x2.5
    bigCaramel.update();
    bigVanilla.update();
    bigMocha.update();
    bigBS.update();
  } //END SYRUP
  
  if(freezer) {
    background("gray");
 
    fill("purple");
    bigFreezer.draw();
    halfFridge.draw();
    

    if(bigFreezer.frame == 1) {
        freezerOpen = true;
    }
  } //END FREEZER

  //FRIDGE
  if(fridge) {
    background("gray");


    //fridge original x2.5
    bigFridge.draw();
    halfFreezer.draw();

    if(bigFridge.frame == 1) {
      bigMilk.update();
    }
    

  } //END FREEZER

  //backbutton for gamestates
  if (espresso || syrup || fridge || freezer)
   {
      backButton();
      orderNote();

      //console.log(mouseX,mouseY);
   }

   if (recipes) {
    background("gray");
    backButton();
    
    fill("white");
    rect(450, 350, 600, 400);

    fill("black");
    text("iced caramel latte", 450, 200);
    push();
      textSize(17);
      text("2 pumps of caramel syrup", 450, 230);
      text("1 shot of espresso", 450, 260);
      text("add milk, then ice", 450, 290);
    pop();

    text("cup of milk", 450, 350);
    push();
      textSize(17);
      text("add milk to cup. 'nuff said", 450, 380);
    pop();

    text("cup of ice", 450, 440);
    push();
      textSize(17);
      text("do i need to explain this one?", 450, 470);
    pop();
   }
  
  if (!gameStart && !gameOver) {
    coffee.update();
    instructions.update();

    push();
      fill("black");
      textSize(20);
      text("instructions", 825, 55);
    pop();
  }

  if(gameOver) {
    background("black");
    push();
      fill("white");
      text("Good job!", width/2, height/2);
      text("press ENTER to play again");
    pop();
  }
}


function keyPressed() {
  if (keyCode === ENTER && gameStart) { 
    gameStart = false;
  }

  if (keyCode === ENTER && gameOver) { 
    gameStart = true;
  }
}
function mousePressed() {
  
  //back buttons and zoomed screen interactions
  if(syrup) {
    if (collision(back)) {
      sounds.player("back").start();
      syrup = false;
    }

    //caramel
    if (collision(bigCaramel) && coffee.spawn) {
      sounds.player("syrup").start();
      if(frame == 0) {
        frame = 1;
      }
      else if(frame == 1) {
        frame = 5;
        caramelCoffee = true;
      }
    }

    //vanilla
    if (collision(bigVanilla) && coffee.spawn) {
      sounds.player("syrup").start();
      if(frame == 0) {
        frame = 4;
      }
      else if(frame == 4) {
        frame = 8;
      }
    }

    //mocha 
    if (collision(bigMocha) && coffee.spawn) {
      sounds.player("syrup").start();
      if(frame == 0) {
        frame = 3;
      }
      else if(frame == 3) {
        frame = 7;
      }
    }

    //brown sugar 
    if (collision(bigBS) && coffee.spawn) {
      sounds.player("syrup").start();
      if(frame == 0) {
        frame = 2;
      }
      else if(frame == 2) {
        frame = 6;
      }
    }
  }
  
  if(freezer) {
    if (collision(back)) {
      sounds.player("back").start();
      freezer = false;
      freezerOpen = false;
      bigFreezer.frame = 0;
    }

    if (collision(bigFreezer) && !freezerOpen) { 
        sounds.player("open").start();
        bigFreezer.frame = 1;
    }

    if(collision(bigFreezer) && coffee.spawn && !cupSet && bigFreezer.frame == 1 && freezerOpen){
      sounds.player("ice").start();
      if(frame == 0) {
        frame = 12;
      }
      if (frame == 10) {
        frame = 11;
      }
    }
  }

  if(fridge) {
    if (collision(back)) {
      sounds.player("back").start();
      fridge = false;
      bigFridge.frame = 0;
    }

    if(collision(bigMilk) && coffee.spawn && !cupSet && bigFridge.frame == 1) {
      sounds.player("milk").start();
      if(frame == 0) {
        frame = 13;
      }
      if(frame == 9) {
        frame = 10;
      }
    }

    if(collision(bigFridge) && bigFridge.frame == 0 ) {
      sounds.player("open").start();
      bigFridge.frame = 1;
    } 
  }


  if(espresso) {
    if (collision(back)) {
      sounds.player("back").start();
      espresso = false;
      coffeeFilter.moveable = false;
      coffeeFilter.h =  43;
      coffeeFilter.w = 53;
      coffeeFilter.x = 280;
      coffeeFilter.y = 313;
      bigEspresso.frame = 0;
      coffeeFilter.spawn = true;
    }

    if(collision(bigCupDown) && coffee.spawn && !coffee.trashed){ 
      sounds.player("set").start();
      if(!cupSet){
        cupSet= true;
      }
      else {cupSet = false;}
    }

    if(collision(coffeeFilter)) {
      if((coffee.spawn && cupSet) || !coffee.spawn){
        coffeeFilter.moveable = true;
        sounds.player("cup").start();
      }
    }

    if(collision(bigEspresso) && coffeeFilter.moveable && ((coffee.spawn && cupSet) || (!coffee.spawn))) {
      animateEspresso = true;
      coffeeFilter.moveable = false;
      sounds.player("click").start();
      sounds.player("coffee").start();


      let timer = setInterval(()=>{
        if (bigEspresso.frame < 10) {
          bigEspresso.frame ++;
          coffeeFilter.spawn = false;
        }
        else {
          bigEspresso.frame = 10;
          espressoMade = true;
          clearInterval(timer);
        }
      }, 500)
    }

    if(collision(bigEspresso) && !cupSet && coffee.spawn && espressoMade) {
      bigEspresso.frame = 11;
      frame = 9;
      sounds.player("milk").start();
    }
  }

  if(recipes) {
    if (collision(back)) {
      sounds.player("back").start();
      recipes = false;
    }
  }

  //enter zoomed screens, main screen interactions
  if(!espresso && !syrup && !fridge && !freezer) {

    //first order
    if(collision(kitty1) && caramelCoffee && frame == 11) {

      kitty1.spawn = false;
      sounds.player("success").start();
      coffee.trashed = true;
      strike1 = true;
      setTimeout(()=>{
        coffee.trashed = false;
        coffee.spawn = false;
        coffee.ice = false;
        frame = 0;
        caramelCoffee = false;
      }, 500)
    }
    if(collision(kitty2) && frame == 13) {
      sounds.player("success").start();
      kitty2.spawn = false;
      coffee.trashed = true;
      strike2 = true;
      setTimeout(()=>{
        coffee.trashed = false;
        coffee.spawn = false;
        coffee.ice = false;
        frame = 0;
      }, 500)
    }
    if(collision(kitty3) && frame == 12) {
      sounds.player("success").start();
      kitty3.spawn = false;
      coffee.trashed = true;
      strike3 = true;
      setTimeout(()=>{
        coffee.trashed = false;
        coffee.spawn = false;
        coffee.ice = false;
        frame = 0;
      }, 500)
    }
    //espresso
    if (collision(espressoMachine)) {
      sounds.player("click").start();
      espresso = true;
    }
    //syrups
    else if (collision(caramelSyrup) || collision(vanillaSyrup) || collision(mochaSyrup) || collision(bsSyrup)) {
      sounds.player("click").start();
      syrup = true;
    }
    //cold cup
    else if (collision(cups1)) {
      sounds.player("cup").start();
      coffee.spawn = true;
      // console.log("cold cup");
    }
    //hot cups
    else if (collision(cups2)) {
      sounds.player("cup").start();
      coffee.spawn = true;
      // console.log("hot cup");
    }
    //freezer
    else if (collision(smallFreezer)) {
      sounds.player("click").start();
      freezer = true;
    }
    //fridge
    else if (collision(smallFridge)) {
      sounds.player("click").start();
      fridge = true;
    }
    //trash
    else if (collision(trash) && !cupSet && coffee.spawn) {
      sounds.player("trash").start();
      coffee.trashed = true;
      trash.frame = 1;
      setTimeout(()=>{
        coffee.trashed = false;
        coffee.spawn = false;
        coffee.ice = false;
        frame = 0;
        trash.frame = 0;
      }, 500)
      }

    //set cup down
    if(collision(cupDown) && coffee.spawn && !coffee.trashed){ 
      sounds.player("set").start();
      if(!cupSet){
        cupSet = true;
      }
      else {cupSet = false;}
    }
    // if(collision())
    }

    //recipes
    if (collision(instructions)) { 
      sounds.player("click").start();
      recipes = true;
    }
}

function backButton () {
  back.update();
}

function orderNote () {
  noStroke();
  fill(255, 244, 179);
  rect(135, noteY, 250, 220);

  fill("black");
  if(order1) {
    text("iced caramel latte", 135, noteY-50); 
  }

  if(order2) {
    text("cup of milk", 135, noteY);
  }

  if(order3) {
    text("cup of milk", 135, noteY+50);
  }
  if((mouseX >= 10 && mouseX <=260)&&(mouseY >= 565 && mouseY <=600))
  {
    if(noteY >= 495) {
      noteY -= 20;
    }
  }
  else {
    if(noteY <= 655) {
      noteY += 20;
    }
  } 
}

function collision (Item) {
  if ((mouseX >= (Item.x - (Item.w/2)) && mouseX <= (Item.x + (Item.w/2))) && (mouseY >= (Item.y - (Item.h/2)) && mouseY <= (Item.y + (Item.h/2)))) {
    return true;
  }
  else {return false;}
}