import { useState } from 'react';
import axios from 'axios';

const FilesUpload = () => {
    const [name***REMOVED*** setName] = useState('');
    const [file***REMOVED*** setFile] = useState();
    const [imgUrl***REMOVED*** setImgUrl] = useState('');

    const onSubmit = async (e) => {
        console.log('onSubmit');
        e.preventDefault();
        const data = new FormData();
        data.append('name'***REMOVED*** name);
        data.append('file'***REMOVED*** file);

        //  httpbin dumps sent data back 
        // direct console can't print file so using httpbin
        // for debug purposes
        // try {
        //     const res = await axios.post('https://httpbin.org/anything'***REMOVED*** data);
        //     console.log(res);
        // }
        // catch(err) {}

    ***REMOVED***
            const res = await axios.post('http://localhost:3080/api/profile/upload'***REMOVED*** data***REMOVED*** {
                headers: {
                    "Content-Type": "multipart/form-data"
***REMOVED***
***REMOVED***);

            const publicUrl = res.data.publicUrl;
            setImgUrl(publicUrl);
    ***REMOVED***
    ***REMOVED***console.log(err)};
***REMOVED***


    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                    <label>File</label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>

                <button type="submit">Submit</button>
            </form>

            <img src={imgUrl} alt={imgUrl} key={Date.now()} id="img" />
        </div>
    );
};

export default FilesUpload;