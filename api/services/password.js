const { scrypt***REMOVED*** randomBytes } = require('crypto');
const { resolve } = require('path');

module.exports = class Password {
    static async hash(password) {
        const salt = randomBytes(16).toString('hex');
        return new Promise((resolve***REMOVED*** reject) => {
            scrypt(password***REMOVED*** salt***REMOVED*** 64***REMOVED*** (err***REMOVED*** derivedKey) => {
                if(err) reject(err);
                resolve(`${salt}:${derivedKey.toString('hex')}`);
***REMOVED***);
    ***REMOVED***)
     
***REMOVED***

    static async verify(password***REMOVED*** hash) {
        return new Promise((resolve***REMOVED*** reject) => {
            const [salt***REMOVED*** key] = hash.split(':');

            scrypt(password***REMOVED*** salt***REMOVED*** 64***REMOVED*** (err***REMOVED*** derivedKey) => {
                 if(err) reject(err);
                 resolve(key === derivedKey.toString('hex'));
***REMOVED***)
    ***REMOVED***)
***REMOVED***
};
