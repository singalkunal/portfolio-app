const jwt = require('jsonwebtoken');

module.exports = (io, socket) => {

    socket.on('custom-event', (a) => {
        try {

        console.log('Custom event', a);
            const jwtUser = jwt.sign({
                username: 'custom name',
                email: 'email@email.com'
            }, process.env.JWT_KEY);
            
            socket.request.session.jwt = jwtUser;
            console.log(socket.request.session);
        }
        catch(err) {
            console.log(err);
        }

    })

    socket.on('custom-event2', (a) => {
        try {

        console.log('Custom event2', a);

            // const jwtUser = jwt.sign({
            //     username: 'custom name',
            //     email: 'email@email.com'
            // }, process.env.JWT_KEY);
            
            // socket.request.session.jwt = jwtUser;
            console.log(socket.request.session, socket.request.currentUser);
        }
        catch(err) {
            console.log(err);
        }

    })

    socket.on('set-session', jwtUser => {
        console.log('Setting session on socket....');
        try{
            socket.request.currentUser = jwt.verify(jwtUser, process.env.JWT_KEY);
        }
        catch(err) {
            console.log(err);
            throw new Error('unable to verify...');
        }
    });

    socket.on('close-session', () => {
        console.log('Closing current session')
        socket.request.currentUser = null;
    })


};
