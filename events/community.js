const jwt = require('jsonwebtoken');

module.exports = (io, socket) => {
    socket.on('set-session', jwtUser => {
        
        try{
            socket.request.currentUser = jwt.verify(jwtUser, process.env.JWT_KEY);
        }
        catch(err) {
            console.log(err);
            throw new Error('unable to verify...');
        }
    });

    socket.on('close-session', () => {
        
        socket.request.currentUser = null;
    })


};
