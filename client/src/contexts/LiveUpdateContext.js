import { createContext***REMOVED*** useEffect***REMOVED*** useState } from 'react';

export const LiveUpdateContext = createContext();

const LiveUpdateContextProvider = (props) => {
    const [about***REMOVED*** setAbout] = useState({***REMOVED***

    useEffect(() => {
        console.log('context update'***REMOVED*** about);
***REMOVED******REMOVED*** [about])

    return (
        <LiveUpdateContext.Provider value={{about***REMOVED*** setAbout}}>
***REMOVED***props.children}
        </LiveUpdateContext.Provider>
    );
};

export default LiveUpdateContextProvider;