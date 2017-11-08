var H = 400,
  W = 900,
  INTERVAL = 30;

var GlobalWeeksElapsed = 0; //provide a default while loading
var trimesterIndex = 0;
var trimesterText = {};
var byWeek = {};
var weeksElapsedKey = 'week0';
var stateChangeWatcher = GlobalWeeksElapsed + 999;
var baby = new Baby();
var leftCord = new LeftCord();
var rightCord = new RightCord();
var trimesterInfo = new TrimesterInfo();
var magnifyingGlass = new MagnifyingGlass();
var time = Date.now();
var babyLength = 27;
var babyWeight = '8lbs3oz';

window.onload = function() {
  var c = document.getElementById('canvas'),
    context = c.getContext('2d');
  initiateConstants();
  round = setInterval(function() {
    time = Date.now();

    update();
    draw(context);
  }, INTERVAL);
  round;
};

function update() {
  GlobalWeeksElapsed
    ? (weeksElapsedKey = 'week' + GlobalWeeksElapsed)
    : (weeksElapsedKey = 'week0');
  GlobalWeeksElapsed < 44 && GlobalWeeksElapsed >= 28
    ? (trimesterIndex = 2)
    : GlobalWeeksElapsed > 12 && GlobalWeeksElapsed < 28
      ? (trimesterIndex = 1)
      : (trimesterIndex = 0);
  // hack to refresh trimester on change in UI outside of canvas
  if (stateChangeWatcher !== GlobalWeeksElapsed + 999) {
    trimesterInfo = new TrimesterInfo();
    trimesterInfo.vx = 1;
    stateChangeWatcher = GlobalWeeksElapsed + 999;
  }

  trimesterInfo.x = trimesterInfo.x + trimesterInfo.vx;
  if (trimesterInfo.x < 21) {
    trimesterInfo.vx += 1;
  }
  if (trimesterInfo.x >= 23) {
    trimesterInfo.vx = 0;
    trimesterInfo.x = 25;
  }

  babyLength = 0 || byWeek[weeksElapsedKey][0]; //GlobalBabyLength;
  babyWeight = 0 || byWeek[weeksElapsedKey][1]; //GlobalBabyLength;

  //update baby location based on size
  baby.width = babyLength * 18;
  baby.height = baby.width / 2;
  baby.x = 670 - baby.width / 2;
  baby.y = 230 - baby.height / 2;

  leftCord.x = baby.x;
  leftCord.y = baby.y + baby.height / 2;
  rightCord.x = baby.x + baby.width;
  rightCord.y = baby.y + baby.height / 2;
}

function draw(context) {
  clearCanvas(context);

  drawBabyScale(context);
  leftCord.draw(context);
  rightCord.draw(context);
  baby.draw(context);
  drawLengthWeight(context);
  // drawWelcome(context);
  trimesterInfo.draw(context);
  drawBulletPoints(context);
  if (GlobalWeeksElapsed < 10) {
    magnifyingGlass.draw(context);
  }
}

function clearCanvas(context) {
  // var backgroundImage= new Image()
  // backgroundImage.src = "johnOfficeStaff.png"
  // context.drawImage(backgroundImage , -70, -150, 1020, 604);
  context.beginPath();
  context.rect(0, 0, W, H);
  context.fillStyle = 'white'; //'#e6eef1' //'#87CEEB';//"rgba(0,0,0, 0.15)" ;//black filter for photo;
  context.fill();
}

function drawBabyScale(context) {
  this.image = new Image();
  this.image.src = 'images/baby-scale.png';
  context.drawImage(this.image, 493, 210, 380, 200);
}

function Baby() {
  this.x = 685;
  this.y = 230;
  this.vx = 0;
  this.vy = 0;
  this.color = 'peru';
  this.image = new Image();
  this.image.src = 'images/posterized-baby.png';
  this.draw = function(context) {
    context.drawImage(this.image, baby.x, baby.y, baby.width, baby.height);
  };
}

function MagnifyingGlass() {
  this.x = 695;
  this.y = 215;
  this.draw = function(context) {
    this.image = new Image();
    this.image.src = 'images/magnifying-glass.png';
    context.drawImage(this.image, this.x, this.y, 100, 100);
  };
}

function LeftCord() {
  this.x = 670;
  this.y = 230;
  this.color = 'tan';
  this.draw = function(context) {
    context.beginPath();
    context.moveTo(575, 75);
    context.lineTo(this.x, this.y);
    context.strokeStyle = this.color;
    context.lineWidth = 3;
    context.stroke();
  };
}

function RightCord() {
  this.x = 670;
  this.y = 230;
  this.color = 'tan';
  this.draw = function(context) {
    context.beginPath();
    context.moveTo(765, 75);
    context.lineTo(this.x, this.y);
    context.strokeStyle = this.color;
    context.lineWidth = 3;
    context.stroke();
  };
}

function drawLengthWeight(context) {
  // backdrop for week and length
  context.beginPath();
  context.rect(502, 15, 350, 80);
  context.fillStyle = 'white';
  context.fill();
  //
  context.beginPath();
  context.rect(585, 345, 200, 40);
  context.fillStyle = 'white';
  context.fill();
  //
  context.font = '35px Arial';
  context.fillStyle = 'dimgrey';

  context.fillText(
    GlobalWeeksElapsed +
      (GlobalWeeksElapsed === 1 ? ' Week Completed' : ' Weeks Completed'),
    515,
    50
  );
  context.fillText('Length: ' + babyLength + ' inches', 533, 85);
  context.fillText(babyWeight, 590, 375);
}

// site name or welcome on canvas?
// function drawWelcome(context) {
//   context.font = "40px Arial";
//   context.fillStyle =  "white";
//   context.fillText("When You're Expecting!", 40, 40);
// }

function TrimesterInfo() {
  this.x = -750;
  this.y = 50;
  this.vx = 0;
  this.vy = 0;
  this.draw = function(context) {
    drawTrimesterBackdrop(context);
    this.message = trimesterText.trimester[trimesterIndex];
    context.font = '35px Arial';
    context.fillStyle = '#00AEEF';
    context.fillText(this.message, this.x, this.y);
  };
}
function drawTrimesterBackdrop(context) {
  this.trimesterBackdropColor =
    GlobalWeeksElapsed < 44 && GlobalWeeksElapsed >= 28
      ? '#FEFF10'
      : GlobalWeeksElapsed > 12 && GlobalWeeksElapsed < 28
        ? 'greenyellow'
        : 'lightcyan';
  context.beginPath();
  context.rect(trimesterInfo.x - 5, 15, 353, 45);
  context.fillStyle = this.trimesterBackdropColor;
  context.fill();
}

function drawBulletPoints(context) {
  // drawBulletPointsBackdrop(context);
  context.font = '20px Arial';
  context.fillStyle = 'orange'; //'#fd9592'; //'black'; //"white";
  context.fillText(trimesterText.line1[trimesterIndex], trimesterInfo.x, 100);
  context.fillText(trimesterText.line2[trimesterIndex], trimesterInfo.x, 125);
  context.fillText(trimesterText.line3[trimesterIndex], trimesterInfo.x, 150);
  context.font = '20px Arial';
  context.fillStyle = 'dimgrey';
  context.fillText(trimesterText.bullet1[trimesterIndex], trimesterInfo.x, 190);
  context.fillText(trimesterText.bullet2[trimesterIndex], trimesterInfo.x, 215);
  context.fillText(trimesterText.bullet3[trimesterIndex], trimesterInfo.x, 240);
  context.fillText(trimesterText.bullet4[trimesterIndex], trimesterInfo.x, 265);
  context.fillText(trimesterText.bullet5[trimesterIndex], trimesterInfo.x, 290);
  context.fillText(trimesterText.bullet6[trimesterIndex], trimesterInfo.x, 315);
  context.font = '20px Arial';
  context.fillStyle = '#498fa9'; //"white";
  context.fillText(trimesterText.link1[0], trimesterInfo.x, 350);
  context.fillText(trimesterText.link2[0], trimesterInfo.x, 375);
}

// for using a photo as a canvas backdrop
// function drawBulletPointsBackdrop(context){
//   this.bulletPointsBackdropColor = "rgba(0,0,0, 0.30)" ;
//   context.beginPath();
//   context.rect(trimesterInfo.x -5 , 100 , 470, 300); //trimesterInfo.y
//   context.fillStyle = this.bulletPointsBackdropColor;
//   context.fill();
// }

function initiateConstants() {
  // data about pregnancy
  byWeek = {
    week0: [0.01, '0.01 ounces'],
    week1: [0.01, '0.01 ounces'],
    week2: [0.02, '0.01 ounces'],
    week3: [0.03, '0.01 ounces'],
    week4: [0.06, '0.01 ounces'],
    week5: [0.13, '0.01 ounces'],
    week6: [0.23, '0.02 ounces'],
    week7: [0.33, '0.02 ounces'],
    week8: [0.63, '0.04 ounces', 1.6, 1],
    week9: [0.9, '0.07 ounces', 2.3, 2],
    week10: [1.22, '0.14 ounces', 3.1, 4],
    week11: [1.61, '0.25 ounces', 4.1, 7],
    week12: [2.13, '0.49 ounces', 5.4, 14],
    week13: [2.91, '0.81 ounces', 7.4, 23],
    week14: [3.42, '1.52 ounces', 8.7, 43],
    week15: [3.98, ' 2.47 ounces', 10.1, 70],
    week16: [4.57, ' 3.53 ounces', 11.6, 100],
    week17: [5.12, ' 4.94 ounces', 13, 140],
    week18: [5.59, ' 6.70 ounces', 14.2, 190],
    week19: [6.02, ' 8.47 ounces', 15.3, 240],
    week20: [6.46, '10.6 ounces', 16.4, 300],
    week21: [10.1, '10.6 ounces', 25.6, 300],
    week22: [10.5, '12.7 ounces', 26.7, 360],
    week23: [10.9, '15.2 ounces', 27.8, 430],
    week24: [11.4, '1.10 pounds', 28.9, 501],
    week25: [11.8, '1.32 pounds', 30, 600],
    week26: [13.6, '1.46 pounds', 34.6, 660],
    week27: [14.1, '1.68 pounds', 35.6, 760],
    week28: [14.4, '1.93 pounds', 36.6, 875],
    week29: [14.8, '2.22 pounds', 37.6, 1005],
    week30: [15.2, '2.54 pounds', 38.6, 1153],
    week31: [15.7, '2.91 pounds', 39.9, 1319],
    week32: [16.2, '3.31 pounds', 41.1, 1502],
    week33: [16.7, '3.75 pounds', 42.4, 1702],
    week34: [17.2, '4.3 pounds', 43.7, 1918],
    week35: [17.7, '4.73 pounds', 45, 2146],
    week36: [18.2, '5.25 pounds', 46.2, 2383],
    week37: [18.7, '5.78 pounds', 47.4, 2622],
    week38: [19.1, '6.30 pounds', 48.6, 2859],
    week39: [19.6, '6.80 pounds', 49.8, 3083],
    week40: [19.9, '7.25 pounds', 50.7, 3288],
    week41: [20.2, '7.63 pounds', 51.2, 3462],
    week42: [20.4, '7.93 pounds', 51.7, 3597],
    week43: [20.6, '8.12 pounds', 51.5, 3685],
    week44: [20.28, '8.12 pounds', 51.5, 3685],
    week45: [20.28, '8.12 pounds', 51.5, 3685],
    week46: [20.28, '8.12 pounds', 51.5, 3685],
    week47: [20.28, '8.12 pounds', 51.5, 3685],
    week48: [20.28, '8.12 pounds', 51.5, 3685],
    week49: [20.28, '8.12 pounds', 51.5, 3685],
    week50: [20.28, '8.12 pounds', 51.5, 3685],
    week51: [20.28, '8.12 pounds', 51.5, 3685],
    week52: [20.28, '8.12 pounds', 51.5, 3685],
    week53: [20.28, '8.12 pounds', 51.5, 3685]
  };

  trimesterText = {
    trimester: [
      'The First Trimester',
      'The Second Trimester',
      'The Third Trimester'
    ],
    line1: [
      "Your period stopping is a clear sign you're pregnant.",
      'Your abdomen will expand as the baby grows',
      "You're almost there!"
    ],
    line2: [
      "Hormonal changes affect most of your body's organs.",
      'Soon you will feel your baby beginning to move!',
      'Second trimester discomforts will continue.'
    ],
    line3: [
      'Symptoms can occur even in the very first weeks of pregnancy:',
      'To make room for your growing baby, you may have:',
      "The baby's growth puts more pressure on your organs:"
    ],
    bullet1: [
      '- Extreme tiredness, Mood Swings, Headaches',
      '- Body aches, back, abdomen, groin, or thigh pain',
      '- Breathing difficulty, shortness of breath'
    ],
    bullet2: [
      '- Tender, swollen breasts, Weight gain or loss',
      '- Stretch marks on your abdomen, breasts, or thighs',
      '- Trouble Sleeping, Heartburn, Hemorrhoids'
    ],
    bullet3: [
      '- Upset stomach (morning sickness)',
      '- A line running from belly button to pubic hairline',
      '- Tender breasts may leak a watery pre-milk'
    ],
    bullet4: [
      '- Cravings or distaste for certain foods',
      '- Patches of darker skin on cheeks, forehead, nose, or upper lip',
      '- Your belly button may stick out'
    ],
    bullet5: [
      '- Constipation or need to pass urine more often',
      '- Numbness or Tingling of hands, itching of abdomen',
      '- The baby "dropping", or moving lower in your abdomen'
    ],
    bullet6: [
      '- and more. Visit a health care specialist ASAP',
      '- Many intense symptoms require a Doctor for safety!',
      '- Contractions, which can be a sign of labor'
    ],
    link1: ['Prenatal care is vital for your health and safety!'],
    link2: ['Visit the WomemsHealth.gov site linked below to get started!']
  };
}
