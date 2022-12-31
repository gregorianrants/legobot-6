# import the necessary packages
from picamera.array import PiRGBArray
from picamera import PiCamera
import time
import cv2
import sys
import io
import numpy as np
import base64
import time
from pubsub import getCommand,publishImage

camera = PiCamera()
camera.resolution = (320, 240)
camera.framerate = 24
time.sleep(2)

count = 0

rawCapture = PiRGBArray(camera, size=(320,240))

filename = f"recording_{time.time()}.avi"


RUNNING = 'running'
STOPPING = 'stopping'
DORMANT = 'dormant'

class CaptureManager:
        def __init__(self):
                self.running = False
                self.out = None

        def new_image(self,frame):
                if self.running:
                        self.out.write(frame)

        def start(self):
                #TODO: raise error if attempting to start recroding when already started.
                filename = f"recording_{time.time()}.avi"
                fourcc = cv2.VideoWriter_fourcc(*'XVID')
                self.out = cv2.VideoWriter(filename, fourcc,24,(320,240))
                self.running=True

        def stop(self):
                self.out.release()
                self.running=False




class Manager:
        def __init__(self,CaptureManager):
                self.image = None
                self.capture_manager = CaptureManager()
        def set_image(self,image):
                self.image = image
                self.handleCommand()
                self.capture_manager.new_image(self.image)
                self.send_image()

        def send_image(self):
                bytes = cv2.imencode(".jpg",self.image)[1].tobytes()
                b64_string = base64.b64encode(bytes)
                publishImage(b64_string)

        def start_recording(self):
                self.capture_manager.start()
        def stop_recording(self):
                self.capture_manager.stop()

        def handleCommand(self):
                message = getCommand()
                if(message=='start-recording'):
                        print('starting recording')
                        self.start_recording()
                if(message=='stop-recording'):
                        self.stop_recording()
                        print('finished recording')
                


# manager = Manager()

manager = Manager(CaptureManager)
        


try:
        for frame in camera.capture_continuous(rawCapture, format="bgr", use_video_port=True):
                image = frame.array
                manager.set_image(image)
                
                rawCapture.seek(0)
                rawCapture.truncate()
except KeyboardInterrupt:
        print('Hello user you have pressed ctrl-c button.')
finally:
        print('closing camera')
        camera.close()




