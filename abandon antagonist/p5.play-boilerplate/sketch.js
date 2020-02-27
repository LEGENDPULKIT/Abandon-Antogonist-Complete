//create count and score
var count=null;
var score=0;

//set game state
var gameState=1;

//create R & L groups for enemies
var R=Group();
var L=Group();

function preload()
{
  //load images required for the game
  bg=loadImage("images/bac.png");
  house1=loadImage("images/hh3.png");
  house2=loadImage("images/hh1.png");
  house3=loadImage("images/hh5.png");
  house4=loadImage("images/hd4.png");
  wall=loadImage("images/wal1.png");
  wal1=loadImage("images/wal2.png");

  stand_ply=loadAnimation("images/commando.png");

  stand_enemy=loadImage("images/stand eny.png");
  stand1_enemy=loadImage("images/deny1.png");
  sit_enemy=loadImage("images/seat eny.png");
  sitt_enemy=loadImage("images/seateny1.png");
  running_enemy=loadAnimation("images/eny1.png","images/eny2.png","images/eny3.png","images/eny4.png","images/eny5.png")
  running1_enemy=loadAnimation("images/en1.png","images/en2.png","images/en3.png","images/en4.png","images/en5.png")

  bullet=loadImage("images/bullet.png");
  bullet1=loadImage("images/bullet1.png")

  target=loadImage("images/target.png");
}

function setup() 
{
  //create canvas
  createCanvas(displayWidth,displayHeight);

  //create reset button
  resetb=createButton("RESET");
  resetb.position(1300,50);

  //create time input
  time=createInput("1000")
  time.position(100,30);

  //create time set button
  set=createButton("SET");
  set.position(100,50);

  //give function when set was pressed
  set.mousePressed(timerset);

  //create target
  tar=createSprite(700,150,100,10);
  tar.addImage("tare",target);
  tar.scale=0.85;


  //create sitted enemy
  en1=createSprite(230,100,30,30);
  en1.addImage("sit",sit_enemy);
  en1.scale=0.18;

  en2=createSprite(1400,600,30,30);
  en2.addImage("sit",sitt_enemy);
  en2.scale=0.28;
  
  en3=createSprite(1700,80,30,30);
  en3.addImage("sit",sitt_enemy);
  en3.scale=0.18;

  


  //create Walls
  w1=createSprite(900,400,100,20);
  w1.addImage("w",wal1);
  w1.scale=0.5

  w2=createSprite(500,600,20,100);
  w2.addImage("w",wall);
  w2.scale=0.9

  w3=createSprite(1500,600,100,20);
  w3.addImage("w",wal1);
  w3.scale=0.7
  w3.visible=false;

  w4=createSprite(1400,300,100,20);
  w4.addImage("w",wall);
  w4.scale=0.35

  //create PC
  plyr=createSprite(100,1000,100,100);
  plyr.addAnimation("ply",stand_ply);
  plyr.scale=0.12;
 

  // create stand enemy
  eny4=createSprite(500,550,50,50);
  eny4.addImage("stand",stand_enemy);
  eny4.scale=0.75;

  eny5=createSprite(1500,300,50,50);
  eny5.addImage("stand",stand1_enemy);
  eny5.scale=0.75;

  eny6=createSprite(800,240,50,50);
  eny6.addImage("stand",stand_enemy);
  eny6.scale=0.35;

  eny7=createSprite(1200,250,50,50);
  eny7.addImage("stand",stand1_enemy);
  eny7.scale=0.35;

  
  //create Houses
  ho1=createSprite(500,300,50,50);
  ho1.addImage("h1",house1);
  ho1.scale=0.5;

  ho2=createSprite(1600,250,100,100);
  ho2.addImage("h2",house4);
  ho2.scale=0.5;

  ho3=createSprite(1600,750,100,100);
  ho3.addImage("h3",house2);
  ho3.scale=1.5;

  ho4=createSprite(900,220,100,100);
  ho4.addImage("h4",house3);
  ho4.scale=0.35
  
  //set colliders for walls  
  w1.setCollider("rectangle",-300,-190,450,80);  
  w2.setCollider("rectangle",-380,-160,250,50);
  w4.setCollider("rectangle",-390,-170,250,60);

  //create Bullets
  bu=createSprite(plyr.x,plyr.y,10,10)
  bu.addImage("b",bullet1);
  bu.scale=0.10;
  bu.visible=false;

  bu1=createSprite(plyr.x,plyr.y,10,10)
  bu1.addImage("b",bullet);
  bu1.scale=0.10;
  bu1.visible=false;

   
  
}

function draw() 
{
  background(bg);

  //change the depth of PC
  plyr.depth=plyr.depth+2;

  //display score
  fill("orange");
  textSize(25);
  text("SCORE : "+score,1500,100);
    
  //display timer  
  fill("black");
  textSize(20);
  text("TIME : "+count,1500,50);

  //set game state to 1
  if(gameState===1 && count>0)
  {

    //make the timmer to count when it is not less than 0  
    if(count>0)
    {
      count=count-Math.round(frameCount/400);
    }

    //stop the timmer when it reaches 0
    if(count<0)
    {
      count=0;
    }
      
    //display the text
    textSize(30);
    fill("black")
    text("=> COME AND CROSS THE BORDER <=",500,50);
    text("Left click to shoot",700,100);

    //write function to move the PC with arrow keys
    if(keyWentDown(RIGHT_ARROW))
    {
        plyr.velocityX=3;
        
    }
    if(keyWentUp(RIGHT_ARROW))
    {
        plyr.velocityX=0;
        
    }
      
    if(keyWentDown(LEFT_ARROW))
    {
        plyr.velocityX=-3;
       
    }

    if(keyWentUp(LEFT_ARROW))
    {
        plyr.velocityX=0;
        
    }
      
    if(keyWentDown(UP_ARROW))
    {
        plyr.velocityY=-3;
       
    }

    if(keyWentUp(UP_ARROW))
    {
        plyr.velocityY=0;
       
    }
      
    if(keyWentDown(DOWN_ARROW))
    {
        plyr.velocityY=3;
       
    }

    if(keyWentUp(DOWN_ARROW))
    {
        plyr.velocityY=0;
       
    }

    //Make running NPC which come from left side
    if(frameCount%130===0)
    {
        for(var i=245;i<250;i++)
        {
          lefteny=createSprite(i,200,50,50);
          lefteny.addAnimation("running",running_enemy);
          lefteny.velocityX=random(1,3);
          lefteny.velocityY=random(0,3);
          lefteny.scale=0.7

          lefteny.depth=ho1.depth;
          ho1.depth=ho1.depth+1;

          lefteny.depth=ho2.depth;
          ho2.depth=ho2.depth+1;

          lefteny.depth=ho3.depth;
          ho3.depth=ho3.depth+1;

          lefteny.depth=ho4.depth;
          ho4.depth=ho4.depth+1;

          
          lefteny.depth=w1.depth;
          w1.depth=w1.depth+1;

          lefteny.depth=w2.depth;
          w2.depth=w2.depth+1;

          lefteny.depth=w3.depth;
          w3.depth=w3.depth+1;

          lefteny.depth=w4.depth;
          w4.depth=w4.depth+1;

          lefteny.depth=en1.depth;
          en1.depth=en1.depth+1;

          lefteny.depth=en2.depth;
          en2.depth=en2.depth+1;

          lefteny.depth=en3.depth;
          en3.depth=en3.depth+1;

          lefteny.depth=eny4.depth;
          eny4.depth=eny4.depth+1;

          lefteny.depth=eny5.depth;
          eny5.depth=eny5.depth+1;

          lefteny.depth=eny6.depth;
          eny6.depth=eny6.depth+1;

          lefteny.depth=eny7.depth;
          eny7.depth=eny7.depth+1;

          lefteny.bounceOff(w1);
          lefteny.bounceOff(w2);
          lefteny.bounceOff(w4);

          L.add(lefteny);

          lefteny.lifetime=1500;
        }
    }

    //create running NPC which come from right side
    if(frameCount%130===0)
    {
        for(var i=1747;i<1750;i++)
        {
            righteny=createSprite(i,200,50,50);
            righteny.addAnimation("running",running1_enemy);
            righteny.velocityX=random(-1,-3);
            righteny.velocityY=random(1,3);
            righteny.scale=0.70;

            righteny.depth=ho1.depth;
            ho1.depth=ho1.depth+1;
        
            righteny.depth=ho2.depth;
            ho2.depth=ho2.depth+1;
        
            righteny.depth=ho3.depth;
            ho3.depth=ho3.depth+1;
        
            righteny.depth=ho4.depth;
            ho4.depth=ho4.depth+1;
        
            righteny.depth=w1.depth;
            w1.depth=w1.depth+1;
        
            righteny.depth=w2.depth;
            w2.depth=w2.depth+1;
        
            righteny.depth=w3.depth;
            w3.depth=w3.depth+1;
        
            righteny.depth=w4.depth;
            w4.depth=w4.depth+1;
        
            righteny.depth=en1.depth;
            en1.depth=en1.depth+1;
        
            righteny.depth=en2.depth;
            en2.depth=en2.depth+1;
        
            righteny.depth=en3.depth;
            en3.depth=en3.depth+1;
        
            righteny.depth=eny4.depth;
            eny4.depth=eny4.depth+1;
        
            righteny.depth=eny5.depth;
            eny5.depth=eny5.depth+1;
        
            righteny.depth=eny6.depth;
            eny6.depth=eny6.depth+1;
        
            righteny.depth=eny7.depth;
            eny7.depth=eny7.depth+1;

            R.add(righteny)

            righteny.bounceOff(w1);
            righteny.bounceOff(w2);
            righteny.bounceOff(w4);

            righteny.lifetime=1500;
      }
  }

  //make the bullet shoot when mouse is pressed
  if(mouseIsPressed)
  {
      bu.visible=true;
      bu1.visible=true;

      bu.velocityX=20;
      bu1.velocityY=-20;
  }

  }

  //respawn the bullet when it cross the screen
  if(bu1.y<0 || bu.x>2000)
  {
      bu1.y=plyr.y;
      bu.y=plyr.y;

      bu.x=plyr.x;
      bu1.x=plyr.x;

      bu.velocityY=0;
      bu1.velocityY=0;

      bu.visible=false;
      bu1.visible=false;

  }

  //make the lefteny destroy and increase the score when bullet touch L
  if(bu.isTouching(L) || bu1.isTouching(L))
  {
    
      L.removeSprites();
      lefteny.destroy();

      score=score+200;
  }

  //make the righteny destroy and increase the score when bullet touch R
  if(bu.isTouching(R) || bu1.isTouching(R))
  {
    
      R.removeSprites();
      righteny.destroy();

      score=score+200;
  }

  //losing condition
  if(plyr.isTouching(L) || plyr.isTouching(R) || count===0 || plyr.isTouching(en1) || plyr.isTouching(en2)|| plyr.isTouching(en3)|| plyr.isTouching(eny4)|| plyr.isTouching(eny5)|| plyr.isTouching(eny6)|| plyr.isTouching(eny7))
  {
      gameState=2;

      L.removeSprites();
      R.removeSprites();
          
      plyr.velocityX=0;
      plyr.velocityY=0;

  }

  //write condition when gamestate changes to 2
  if(gameState===2)
  {
      invisible();
      background(0);

      textSize(30);
      fill(255)
      text("YOU ARE NOT CAPABLE TO COMPLETE THE FIGHT",500,50);

      //display score
      fill("orange");
      textSize(25);
      text("SCORE : "+score,1500,100);
  }  

  //reset the game when reset button is pressed   
  resetb.mousePressed(reset)
  
  //winning condition
  if(plyr.isTouching(tar))
  {
      gameState=3;

      L.removeSprites();
      R.removeSprites();

      plyr.velocityX=0;
      plyr.velocityY=0;

      invisible();

      background(0);

      textSize(35);
      fill("white")
      text("YOU ARE THE CHAMPION",650,400);
      textSize(25);
      text("I try to do the right thing at the right time.",600,500);
      text("They may just be little things,",600,540);
      text("but usually they make the difference between winning and losing.",600,580);

      //display score
      fill("orange");
      textSize(25);
      text("SCORE : "+score,1500,100);
  }

  //make the PC to collide with the walls
  plyr.collide(w1);
  plyr.collide(w2);
  plyr.collide(w4);
  
  
  //draw the sprites
  drawSprites();
}

//create reset function
function reset()
{
  background(bg);

  //reset the game state and reset the positon of plyr
  gameState=1;
  plyr.x=100;
  plyr.y=1000;

  L.removeSprites();
  R.removeSprites();

  //make every thing visible
  w1.visible=true;
  w2.visible=true;
  
  w4.visible=true;

  ho1.visible=true;
  ho2.visible=true;
  ho3.visible=true;
  ho4.visible=true;

  en1.visible=true;
  en2.visible=true;
  en3.visible=true;
  eny4.visible=true;
  eny5.visible=true;
  eny6.visible=true;
  eny7.visible=true;

  tar.visible=true;

  R.visible=true;
  L.visible=true;

  //reset the count and score
  count=null;
  score=0;
  
}

//create function invisible
function invisible()
{

  //make every thing invisible
  tar.visible=false;

  w1.visible=false;
  w2.visible=false;
  w3.visible=false;
  w4.visible=false;

  ho1.visible=false;
  ho2.visible=false;
  ho3.visible=false;
  ho4.visible=false;

  en1.visible=false;
  en2.visible=false;
  en3.visible=false;
  eny4.visible=false;
  eny5.visible=false;
  eny6.visible=false;
  eny7.visible=false;

  R.visible=false;
  L.visible=false;
}

//create function to set timmer
function timerset()
{
  count=time.value();
}

