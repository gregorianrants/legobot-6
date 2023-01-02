from redis import Redis
import json

redis_p = Redis(host = 'localhost', port = 6379)
CAMERA_CHANNEL = 'camera'
DISTANCE_CHANNEL = 'distance'

redis_s = Redis(host = 'localhost', port = 6379)
subscriber = redis_s.pubsub()
subscriber.subscribe('command')

def getCommand():
        message = subscriber.get_message()
        if message and not message['data']==1: 
                return message['data'].decode('utf-8')
        else:
                return False
                

def publishImage(b64_string):
        redis_p.publish(CAMERA_CHANNEL,b64_string)


def publishDistance(left,right):
        distance_dict = {
                'left': left,
                'right': right
        }
        
        redis_p.publish(DISTANCE_CHANNEL,json.dumps(distance_dict))