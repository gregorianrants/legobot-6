const {Board} = require("johnny-five");
const Raspi = require('raspi-io').RaspiIO;

function setUpBoard(){
        const board = new Board({
          io: new Raspi()
        });
      
        return new Promise(function (resolve,reject){
            board.on('ready',()=>{
                console.log('ready')
              resolve(board)
            })
        })
      }

module.exports = setUpBoard