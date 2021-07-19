import MinusIcon from '../../icons/minus.png';
import '../../css/FormTag.css';

import linkIcon from '../../icons/link.svg';

const FormTag = ({
    label,
    iconUrl,
    className="",
    link=null,
    id,
    onDelete

}) => {
    const onError = (event) => {
        if(link) {
            const img = event.target;
            img.src = linkIcon;
        }
    }


    const inner_template =
    <div className={className + " form-tag"}>
        <i>
            {
                (iconUrl || link)
                &&
                <img src={iconUrl} alt="" onError={onError} />
            }
        </i>

        <a href={link}><span className="label">{label}</span></a>
        <i className="minus-icon" >
            <img className="minus-icon" data-id={id} src={MinusIcon} alt="" />
        </i>
    </div>;

    return (
        <>
        {
            <div className="form-tag-wrapper" onClick={onDelete}>{inner_template}</div>
        }
        </>
    )
}

export default FormTag
