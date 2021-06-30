import { useState } from "react";
import useRequest from "./use-request";

const useFileInput = ({
    path***REMOVED***
    num_files=1***REMOVED***
    onSubmit
***REMOVED*** => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;

    const [file***REMOVED*** setFile] = useState(null);
    const [errors***REMOVED*** setErrors] = useState([]);

    const { doRequest:uploadRequest***REMOVED*** errors:uploadErrors } = useRequest({
        url: API_URL+'/api/upload'***REMOVED***
        method: "post"***REMOVED***
***REMOVED***);
    
    const handleChange = (event) => {
        const files = event.target.files;

        if(files.length > num_files) {
            setErrors(prev => [{msg: `Select max ${num_files} files`}])
            return;
    ***REMOVED***

        setErrors([]);

        if(num_files === 1) setFile(files[0]);
        else setFile([...files])
***REMOVED***;

    const uploadFile = async () => {
        const data = new FormData();
        data.append('path'***REMOVED*** path);
        data.append('file'***REMOVED*** file);

        const response = await uploadRequest(data);
        console.log('reached');
        if(response) setFile(null);
        return response;
***REMOVED***
    const handleSubmit = async (event) => {
        onSubmit(event);
***REMOVED***;

    return { file***REMOVED*** uploadErrors***REMOVED*** errors***REMOVED*** handleChange***REMOVED*** uploadFile***REMOVED*** handleSubmit };
}

export default useFileInput
