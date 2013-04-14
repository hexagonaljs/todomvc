class WebGlue
  constructor: (@useCase, @todoListView, @statsView, @storage, @routingAdapter)->
    @todoListViewGlue()
    @statsViewGlue()
    @routingGlue()
    After(@useCase, 'start',  => @useCase.setInitialTasks(@storage.getTasks()))
    AfterAll(@useCase,
            [
             'addNewTask',
             'updateTaskContent',
             'deleteTask',
             'completeAllTasks',
             'toggleTaskCompletion'
            ],
            => @storage.set("tasks", @useCase.todoTasks))

    LogAll(@useCase, "UseCase")
    LogAll(@todoListView, "TodoListView")
    LogAll(@statsView, "StatsView")
    LogAll(@routingAdapter, "Router")

  todoListViewGlue: =>
    AutoBind(@todoListView, @useCase)
    After(@todoListView, 'enterKeyPressed', (content) => @useCase.addNewTask(new Task(content)))
    After(@todoListView, 'taskContentDoubleClicked', @useCase.editTaskContent)
    After(@todoListView, 'enterKeyPressedWhenEditing', @useCase.updateTaskContent)

    After(@useCase, 'addNewTask', @todoListView.addNewTask)
    After(@useCase, 'showAll',  => @todoListView.showTasks(@useCase.todoTasks))
    After(@useCase, 'deleteTask', @todoListView.deleteTask)
    After(@useCase, 'completeTask', @todoListView.completeTask)
    After(@useCase, 'uncompleteTask', @todoListView.uncompleteTask)
    After(@useCase, 'editTaskContent', @todoListView.editTaskContent)
    After(@useCase, 'updateTaskContent', @todoListView.updateTaskContent)
    After(@useCase, 'showActive', => @todoListView.showTasks(@useCase.remainingTasks()))
    After(@useCase, 'showCompleted', => @todoListView.showTasks(@useCase.completedTasks()))

  statsViewGlue: =>
    AfterAll(@useCase,
      [
        'addNewTask',
        'deleteTask',
        'completeAllTasks',
        'toggleTaskCompletion',
        'showAll',
        'showCompleted',
        'showActive'
      ],
        => @statsView.showStats(@useCase.remainingTasks().length, @useCase.completedTasks().length))

    After(@statsView, 'allTasksClicked', => @useCase.showAll())
    After(@statsView, 'completedTasksClicked', => @useCase.showCompleted())
    After(@statsView, 'remainingTasksClicked', => @useCase.showActive())
    After(@statsView, 'clearCompletedClicked', => @useCase.clearCompleted())

    After(@useCase, 'showCompleted', => @statsView.selectCompleted())
    After(@useCase, 'showAll', => @statsView.selectAll())
    After(@useCase, 'showActive', => @statsView.selectActive())

  routingGlue: =>
    After(@routingAdapter, "showAll", => @useCase.showAll())
    After(@routingAdapter, "showCompleted", => @useCase.showCompleted())
    After(@routingAdapter, "showActive", => @useCase.showActive())
    After(@useCase, "showAll", => @routingAdapter.setUrlToAll())
    After(@useCase, "showActive", => @routingAdapter.setUrlToActive())
    After(@useCase, "showCompleted", => @routingAdapter.setUrlToCompleted())

