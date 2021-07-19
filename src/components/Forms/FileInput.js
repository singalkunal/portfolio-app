import UploadIcon from '../../icons/upload.svg';
import Button from '../Button';
import { randomBytes } from 'crypto'

import '../../css/FileInput.css';

import { useEffect, useState } from 'react';
import useRequest from '../../hooks/use-request';
import axios from 'axios';
import useForm from '../../hooks/use-form';

const FileInput = ({
    label, 
    name, 
    file, 
    multiple=false,
    className="",
    handleChange
}) => {
    const uniqueId = randomBytes(16).toString('hex');
    const files = Array.isArray(file) ? file : [file];
    return (
        <>
        <div className={className+" form-group file"}> 
            <div className="btn-upload">
                <label htmlFor={uniqueId}>
                    <i><img src={UploadIcon} alt=""/></i>
                    <span className="text">{label}</span>
                </label>
                {
                    files.map(f => {
                        return <span className="filename">{(f && f.name) ? f.name : "No file chosen"}</span>
                    })
                }

                <input 
                    className="file-input" 
                    type="file" 
                    id={uniqueId} 
                    name={name} 
                    onChange={handleChange}
                    multiple={multiple}
                />
            </div>
        </div>
        </>
    )
}

export default FileInput
