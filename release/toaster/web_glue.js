var WebGlue,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

WebGlue = (function() {

  function WebGlue(useCase, todoListView, statsView, storage, routingAdapter) {
    var _this = this;
    this.useCase = useCase;
    this.todoListView = todoListView;
    this.statsView = statsView;
    this.storage = storage;
    this.routingAdapter = routingAdapter;
    this.statsViewGlue = __bind(this.statsViewGlue, this);

    this.todoListViewGlue = __bind(this.todoListViewGlue, this);

    this.todoListViewGlue();
    this.statsViewGlue();
    Before(this.useCase, 'showAll', function() {
      return _this.useCase.setInitialTasks(_this.storage.getTasks());
    });
    AfterAll(this.useCase, ['addNewTask', 'updateTaskContent', 'deleteTask', 'completeAllTasks', 'toggleTaskCompletion'], function() {
      return _this.storage.set("tasks", _this.useCase.todoTasks);
    });
    LogAll(this.useCase, "UseCase");
    LogAll(this.todoListView, "TodoListView");
    LogAll(this.statsView, "StatsView");
    LogAll(this.routingAdapter, "Router");
  }

  WebGlue.prototype.todoListViewGlue = function() {
    var _this = this;
    AutoBind(this.todoListView, this.useCase);
    After(this.todoListView, 'enterKeyPressed', function(content) {
      return _this.useCase.addNewTask(new Task(content));
    });
    After(this.todoListView, 'taskContentDoubleClicked', this.useCase.editTaskContent);
    After(this.todoListView, 'enterKeyPressedWhenEditing', this.useCase.updateTaskContent);
    After(this.useCase, 'addNewTask', this.todoListView.addNewTask);
    After(this.useCase, 'showAll', function() {
      return _this.todoListView.showTasks(_this.useCase.todoTasks);
    });
    After(this.useCase, 'deleteTask', this.todoListView.deleteTask);
    After(this.useCase, 'completeTask', this.todoListView.completeTask);
    After(this.useCase, 'uncompleteTask', this.todoListView.uncompleteTask);
    After(this.useCase, 'editTaskContent', this.todoListView.editTaskContent);
    After(this.useCase, 'updateTaskContent', this.todoListView.updateTaskContent);
    After(this.useCase, 'showActive', function() {
      return _this.todoListView.showTasks(_this.useCase.remainingTasks());
    });
    return After(this.useCase, 'showCompleted', function() {
      return _this.todoListView.showTasks(_this.useCase.completedTasks());
    });
  };

  WebGlue.prototype.statsViewGlue = function() {
    var _this = this;
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
    After(this.statsView, 'clearCompletedClicked', function() {
      return _this.useCase.clearCompleted();
    });
    After(this.useCase, 'showCompleted', function() {
      return _this.statsView.selectCompleted();
    });
    After(this.useCase, 'showAll', function() {
      return _this.statsView.selectAll();
    });
    return After(this.useCase, 'showActive', function() {
      return _this.statsView.selectActive();
    });
  };

  return WebGlue;

})();
