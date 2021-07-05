import '../css/Button.css';

const Button = ({
    label***REMOVED*** 
    iconUrl=null***REMOVED*** 
    className=""***REMOVED*** 
    id=""***REMOVED***
    onClick=()=>{}
***REMOVED*** => {
    return (
        <div data-id={id} className={className + " button"} onClick={onClick}>
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
