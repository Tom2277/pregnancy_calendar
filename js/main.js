var app = angular.module('pregnancyCalendar', ['ui.bootstrap']) //,
 .run(function($rootScope){
  $rootScope.visitor = "Welcome Visitor: ";
  $rootScope.conceptionDate = new Date();
  // $rootScope.masterCalendar = true;
 })
app.controller('mainPregnancy', function($scope, $window) {
  $scope.message = "message from the main controller"
  
 
 
});
 

app.controller('PregnancyCtrl', function ($scope, $rootScope, $timeout, $window) {
  // $scope.dt = new Date();//$scope.setDate(2016, 01, 01)

  
    $window.GlobalWeeksElapsed = 20;

  $scope.events = [
    // { date: $scope.today, status: 'full' },
    // { date: afterTomorrow, status: 'partially' }
  ];

  $rootScope.currentClick =  new Date(); //$scope.dt ||
  $rootScope.conceptionDate =  new Date();
  setDueDate();

  $scope.$watch('currentClick', function(){
    // console.log("current events are " + $scope.events)
    // canvas needs the number of weeks elapsed
    $window.GlobalWeeksElapsed = (weeksElapsed($rootScope.currentClick) < 44) ? weeksElapsed($rootScope.currentClick) : 43;
    console.table($scope.events);
    // console.log($window.currentWeek);
  })

  $scope.$watch('conceptionDate', function(){
    console.log("new conceptionDate set " + $rootScope.conceptionDate);
    $scope.setPregnancyCalendar(weeksIntoYear());
    $rootScope.conceptionWeekday = $rootScope.conceptionWeekday;
    setDueDate();
    console.log("watch on conceptionDate triggered");
    $scope.events = [
      { date: $rootScope.conceptionDate, status: 'pregnancy-conception' },
      { date: $rootScope.dueDate, status: 'pregnancy-due-date' }
    ];
    $timeout( function(){
        // $rootScope.$apply();
        $scope.$broadcast();
        console.log("timeout finished");
      }, 2000);
  })


  // $scope.weeksIntoYear = function(){
 function weeksIntoYear(){
  console.log('weeksIntoYear')
    var timeIntoYear = $rootScope.conceptionDate - new Date($rootScope.conceptionDate.getFullYear(), 0 , 1);
    var weeksOffset = Math.floor(Math.round(timeIntoYear/(7*24*60*60*1000)));
    return weeksOffset;
  }
  
  function setDueDate(){
    console.log("set due date called")
    $rootScope.dueDate = new Date($rootScope.conceptionDate.getTime() + 280*24*60*60*1000);
    return setDueDate;
  }

  function weeksElapsed(currentDate){
    // var currentWeek = 
    return Math.floor((currentDate - $rootScope.conceptionDate)/(7*24*60*60*1000))
  }


  $scope.setPregnancyCalendar = function(offset){
    $scope.pregnancyMonths = [];
    console.log(offset)
    var setterDate = new Date($rootScope.conceptionDate );
    for (var i = 0; i < 11; i++) {
      var monthSetter = {};
      (i === 0) ? monthSetter.dt = setterDate + 0 : monthSetter.dt = setterDate.setDate(32);

      // $scope.events.push({ date: monthSetter.dt, status: "pastClicked" });
      
      monthSetter.options = {
        customClass: getDayClass, //'redbackground',
        // minDate: new Date() - 1000*60*60*24*365*30,
        showWeeks: true,
        conceptionOffsetWeeks: - offset ,
        masterCalendar: false,
        shortcutPropagation: true
      }

      $scope.pregnancyMonths.push(monthSetter);

    }
  }
  $scope.setPregnancyCalendar();


  function setClass(date){

  }


  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.optionsConception = {
    customClass: getDayClass,
    minDate: new Date() - 1000*60*60*24*365*30,
    // startingDay: (new Date() - 1000*60*60*24*365*10 ),//ten years ago ?
    // conceptionOffsetWeeks: 0,
    showWeeks: false,
    masterCalendar: true,
    shortcutPropagation: true
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  // $scope.toggleMin = function() {
  //   $scope.options.minDate = $scope.options.minDate ? null : new Date();
  // };

  // $scope.toggleMin();

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };
 //default is first of 2016
 // $scope.dt = $scope.setDate(2016, 01, 01)


  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date(tomorrow);
  afterTomorrow.setDate(tomorrow.getDate() + 1);

  //temporary
  var redDate = new Date();



  function getDayClass(data) {
    console.log("get day class ran")
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }
});


// app.directive("getPlayerInfo", function($compile) {
//   return function(FOOscope, FOOelement, attrs){
 
//     // The template
//     var playerList = "<ul><li ng-repeat='player in players'>{{player.name}}</li></ul>";
 
//     // Wrap it in a jqLite object
//     var listElem = angular.element(playerList);
 
//     // Create the compile function which
//     // generates are HTML
//     var compileFunc = $compile(listElem);
 
//     // Process our content
//     compileFunc(FOOscope);
 
//     // Update our jqLite object and add it to the
//     // document
//     FOOelement.append(listElem);
//  }});