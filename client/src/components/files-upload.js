import { useState } from 'react';
import axios from 'axios';

const FilesUpload = () => {
    const [name, setName] = useState('');
    const [file, setFile] = useState();
    const [imgUrl, setImgUrl] = useState('');

    const onSubmit = async (e) => {
        console.log('onSubmit');
        e.preventDefault();
        const data = new FormData();
        data.append('name', name);
        data.append('file', file);

        //  httpbin dumps sent data back 
        // direct console can't print file so using httpbin
        // for debug purposes
        // try {
        //     const res = await axios.post('https://httpbin.org/anything', data);
        //     console.log(res);
        // }
        // catch(err) {}

        try {
            const res = await axios.post('http://localhost:3080/api/profile/upload', data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            const publicUrl = res.data.publicUrl;
            setImgUrl(publicUrl);
        }
        catch(err) {console.log(err)};
    }


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