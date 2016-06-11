    var    H = 400,
        W = 900,
        INTERVAL = 30,
        backgroundImg = null,
        backgroundColor = 'beige';

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
    // var mud = new Mud;
    // var mudFlying = false;
    // var gameOver = false;
    // var slingLeftBracketX = 380;
    // var slingLeftBracketY = 360;
    var weeksElapsedKey = "week10";
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
      if (Date.now() - time > 1000*60*3){
      // if(true){
        console.log("games over dude");
        clearInterval(round);
      }

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
      drawTrimesterInfo(context);
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
      context.drawImage(this.image, 470, 210, 380, 200); 
    }
    function drawDirections(context){
      this.image = new Image();
      this.image.src = "slingshot-game-images/directions.png";
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
          // context.beginPath();
          // context.moveTo(200,200)
          // context.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
          // context.fillStyle = this.color;
          // context.fill()
          context.drawImage(this.image, baby.x, baby.y, baby.width, baby.height)
        }
      }


    function LeftCord() {
            // position
            this.x = 670;
            this.y = 230;
            // this.cordWidth = 7;
            this.color = "tan";
            this.draw = function(context){
                context.beginPath();
                context.moveTo(560,70) //(slingLeftBracketX, slingLeftBracketY )//(330,400);
                context.lineTo(this.x, this.y);
                context.strokeStyle=this.color;
                // (this.x < 175) ? this.cordWidth = 5 : this.cordWidth = 9;
                context.lineWidth= 2; //this.cordWidth;   
                context.stroke();
            }
        }

      function RightCord() {
            // position
            this.x = 670;
            this.y = 230;
            // this.cordWidth = 19;
            this.color = "tan";
            this.draw = function(context){
                context.beginPath();
                context.moveTo(800, 70);
                context.lineTo(this.x, this.y);
                context.strokeStyle=this.color;
                // (this.x < 175) ? this.cordWidth = 7 : this.cordWidth = 10;
                context.lineWidth= 2; //this.cordWidth;   
                context.stroke();
            }
        }

      

      function drawText(context) {
          context.font = "25px Arial";
          context.fillStyle = "black";//"#0095DD";
          
          context.fillText( GlobalWeeksElapsed + ((GlobalWeeksElapsed === 1) ? " Week Completed" : " Weeks Completed" ), 550, 40);
          context.fillText( "Length:" + babyLength + " inches", 550, 70);
          context.fillText(babyWeight, 610, 370);
          // context.fillText("Shots Remaining: " + shotsRemaining , 610, 674);
        }


      function drawWelcome(context) {
        context.font = "35px Arial";
        context.fillStyle = "limegreen";//"#0095DD";
          
        context.fillText("You're Expecting!", 40, 40);
      } 

      function drawTrimesterInfo(context) {
        context.font = "25px Arial";
        context.fillStyle = "blue";//"#0095DD";
        context.fillText((GlobalWeeksElapsed < 43 &&  GlobalWeeksElapsed > 28 ) ? "The Third Trimester" : (GlobalWeeksElapsed > 14 && GlobalWeeksElapsed< 29) ? "The Second Trimester" : "The First Trimester" , 40, 70);
        context.fillText( "Length:" + babyLength + " inches", 40, 120);
        context.fillText(babyWeight, 40, 370);
        // context.fillText("Shots Remaining: " + shotsRemaining , 610, 674);
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

var byWeek = {
  "week0":[ .005, "0oz"],
  "week1":[ .01, "0oz"],
  "week2":[ .02, "0oz"],
  "week3":[ .03, "0oz"],
  "week4":[ .06, "0oz"],
  "week5":[ .13, "0oz"],
  "week6":[ .23, "0oz"],
  "week7":[ .33, "0oz"],
  "week8":[ .63, ".04oz"],
  "week9":[ .9, ".07oz"],
  "week10":[ 1.22, ".14oz"],
  "week11":[ 1.61, ".25oz"],
  "week12":[ 2.13, ".49oz"],
  "week13":[ 2.91, ".81oz"],
  "week14":[ 3.42, "1.52oz"],
  "week15":[ 3.98, "2.47oz"],
  "week16":[ 4.57, "3.53oz"],
  "week17":[ 5.12, "4.94oz"],
  "week18":[ 5.59, "6.70oz"],
  "week19":[ 6.02, "8.47oz"],
  "week20":[ 6.46, "10.58oz"],
  "week21":[ 10.51, "12.7oz"],
  "week22":[ 10.94, "15.17oz"],
  "week23":[ 11.38, "1.1lbs"],
  "week24":[ 11.81, "1.32lbs"],
  "week25":[ 13.62, "1.46lbs"],
  "week26":[ 14.02, "1.68lbs", 35.6, 760],
  "week27":[ 14.41, "1.93lbs", 36.6, 875],
  "week28":[ 14.80, "2.22", 37.6, 1005],
  "week29":[ 15.2, "2.54lbs", 38.6, 1153],
  "week30":[ 15.71, "2.91lbs", 39.9, 1319],
  "week31":[ .63, ".04oz"],
  "week32":[ .63, ".04oz"],
  "week33":[ .63, ".04oz"],
  "week34":[ .63, ".04oz"],
  "week35":[ .63, ".04oz"],
  "week36":[ .63, ".04oz"],
  "week37":[ .63, ".04oz"],
  "week38":[ .63, ".04oz"],
  "week39":[ .63, ".04oz"],
  "week40":[ .63, ".04oz"],
  "week41":[ .63, ".04oz"],
  "week42":[ 20.28, "8.12lbs"],
}

var byWeek ={
  "week0":[ .005, "0oz"],
  "week1":[ .01, "0oz"],
  "week2":[ .02, "0oz"],
  "week3":[ .03, "0oz"],
  "week4":[ .06, "0oz"],
  "week5":[ .13, "0oz"],
  "week6":[ .23, "0oz"],
  "week7":[ .33, "0oz"],
  "week8": [0.63, "0.04ounces",  1.6,  1 ],
  "week9": [0.90, "0.07ounces",  2.3,  2 ],
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
  "week21": [  10.08, "10.58ounces",  25.6, 300 ],
  "week22": [  10.51, "12.70ounces",  26.7, 360 ],
  "week23": [  10.94, "15.17ounces",  27.8, 430 ],
  "week24": [  11.38, "1.10pounds", 28.9, 501 ],
  "week25": [  11.81, "1.32pounds", 30, 600 ],
  "week26": [  13.62, "1.46pounds", 34.6, 660 ],
  "week27": [  14.02, "1.68pounds", 35.6, 760 ],
  "week28": [  14.41, "1.93pounds", 36.6, 875 ],
  "week29": [  14.80, "2.22pounds", 37.6, 1005 ],
  "week30": [  15.20,  "2.54pounds", 38.6, 1153 ],
  "week31": [  15.71,  "2.91pounds", 39.9, 1319 ],
  "week32": [  16.18,  "3.31pounds", 41.1, 1502 ],
  "week33": [  16.69,  "3.75pounds", 42.4, 1702 ],
  "week34": [  17.20,  "4.3pounds", 43.7, 1918 ],
  "week35": [  17.72,  "4.73pounds", 45, 2146 ],
  "week36": [  18.19,  "5.25pounds", 46.2, 2383 ],
  "week37": [  18.66,  "5.78pounds", 47.4, 2622 ],
  "week38": [  19.13,  "6.30pounds", 48.6, 2859 ],
  "week39": [  19.61,  "6.80pounds", 49.8, 3083 ],
  "week40": [  19.96,  "7.25pounds", 50.7, 3288 ],
  "week41": [  20.16,  "7.63pounds", 51.2, 3462 ],
  "week42": [  20.35,  "7.93pounds", 51.7, 3597 ],
  "week43": [  20.28,  "8.12pounds", 51.5, 3685 ]
}

        