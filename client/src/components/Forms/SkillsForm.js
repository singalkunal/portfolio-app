import { forwardRef***REMOVED*** useEffect***REMOVED*** useState } from 'react';
import useForm from '../../hooks/use-form';

import SkillsIcon from '../../icons/form-icons/Skills.svg';
import TickIcon from '../../icons/tick.svg';
import CrossIcon from '../../icons/cross.svg';

import Button from '../Button';

import SkillDomain from './SkillDomain';

const SkillsForm = forwardRef(({
    skills***REMOVED***
    closeModal***REMOVED***
    updateSkills
}***REMOVED*** ref) => {

    const [skillsById***REMOVED*** setSkillsById] = useState({***REMOVED***
    const [stopReInitializing***REMOVED*** setStopReInitializing] = useState(false);

    useEffect(() => {
        skills.map(skill => {
            const id = skill._id || skill.id
            setSkillsById(prev => {
                return {
                    ...prev***REMOVED***
                    [id] :skill
***REMOVED***
***REMOVED***)
***REMOVED***

***REMOVED******REMOVED*** []);

    useEffect(() => {
        if(!stopReInitializing)
            reinitializeForm({...skillsById***REMOVED***
***REMOVED******REMOVED*** [skillsById])

    const {
        values***REMOVED***
        changeSpecificValue***REMOVED***
        reinitializeForm***REMOVED***
        handleSubmit***REMOVED***
        handleDiscard***REMOVED***
***REMOVED*** = useForm({
        initialValues: {...skillsById}***REMOVED***
        onSubmit: () => {
            // console.log('Submit all skills: '***REMOVED*** values);
            updateSkills(Object.values(values));
            closeModal();
    ***REMOVED***
***REMOVED***);



    const handleDomainTitleChange = (event) => {
        setStopReInitializing(true);
        // console.log(event.target.dataset.id)
        const domainId = event.target.dataset.id;
        const { name***REMOVED*** value } = event.target;

        changeSpecificValue(domainId***REMOVED*** {
            ...values[domainId]***REMOVED***
            [name]: value
***REMOVED***
***REMOVED***

    const updateDomain = async (domainId***REMOVED*** updatedValues) => {
        changeSpecificValue(domainId***REMOVED*** {
            ...values[domainId]***REMOVED***
            ...updatedValues
***REMOVED***
***REMOVED***;


    
    
    return (

        <div ref={ref}>
            <div className="overlay" id="app-overlay"></div>
            <div className="edit-form-wrapper">
                <header>
                    <img src={SkillsIcon} alt="" />
                    <span className="text">Curate Skills</span>
                </header>

                <form className="skills-form" id="skills-form">
        ***REMOVED***
                        Object.entries(values).map(([_***REMOVED*** domain]) => {
                            return <SkillDomain 
                                domain={domain} 
                                handleDomainTitleChange={handleDomainTitleChange}
                                updateDomain={updateDomain}
                                key={domain._id}
                            />
        ***REMOVED***)
    ***REMOVED***

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
                ***REMOVED***
            ***REMOVED***
                        />
                    </div>
                </form>
            </div>
        </div>
    )
***REMOVED***

export default SkillsForm
