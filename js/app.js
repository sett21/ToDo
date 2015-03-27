angular.module('MegaTodo', []);
function TodoCtrl($scope) {
  $scope.todos = [
    {
      isRunning: false,
      text:'learn angular', 
      done:false,
      project: "name 1" ,
      lastStarted: null,
      time: 0,
    },
    {
      isRunning: false,
      text:'learn angular 2', 
      done:false,
      project: "name 1" ,
      lastStarted: null,
      time: 0,
    },
  ];

  $scope.attribute = [
    {project: "name 1"},
    {project: "name 2"},
    {project: "name 3"},
    {project: "name 4"},
  ];

  $scope.timerRunning = false;

  $scope.addTodo = function() {
    $scope.todos.push({text:$scope.todoText, project:$scope.todoAttr, lastStarted: null, time: 0, done:false, ddate:'0d 0h 0m 0s'});
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
      if (!todo.done) $scope.todos.push(todo);
    });
  };

  $scope.currentTask = "";

  $scope.toggleTask = function(task) {
    task.isRunning = !task.isRunning;
    if (task.isRunning) {
      task.lastStarted = new Date();
      console.log(task.lastStarted);
    } else {
      task.time += (new Date().getTime() - task.lastStarted.getTime());
      console.log(task.time);
    }
  };
}

TodoCtrl.$inject = ['$scope'];