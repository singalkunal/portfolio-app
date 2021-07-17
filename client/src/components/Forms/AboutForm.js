import { forwardRef, useEffect, useState } from 'react';

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

const AboutForm = forwardRef(({ about, closeModal, updateAbout }, ref) => {
    // global
    const { values, 
            handleChange, 
            handleSubmit,
            handleDiscard,
            changeSpecificValue
         } = useForm({
            initialValues: {...about},
            onSubmit: async () => {
                var response = null;

                if(profileImg) {
                    response = await uploadProfileImg(); 
                    response = response[0];
                }

                
                await updateAbout({
                    ...values,
                    img_url: response && response.publicUrl ? response.publicUrl : about.img_url
                });
                closeModal();
            }
    });

    

    // profile links specific
    const addProfileLink = async () => {
        // will be array
        var response = await uploadIcon();
        response = response[0];

    
        const newProps = {
            icon_url: response ? response.publicUrl || "" : "",
            filename: response ? response.filename || "" : ""
        };

        await updateProfileLinks(newProps);

        // to notify hook to clear input values
        return true;

    };
    const {
        values: profileLinkValues,
        changeSpecificValue: changeProfileLinkField,
        handleChange: profileLinkChange,
        handleSubmit: profileLinkSubmit,
        isSubmitting: isAddingLink,
        errors
    } = useForm({
        initialValues: {
            title: "",
            link: ""
        },
        requiredValues:[
            "title",
            "link"
        ],
        onSubmit: addProfileLink
    });

    const {
        updateTag: updateProfileLinks,
        deleteTag: deleteProfileLink
    } = useFormTag({
        tags: values.profile_links,
        tagValues: profileLinkValues,
        updateTags: (updatedValues) => {
            changeSpecificValue('profile_links', updatedValues);
        }
    })

    const { files: icon, 
            handleChange: handleIconChange, 
            uploadFile: uploadIcon,
        } = useFileInput({
        path: 'icon/'
    })

    const {
        files: profileImg,
        handleChange: handleProfileImgChange,
        uploadFile: uploadProfileImg
    } = useFileInput({
        path: 'profileImg/'
    })

    


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
                                }
                            }
                        />
                    </div>

                </form>
            </div>
        </div>
    )
});

export default AboutForm
