const Gpio = require('pigpio').Gpio;
const { on } = require('events');
const EventEmitter = require('events')


const MICROSECDONDS_PER_CM = 1e6/34321;


class DistanceEmitter extends EventEmitter{
  constructor(){
    super()
    this.left = null
    this.right = null
  }

  setLeft(distance){
    this.left = distance
    this.handleEmit()
  }

  setRight(distance){
    this.right = distance
    this.handleEmit()
  }

  handleEmit(){
    //if(this.left & this.right){
      this.emit('distance',{left: this.left,right: this.right})
    //}
  }
}

const distanceEmitter = new DistanceEmitter()


// const trigger = new Gpio(27, {mode: Gpio.OUTPUT});
// const echo = new Gpio(17, {mode: Gpio.INPUT, alert: true});


// trigger.digitalWrite(0); // Make sure trigger is low

// const watchHCSR04 = () => {
//   let startTick;
//   echo.on('alert', (level, tick) => {
//     if (level == 1) {
//       startTick = tick;
//     } else {
//       const endTick = tick;
//       const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
//       const distance = diff / 2 / MICROSECDONDS_PER_CM
//       distanceEmitter.setLeft(distance)
//     }
//   });
// };

//watchHCSR04();

const rightEmiter = new EventEmitter()

const trigger2 = new Gpio(24, {mode: Gpio.OUTPUT});
const echo2 = new Gpio(23, {mode: Gpio.INPUT, alert: true});

trigger2.digitalWrite(0);

const watchHCSR042 = () => {
  let startTick;

  echo2.on('alert', (level, tick) => {
    if (level == 1) {
      startTick = tick;
    } else {
      const endTick = tick;
      const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
      const distance = diff / 2 / MICROSECDONDS_PER_CM
      distanceEmitter.setRight(distance)
    }
  });
};

watchHCSR042();

setInterval(() => {
  //trigger.trigger(10, 1); // Set trigger high for 10 microseconds
 
  trigger2.trigger(10,1)
 
}, 3000);

distanceEmitter.on('distance',(distances)=>{
  console.log(distances)
})