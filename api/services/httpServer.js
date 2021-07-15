let httpServer;

module.exports = {
    init: app => httpServer = require('http').createServer(app)***REMOVED***
    getHttpServer: () => {
        if(!httpServer) {
            throw new Error('server not initialized');
    ***REMOVED***

        return httpServer;
***REMOVED***
}