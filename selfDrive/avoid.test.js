const store =require('./avoid.js')

const {getState,updateState} = store()


console.log(getState())
updateState(150,150)
console.log(getState())
updateState(80,150)
console.log(getState())
updateState(150,150)
console.log(getState())
updateState(10,150)
console.log(getState())