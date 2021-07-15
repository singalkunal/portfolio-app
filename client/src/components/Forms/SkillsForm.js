import { forwardRef, useEffect, useState } from 'react';
import useForm from '../../hooks/use-form';

import SkillsIcon from '../../icons/form-icons/Skills.svg';
import TickIcon from '../../icons/tick.svg';
import CrossIcon from '../../icons/cross.svg';

import Button from '../Button';

import SkillDomain from './SkillDomain';
import { deleteById, updateById } from '../../utils/general';
import Error from '../Error';

const SkillsForm = forwardRef(({
    skills,
    closeModal,
    updateSkills
}, ref) => {

    const [skillsById, setSkillsById] = useState({});
    const [stopReInitializing, setStopReInitializing] = useState(false);
    const [errors, setErrors] = useState([]); // errors by id

    useEffect(() => {
        skills.map(skill => {
            const id = skill._id
            setSkillsById(prev => {
                return {
                    ...prev,
                    [id] :skill
                }
            })
        });

    }, []);

    useEffect(() => {
        if(!stopReInitializing)
            reinitializeForm({...skillsById});
    }, [skillsById])

    const {
        values,
        changeSpecificValue,
        reinitializeForm,
        handleSubmit,
        handleDiscard,
    } = useForm({
        initialValues: {...skillsById},
        onSubmit: () => {
            // console.log('Submit all skills: ', values);
            // validate domains

            const skillsArr = Object.values(values);

            // let good = false;
            for(let skill of skillsArr) {
                console.log(skill.domain);
                if(!skill.domain || !skill.domain.length)  {
                    return setErrors(prev => [...prev, {
                        msg: 'Domain can\'t be empty',
                        field: 'domain'
                    }]);
                }
            }

            
            updateSkills(skillsArr);
            closeModal();
            
        }
    });

    useEffect(() => {
        console.log('Errors by id: ', errors);
    }, [errors]);


    const initNewDomain = () => {
        console.log('Add new Domain...');
        const newValues = {...values};
        updateById(null, {domain: "", relatedSkills: []}, newValues);
        console.log(newValues);
        reinitializeForm(newValues);
    }


    const handleDomainTitleChange = (event) => {
        setStopReInitializing(true);
        // console.log(event.target.dataset.id)
        const domainId = event.target.dataset.id;
        const { name, value } = event.target;

        changeSpecificValue(domainId, {
            ...values[domainId],
            [name]: value
        });
    }

    const deleteDomain = async (event) => {
        console.log(event);
        const id = event.currentTarget.dataset.id;
        console.log(id);
        
        const newValues = await deleteById(id, {...values});
        reinitializeForm(newValues);
    }

    const updateDomain = async (domainId, updatedValues) => {
        changeSpecificValue(domainId, {
            ...values[domainId],
            ...updatedValues
        });
    };


    
    
    return (

        <div ref={ref}>
            <div className="overlay" id="app-overlay"></div>
            <div className="edit-form-wrapper">
                <header>
                    <img src={SkillsIcon} alt="" />
                    <span className="text">Curate Skills</span>
                </header>

                <form className="skills-form" id="skills-form">
                    {
                        <>
                            {Object.entries(values).map(([_, domain]) => {
                                return <>
                                    <SkillDomain 
                                        domain={domain} 
                                        handleDomainTitleChange={handleDomainTitleChange}
                                        deleteDomain={deleteDomain}
                                        updateDomain={updateDomain}
                                        key={domain._id}
                                    />

                                </>
                            })}

                            <Button
                                label="Add new Domain"
                                className="form-button save-button white"
                                onClick={initNewDomain}
                            />
                        </>
                    }

                    <Error errors={errors} />

                    <div className="action-buttons">
                        <Button
                            label="Save" 
                            className="form-button save-button white" 
                            iconUrl={TickIcon}
                            onClick={handleSubmit}
                        />

                        <Button
                            label="Discard"
                            className="form-button cancel"
                            iconUrl={CrossIcon}
                            onClick={
                                (e) => {
                                    handleDiscard(e);
                                    closeModal();
                                }
                            }
                        />
                    </div>

                </form>
            </div>
        </div>
    )
})

export default SkillsForm
