const {Motor,Motors} = require("johnny-five");
const getBoard = require('./j5board.js')
const {EventEmitter} = require('events')

class MotorsController extends EventEmitter{
  constructor ({MAX_SPEED}){
    super()
    this.motors = null       
    this.leftMotors = null       
    this.rightMotors = null
    this.MAX_SPEED = MAX_SPEED
    this.board = getBoard()
  }

  onReady = ()=>{
      console.log('in ready')
      const frontLeft = new Motor(Motor.SHIELD_CONFIGS.ADAFRUIT_V2.M1)
      const frontRight = new Motor(Motor.SHIELD_CONFIGS.ADAFRUIT_V2.M2)
      const rearLeft = new Motor(Motor.SHIELD_CONFIGS.ADAFRUIT_V2.M3)
      const rearRight = new Motor(Motor.SHIELD_CONFIGS.ADAFRUIT_V2.M4)
      this.motors = new Motors([frontLeft, frontRight,rearLeft,rearRight])
      this.leftMotors = new Motors([frontLeft,rearLeft])
      this.rightMotors = new Motors([frontRight,rearRight])
      this.emit('ready')
  }

  configure(){
    this.board.then(this.onReady)
  }

  percentageOfMax(percentage){
    return (this.MAX_SPEED/100)*percentage
  }

  checkWithinLimits(speed){
    if(this.speed>254){
      this.stop()
      throw new Error('motor input can not be higher than 255') 
    }
  }

  setLeftForward(speed){
    this.checkWithinLimits(speed)
    this.leftMotors.forward(speed)
  }

  setRightForward(speed){
    this.checkWithinLimits(speed)
    this.rightMotors.forward(speed)
  }

  setLeftReverse(speed){
    this.checkWithinLimits(speed)
    this.leftMotors.reverse(speed)
  }

  setRightReverse(speed){
    this.checkWithinLimits(speed)
    this.rightMotors.reverse(speed)
  }

  forward(speed){
    this.stop()
    const leftInput = this.percentageOfMax(speed)
    const rightInput =this.percentageOfMax(speed)
    this.setLeftForward(leftInput)
    this.setRightForward(rightInput)
  }

  reverse(speed){
    this.stop()
    const leftInput = this.percentageOfMax(speed)
    const rightInput =this.percentageOfMax(speed)
    this.setLeftReverse(leftInput)
    this.setRightReverse(rightInput)
  }

  pivotLeft(speed){
    this.stop()
    const leftInput = this.percentageOfMax(speed)
    const rightInput =this.percentageOfMax(speed)
    this.setLeftReverse(leftInput)
    this.setRightForward(rightInput)
  }

  pivotRight(speed){
    this.stop()
    const leftInput = this.percentageOfMax(speed)
    const rightInput =this.percentageOfMax(speed)
    this.setLeftForward(leftInput)
    this.setRightReverse(rightInput)
  }

 left(speed){
    this.stop()
    const leftInput = this.percentageOfMax(speed)
    const rightInput =this.percentageOfMax(speed)
    this.setLeftForward(leftInput/2)
    this.setRightForward(rightInput)
  }

  right(speed){
    this.stop()
    const leftInput = this.percentageOfMax(speed)
    const rightInput =this.percentageOfMax(speed)
    this.setLeftForward(leftInput)
    this.setRightForward(rightInput/2)
  }

  stop(){
    this.motors.stop()
  }
}


//TODO make this a singleton
function motorsFactory(){
  const motors = new MotorsController({MAX_SPEED: 250})
  motors.configure()
  return motors
}



module.exports =  motorsFactory

