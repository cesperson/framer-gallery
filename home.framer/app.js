// Generated by CoffeeScript 1.8.0
(function() {
  var box0, box1, box2, box3, closeButton, myLayers, realFromFake;

  myLayers = Framer.Importer.load("imported/home");

  myLayers.container.center();

  realFromFake = function(fakeLayer, background) {
    var realLayer;
    realLayer = new Layer({
      width: fakeLayer.width,
      height: fakeLayer.height,
      x: fakeLayer.screenFrame.x,
      y: fakeLayer.screenFrame.y,
      backgroundColor: background
    });
    realLayer.states.add({
      takeOver: {
        width: window.innerWidth,
        height: window.innerHeight,
        x: 0,
        y: 0
      }
    });
    realLayer.states.animationOptions = {
      curve: "bezier-curve",
      curveOptions: [0.4, 0, 0.2, 1],
      time: 0.25
    };
    return realLayer;
  };

  box0 = realFromFake(myLayers.red0, "#F36C60");

  box1 = realFromFake(myLayers.yellow0, "#F3E260");

  box2 = realFromFake(myLayers.green0, "#60F3BF");

  box3 = realFromFake(myLayers.blue0, "#80DEEA");

  myLayers.red0.destroy();

  myLayers.yellow0.destroy();

  myLayers.green0.destroy();

  Layer.prototype.goToCenter = function() {
    var xOffset, yOffset;
    xOffset = this.screenFrame.x - window.innerWidth / 2;
    yOffset = this.screenFrame.y - window.innerHeight / 2;
    return this.animate({
      properties: {
        x: '-=' + xOffset,
        y: '-=' + yOffset
      },
      time: 0.2
    });
  };

  Layer.prototype.takeOver = function(url, width, height) {
    var addIframe;
    this.bringToFront();
    this.states["switch"]("takeOver");
    if (width == null) {
      width = 640;
    }
    if (height == null) {
      height = 640;
    }
    addIframe = (function(_this) {
      return function() {
        var showClose;
        myLayers.iframeContainer = new Layer({
          width: 0,
          height: 0,
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          opacity: 0,
          backgroundColor: "#F36C60"
        });
        myLayers.iframeContainer.animate({
          properties: {
            width: width,
            height: height,
            x: (window.innerWidth - width) / 2,
            y: (window.innerHeight - height) / 2,
            opacity: 1
          },
          curve: "bezier-curve",
          curveOptions: [0.4, 0, 0.2, 1],
          time: 0.4
        });
        myLayers.iframeContainer.html = '<iframe src="' + url + '" width="' + width + '" height="' + height + '"></iframe>';
        closeButton.superLayer = _this;
        Utils.delay(0.2, function() {
          return showClose();
        });
        return showClose = function() {
          closeButton.bringToFront();
          return closeButton.animate({
            properties: {
              opacity: 1,
              scale: 1
            },
            curve: "bezier-curve",
            curveOptions: [0.4, 0, 0.2, 1],
            time: 0.2
          });
        };
      };
    })(this);
    return Utils.delay(0.3, addIframe);
  };

  Layer.prototype.goDefault = function() {
    this.bringToFront();
    this.states["switch"]("default");
    myLayers.iframeContainer.destroy();
    closeButton.bringToFront();
    return closeButton.animate({
      properties: {
        opacity: 0,
        scale: 0.01
      }
    });
  };

  box0.on(Events.Click, function() {
    switch (box0.states.current) {
      case "default":
        return this.takeOver("../material.framer/index.html", 960, 960);
    }
  });

  box1.on(Events.Click, function() {
    switch (box1.states.current) {
      case "default":
        return this.takeOver("../google-reel.framer/index.html", 640, 360);
    }
  });

  box2.on(Events.Click, function() {
    switch (box2.states.current) {
      case "default":
        return this.takeOver("../dots.framer/index.html");
    }
  });

  box3.on(Events.Click, function() {
    switch (box3.states.current) {
      case "default":
        return this.takeOver("../dots.framer/index.html");
    }
  });

  closeButton = new Layer({
    width: 40,
    height: 40,
    x: window.innerWidth - 80,
    y: 20,
    backgroundColor: "#fff",
    color: "#000",
    opacity: 0,
    scale: 0.01
  });

  closeButton.html = "<span>X</span>";

  closeButton.on(Events.Click, function(event) {
    event.stopPropagation();
    this.superLayer.html = "";
    return this.superLayer.goDefault();
  });

}).call(this);
