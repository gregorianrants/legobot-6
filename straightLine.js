const motorsFactory = require('./motors.js');

class StraightLine{
        constructor(socket){
                this.socket = socket;
                this.motors = motorsFactory()
                this.setUpListenters()
        }

        setUpListenters(){
                this.socket.on('straight-line',msg=>{
                        this.motors.forward(60)
                        setTimeout(()=>{
                                this.motors.stop()
                        },2000)
                })
        }
}

module.exports = StraightLine