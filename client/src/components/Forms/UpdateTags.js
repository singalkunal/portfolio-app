import { useState***REMOVED*** useEffect***REMOVED*** useRef } from 'react';
import Plus from '../../icons/form-icons/Plus.png';
import Minus from '../../icons/form-icons/minus_square.svg';

import { randomeBytes } from 'crypto';

import FileInput from './FileInput';

import '../../css/UpdateTags.css';
import FormTag from './FormTag';

const UpdateTags = ({
    title***REMOVED***
    tags=[]***REMOVED***
    onDelete***REMOVED***
    children
***REMOVED*** => {
    const [showInputs***REMOVED*** setShowInputs] = useState(false);
    const ref = useRef(null);

    const onClick = () => {
        if(!ref || !ref.current) return;

        const subform = ref.current;
        setShowInputs(prev => !prev);
        // const subform = document.querySelector('.test-form');
        subform.classList.toggle("expanded");

        if (subform.style.maxHeight){
            subform.style.maxHeight = null;
      ***REMOVED*** else {
            subform.style.maxHeight = "400px";
      ***REMOVED*** 

        
    ***REMOVED***;

    return (
        <section className="upd-tags-wrapper" style={{height:"fit-content"}}>
            <header className="upd-header">
                <div className="line"></div>
                <span className="upd-title">{title}</span>
                <img className="btn-reveal" src={showInputs ? Minus : Plus} alt="" onClick={onClick}/>
                <div className="line"></div>
            </header>

            <div className="form-tags">
    ***REMOVED***
                    tags.map((tag***REMOVED*** index) => {
                        var key = "";
                        Object.keys(tag).forEach(k => key += `${k}:${tag[k]}`);

                        return <FormTag 
                                    label={tag.title || tag.label || tag}
                                    iconUrl={tag.icon_url}
                                    link={tag.link}
                                    key = {key}
                                    index={index}
                                    onDelete={onDelete}
                               />
    ***REMOVED***)
***REMOVED***
            </div>

            <form ref={ref} className="sub-form">
    ***REMOVED*** children }
            </form>
        </section>
    )
}

export default UpdateTags
