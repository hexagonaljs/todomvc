#<< utils
#<< local_storage
#<< todo_use_case
#<< todo_gui
#<< routing_adapter
#<< web_glue

class WebTodoApp
  constructor: ->
    useCase = new CompleteTasksUseCase()
    useCase.start()
    window.useCase = useCase
    todoListView = new TodoListView()
    statsView    = new StatsView()
    localStorage = new LocalStorage("todo_app")
    routingAdapter = new RoutingAdapter()
    glue = new WebGlue(useCase, todoListView, statsView, localStorage, routingAdapter)
    useCase.start()
    routingAdapter.start()


new WebTodoApp()

