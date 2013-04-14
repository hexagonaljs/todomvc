class WebGlue
  constructor: (@useCase, @todoListView, @statsView, @storage)->
    AutoBind(@todoListView, @useCase)
    After(@todoListView, 'enterKeyPressed', (content) => @useCase.addNewTask(new Task(content)))
    After(@useCase, 'addNewTask', @todoListView.addNewTask)
    Before(@useCase, 'showAll',  => @useCase.setInitialTasks(@storage.getTasks()))
    After(@useCase, 'showAll',  => @todoListView.showTasks(@useCase.todoTasks))
    AfterAll(@useCase,
            [
             'addNewTask',
             'updateTaskContent',
             'deleteTask',
             'completeAllTasks',
             'toggleTaskCompletion'
            ],
            => @storage.set("tasks", @useCase.todoTasks))

    After(@useCase, 'deleteTask', @todoListView.deleteTask)


    After(@useCase, 'completeTask', @todoListView.completeTask)
    After(@useCase, 'uncompleteTask', @todoListView.uncompleteTask)


    After(@useCase, 'editTaskContent', @todoListView.editTaskContent)
    After(@todoListView, 'taskContentDoubleClicked', @useCase.editTaskContent)

    After(@useCase, 'updateTaskContent', @todoListView.updateTaskContent)
    After(@todoListView, 'enterKeyPressedWhenEditing', @useCase.updateTaskContent)

    AfterAll(@useCase,
      [
        'addNewTask',
        'deleteTask',
        'completeAllTasks',
        'toggleTaskCompletion',
        'showAll',
      ],
        => @statsView.showStats(@useCase.remainingTasks().length, @useCase.completedTasks().length))

    After(@statsView, 'allTasksClicked', => @useCase.showAll())
    After(@statsView, 'completedTasksClicked', => @useCase.showCompleted())
    After(@statsView, 'remainingTasksClicked', => @useCase.showActive())

    After(@useCase, 'showActive', => @todoListView.showTasks(@useCase.remainingTasks()))
    After(@useCase, 'showCompleted', => @todoListView.showTasks(@useCase.completedTasks()))

    After(@statsView, 'clearCompletedClicked', => @useCase.clearCompleted())

    LogAll(@useCase, "UseCase")
    LogAll(@todoListView, "TodoListView")
    LogAll(@statsView, "StatsView")
