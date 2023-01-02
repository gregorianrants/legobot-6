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

let board = null


//dont mess with this without thinking
//basically we are giving modules a way of getting and setting up this when they need it
//can only have in one process so this allows another process to use it if no other process has set it up
//it still allows it be requested multiple times by different modules in the same proccess and they will get the same instance.

function getBoard(){
  if(!board){
    board = setUpBoard()
  }
  return board
}

module.exports = getBoard