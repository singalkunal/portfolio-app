import { useState***REMOVED*** useContext***REMOVED*** useEffect } from 'react'
import {Link***REMOVED*** useHistory} from 'react-router-dom';
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

const EditPage = () => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    const { doRequest: fetchCurrentUserDetails***REMOVED*** errors } = useRequest({
        method: 'get'***REMOVED***
        url: API_URL + '/api/users/currentuser/details'
***REMOVED***);

    const { doRequest: putPortfolio***REMOVED*** errors: updatePortfolioErrors } = useRequest({
        method: 'put'***REMOVED***
        url: API_URL + '/api/portfolio/edit'
***REMOVED***)

    const history = useHistory();
    

    /****************************************states***************************************************/
    const [loading***REMOVED*** setLoading] = useState(true);
    const [isError***REMOVED*** setIsError] = useState(false);
    const [user***REMOVED*** setUser] = useState({***REMOVED***

    const [about***REMOVED*** setAbout] = useState({***REMOVED***
    const [experiences***REMOVED*** setExperiences] = useState([]);
    const [skills***REMOVED*** setSkills] = useState([]);

    const [postiveAlert***REMOVED*** setPositiveAlert] = useState(false);

    // currently experience loaded in modal form (ExperienceForm)
    // this state is only used to initialize from value
    // if edited then those will be directly updated to experiences array 
    // and not this state
    const [currentExpLoaded***REMOVED*** setCurrentExpLoaded] = useState({***REMOVED***

    /****************************************modals***************************************************/
    const { modalContainerRef:aboutRef***REMOVED*** openModal:openAbout***REMOVED*** closeModal:closeAbout }  = useModal({activeClass:"active"***REMOVED***
    const { modalContainerRef:expRef***REMOVED*** openModal:openExp***REMOVED*** closeModal:closeExp }  = useModal({activeClass:"active"***REMOVED***
    const { modalContainerRef:skillsRef***REMOVED*** openModal:openSkills***REMOVED*** closeModal:closeSkills }  = useModal({activeClass:"active"***REMOVED***

    /****************************************requests***************************************************/
    /****************************************About requests***************************************************/

    const updateAbout = async (newAbout) => {
        // await putAbout(newAbout);
        setAbout(newAbout);
***REMOVED***

    /****************************************Experience requests***************************************************/

    const onEditExp = (event) => {
        // each event edit button will have id as data attr
        const id = event.currentTarget.dataset.id;

        if(id && id.length>0) {
            const idx = experiences.findIndex(obj => obj.id === id || obj._id === id);
            setCurrentExpLoaded(prev => experiences[idx]);
    ***REMOVED***
        else {
            const empty = {};
            setCurrentExpLoaded(prev => empty);
    ***REMOVED***

        openExp();

***REMOVED***;

    const updateExperiences = async (newExperience) => {
        const prevValues = [...experiences];

        await updateById(newExperience._id || newExperience.id || null***REMOVED*** newExperience***REMOVED*** prevValues);
        setExperiences(prevValues);
***REMOVED***

    /****************************************Skills requests***************************************************/
    const updateSkills = (newSkills) => {
        setSkills(newSkills);
***REMOVED***;

    /****************************************Action Buttons***************************************************/

    const { modalContainerRef:alertRef***REMOVED*** 
            openModal:openAlert***REMOVED*** 
            closeModal:closeAlert 
    ***REMOVED***  = useModal({activeClass:"active"***REMOVED***

    const onProceed = async (event) => {
        closeAlert();
        if(!postiveAlert) {
            history.push(`/portfolio/${user.id}`);
    ***REMOVED***
        else {
            console.log({
                about: about***REMOVED***
                experiences: experiences***REMOVED***
                skills: skills
***REMOVED***);

            const portfolio = {
                id: user.portfolio.id***REMOVED***
                about: about***REMOVED***
                experiences: experiences***REMOVED***
                skills: skills
***REMOVED***;

            const res = await putPortfolio({portfolio:portfolio***REMOVED***
            console.log('Response: '***REMOVED*** res);
            if(res) history.push(`/portfolio/${user.id}`);
    ***REMOVED***
***REMOVED***
    const onCancel = () => {
        setPositiveAlert(false);
        openAlert();
***REMOVED***

    const onSubmit = () => {
        setPositiveAlert(true);
        openAlert();
***REMOVED***


    /****************************************Side Effects***************************************************/

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await fetchCurrentUserDetails();

            if(currentUser) {
                // console.log(currentUser.portfolio.experiences[0].id || currentUser.portfolio.experiences[0]._id);
                setUser(currentUser);
                const portfolio = currentUser.portfolio;
                
                setAbout(portfolio.about)
                setExperiences(portfolio.experiences);
                setSkills(portfolio.skills);

                setLoading(false);
                setIsError(false);
***REMOVED***
    ***REMOVED***

        fetchUser();

        return () => {
            const body = document.querySelector('body');
            body.style.overflowY = "scroll";
    ***REMOVED***
***REMOVED******REMOVED*** []);


    useEffect(() => {
***REMOVED******REMOVED*** [experiences])
    useEffect(() => {
        if(errors && errors.length) {
            console.log(errors)
            setIsError(true);
            setLoading(false);
    ***REMOVED***
        else {
            setIsError(false);
    ***REMOVED***
***REMOVED******REMOVED*** [errors])


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
                            className="save"
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