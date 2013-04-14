class RoutingAdapter
  constructor: ->
    routes =
      '/': => @showAll()
      '/active': => @showActive()
      '/completed': => @showCompleted()
    @router = Router(routes)

  start: =>
    @router.init()

  setUrlToAll: =>
    @router.setRoute("/")

  setUrlToActive: =>
    @router.setRoute("/active")

  setUrlToCompleted: =>
    @router.setRoute("/completed")

  showAll: =>
  showCompleted: =>
  showActive: =>
