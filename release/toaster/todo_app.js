var WebTodoApp;

WebTodoApp = (function() {

  function WebTodoApp() {
    var glue, localStorage, routingAdapter, statsView, todoListView, useCase;
    useCase = new CompleteTasksUseCase();
    window.useCase = useCase;
    todoListView = new TodoListView();
    statsView = new StatsView();
    localStorage = new LocalStorage("todo_app");
    routingAdapter = new RoutingAdapter();
    glue = new WebGlue(useCase, todoListView, statsView, localStorage, routingAdapter);
    useCase.showAll();
  }

  return WebTodoApp;

})();

new WebTodoApp();
