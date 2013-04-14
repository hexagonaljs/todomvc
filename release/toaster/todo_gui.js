var TodoListView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

TodoListView = (function() {

  function TodoListView() {
    this.clearCompletedClicked = __bind(this.clearCompletedClicked, this);

    this.remainingTasksClicked = __bind(this.remainingTasksClicked, this);

    this.completedTasksClicked = __bind(this.completedTasksClicked, this);

    this.allTasksClicked = __bind(this.allTasksClicked, this);

    this.showStats = __bind(this.showStats, this);

    this.enterKeyPressed = __bind(this.enterKeyPressed, this);

    this.newTodoContent = __bind(this.newTodoContent, this);

    this.clearNewTodoTextBox = __bind(this.clearNewTodoTextBox, this);

    this.keyPressed = __bind(this.keyPressed, this);

    this.toggleTaskCompletionClicked = __bind(this.toggleTaskCompletionClicked, this);

    this.completeAllTasksClicked = __bind(this.completeAllTasksClicked, this);

    this.showTasks = __bind(this.showTasks, this);

    this.uncompleteTask = __bind(this.uncompleteTask, this);

    this.completeTask = __bind(this.completeTask, this);

    this.updateTaskContent = __bind(this.updateTaskContent, this);

    this.enterKeyPressedWhenEditing = __bind(this.enterKeyPressedWhenEditing, this);

    this.editingKeyPressed = __bind(this.editingKeyPressed, this);

    this.editTaskContent = __bind(this.editTaskContent, this);

    this.deleteTask = __bind(this.deleteTask, this);

    this.deleteTaskClicked = __bind(this.deleteTaskClicked, this);

    this.taskContentDoubleClicked = __bind(this.taskContentDoubleClicked, this);

    this.findTaskElement = __bind(this.findTaskElement, this);

    this.addNewTask = __bind(this.addNewTask, this);

    this.createElementFor = __bind(this.createElementFor, this);

    var _this = this;
    $("#new-todo").keypress(function(event) {
      return _this.keyPressed(event);
    });
    $("#toggle-all").click(function() {
      return _this.completeAllTasksClicked();
    });
    this.taskElements = [];
  }

  TodoListView.prototype.createElementFor = function(task, templateId) {
    var data, element, html, source, template;
    source = $(templateId).html();
    template = Handlebars.compile(source);
    data = {
      content: task.content,
      completed: task.completed
    };
    html = template(data);
    return element = $(html);
  };

  TodoListView.prototype.addNewTask = function(task) {
    var element,
      _this = this;
    element = this.createElementFor(task, "#todo-template");
    element.task = task;
    this.taskElements.push(element);
    $("#todo-list").append(element);
    element.find(".destroy").click(function() {
      return _this.deleteTaskClicked(task);
    });
    element.find(".toggle").click(function() {
      return _this.toggleTaskCompletionClicked(task);
    });
    return element.dblclick(function() {
      return _this.taskContentDoubleClicked(task);
    });
  };

  TodoListView.prototype.findTaskElement = function(task) {
    return this.taskElements.find(function(taskElement) {
      return taskElement.task === task;
    });
  };

  TodoListView.prototype.taskContentDoubleClicked = function(task) {};

  TodoListView.prototype.deleteTaskClicked = function(task) {};

  TodoListView.prototype.deleteTask = function(task) {
    return this.findTaskElement(task).remove();
  };

  TodoListView.prototype.editTaskContent = function(task) {
    var element,
      _this = this;
    element = this.findTaskElement(task);
    element.addClass("editing").find("input.edit").show().select().focus();
    return element.find("input.edit").keypress(function(event) {
      return _this.editingKeyPressed(event, element);
    });
  };

  TodoListView.prototype.editingKeyPressed = function(event, element) {
    var ENTER_KEY_CODE;
    ENTER_KEY_CODE = 13;
    if (event.keyCode === ENTER_KEY_CODE) {
      return this.enterKeyPressedWhenEditing(element.task, element.find("input.edit").val());
    }
  };

  TodoListView.prototype.enterKeyPressedWhenEditing = function(task, newContent) {};

  TodoListView.prototype.updateTaskContent = function(task, content) {
    var element;
    element = this.findTaskElement(task);
    element.removeClass("editing").find("input.edit").hide();
    return element.find("label").html(content);
  };

  TodoListView.prototype.completeTask = function(task) {
    var element;
    element = this.findTaskElement(task);
    element.addClass("completed");
    return element.find("input.toggle").attr("checked", "checked");
  };

  TodoListView.prototype.uncompleteTask = function(task) {
    var element;
    element = this.findTaskElement(task);
    element.removeClass("completed");
    return element.find("input .toggle").attr("checked", "");
  };

  TodoListView.prototype.showTasks = function(tasks) {
    var task, _i, _len, _results;
    $("#todo-list").html("");
    _results = [];
    for (_i = 0, _len = tasks.length; _i < _len; _i++) {
      task = tasks[_i];
      _results.push(this.addNewTask(task));
    }
    return _results;
  };

  TodoListView.prototype.completeAllTasksClicked = function() {};

  TodoListView.prototype.toggleTaskCompletionClicked = function(task) {};

  TodoListView.prototype.keyPressed = function(event) {
    var ENTER_KEY_CODE;
    ENTER_KEY_CODE = 13;
    if (event.keyCode === ENTER_KEY_CODE) {
      this.enterKeyPressed(this.newTodoContent());
      return this.clearNewTodoTextBox();
    }
  };

  TodoListView.prototype.clearNewTodoTextBox = function() {
    return $("#new-todo").val("");
  };

  TodoListView.prototype.newTodoContent = function() {
    return $("#new-todo").val();
  };

  TodoListView.prototype.enterKeyPressed = function(content) {};

  TodoListView.prototype.showStats = function(remaining, completed) {
    var data, element, html, moreThanOne, source, template,
      _this = this;
    source = $("#stats-template").html();
    template = Handlebars.compile(source);
    moreThanOne = remaining > 1;
    data = {
      remaining: remaining,
      moreThanOne: moreThanOne,
      completed: completed
    };
    html = template(data);
    element = $(html);
    element.find("#all-tasks").click(function() {
      return _this.allTasksClicked();
    });
    element.find("#active-tasks").click(function() {
      return _this.remainingTasksClicked();
    });
    element.find("#completed-tasks").click(function() {
      return _this.completedTasksClicked();
    });
    $("#footer").html(element);
    return $("#clear-completed").click(function() {
      return _this.clearCompletedClicked();
    });
  };

  TodoListView.prototype.allTasksClicked = function() {};

  TodoListView.prototype.completedTasksClicked = function() {};

  TodoListView.prototype.remainingTasksClicked = function() {};

  TodoListView.prototype.clearCompletedClicked = function() {};

  return TodoListView;

})();
