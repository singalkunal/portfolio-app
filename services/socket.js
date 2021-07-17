let io;

module.exports = {
    init: httpServer => io = require('socket.io')(httpServer, {
        cors: {
            origin: [process.env.REACT_APP_URL, 'http://localhost:3000', 'http://portfolioapp.dev']
        }
    }),
    getIO: () => {
        if(!io) {
            throw new Error('Socket.io not initialized...');
        }
        return io;
    }
}