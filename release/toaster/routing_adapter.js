var RoutingAdapter,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

RoutingAdapter = (function() {

  function RoutingAdapter() {
    this.showActive = __bind(this.showActive, this);

    this.showCompleted = __bind(this.showCompleted, this);

    this.showAll = __bind(this.showAll, this);

    this.setUrlToCompleted = __bind(this.setUrlToCompleted, this);

    this.setUrlToActive = __bind(this.setUrlToActive, this);

    this.setUrlToAll = __bind(this.setUrlToAll, this);

    this.start = __bind(this.start, this);

    var routes,
      _this = this;
    routes = {
      '/': function() {
        return _this.showAll();
      },
      '/active': function() {
        return _this.showActive();
      },
      '/completed': function() {
        return _this.showCompleted();
      }
    };
    this.router = Router(routes);
  }

  RoutingAdapter.prototype.start = function() {
    return this.router.init();
  };

  RoutingAdapter.prototype.setUrlToAll = function() {
    return this.router.setRoute("/");
  };

  RoutingAdapter.prototype.setUrlToActive = function() {
    return this.router.setRoute("/active");
  };

  RoutingAdapter.prototype.setUrlToCompleted = function() {
    return this.router.setRoute("/completed");
  };

  RoutingAdapter.prototype.showAll = function() {};

  RoutingAdapter.prototype.showCompleted = function() {};

  RoutingAdapter.prototype.showActive = function() {};

  return RoutingAdapter;

})();
