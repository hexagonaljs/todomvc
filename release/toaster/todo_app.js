var WebTodoApp;

WebTodoApp = (function() {

  function WebTodoApp() {
    var glue, localStorage, todoListView, useCase;
    useCase = new CompleteTasksUseCase();
    window.useCase = useCase;
    todoListView = new TodoListView();
    localStorage = new LocalStorage("todo_app");
    glue = new WebGlue(useCase, todoListView, localStorage);
    useCase.showAll();
  }

  return WebTodoApp;

})();

new WebTodoApp();
