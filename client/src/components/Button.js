import '../css/Button.css';

const Button = ({label***REMOVED*** iconUrl=null***REMOVED*** iconClass ***REMOVED***className=""***REMOVED*** onClick=()=>{}***REMOVED*** => {
    return (
        <div className={className + " button"} onClick={onClick}>
***REMOVED***
                iconUrl 
                &&
                <i><img src={iconUrl} alt="" /></i>
***REMOVED***

            <span className="label">{label}</span>
        </div>
    )
}

export default Button
