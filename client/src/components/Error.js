import { useEffect } from 'react';
import '../css/Error.css';
import useAsyncRef from '../hooks/use-async-ref';

const Error = ({errors=[]}) => {


    return (
        <div className="errors">
            {errors.length > 0 && <div> 
            {/* <i className="iconRight fas fa-exclamation-circle"></i> */}
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