import { useState***REMOVED*** useContext***REMOVED*** useEffect } from 'react'
import {Link} from 'react-router-dom'
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

const EditPage = () => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    const { doRequest: fetchCurrentUserDetails***REMOVED*** errors } = useRequest({
        method: 'get'***REMOVED***
        url: API_URL + '/api/users/currentuser/details'
***REMOVED***);


    // states
    const [loading***REMOVED*** setLoading] = useState(true);
    const [isError***REMOVED*** setIsError] = useState(false);
    const [user***REMOVED*** setUser] = useState({***REMOVED***

    const [about***REMOVED*** setAbout] = useState({***REMOVED***
    const [experiences***REMOVED*** setExperiences] = useState([]);
    const [skills***REMOVED*** setSkills] = useState([]);

    const { modalContainerRef:aboutRef***REMOVED*** openModal:openAbout***REMOVED*** closeModal:closeAbout }  = useModal({activeClass:"active"***REMOVED***
    const { modalContainerRef:expRef***REMOVED*** openModal:openExp***REMOVED*** closeModal:closeExp }  = useModal({activeClass:"active"***REMOVED***

    // requests
    // About requests
    const { doRequest: putAbout***REMOVED*** errors: putErrors } = useRequest({
        url: API_URL + '/api/portfolio/edit/about'***REMOVED***
        method: 'put'
***REMOVED***);

    const updateAbout = async (newAbout) => {
        // await putAbout(newAbout);
        setAbout(newAbout);
***REMOVED***

    // experiences requests

    // skills requests

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await fetchCurrentUserDetails();
            console.log(currentUser);

            if(currentUser) {
                // console.log(currentUser.portfolio.experiences[0].id || currentUser.portfolio.experiences[0]._id);
                setUser(currentUser);
                const portfolio = currentUser.portfolio;

                console.log(portfolio);
                setAbout(portfolio.about)
                setExperiences(portfolio.experiences);
                setSkills(portfolio.skills);

                setLoading(false);
                setIsError(false);
***REMOVED***
    ***REMOVED***

        fetchUser();
***REMOVED******REMOVED*** []);

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
        <div className="container">
            <Load loading={loading}>
                <SomeError isError={isError}>
                    <SectionHeading heading="About Section" />
                    <About about={about} />
                    <Button 
                        label="Edit About"
                        className="section-edit"
                        iconClass="fas fa-pen"
                        onClick={openAbout}
                    />

                    <AboutForm 
                        about={about} 
                        closeModal={closeAbout} 
                        updateAbout={updateAbout}
                        ref={aboutRef}
                    />
                    

                    <SectionHeading heading="Experience Section" />
                    <Experiences experiences={experiences} editMode />
                    <Button 
                        label="Add new Experience"
                        className="section-edit"
                        iconClass="fas fa-plus"
                        onClick={openExp}
                    />

                    <ExperienceForm
                        experience={{}}
                        closeModal={closeExp}
                        ref={expRef}
                    />


                    <SectionHeading heading="Skills Section" />
                </SomeError>
            </Load>
        </div>
    );
}

export default EditPage;