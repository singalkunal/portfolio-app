import { forwardRef***REMOVED*** useEffect***REMOVED*** useState } from 'react';

import useForm from '../../hooks/use-form';
import useFileInput from '../../hooks/use-file-input';


import FormInput from '../FormInput';
import FileInput from './FileInput';
import Button from '../Button';
import UpdateTags from './UpdateTags';

import AboutIcon from '../../icons/form-icons/AboutIcon.png';
import TickIcon from '../../icons/tick.png';
import Error from '../Error';
import useRequest from '../../hooks/use-request';

const AboutForm = forwardRef(({ about***REMOVED*** closeModal***REMOVED*** updateAbout }***REMOVED*** ref) => {
    // global
    const { values***REMOVED*** 
            handleChange***REMOVED*** 
            handleSubmit***REMOVED***
            changeSpecificValue
     ***REMOVED*** = useForm({
            initialValues: {...about}***REMOVED***
            onSubmit: async () => {
                console.log('Submit about form...'***REMOVED*** values***REMOVED*** profileImg);
                var response = null;
                if(profileImg) response = await uploadProfileImg();


                await updateAbout({
                    ...values***REMOVED***
                    img_url: response && response.publicUrl ? response.publicUrl : values.img_url
***REMOVED***);

                closeModal();
***REMOVED***
***REMOVED***);

    

    // profile links specific
    const addProfileLink = async () => {
        const response = await uploadIcon();
        const newPorfileLink = {
            ...profileLinkValues***REMOVED***
            icon_url: response ? response.publicUrl || "" : ""***REMOVED***
            filename: response ? response.filename || "" : ""
    ***REMOVED***;

        const prevValues = values.profileLinks ? values.profileLinks : [];
        changeSpecificValue("profileLinks"***REMOVED*** [
            ...prevValues***REMOVED***
***REMOVED***
                ...newPorfileLink
***REMOVED***
        ]);

        // to notify hook to clear input values
        return true;

***REMOVED***;

    const deleteProfileLink = async (event) => {
        if(!event.target.classList.contains('minus-icon')) return;
        event.stopPropagation();
        event.preventDefault();

        event.currentTarget.classList.toggle('hide');
        const index = event.target.dataset.index;

        setTimeout(() => {
            console.log(index);
            if(!index) return;

            changeSpecificValue("profileLinks"***REMOVED***
                values.profileLinks.filter((p***REMOVED*** i) => i != index))
    ***REMOVED******REMOVED*** 200);
***REMOVED***
    
    const {
        values: profileLinkValues***REMOVED***
        handleChange: profileLinkChange***REMOVED***
        handleSubmit: profileLinkSubmit***REMOVED***
        isSubmitting: isAddingLink***REMOVED***
        errors
***REMOVED*** = useForm({
        initialValues: {
            title: ""***REMOVED***
            link: ""
    ***REMOVED******REMOVED***
        requiredValues:[
            "title"***REMOVED***
            "link"
        ]***REMOVED***
        onSubmit: addProfileLink
***REMOVED***)

    const { file: icon***REMOVED*** 
            handleChange: handleIconChange***REMOVED*** 
            uploadFile: uploadIcon***REMOVED***
    ***REMOVED*** = useFileInput({
        path: 'icon/'
***REMOVED***)

    const {
        file: profileImg***REMOVED***
        handleChange: handleProfileImgChange***REMOVED***
        uploadFile: uploadProfileImg
***REMOVED*** = useFileInput({
        path: 'profileImg/'
***REMOVED***)

    const handleEsc = (event) => {
        if(event.key === 'Escape') closeModal();
***REMOVED***;
    

    useEffect(() => {
        window.addEventListener('keydown'***REMOVED*** handleEsc);
        return () => {
            window.removeEventListener('keydown'***REMOVED*** handleEsc);
    ***REMOVED***
***REMOVED******REMOVED*** []);

    return (
        <div ref = {ref}>
            <div className="overlay" id="app-overlay" onClick={closeModal}></div>
            <div className="edit-form-wrapper">
                <header>
                    <img src={AboutIcon} alt="" />
                    <span className="text">About Me</span>
                </header>
                <form className="about-form" id="about-form">
                    <FormInput 
                        label="Firstname"
                        name="firstname"
                        type="text"
                        value={values.firstname}
                        required={true}
                        handleChange={handleChange}
                    />

                    <FormInput 
                        label="Lastname"
                        name="lastname"
                        type="text"
                        value={values.lastname}
                        handleChange={handleChange}
                    />
                    

                    <FormInput 
                        label="Description"
                        name="desc"
                        type="textarea"
                        value={values.desc}
                        handleChange={handleChange}
                    />

                    <UpdateTags
                        title="Profile Links"
                        tags={values.profileLinks}
                        onDelete={deleteProfileLink}
                    >

                        <FormInput 
                            label="Title"
                            name="title"
                            type="text"
                            value={profileLinkValues.title}
                            required={true}
                            handleChange={profileLinkChange}
                        />
                        <FormInput 
                            label="Link"
                            name="link"
                            type="url"
                            value={profileLinkValues.link}
                            handleChange={profileLinkChange}
                        />

                        <FileInput 
                            label="Upload icon"
                            file={icon}
                            handleChange={handleIconChange}
                        />

                        <Error errors={errors} />

                        <Button 
                            label="Add"
                            className = {isAddingLink ? "disable": ""}
                            onClick={profileLinkSubmit}
                        />
                    </UpdateTags>

                    <FileInput 
                        label="Upload Your Image"
                        file={profileImg}
                        handleChange={handleProfileImgChange}
                    />

                    <Button
                        label="Save" 
                        className="form-button save-button white" 
                        iconUrl={TickIcon}
                        onClick={handleSubmit} />
                </form>
            </div>
        </div>
    )
***REMOVED***

export default AboutForm
