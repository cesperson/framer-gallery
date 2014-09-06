# From https://snipt.net/vmedium/material-design-easing-curves-for-framer-495cf12b/
# jt dimartile
#Start with:
#materialLayer.states.animationOptions =
#  curve: "bezier-curve"
#When something exists on screen already and moves to another position on screen, 40% out of first frame and 80% into second frame:
#  curveOptions: [0.4, 0, 0.2, 1]
#When something comes from offscreen it has 0% out of the first frame and 80% in on the second frame:
#  curveOptions: [0, 0, 0.2, 1]
#When something leaves the screen it has 40% out of the first frame and 0% in on the second frame:
#  curveOptions: [0.4, 0, 1, 1]

myLayers = Framer.Importer.load "imported/home"

myLayers.container.center()

#Layer::move = (x, y, curve, time) ->
#  curve = curve || "spring(200, 20, 10)"
#  time = time || 0.2
#  this.animate
#    properties:
#      x: this.x + x
#      y: this.y + y
#    curve: curve
#    time: time

# Add some layer methods

# Input a layer from Sketch to get an element that's not an image.
# Using Sketch for setting locations and sizes up on generic boxes.
realFromFake = (fakeLayer, background) ->
  realLayer = new Layer
    width: fakeLayer.width
    height: fakeLayer.height
    x: fakeLayer.screenFrame.x
    y: fakeLayer.screenFrame.y
    backgroundColor: background
  realLayer.states.add
#    original:
#      x: @x, y: @y, width: @width, height: @height
    takeOver:
      width: window.innerWidth, height: window.innerHeight, x: 0, y: 0
  realLayer.states.animationOptions =
      curve: "bezier-curve"
      curveOptions: [0.4, 0, 0.2, 1]
      time: 0.25
#  realLayer.states.animationOptions =
#    curve: "spring(260, 30, 0, 0.1)"
  return realLayer

box0 = realFromFake(myLayers.red0, "#F36C60")
box1 = realFromFake(myLayers.yellow0, "#F3E260")
box2 = realFromFake(myLayers.green0, "#60F3BF")
box3 = realFromFake(myLayers.blue0, "#80DEEA")

## Destroy the imported element
myLayers.red0.destroy()
myLayers.yellow0.destroy()
myLayers.green0.destroy()

Layer::goToCenter = ->
  xOffset = @screenFrame.x - window.innerWidth/2
  yOffset = @screenFrame.y - window.innerHeight/2

  @animate
    properties:
      x: '-=' + xOffset
      y: '-=' + yOffset
    time: 0.2

Layer::takeOver = (url, width, height) ->
  @bringToFront()
  @.states.switch "takeOver"

  width ?= 640
  height ?= 640

  addIframe = =>
    myLayers.iframeContainer = new Layer
      width: 0
      height: 0
      x: window.innerWidth / 2
      y: window.innerHeight / 2
      opacity: 0
      backgroundColor: "#F36C60"
    myLayers.iframeContainer.animate
      properties:
        width: width
        height: height
        x: (window.innerWidth - width) / 2
        y: (window.innerHeight - height) / 2
        opacity: 1
      curve: "bezier-curve"
      curveOptions: [0.4, 0, 0.2, 1]
      time: 0.4
    myLayers.iframeContainer.html = '<iframe src="' + url + '" width="' + width + '" height="' + height + '"></iframe>'

    # Close button
    closeButton.superLayer = @
    Utils.delay 0.2, -> do showClose

    showClose = ->
      closeButton.bringToFront()
      closeButton.animate
        properties:
          opacity: 1
          scale: 1
        curve: "bezier-curve"
        curveOptions: [0.4, 0, 0.2, 1]
        time: 0.2

  Utils.delay(0.3, addIframe)

Layer::goDefault = ->
  @bringToFront()
  @.states.switch "default"
  myLayers.iframeContainer.destroy()
  closeButton.bringToFront()
  closeButton.animate
    properties:
      opacity: 0
      scale: 0.01
#  @.on Events.Click, ->
#    switch @states.current
#      when "default" then @takeOver()

box0.on Events.Click, ->
  switch box0.states.current
    when "default" then @takeOver("../material.framer/index.html", 960, 960)

box1.on Events.Click, ->
  switch box1.states.current
    when "default" then @takeOver("../google-reel.framer/index.html", 640, 360)

box2.on Events.Click, ->
  switch box2.states.current
    when "default" then @takeOver("../dots.framer/index.html")

box3.on Events.Click, ->
  switch box3.states.current
    when "default" then @takeOver("../dots.framer/index.html")

closeButton = new Layer
  width: 40, height: 40, x: window.innerWidth - 80, y: 20, backgroundColor: "#fff", color: "#000", opacity: 0, scale: 0.01
closeButton.html = "<span>X</span>"
closeButton.on Events.Click, (event) ->
  event.stopPropagation()
  @superLayer.html = ""
  @superLayer.goDefault()

#  @superLayer.animate
#    properties:
#      width: window.innerWidth
#      height: window.innerHeight
#      x: "+=100"
#      y: "+=100"
