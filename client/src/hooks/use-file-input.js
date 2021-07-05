import { useState } from "react";
import useRequest from "./use-request";

const useFileInput = ({
    path***REMOVED***
    num_files=1***REMOVED*** // allowed number of files to upload
    onSubmit
***REMOVED*** => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;

    const [files***REMOVED*** setFiles] = useState(null);
    const [errors***REMOVED*** setErrors] = useState([]);

    const { doRequest:uploadRequest***REMOVED*** errors:uploadErrors } = useRequest({
        url: API_URL+'/api/upload'***REMOVED***
        method: "post"***REMOVED***
***REMOVED***);
    
    const handleChange = (event) => {
        const gotFiles = event.target.files;

        if(gotFiles.length > num_files) {
            setErrors(prev => [{msg: `Select max ${num_files} files`}])
            return;
    ***REMOVED***

        setErrors([]);

        setFiles([...gotFiles]);
***REMOVED***;

    const uploadFile = async () => {
        const data = new FormData();
        data.append('path'***REMOVED*** path);

        var response = {};

        if (files) {
            for(let file of files) {
                data.append('files'***REMOVED*** file)
***REMOVED***;

            response = await uploadRequest(data);

            if(response) setFiles(null);
    ***REMOVED***

        return response;
***REMOVED***
    const handleSubmit = async (event) => {
        onSubmit(event);
***REMOVED***;

    return { files***REMOVED*** uploadErrors***REMOVED*** errors***REMOVED*** handleChange***REMOVED*** uploadFile***REMOVED*** handleSubmit };
}

export default useFileInput
