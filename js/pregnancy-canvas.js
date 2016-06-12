    var    H = 400,
        W = 900,
        INTERVAL = 30,
        backgroundImg = null,
        backgroundColor = 'beige';

    var GlobalWeeksElapsed = 0; //provide a default while loading
    var weeksElapsedKey = "week0";
    var stateChangeWatcher = GlobalWeeksElapsed + 999; 
    // var rightPressed = false;
    // var leftPressed = false;
    // var upPressed = false;
    // var downPressed = false;
    // var spacePressed = false;
    // var pPressed = false;
    // var enterPressed = false;
    var baby = new Baby;
    var leftCord = new LeftCord;
    var rightCord = new RightCord;
    var trimesterInfo = new TrimesterInfo;
    var trimesterDirections = new TrimesterDirections;
    var magnifyingGlass = new MagnifyingGlass;
    // var mud = new Mud;
    // var mudFlying = false;
    // var gameOver = false;
    var time = Date.now();
    var babyLength = 27;
    var babyWeight = "8lbs3oz";
    // var SoundEffects = {
    //   phhft : new Audio("phhft.mp3")
    // } //todo: try moving more sounds here.


    window.onload = function(){
      var c = document.getElementById("canvas"),
          context = c.getContext("2d");
      //yet another global variable for round
      round =  setInterval(
        function(){
          time = Date.now();

          update();
          draw(context);
        }, INTERVAL)
      round
    }

    function update(){
      
      (GlobalWeeksElapsed) ? weeksElapsedKey = "week" + GlobalWeeksElapsed : "week10";

      // console.log(time)
      console.log(window.GlobalWeeksElapsed);


      if (stateChangeWatcher !== GlobalWeeksElapsed + 999){
        trimesterInfo = new TrimesterInfo;
        trimesterInfo.vx = 1;
        stateChangeWatcher = GlobalWeeksElapsed + 999;
      }

      trimesterInfo.x = trimesterInfo.x + trimesterInfo.vx;
      if (trimesterInfo.x< 35){trimesterInfo.vx += 1;}
      if (trimesterInfo.x >= 38){ trimesterInfo.vx = 0; trimesterInfo.x = 40 }

      babyLength = 0 || byWeek[weeksElapsedKey][0] ;//GlobalBabyLength;
      babyWeight = 0 || byWeek[weeksElapsedKey][1] ;//GlobalBabyLength;

      //update baby location based on size
      baby.width = babyLength * 18;
      baby.height = baby.width/2;
      baby.x = 670 - baby.width/2;
      baby.y = 230 - baby.height/2;

      leftCord.x = baby.x
      leftCord.y = baby.y + baby.height/2;
      rightCord.x = baby.x + baby.width;
      rightCord.y = baby.y + baby.height/2;
      // if (Date.now() - time > 1000*60*3){
      // // if(true){
      //   console.log("games over dude");
      //   clearInterval(round);
      // }

    }

    function draw(context){
      clearCanvas(context);
      
      // if (gameOver){ drawVictoryMessage(context);}
      // mud.draw(context);
      // deadMudManager.draw(context);
      // clintonTargetManager.draw(context);
      // trumpScoreBar.draw(context);
      // clintonScoreBar.draw(context);
      // drawDirections(context);
      drawBabyScale(context);
      leftCord.draw(context);
      rightCord.draw(context);
      baby.draw(context);
      drawText(context);
      drawWelcome(context);
      trimesterInfo.draw(context);
      trimesterDirections.draw(context);
      if (GlobalWeeksElapsed < 10){magnifyingGlass.draw(context)}
    }

    function clearCanvas(context){
      context.beginPath();
      context.rect(0,0, W, H);
      context.fillStyle = backgroundColor;
      context.fill();
    }


    function drawBabyScale(context){
      this.image = new Image();
      this.image.src = "baby-scale.png";
      context.drawImage(this.image, 478, 210, 380, 200); 
    }
    function drawDirections(context){
      this.image = new Image();
      this.image.src = "trimesterDirections.png";
      context.drawImage(this.image, 12, 100); 
    }

     
    function Baby(){
      this.x = 670;
      this.y = 230;
      this.vx = 0;
      this.vy = 0;
      this.color = "peru";
      this.image= new Image()
      this.image.src = "posterized-baby.png"
      this.draw = function(context){
        context.drawImage(this.image, baby.x, baby.y, baby.width, baby.height);
      }
    }

    function LeftCord() {
      this.x = 670;
      this.y = 230;
      // this.cordWidth = 7;
      this.color = "tan";
      this.draw = function(context){
        context.beginPath();
        context.moveTo(555,70) //(slingLeftBracketX, slingLeftBracketY )//(330,400);
        context.lineTo(this.x, this.y);
        context.strokeStyle=this.color;
        // (this.x < 175) ? this.cordWidth = 5 : this.cordWidth = 9;
        context.lineWidth= 2; //this.cordWidth;   
        context.stroke();
      }
    }

    function RightCord() {
      this.x = 670;
      this.y = 230;
      // this.cordWidth = 19;
      this.color = "tan";
      this.draw = function(context){
        context.beginPath();
        context.moveTo(780, 70);
        context.lineTo(this.x, this.y);
        context.strokeStyle=this.color;
        // (this.x < 175) ? this.cordWidth = 7 : this.cordWidth = 10;
        context.lineWidth= 2; //this.cordWidth;   
        context.stroke();
      }
    }

      
    function drawText(context) {
      context.font = "22px Arial";
      context.fillStyle = "black";//"#0095DD";
      
      context.fillText( GlobalWeeksElapsed + ((GlobalWeeksElapsed === 1) ? " Week Completed" : " Weeks Completed" ), 565, 40);
      context.fillText( "Length: " + babyLength + " inches", 573, 70);
      context.fillText(babyWeight, 611, 370);
    }


    function drawWelcome(context) {
      context.font = "35px Arial";
      context.fillStyle = "limegreen";   
      context.fillText("When You're Expecting!", 40, 40);
    } 

    function TrimesterInfo() {
      this.x = -250;
      this.y = 70;
      this.vx = 0;
      this.vy = 0;
      this.message = (GlobalWeeksElapsed < 44 &&  GlobalWeeksElapsed >= 28 ) ? "The Third Trimester" : (GlobalWeeksElapsed > 12 && GlobalWeeksElapsed< 28) ? "The Second Trimester" : "The First Trimester" ;
      this.draw = function(context){
        context.font = "25px Arial";
        context.fillStyle = "blue";//"#0095DD";
        context.fillText(this.message, this.x, this.y);
      }
    } 

    function TrimesterDirections(){
      // this.x = -250;
      // this.y = 95;
      // this.vx = 0;
      // this.vy = 0;
      this.draw = function(context){
        this.imgageUrl = (GlobalWeeksElapsed < 44 &&  GlobalWeeksElapsed >= 28 ) ? "thirdTrimesterDirections.png" : (GlobalWeeksElapsed > 12 && GlobalWeeksElapsed< 28) ? "secondTrimesterDirections.png" : "firstTrimesterDirections.png" ;
        this.image= new Image();
        this.image.src = this.imgageUrl;
        context.drawImage(this.image, trimesterInfo.x, (trimesterInfo.y + 10));
      }    
    }

    function MagnifyingGlass(){
      this.x = 680;
      this.y = 210;
      // this.vx = 0;
      // this.vy = 0;
      this.draw = function(context){
        // this.imgageUrl = (GlobalWeeksElapsed < 44 &&  GlobalWeeksElapsed >= 28 ) ? "thirdTrimesterDirections.png" : (GlobalWeeksElapsed > 12 && GlobalWeeksElapsed< 28) ? "secondTrimesterDirections.png" : "firstTrimesterDirections.png" ;
        this.image= new Image();
        this.image.src = "magnifying-glass.png";
        context.drawImage(this.image, this.x, this.y, 100, 100)
      }    
    }

      // function drawVictoryMessage(context) {
      //   var message = "A tie creates political chaos!"
      //     context.font = "30px Arial";
      //     context.fillStyle = "black";//"#0095DD";
      //     if (clintonVote > trumpVote){
      //       message= "Hillary Clinton Wins"
      //     }else if(trumpVote > clintonVote){ message = "Trump Wins"}
      //     context.fillText(message, 300, 230);
      //     context.fillText("Press Enter to Play Again", 300, 262);
      //   }

  
      // document.addEventListener("keydown", keyDownHandler, false);
      // document.addEventListener("keyup", keyUpHandler, false);
      // document.addEventListener("keydown", function (e) { //disables scrolling
      //   if([37,38,39,40,32].indexOf(e.keyCode) > -1){ e.preventDefault(); } 
      // }, false);

      // function keyDownHandler(e) {
      //       if(e.keyCode == 39) {
      //           rightPressed = true;
      //       }
      //       else if(e.keyCode == 37) {
      //           leftPressed = true;
      //       }
      //       else if(e.keyCode == 38){
      //           upPressed = true;
      //       }
      //       else if(e.keyCode == 40){
      //           downPressed = true;
      //       }
      //       else if(e.keyCode == 32){
      //           spacePressed = true;
      //       }
      //       else if(e.keyCode == 80){
      //           pPressed = true;
      //       }
      //       else if(e.keyCode == 13){
      //           enterPressed = true;
      //       }
      //   }

      //   function keyUpHandler(e) {
      //       if(e.keyCode == 39) {
      //           rightPressed = false;
      //       }
      //       else if(e.keyCode == 37) {
      //           leftPressed = false;
      //       }
      //       else if(e.keyCode == 38){
      //           upPressed = false;
      //       }
      //       else if(e.keyCode == 40){
      //           downPressed = false;
      //       }
      //       else if(e.keyCode == 32){
      //           spacePressed = false;
      //       }
      //       else if(e.keyCode == 80){
      //           pPressed = false;
      //       }
      //       else if(e.keyCode == 13){
      //           enterPressed = false;
      //       }
      //   }



var byWeek ={
  "week0":  [  0.01, "0.01ounces"],
  "week1":  [  0.01, "0.01ounces"],
  "week2":  [  0.02, "0.01ounces"],
  "week3":  [  0.03, "0.01ounces"],
  "week4":  [  0.06, "0.01ounces"],
  "week5":  [  0.13, "0.01ounces"],
  "week6":  [  0.23, "0.02ounces"],
  "week7":  [  0.33, "0.02ounces"],
  "week8":  [  0.63, "0.04ounces",  1.6,  1 ],
  "week9":  [  0.90, "0.07ounces",  2.3,  2 ],
  "week10": [  1.22, "0.14ounces",  3.1,  4 ],
  "week11": [  1.61, "0.25ounces",  4.1,  7 ],
  "week12": [  2.13, "0.49ounces",  5.4,  14 ],
  "week13": [  2.91, "0.81ounces",  7.4,  23 ],
  "week14": [  3.42, "1.52ounces",  8.7,  43 ],
  "week15": [  3.98," 2.47ounces", 10.1, 70 ],
  "week16": [  4.57," 3.53ounces", 11.6, 100 ],
  "week17": [  5.12," 4.94ounces", 13, 140 ],
  "week18": [  5.59," 6.70ounces", 14.2, 190 ],
  "week19": [  6.02," 8.47ounces", 15.3, 240 ],
  "week20": [  6.46, "10.58ounces",  16.4, 300 ],
  "week21": [  10.1, "10.58ounces",  25.6, 300 ],
  "week22": [  10.5, "12.70ounces",  26.7, 360 ],
  "week23": [  10.9, "15.17ounces",  27.8, 430 ],
  "week24": [  11.4, "1.10pounds", 28.9, 501 ],
  "week25": [  11.8, "1.32pounds", 30, 600 ],
  "week26": [  13.6, "1.46pounds", 34.6, 660 ],
  "week27": [  14.1, "1.68pounds", 35.6, 760 ],
  "week28": [  14.4, "1.93pounds", 36.6, 875 ],
  "week29": [  14.8, "2.22pounds", 37.6, 1005 ],
  "week30": [  15.2,  "2.54pounds", 38.6, 1153 ],
  "week31": [  15.7,  "2.91pounds", 39.9, 1319 ],
  "week32": [  16.2,  "3.31pounds", 41.1, 1502 ],
  "week33": [  16.7,  "3.75pounds", 42.4, 1702 ],
  "week34": [  17.2,  "4.3pounds", 43.7, 1918 ],
  "week35": [  17.7,  "4.73pounds", 45, 2146 ],
  "week36": [  18.2,  "5.25pounds", 46.2, 2383 ],
  "week37": [  18.7,  "5.78pounds", 47.4, 2622 ],
  "week38": [  19.1,  "6.30pounds", 48.6, 2859 ],
  "week39": [  19.6,  "6.80pounds", 49.8, 3083 ],
  "week40": [  19.9,  "7.25pounds", 50.7, 3288 ],
  "week41": [  20.2,  "7.63pounds", 51.2, 3462 ],
  "week42": [  20.4,  "7.93pounds", 51.7, 3597 ],
  "week43": [  20.6,  "8.12pounds", 51.5, 3685 ],
  "week44": [  20.28,  "8.12pounds", 51.5, 3685 ],
  "week45": [  20.28,  "8.12pounds", 51.5, 3685 ],
  "week46": [  20.28,  "8.12pounds", 51.5, 3685 ],
  "week47": [  20.28,  "8.12pounds", 51.5, 3685 ],
  "week48": [  20.28,  "8.12pounds", 51.5, 3685 ],
  "week49": [  20.28,  "8.12pounds", 51.5, 3685 ],
  "week50": [  20.28,  "8.12pounds", 51.5, 3685 ],
  "week51": [  20.28,  "8.12pounds", 51.5, 3685 ],
  "week52": [  20.28,  "8.12pounds", 51.5, 3685 ],
  "week53": [  20.28,  "8.12pounds", 51.5, 3685 ]
}

        