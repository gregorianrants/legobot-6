import cv2

filename = f"recording_{time.time()}.avi"
fourcc = cv2.VideoWriter_fourcc(*'XVID')

out=cv2.VideoWriter(filename, fourcc,24,(320,240))

RUNNING = 'running'
STOPPING = 'stopping'
DORMANT = 'dormant'

class RecordVideo:
  def __init__(self, name, age):
        self.state = 'dormant'

  def runningHandler(self,image,next):
    out.write()
    next(image)

  def clean_up(self):
      out.release()

  def getHandler(self):
    if self.state==RUNNING:
      return self.runningHandler
    elif self.state==STOPPING:
      return self.clean_up
    else:
      return False

class Process:
  def __init__(self):
    self.handler = None

  def wrapHandler(self):



  def getHandler(self):
    if self.handler:
      return self.handler

  


class Manager:
  def __init__(self):
    self.record_video = RecordVideo()
