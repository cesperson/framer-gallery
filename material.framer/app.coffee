myLayers = Framer.Importer.load "imported/material"

# Default Animation Options
Framer.Defaults.Animation =
  curve: "spring(260, 30, 0, 0.1)"

myLayers.rectangle0.on Events.Click,  ->
  myLayers.green0.shadowColor = "rgba(0, 0, 0, 0.2)"
  myLayers.green0.shadowY = 12
  myLayers.green0.shadowBlur = 15

  myLayers.white0.shadowColor = "rgba(0, 0, 0, 0.2)"
  myLayers.white0.shadowY = 12
  myLayers.white0.shadowBlur = 15

  myLayers.rectangle0.bringToFront()
  myLayers.green0.bringToFront()

  myLayers.green0.animate
    properties:
      width: 446
      height: 542
      y: '-=' + (myLayers.green0.screenFrame.y - 427 + myLayers.white0.y)
    time: 0.2
  myLayers.white0.animate
    properties:
      width: 893
      height: 542
      y: '-=' + (myLayers.white0.screenFrame.y - 427 + myLayers.white0.y)
#      x: '-=' + (myLayers.white0.screenFrame.x - 477)
    time: 0.2
