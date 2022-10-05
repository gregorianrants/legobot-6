from gpiozero import DistanceSensor
from time import sleep


trig = 24
echo = 23


sensor = DistanceSensor(echo,trig)

while True:
    print('Distance to nearest object is', sensor.distance, 'm')
    sleep(1)