var TodoCtrl = angular.module('TodoCtrl', ['timer']);



// Timer controller
TodoCtrl.controller('TimerController', ['$scope', '$http', function ($scope, $http) {
    
    $http.get('js/data/tasks.json').success(function(data) {
      $scope.todos = data;
    });

    $scope.timerType = '';

    $scope.startTimer = function (server, task){
        $scope.$broadcast('timer-start');
        $scope.timerRunning = true;
        task.lastStarted = new Date();
        console.log(task.timess);
    };

    $scope.stopTimer = function (server, task){
        $scope.$broadcast('timer-stop');
        $scope.timerRunning = false;
        task.timess += (new Date().getTime() - task.lastStarted.getTime());
        console.log(task.timess);
    };

    $scope.$on('timer-stopped', function (event, data) {
        return $scope.timeStop = data.millis;
    });
}]);
// PollingController.$inject = ['$scope'];


// Todo list controler
TodoCtrl.controller('TodoListCtrl', ['$scope', '$http', function ($scope, $http) {
    // Получение данных
  $http.get('js/data/tasks.json').success(function(data) {
    $scope.todos = data;
  });
  
  $scope.archiveTodo = [];

  $scope.addTodo = function() {
    $scope.todos.push({
      text:$scope.todoText, 
      project:$scope.todoAttr, 
      lastStarted: null, 
      timess: 0,
      done:false, 
      ddate:'0d 0h 0m 0s'
    });
    $scope.todoText = '';
  };

  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  $scope.resolved = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 1 : 0;
    });
    return count;
  };

  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) {
        $scope.todos.push(todo);
      } else {
        $scope.todos[todo].archive = true;
      }
    });
  };

  $scope.currentTask = "";


  // $scope.toggleTask = function(task) {
  //   task.isRunning = !task.isRunning;
  //   if (task.isRunning) {
  //     task.lastStarted = new Date();
  //     console.log(task.lastStarted);
  //   } else {
  //     task.time += (new Date().getTime() - task.lastStarted.getTime());
  //     console.log(task.time);
  //   }
  // };

}]);

// Archive controler
TodoCtrl.controller('TodoArchiveCtrl', ['$scope', '$http', function ($scope, $http) {
  $http.get('js/data/tasks.json').success(function(data) {
    $scope.todos = data;
  });
}]);

// TodoCtrl.controller('AddTodo', ['$scope',])

