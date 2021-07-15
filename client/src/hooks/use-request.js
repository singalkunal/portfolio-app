import axios from 'axios';
import { useState } from 'react';

const useRequest = ({url***REMOVED*** method***REMOVED*** body ***REMOVED*** => {
    const [errors***REMOVED*** setErrors] = useState([]);


    // body for request can be defined during initialization as a state 
    // or can be provided at time of actual request (upd_body)
    // body at time of actual request will be given priority
    
    const doRequest = async (upd_body=null***REMOVED*** upd_url=null) => {
        const latest_body = upd_body ? upd_body : body;
        const latest_url = upd_url ? upd_url : url;

        axios.defaults.withCredentials = true;
    ***REMOVED***
            const response = await axios[method](latest_url***REMOVED*** latest_body);
            setErrors([]);
            // console.log(url***REMOVED*** ": Response: "***REMOVED*** response);

            return response.data;
    ***REMOVED***
    ***REMOVED***
            // console.log("============="***REMOVED*** err);
            if(!err.response) setErrors([err])
            else setErrors(err.response.data.errors);
    ***REMOVED***
***REMOVED***

    return { doRequest***REMOVED*** errors };
};

export default useRequest;