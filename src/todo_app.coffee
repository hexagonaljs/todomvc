#<< utils
#<< local_storage
#<< todo_use_case
#<< todo_gui
#<< web_glue

class WebTodoApp
  constructor: ->
    useCase = new CompleteTasksUseCase()
    window.useCase = useCase
    todoListView = new TodoListView()
    statsView    = new StatsView()
    localStorage = new LocalStorage("todo_app")
    glue = new WebGlue(useCase, todoListView, statsView, localStorage)
    useCase.showAll()

new WebTodoApp()

