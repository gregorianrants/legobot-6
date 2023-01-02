from pubsub import getCommand,publishImage,publishDistance
import time


STOPPED_SEARCHING= 100
SEARCHING_DRIVING= 140
DRIVING_SEARCHING= 100
ANY_STOPPED= 50

time.sleep(4)
print('running')
while True:
  time.sleep(2)
  print('transition to searching')
  publishDistance(STOPPED_SEARCHING+10,STOPPED_SEARCHING+10)
  time.sleep(2)
  print('transition to driving')
  publishDistance(SEARCHING_DRIVING+10,SEARCHING_DRIVING+10)
  time.sleep(2)
  print('transition to searching')
  publishDistance(DRIVING_SEARCHING-10,DRIVING_SEARCHING-10)
  print('transition to stopped')
  publishDistance(ANY_STOPPED-10,ANY_STOPPED-10)
