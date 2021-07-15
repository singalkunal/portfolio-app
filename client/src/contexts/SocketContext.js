import { createContext, useState } from "react";
import { io } from "socket.io-client";
import useRequest from "../hooks/use-request";

export const SocketContext = createContext();

const SocketContextProvider = ({
    children
}) => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    const { doRequest: openSocket, errors: openSocketErrors } = useRequest({
        url: `${API_URL}/api/users/opensocket`,
        method: 'get'
    });

    const [socket, setSocket] = useState();
    const [handshakePending, setHandShakePending] = useState(true);

    const connectSocket = async () => {
        const ack = await openSocket();
        if(ack) {
            setSocket(io(process.env.REACT_APP_API_BASE_URL, {auth: {jwt: ack.jwt}}));
        }
        setHandShakePending(false);
    }

    const clearSession = () => {
        setHandShakePending(true);
        setSocket(null);
    }
    
    return (
        <SocketContext.Provider value={{
            socket, 
            connectSocket,
            clearSession,
            handshakePending,
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContextProvider;