let httpServer;

module.exports = {
    init: app => httpServer = require('http').createServer(app),
    getHttpServer: () => {
        if(!httpServer) {
            throw new Error('server not initialized');
        }

        return httpServer;
    }
}