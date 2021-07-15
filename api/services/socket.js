let io;

module.exports = {
    init: httpServer => io = require('socket.io')(httpServer***REMOVED*** {
        cors: {
            origin: [process.env.REACT_APP_URL***REMOVED*** 'http://localhost:3000'***REMOVED*** 'http://portfolioapp.dev']
    ***REMOVED***
***REMOVED***)***REMOVED***
    getIO: () => {
        if(!io) {
            throw new Error('Socket.io not initialized...');
    ***REMOVED***
        return io;
***REMOVED***
}