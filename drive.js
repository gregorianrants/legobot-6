const motorsFactory = require('./motors.js');


class Drive{
        constructor(socket){
                this.socket = socket;
                this.motors = motorsFactory()
                this.setUpListenters()
        }

        setUpListenters(){
                this.socket.on('drive',msg=>{
                        if(msg==='forward'){
                                this.motors.forward(60)
                        }
                        if(msg==='stop'){
                                this.motors.stop(60)
                        }
                })
        }
        
}

module.exports = Drive
