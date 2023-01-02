const motorsFactory = require('./motors.js');

class Drive{
        constructor(socket){
                this.socket = socket;
                this.motors = motorsFactory()
                this.setUpListenters()
             
        }

        setUpListenters(){
                this.motors.on('ready',()=>{
                        console.log('asdfasdfasdfsadfsdf')
                        this.socket.on('drive',msg=>{
                                console.log(msg)
                                if(msg==='forward'){
                                        console.log('forward')
                                        this.motors.forward(60)
                                }
                                if(msg==='stop'){
                                        this.motors.stop(60)
                                }
                                if(msg==='pivot_left'){
                                        this.motors.pivotLeft(60)
                                }
                                if(msg==='pivot_right'){
                                        this.motors.pivotRight(60)
                                }
                                if(msg==='backward'){
                                        this.motors.reverse(60)
                                }
                               
                        })
                })
        }
}

module.exports = Drive
