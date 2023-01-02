const store = require('./avoid.js')
const Redis = require('ioredis');
const redis_s = new Redis()
const DISTANCE_CHANNEL = 'distance'
const { MODES,ACTIONS,SIDES,TRANSITIONS } = require("./constants")



/* TODO consider modifying store to recieve 2 types of command
one is update distance 
the other is a stop command that resests state
this would be an alterntive to reseting the store in SelfDrive

consider having a motors state variable that is updated inside handle action rather than 
having a previousState variable.
*/
class SelfDrive{
        constructor(motors){
                this.motorsState = MODES.STOPPED
                this.state = null
                this.previousAction = null
                this.nextAction = ACTIONS.STOP
                this.running = false 
                this.motors = motors
                this.store = store()
                this.distance_listner = redis_s
                //console.log(this.motors)
        }

        resetState(){
                this.store = store()
                this.previousAction = null
                this.nextAction = ACTIONS.STOP
        }

        handleNewData(left,right){
                console.log(left,right)
                this.store.updateState(left,right)
                this.nextAction = this.store.getState().action
                console.log(this.store.getState())
                if(this.nextAction!==this.previousAction){
                        this.handleAction()
                        this.previousAction = this.nextAction
                }
        }

        handleAction(){
                console.log('action has changed')
                console.log(this.nextAction)
                if(this.nextAction == ACTIONS.FORWARD){
                        this.motors.forward(60)
                }
                if(this.nextAction ==ACTIONS.PIVOT_LEFT){
                        this.motors.pivotLeft(60)
                }
                if(this.nextAction ==ACTIONS.PIVOT_RIGHT){
                        this.motors.pivotRight(60)
                }
                if(this.nextAction ==ACTIONS.STOP){
                        this.motors.stop()
                }
        }

        startSelfDrive(){
                this.distance_listner.subscribe(DISTANCE_CHANNEL)
                this.distance_listner.on('message',(channel,message)=>{
                        const {left,right} = JSON.parse(message)
                        this.handleNewData(left,right)
                })
        }

        async stopSelfDrive(){
                await this.distance_listner.unsubscribe(DISTANCE_CHANNEL)
                this.resetState()
                this.handleAction()
                console.log('unsubscribed')
        }
        
}



module.exports = SelfDrive