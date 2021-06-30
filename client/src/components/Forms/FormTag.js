import MinusIcon from '../../icons/minus.png';
import '../../css/FormTag.css';

const FormTag = ({
    label***REMOVED***
    iconUrl***REMOVED***
    className=""***REMOVED***
    link=null***REMOVED***
    index***REMOVED***
    onDelete

***REMOVED*** => {
    const inner_template =
    <div className={className + " form-tag"}>
        <i>
***REMOVED***
                iconUrl
                &&
                <img src={iconUrl} alt="" />
***REMOVED***
        </i>

        <a href={link}><span className="label">{label}</span></a>
        <i className="minus-icon" >
            <img className="minus-icon" data-index={index} src={MinusIcon} alt="" />
        </i>
    </div>;

    return (
        <>
***REMOVED***
            <div className="form-tag-wrapper" onClick={onDelete}>{inner_template}</div>
    ***REMOVED***
        </>
    )
}

export default FormTag
