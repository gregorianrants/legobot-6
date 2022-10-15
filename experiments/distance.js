const Gpio = require('pigpio').Gpio;

// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
const MICROSECDONDS_PER_CM = 1e6/34321;

// const trigger = new Gpio(24, {mode: Gpio.OUTPUT});
// const echo = new Gpio(23, {mode: Gpio.INPUT, alert: true});

const trigger = new Gpio(27, {mode: Gpio.OUTPUT});
const echo = new Gpio(17, {mode: Gpio.INPUT, alert: true});

trigger.digitalWrite(0); // Make sure trigger is low

const watchHCSR04 = () => {
  let startTick;

  echo.on('alert', (level, tick) => {
    if (level == 1) {
      startTick = tick;
    } else {
      const endTick = tick;
      const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
      console.log('1',diff / 2 / MICROSECDONDS_PER_CM);
    }
  });
};

const trigger2 = new Gpio(24, {mode: Gpio.OUTPUT});
const echo2 = new Gpio(23, {mode: Gpio.INPUT, alert: true});

const watchHCSR042 = () => {
  let startTick;

  echo2.on('alert', (level, tick) => {
    if (level == 1) {
      startTick = tick;
    } else {
      const endTick = tick;
      const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
      console.log('2',diff / 2 / MICROSECDONDS_PER_CM);
    }
  });
};


watchHCSR04();
watchHCSR042();

// Trigger a distance measurement once per second
setInterval(() => {
  trigger.trigger(10, 1); // Set trigger high for 10 microseconds
}, 1000);