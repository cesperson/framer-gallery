// Generated by CoffeeScript 1.8.0
(function() {
  window.tools = {
    fadeIn: function(view, delay) {
      return view.animate({
        properties: {
          opacity: 1
        },
        delay: delay
      });
    },
    fadeOut: function(view, delay) {
      return view.animate({
        properties: {
          opacity: 0
        },
        delay: delay
      });
    },
    originalPos: function(view, delay) {
      return view.animate({
        properties: {
          x: view.originalFrame.x,
          y: view.originalFrame.y
        },
        delay: delay
      });
    },
    moveX: function(view, distance, delay) {
      return view.animate({
        properties: {
          x: distance
        },
        delay: delay
      });
    },
    originalHue: function(view, delay) {
      return view.animate({
        properties: {
          hueRotate: 0
        },
        delay: delay
      });
    },
    changeHue: function(view, hueChange, delay) {
      return view.animate({
        properties: {
          hueRotate: hueChange
        },
        delay: delay,
        time: 0.75
      });
    },
    storeOriginal: function(views) {
      var key, value, _results;
      window.PSD = {};
      _results = [];
      for (key in views) {
        value = views[key];
        views[key].originalFrame = views[key].frame;
        views[key].states.add({
          leftScreen: {
            x: -1000
          },
          rightScreen: {
            x: 640
          }
        });
        _results.push(window.PSD[key] = views[key]);
      }
      return _results;
    },
    switchAll: function(stateName, views) {
      return _.each(views, function(element, index) {
        return element.states["switch"](stateName);
      });
    },
    switchInstantAll: function(stateName, views) {
      return _.each(views, function(element, index) {
        return element.states.switchInstant(stateName);
      });
    }
  };

  Layer.prototype.move = function(x, y, curve, time) {
    curve = curve || "spring(200, 20, 10)";
    time = time || 0.2;
    return this.animate({
      properties: {
        x: this.x + x,
        y: this.y + y
      },
      curve: curve,
      time: time
    });
  };

  Layer.prototype.moveInstant = function(x, y) {
    this.x = this.x + x;
    return this.y = this.y + y;
  };

  Layer.prototype.fadeOut = function(delay) {
    return this.animate({
      properties: {
        opacity: 0
      },
      curve: 'ease-in',
      delay: delay,
      time: 0.2
    });
  };

  Layer.prototype.fadeIn = function(delay) {
    return this.animate({
      properties: {
        opacity: 1
      },
      curve: 'ease-in',
      delay: delay,
      time: 0.2
    });
  };

}).call(this);
