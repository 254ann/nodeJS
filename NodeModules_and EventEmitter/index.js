require("./LogEvents")

const EventEmitter = require('events')
const LogEvents = require("./LogEvents")

const eventLogger = new EventEmitter
eventLogger.on('log', (message)=>
    LogEvents(message)

)


setInterval(() => 
    eventLogger.emit('log', "new event date and id emitted"), 2000)