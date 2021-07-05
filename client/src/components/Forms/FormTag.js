import MinusIcon from '../../icons/minus.png';
import '../../css/FormTag.css';

import linkIcon from '../../icons/link.svg';

const FormTag = ({
    label***REMOVED***
    iconUrl***REMOVED***
    className=""***REMOVED***
    link=null***REMOVED***
    id***REMOVED***
    onDelete

***REMOVED*** => {
    const onError = (event) => {
        if(link) {
            const img = event.target;
            // console.log(img)
            img.src = linkIcon;
    ***REMOVED***
***REMOVED***


    const inner_template =
    <div className={className + " form-tag"}>
        <i>
***REMOVED***
                (iconUrl || link)
                &&
                <img src={iconUrl} alt="" onError={onError} />
***REMOVED***
        </i>

        <a href={link}><span className="label">{label}</span></a>
        <i className="minus-icon" >
            <img className="minus-icon" data-id={id} src={MinusIcon} alt="" />
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
