import { createContext***REMOVED*** useEffect***REMOVED*** useState } from 'react';
import useRequest from '../hooks/use-request';

export const LiveUpdateContext = createContext();

const LiveUpdateContextProvider = (props) => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    const [userSignedIn***REMOVED*** setUserSignedIn] = useState(false);
    const [userMail***REMOVED*** setUserMail] = useState(null);
    const [showFooterButton***REMOVED*** setShowFooterButton] = useState(true); // willl be used by pages who don't want to show buttons in footer
    const [globalLoading***REMOVED*** setGlobalLoading] = useState(true);



    const { doRequest: getUserReq***REMOVED*** errors } = useRequest({
        url: API_URL + '/api/users/currentuser'***REMOVED***
        method: 'get'
***REMOVED***);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getUserReq();
            console.log(res);
            if(res) {
                setGlobalLoading(prev => false);
                setUserSignedIn(prev => true);
***REMOVED***
            else {
                setGlobalLoading(prev => false);
***REMOVED***
    ***REMOVED***;

        fetchUser();
***REMOVED******REMOVED*** [])


    return (
        <LiveUpdateContext.Provider value={{
            userSignedIn***REMOVED***setUserSignedIn***REMOVED*** 
            userMail***REMOVED*** setUserMail***REMOVED***
            showFooterButton***REMOVED*** setShowFooterButton***REMOVED***
            globalLoading
***REMOVED***}>
                
***REMOVED***props.children}
        </LiveUpdateContext.Provider>
    );
};

export default LiveUpdateContextProvider;