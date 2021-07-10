import { useState***REMOVED*** useEffect***REMOVED*** useRef } from 'react';
import Plus from '../../icons/form-icons/Plus.svg';
import Minus from '../../icons/minus_square.svg';

import { randomeBytes } from 'crypto';

import FileInput from './FileInput';

import '../../css/UpdateTags.css';
import FormTag from './FormTag';
import FormInput from '../FormInput';
import Button from '../Button';

const UpdateTags = ({
    title***REMOVED***
    editableTitle***REMOVED*** // true if want to inlude form-input to edit title
    handleTitle***REMOVED***   // method that will handle title change
    nameTitle***REMOVED***     // form name of title (only if editableTitle=true)
    placeholderTitle=""***REMOVED*** // form placeholder for title (only if editableTItle=true)
    helptext=null***REMOVED***
    defaultIcon=""***REMOVED***
    labelName="label"***REMOVED***
    noSeparation=false***REMOVED*** // true/false -> to provide border bottom
    tags=[]***REMOVED***
    dataid***REMOVED***
    onDelete***REMOVED***
    children
***REMOVED*** => {
    const [showInputs***REMOVED*** setShowInputs] = useState(false);
    const helptexts = ['Click to expand'***REMOVED*** helptext];
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
        <section className={"upd-tags-wrapper " + (noSeparation ?  "noseparation" : "")} style={{height:"fit-content"}}>
            <header className="upd-header">
                <div className="line"></div>
                <span className="upd-title">{title}</span>
                <img className="btn-reveal" src={showInputs ? Minus : Plus} alt="" onClick={onClick}/>
                <div className="line"></div>
            </header>
***REMOVED***helptexts[+showInputs] && <p className="helptext">{helptexts[+showInputs]}</p>}
***REMOVED***
                editableTitle 
                && 
                <FormInput
                    type="text"
                    name={nameTitle}
                    value={title}
                    placeholder={placeholderTitle}
                    handleChange={handleTitle}
                    dataid={dataid}
                />
***REMOVED***
            <div className="form-tags">
    ***REMOVED***
                    tags.map((tag***REMOVED*** index) => {

                        return <FormTag 
                                    label={tag[labelName] || tag.title || tag.label || tag.tag}
                                    iconUrl={tag.icon_url || defaultIcon}
                                    link={tag.link}
                                    key = {tag._id || tag.id}
                                    id = {tag._id || tag.id}
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
