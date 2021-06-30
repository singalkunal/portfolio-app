import { useEffect } from 'react';
import '../css/Error.css';
import useAsyncRef from '../hooks/use-async-ref';

const Error = ({errors***REMOVED*** => {


    return (
        <div className="errors">
***REMOVED***errors.length > 0 && <div> 
***REMOVED***/* <i className="iconRight fas fa-exclamation-circle"></i> */}
            <ul>
    ***REMOVED***
                    errors.map(error => {
                        return <li key={error.msg} className="errorMsg"> {error.msg} </li>;
    ***REMOVED***)
***REMOVED***
            </ul>

        </div>}
    </div>
    )
};

export default Error;