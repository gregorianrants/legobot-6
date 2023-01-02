const SelfDrive = require('./SelfDrive.js')
const motorsFactory = require('../motors.js');
const readline = require('readline');

// const Raspi = require('raspi-io').RaspiIO;
// const {Board} = require("johnny-five");




// const board = new Board({
//   io: new Raspi()
// });

// board.on('ready',()=>{
  motors = motorsFactory()

// function fakeMotors(){
//   return {
//     forward(){
//       console.log('fake motors forward')
//     },
//     pivotLeft(){
//       console.log('fake motors pivot left')
//     },
//     pivotRight(){
//       console.log('fake motors pivot right')
//     },
//     stop(){
//       console.log('fake motors stop')
//     }
//   }
// }

// motors = fakeMotors()


readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const selfDrive = new SelfDrive(motors)
selfDrive.startSelfDrive()

process.stdin.on('keypress', async (str, key) => {
  if (key.ctrl && key.name === 'c') {
    console.log('stopping self drive and killing the proccess')
    await selfDrive.stopSelfDrive()
    process.exit();
  } 
  if (key = 'q'){
    console.log('stopping self drive')
    await selfDrive.stopSelfDrive()
    console.log('stopped self drive')
    console.log('action is',selfDrive.action)
    
  }else {
    console.log(`You pressed the "${str}" key`);
  }
});

//})

