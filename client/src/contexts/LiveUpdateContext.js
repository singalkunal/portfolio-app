import { createContext, useEffect, useState } from 'react';
import useRequest from '../hooks/use-request';

export const LiveUpdateContext = createContext();

const LiveUpdateContextProvider = (props) => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    const [showMail, setShowMail] = useState(null);
    const [showFooterButton, setShowFooterButton] = useState(true); // willl be used by pages who don't want to show buttons in footer
    const [globalLoading, setGlobalLoading] = useState(true);

    const [signedInUser, setSignedInUser] = useState(null);


    const { doRequest: getUserReq, errors } = useRequest({
        url: API_URL + '/api/users/currentuser',
        method: 'get'
    });

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUserReq();
            if(data) {
                setSignedInUser(prev => data);
                setGlobalLoading(prev => false);
            }
            else {
                setGlobalLoading(prev => false);
            }
        };

        fetchUser();
    }, [])


    return (
        <LiveUpdateContext.Provider value={{
            signedInUser, setSignedInUser,
            showMail, setShowMail,
            showFooterButton, setShowFooterButton,
            globalLoading
        }}>
                
            {props.children}
        </LiveUpdateContext.Provider>
    );
};

export default LiveUpdateContextProvider;