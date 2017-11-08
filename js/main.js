var app = angular
  .module('pregnancyCalendar', ['ui.bootstrap'])
  .run(function($rootScope) {
    $rootScope.conceptionDate = new Date(); //todo: do I really need this?
  });

app.controller('PregnancyCtrl', function(
  $scope,
  $rootScope,
  $timeout,
  $window
) {
  $scope.events = [];
  $window.GlobalWeeksElapsed = 20;
  $rootScope.currentClick = new Date();
  $rootScope.conceptionDate = new Date();
  setDueDate();

  $scope.$watch('currentClick', function() {
    // canvas needs the number of weeks elapsed - I inefficiently make the same calculation 3 times for most cases - worried about asynchrony issues
    if (weeksElapsed($rootScope.currentClick) < 0) {
      $window.GlobalWeeksElapsed = 0; //canvas only displays weeks during pregnancy
    } else if (weeksElapsed($rootScope.currentClick) < 44) {
      $window.GlobalWeeksElapsed = weeksElapsed($rootScope.currentClick);
    } else {
      $window.GlobalWeeksElapsed = 43; //canvas only displays weeks during pregnancy
    }
  });

  $scope.$watch('conceptionDate', function() {
    $scope.setPregnancyCalendar(weeksIntoYear());
    $rootScope.conceptionWeekday = $rootScope.conceptionWeekday;
    setDueDate();
    $scope.events = [
      { date: $rootScope.conceptionDate, status: 'pregnancy-conception' },
      { date: $rootScope.dueDate, status: 'pregnancy-due-date' }
    ];
    $timeout(function() {
      //experiment with ways using promises or other passed references to avoid timeout ?
      // $rootScope.$apply(); todo: experiment more with or without broadcast > understand it better
      $scope.$broadcast();
    }, 2000);
  });

  function weeksIntoYear() {
    // how many weeks are we into the year? this will be passed to uib in reversed sign
    var timeIntoYear =
      $rootScope.conceptionDate -
      new Date($rootScope.conceptionDate.getFullYear(), 0, 1);
    var weeksOffset = Math.floor(
      Math.round(timeIntoYear / (7 * 24 * 60 * 60 * 1000))
    );
    return weeksOffset;
  }

  function setDueDate() {
    $rootScope.dueDate = new Date(
      $rootScope.conceptionDate.getTime() + 280 * 24 * 60 * 60 * 1000
    );
    return setDueDate;
  }

  function weeksElapsed(clickedDate) {
    // how many weeks between conception date and current clicked date //added 10 seconds to allow for weird JS math anomaly
    return Math.floor(
      (clickedDate - $rootScope.conceptionDate + 10000) /
        (7 * 24 * 60 * 60 * 1000)
    );
  }

  //initiates the row of 11 months - which are each calendar objects
  $scope.setPregnancyCalendar = function(offset) {
    $scope.pregnancyMonths = [];
    var setterDate = new Date($rootScope.conceptionDate);
    //prepare an area of dates at least but not more than one month apart ... other ways to do this
    for (var i = 0; i < 11; i++) {
      var monthSetter = {};
      i === 0
        ? (monthSetter.dt = setterDate + 0)
        : (monthSetter.dt = setterDate.setDate(32));
      monthSetter.options = {
        customClass: getDayClass,
        showWeeks: true,
        conceptionOffsetWeeks: -offset,
        masterCalendar: false,
        shortcutPropagation: true //this didn't do what I expected: ended  up commenting out keypress listeners
      };

      $scope.pregnancyMonths.push(monthSetter);
    }
  };

  //call the pregnancy month initiation function
  $scope.setPregnancyCalendar();

  //use today's date to set scope for uib-picker that will create standard picker in view
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  //this object creates the larger calendar used to pick a date from all dates - uses more standard uib-datepicker
  $scope.optionsConception = {
    customClass: getDayClass,
    minDate: new Date() - 1000 * 60 * 60 * 24 * 365 * 30,
    // conceptionOffsetWeeks: 0,
    showWeeks: false,
    masterCalendar: true,
    shortcutPropagation: true
  };

  //I'm not sure what this example was for... I believe that it might help use date-parser in uib library ?
  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  // this was a function in the UIBoostrap demo - it ends up iterating through every date displayed on current calendars
  // is it ? vital to updating classes beyond the custom classes it sets
  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }
});
