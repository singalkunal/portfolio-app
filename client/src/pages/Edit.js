import { useState, useContext, useEffect } from 'react'
import {useHistory} from 'react-router-dom';
import useRequest from '../hooks/use-request'

import useModal from '../hooks/use-modal';
import '../css/Edit.css';

import Load from '../components/Load';
import SomeError from '../components/SomeError';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';

import Experiences from '../components/Experiences';
import About from '../components/About';

import AboutForm from '../components/Forms/AboutForm';
import ExperienceForm from '../components/Forms/ExperienceForm';
import { updateById } from '../utils/general';

import PlusIcon from '../icons/plus.svg';
import EditIcon from '../icons/edit.svg';
import TickIcon from '../icons/tick.svg';
import CrossIcon from '../icons/cross.svg';
import Alert from '../components/Alert';
import Skills from '../components/Skills';
import SkillsForm from '../components/Forms/SkillsForm';
import Error from '../components/Error';
import { LiveUpdateContext } from '../contexts/LiveUpdateContext';

const EditPage = () => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    const { doRequest: fetchCurrentUserDetails, errors } = useRequest({
        method: 'get',
        url: API_URL + '/api/users/currentuser/details'
    });

    const { doRequest: putPortfolio, errors: updatePortfolioErrors } = useRequest({
        method: 'put',
        url: API_URL + '/api/portfolio/edit'
    })

    const history = useHistory();
    const { setShowFooterButton } = useContext(LiveUpdateContext)
    

    /****************************************states***************************************************/
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [isError, setIsError] = useState(false);
    const [user, setUser] = useState({});

    const [about, setAbout] = useState({});
    const [experiences, setExperiences] = useState([]);
    const [skills, setSkills] = useState([]);

    const [postiveAlert, setPositiveAlert] = useState(false);

    // currently experience loaded in modal form (ExperienceForm)
    // this state is only used to initialize from value
    // if edited then those will be directly updated to experiences array 
    // and not this state
    const [currentExpLoaded, setCurrentExpLoaded] = useState({});

    /****************************************modals***************************************************/
    const { modalContainerRef:aboutRef, openModal:openAbout, closeModal:closeAbout }  = useModal({activeClass:"active"});
    const { modalContainerRef:expRef, openModal:openExp, closeModal:closeExp }  = useModal({activeClass:"active"});
    const { modalContainerRef:skillsRef, openModal:openSkills, closeModal:closeSkills }  = useModal({activeClass:"active"});

    /****************************************requests***************************************************/
    /****************************************About requests***************************************************/

    const updateAbout = async (newAbout) => {
        // await putAbout(newAbout);
        setAbout(newAbout);
    }

    /****************************************Experience requests***************************************************/

    const onEditExp = (event) => {
        // each event edit button will have id as data attr
        const id = event.currentTarget.dataset.id;

        if(id && id.length>0) {
            const idx = experiences.findIndex(obj => obj._id === id || obj._id === id);
            setCurrentExpLoaded(prev => experiences[idx]);
        }
        else {
            const empty = {};
            setCurrentExpLoaded(prev => empty);
        }

        openExp();

    };

    const updateExperiences = async (newExperience) => {
        const prevValues = [...experiences];

        await updateById(newExperience._id || null, newExperience, prevValues);
        setExperiences(prevValues);
    }

    /****************************************Skills requests***************************************************/
    const updateSkills = (newSkills) => {
        setSkills(newSkills);
    };

    /****************************************Action Buttons***************************************************/

    const { modalContainerRef:alertRef, 
            openModal:openAlert, 
            closeModal:closeAlert 
        }  = useModal({activeClass:"active"});

    const onProceed = async (event) => {
        closeAlert();
        if(!postiveAlert) {
            history.push(`/portfolio/${user.username}`);
        }
        else {
            setSubmitting(true);
            const portfolio = {
                _id: user.portfolio._id,
                about: about,
                experiences: experiences,
                skills: skills
            };

            const res = await putPortfolio({portfolio:portfolio});
            setSubmitting(false);
            if(res) history.push(`/portfolio/${user.username}`);
        }
    }
    const onCancel = () => {
        setPositiveAlert(false);
        openAlert();
    }

    const onSubmit = () => {
        setPositiveAlert(true);
        openAlert();
    }


    /****************************************Side Effects***************************************************/

    useEffect(() => {
        setShowFooterButton(false);
        const fetchUser = async () => {
            const currentUser = await fetchCurrentUserDetails();

            if(currentUser) {
                // console.log(currentUser.portfolio.experiences[0].id || currentUser.portfolio.experiences[0]._id);
                setUser(currentUser.user);
                const portfolio = currentUser.user.portfolio;
                
                setAbout(portfolio.about)
                setExperiences(portfolio.experiences);
                setSkills(portfolio.skills);

                setLoading(false);
                setIsError(false);
            }
        }

        fetchUser();

        return () => {
            setShowFooterButton(true);
            const body = document.querySelector('body');
            body.style.overflowY = "scroll";
        }
    }, []);


    useEffect(() => {
    }, [experiences])
    useEffect(() => {
        if(errors && errors.length) {
            console.log(errors)
            setIsError(true);
            setLoading(false);
        }
        else {
            setIsError(false);
        }
    }, [errors])


    return (
        <div className="container edit-container">
            <Load loading={loading}>
                <SomeError isError={isError}>
                    <SectionHeading heading="About Section" />
                    <About about={about} />
                    <Button 
                        label="Edit About"
                        className="section-edit"
                        iconUrl={EditIcon}
                        onClick={openAbout}
                    />

                    <AboutForm 
                        about={about} 
                        closeModal={closeAbout} 
                        updateAbout={updateAbout}
                        ref={aboutRef}
                    />
                    

                    <SectionHeading heading="Experience Section" />
                    <Experiences 
                        experiences={experiences}
                        editMode
                        onEditExp={onEditExp}
                    />
                    <Button 
                        label="Add new Experience"
                        className="section-edit"
                        iconUrl={PlusIcon}
                        onClick={onEditExp}
                    />

                    <ExperienceForm
                        experience={currentExpLoaded}
                        closeModal={closeExp}
                        updateExperiences={updateExperiences}
                        ref={expRef}
                    />


                    <SectionHeading heading="Skills Section" />
                    <Skills
                        skills={skills}
                    />

                    <Button 
                        label="Edit Skills"
                        className="section-edit"
                        iconUrl={EditIcon}
                        onClick={openSkills}
                    />

                    <SkillsForm
                        skills={skills}
                        ref={skillsRef}
                        closeModal={closeSkills}
                        updateSkills={updateSkills}
                    />

                    <Error errors={updatePortfolioErrors} />

                    <div className="action-buttons">
                        <Button
                            label="Save"
                            className={"save" + (submitting ? " disable" : "")}
                            onClick={onSubmit}
                            iconUrl={TickIcon}
                        />

                        <Button
                            label="Cancel"
                            className="cancel"
                            iconUrl={CrossIcon}
                            onClick={onCancel}
                        />
                    </div>

                    <Alert
                        closeModal={closeAlert}
                        onProceed={onProceed}
                        isPositive={postiveAlert}
                        ref={alertRef}
                    />
                </SomeError>
            </Load>
        </div>
    );
}

export default EditPage;