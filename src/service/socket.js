import io from 'socket.io-client';
// let socket;

export const socket = (jwt) => io(process.env.REACT_APP_API_BASE_URL, {auth: {jwt}})
// export const init = (auth=null) => {
//     return socket = ;
// }

// export const getSocket = () => {
//     return socket;
// }