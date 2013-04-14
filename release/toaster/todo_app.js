var WebTodoApp;

WebTodoApp = (function() {

  function WebTodoApp() {
    var glue, localStorage, statsView, todoListView, useCase;
    useCase = new CompleteTasksUseCase();
    window.useCase = useCase;
    todoListView = new TodoListView();
    statsView = new StatsView();
    localStorage = new LocalStorage("todo_app");
    glue = new WebGlue(useCase, todoListView, statsView, localStorage);
    useCase.showAll();
  }

  return WebTodoApp;

})();

new WebTodoApp();
