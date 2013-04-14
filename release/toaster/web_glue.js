var WebGlue;

WebGlue = (function() {

  function WebGlue(useCase, todoListView, statsView, storage) {
    var _this = this;
    this.useCase = useCase;
    this.todoListView = todoListView;
    this.statsView = statsView;
    this.storage = storage;
    AutoBind(this.todoListView, this.useCase);
    After(this.todoListView, 'enterKeyPressed', function(content) {
      return _this.useCase.addNewTask(new Task(content));
    });
    After(this.useCase, 'addNewTask', this.todoListView.addNewTask);
    Before(this.useCase, 'showAll', function() {
      return _this.useCase.setInitialTasks(_this.storage.getTasks());
    });
    After(this.useCase, 'showAll', function() {
      return _this.todoListView.showTasks(_this.useCase.todoTasks);
    });
    AfterAll(this.useCase, ['addNewTask', 'updateTaskContent', 'deleteTask', 'completeAllTasks', 'toggleTaskCompletion'], function() {
      return _this.storage.set("tasks", _this.useCase.todoTasks);
    });
    After(this.useCase, 'deleteTask', this.todoListView.deleteTask);
    After(this.useCase, 'completeTask', this.todoListView.completeTask);
    After(this.useCase, 'uncompleteTask', this.todoListView.uncompleteTask);
    After(this.useCase, 'editTaskContent', this.todoListView.editTaskContent);
    After(this.todoListView, 'taskContentDoubleClicked', this.useCase.editTaskContent);
    After(this.useCase, 'updateTaskContent', this.todoListView.updateTaskContent);
    After(this.todoListView, 'enterKeyPressedWhenEditing', this.useCase.updateTaskContent);
    AfterAll(this.useCase, ['addNewTask', 'deleteTask', 'completeAllTasks', 'toggleTaskCompletion', 'showAll'], function() {
      return _this.statsView.showStats(_this.useCase.remainingTasks().length, _this.useCase.completedTasks().length);
    });
    After(this.statsView, 'allTasksClicked', function() {
      return _this.useCase.showAll();
    });
    After(this.statsView, 'completedTasksClicked', function() {
      return _this.useCase.showCompleted();
    });
    After(this.statsView, 'remainingTasksClicked', function() {
      return _this.useCase.showActive();
    });
    After(this.useCase, 'showActive', function() {
      return _this.todoListView.showTasks(_this.useCase.remainingTasks());
    });
    After(this.useCase, 'showCompleted', function() {
      return _this.todoListView.showTasks(_this.useCase.completedTasks());
    });
    After(this.statsView, 'clearCompletedClicked', function() {
      return _this.useCase.clearCompleted();
    });
    LogAll(this.useCase, "UseCase");
    LogAll(this.todoListView, "TodoListView");
    LogAll(this.statsView, "StatsView");
  }

  return WebGlue;

})();
