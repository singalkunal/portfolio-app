import axios from 'axios';
import { useState } from 'react';

const useRequest = ({url, method, body }) => {
    const [errors, setErrors] = useState([]);


    // body for request can be defined during initialization as a state 
    // or can be provided at time of actual request (upd_body)
    // body at time of actual request will be given priority
    
    const doRequest = async (upd_body=null, upd_url=null) => {
        const latest_body = upd_body ? upd_body : body;
        const latest_url = upd_url ? upd_url : url;

        axios.defaults.withCredentials = true;
        try {
            const response = await axios[method](latest_url, latest_body);
            setErrors([]);
            // console.log(url, ": Response: ", response);

            return response.data;
        }
        catch(err) {
            // console.log("=============", err);
            if(!err.response) setErrors([err])
            else setErrors(err.response.data.errors);
        }
    }

    return { doRequest, errors };
};

export default useRequest;