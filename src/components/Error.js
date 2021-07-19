import { useState, useEffect } from 'react';
import '../css/Error.css';

const Error = ({errors=[], disappearIn=null }) => {

    const [localErrors, setErrors] = useState([]);
    useEffect(() => {
        var timer;
        if(errors && errors.length) {
            setErrors(errors);

            if(disappearIn) {
                timer = setTimeout(() => {
                    setErrors([]);
                }, disappearIn)
            }
        }

        return () => {
            clearTimeout(timer);
            setErrors([]);
        }
    }, [errors])

    return (
        <div className="errors">
            {localErrors.length > 0 && <div> 
            <ul>
                {
                    errors.map(error => {
                        return <li key={error.msg} className="errorMsg"> {error.msg} </li>;
                    })
                }
            </ul>

        </div>}
    </div>
    )
};

export default Error;