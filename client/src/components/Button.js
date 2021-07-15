import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/Button.css';

const Button = ({
    label, 
    iconUrl=null, 
    className="", 
    faicon=null,
    id="",
    onClick=()=>{},
    children
}) => {
    return (
        <div data-id={id} className={className + " button"} onClick={onClick}>
            {
                <>
                    {iconUrl && <i><img src={iconUrl} alt="" /></i>}
                    {faicon && <FontAwesomeIcon icon={faicon} />}
                </>
            }

            <span className="label">{label}</span>
            {children}
        </div>
    )
}

export default Button
