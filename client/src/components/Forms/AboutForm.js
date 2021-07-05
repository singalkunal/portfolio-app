import { forwardRef***REMOVED*** useEffect***REMOVED*** useState } from 'react';

import useForm from '../../hooks/use-form';
import useFileInput from '../../hooks/use-file-input';


import FormInput from '../FormInput';
import FileInput from './FileInput';
import Button from '../Button';
import UpdateTags from './UpdateTags';

import AboutIcon from '../../icons/form-icons/AboutIcon.png';
import TickIcon from '../../icons/tick.svg';
import CrossIcon from '../../icons/cross.svg';

import Error from '../Error';

import useFormTag from '../../hooks/use-from-tag';

const AboutForm = forwardRef(({ about***REMOVED*** closeModal***REMOVED*** updateAbout }***REMOVED*** ref) => {
    // console.log(ObjectId().toHexString());
    // global
    const { values***REMOVED*** 
            handleChange***REMOVED*** 
            handleSubmit***REMOVED***
            handleDiscard***REMOVED***
            changeSpecificValue
     ***REMOVED*** = useForm({
            initialValues: {...about}***REMOVED***
            onSubmit: async () => {
                console.log('Submit about form...'***REMOVED*** values***REMOVED*** profileImg);
                var response = null;

                if(profileImg) {
                    response = await uploadProfileImg(); 
                    response = response[0];
***REMOVED***

                

                console.log(values.img_url)
                console.log(response)
                await updateAbout({
                    ...values***REMOVED***
                    img_url: response && response.publicUrl ? response.publicUrl : about.img_url
***REMOVED***);

                console.log(values);
                closeModal();
***REMOVED***
***REMOVED***);

    

    // profile links specific
    const addProfileLink = async () => {
        // will be array
        var response = await uploadIcon();
        response = response[0];

    
        const newProps = {
            icon_url: response ? response.publicUrl || "" : ""***REMOVED***
            filename: response ? response.filename || "" : ""
    ***REMOVED***;

        await updateProfileLinks(newProps);

        // to notify hook to clear input values
        return true;

***REMOVED***;
    const {
        values: profileLinkValues***REMOVED***
        changeSpecificValue: changeProfileLinkField***REMOVED***
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
***REMOVED***);

    const {
        updateTag: updateProfileLinks***REMOVED***
        deleteTag: deleteProfileLink
***REMOVED*** = useFormTag({
        tags: values.profile_links***REMOVED***
        tagValues: profileLinkValues***REMOVED***
        updateTags: (updatedValues) => {
            changeSpecificValue('profile_links'***REMOVED*** updatedValues);
    ***REMOVED***
***REMOVED***)

    const { files: icon***REMOVED*** 
            handleChange: handleIconChange***REMOVED*** 
            uploadFile: uploadIcon***REMOVED***
    ***REMOVED*** = useFileInput({
        path: 'icon/'
***REMOVED***)

    const {
        files: profileImg***REMOVED***
        handleChange: handleProfileImgChange***REMOVED***
        uploadFile: uploadProfileImg
***REMOVED*** = useFileInput({
        path: 'profileImg/'
***REMOVED***)

    


    return (
        <div ref = {ref}>
            <div className="overlay" id="app-overlay"></div>
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
                        tags={values.profile_links}
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

export default AboutForm
