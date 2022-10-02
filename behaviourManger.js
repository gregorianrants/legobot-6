const Drive = require('./drive')
const StraightLine = require('./straightLine')


class BehaviourManager{
        constructor(socket){
                this.socket=socket
                this.behaviour = null
                this.setUpListeners()
        }

        setUpListeners(){
                this.socket.on('load-behaviour',msg=>{
                        console.log('loading behaviour: ', msg)
                        if(msg==='drive'){
                                this.behaviour = new Drive(this.socket)
                        }
                        if(msg==='straight-line'){
                                this.behaviour = new StraightLine(this.socket)
                        }
                })
        }
}

module.exports = BehaviourManager