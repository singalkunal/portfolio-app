import { useState } from "react";
import useRequest from "./use-request";

const useFileInput = ({
    path,
    num_files=1, // allowed number of files to upload
    onSubmit
}) => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;

    const [files, setFiles] = useState(null);
    const [errors, setErrors] = useState([]);

    const { doRequest:uploadRequest, errors:uploadErrors } = useRequest({
        url: API_URL+'/api/upload',
        method: "post",
    });
    
    const handleChange = (event) => {
        const gotFiles = event.target.files;

        if(gotFiles.length > num_files) {
            setErrors(prev => [{msg: `Select max ${num_files} files`}])
            return;
        }

        setErrors([]);

        setFiles([...gotFiles]);
    };

    const uploadFile = async () => {
        const data = new FormData();
        data.append('path', path);

        var response = {};

        if (files) {
            for(let file of files) {
                data.append('files', file)
            };

            response = await uploadRequest(data);

            if(response) setFiles(null);
        }

        return response;
    }
    const handleSubmit = async (event) => {
        onSubmit(event);
    };

    return { files, uploadErrors, errors, handleChange, uploadFile, handleSubmit };
}

export default useFileInput
