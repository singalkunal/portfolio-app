import { useState, useEffect, useRef } from 'react';
import Plus from '../../icons/form-icons/Plus.svg';
import Minus from '../../icons/minus_square.svg';

import { randomeBytes } from 'crypto';

import FileInput from './FileInput';

import '../../css/UpdateTags.css';
import FormTag from './FormTag';
import FormInput from '../FormInput';
import Button from '../Button';

const UpdateTags = ({
    title,
    editableTitle, // true if want to inlude form-input to edit title
    handleTitle,   // method that will handle title change
    nameTitle,     // form name of title (only if editableTitle=true)
    placeholderTitle="", // form placeholder for title (only if editableTItle=true)
    helptext=null,
    defaultIcon="",
    labelName="label",
    noSeparation=false, // true/false -> to provide border bottom
    tags=[],
    dataid,
    onDelete,
    children
}) => {
    const [showInputs, setShowInputs] = useState(false);
    const helptexts = ['Click to expand', helptext];
    const ref = useRef(null);

    const onClick = () => {
        if(!ref || !ref.current) return;

        const subform = ref.current;
        setShowInputs(prev => !prev);
        // const subform = document.querySelector('.test-form');
        subform.classList.toggle("expanded");

        if (subform.style.maxHeight){
            subform.style.maxHeight = null;
          } else {
            subform.style.maxHeight = "400px";
          } 

        
        };

    return (
        <section className={"upd-tags-wrapper " + (noSeparation ?  "noseparation" : "")} style={{height:"fit-content"}}>
            <header className="upd-header">
                <div className="line"></div>
                <span className="upd-title">{title}</span>
                <img className="btn-reveal" src={showInputs ? Minus : Plus} alt="" onClick={onClick}/>
                <div className="line"></div>
            </header>
            {helptexts[+showInputs] && <p className="helptext">{helptexts[+showInputs]}</p>}
            {
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
            }
            <div className="form-tags">
                {
                    tags.map((tag, index) => {

                        return <FormTag 
                                    label={tag[labelName] || tag.title || tag.label || tag.tag}
                                    iconUrl={tag.icon_url || defaultIcon}
                                    link={tag.link}
                                    key = {tag._id}
                                    id = {tag._id}
                                    onDelete={onDelete}
                               />
                    })
                }
            </div>

            <form ref={ref} className="sub-form">
                { children }
            </form>
            
        </section>
    )
}

export default UpdateTags
