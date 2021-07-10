import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/Button.css';

const Button = ({
    label***REMOVED*** 
    iconUrl=null***REMOVED*** 
    className=""***REMOVED*** 
    faicon=null***REMOVED***
    id=""***REMOVED***
    onClick=()=>{}***REMOVED***
    children
***REMOVED*** => {
    return (
        <div data-id={id} className={className + " button"} onClick={onClick}>
***REMOVED***
                <>
        ***REMOVED***iconUrl && <i><img src={iconUrl} alt="" /></i>}
        ***REMOVED***faicon && <FontAwesomeIcon icon={faicon} />}
                </>
***REMOVED***

            <span className="label">{label}</span>
***REMOVED***children}
        </div>
    )
}

export default Button
