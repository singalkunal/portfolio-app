import { forwardRef, useEffect } from "react"

import useForm from "../../hooks/use-form";
import useFileInput from '../../hooks/use-file-input';

import ExperienceIcon from '../../icons/form-icons/ExperienceIcon.png';
import TickIcon from '../../icons/tick.svg';
import TagIcon from '../../icons/TagIcon.svg';
import CrossIcon from '../../icons/cross.svg';

import Button from "../Button";
import FormInput from "../FormInput";
import UpdateTags from "./UpdateTags";
import FileInput from "./FileInput";
import Error from "../Error";
import useFormTag from "../../hooks/use-from-tag";

const ExperienceForm = forwardRef(({experience, updateExperiences, closeModal}, ref) => {
    /****************************************hooks***************************************************/
    const { values, 
            handleChange,
            reinitializeForm, 
            handleSubmit,
            handleDiscard,
            isSubmitting: isUpdatingExperience,
            errors: formValidationErrors,
            changeSpecificValue
        } = useForm({
            initialValues: {...experience},
            requiredValues: [
                'title',
                'brief',
                'detail'
            ],
            onSubmit: async () => {
                var response = null;
                if(images) {
                    response = await uploadImages();

                    // response = response;
                }


                var newImages = [];
                if(response) {
                    for(let img of response) {
                        newImages.push(img.publicUrl)
                    }
                }

                await updateExperiences({
                    ...values,
                    img_url: newImages && newImages.length ? newImages : experience.img_url
                });

                closeModal();
            }
    });


    /****************************************Tags specific***************************************************/
    const addTag = async () => {
        await updateTag();
        // to notify hook to clear input values
        return true;
    }

    const {
        values: tagValues,
        handleChange: tagChange,
        handleSubmit: tagSubmit,
        isSubmitting: isAddingTag,
        errors
    } = useForm({
        initialValues: {
            tag: ""
        },
        requiredValues: [
            "tag"
        ],
        onSubmit: addTag
    })

    const { updateTag, deleteTag } = useFormTag({
        tags: values.tags,
        tagValues: tagValues,
        updateTags: (updatedValues) => {
            changeSpecificValue('tags', updatedValues);
        }
    })

    /****************************************Additional Tags specific***************************************************/
    const addAdditionalTag = async () => {
        await updateAdditionalTag();
        // to notify hook to clear input values
        return true;
    };

    const {
        values: additionalTagValues,
        handleChange: additionalTagChange,
        handleSubmit: additionalTagSubmit,
        isSubmitting: isAddingAdditionalTag,
        errors: additionalTagErrors
    } = useForm({
        initialValues: {
            tag: ""
        },
        requiredValues: [
            "tag"
        ],
        onSubmit: addAdditionalTag
    })


    const { updateTag: updateAdditionalTag, deleteTag: deleteAdditionalTag } = useFormTag({
        tags: values.additional_tags,
        tagValues: additionalTagValues,
        updateTags: (updatedValues) => {
            changeSpecificValue('additional_tags', updatedValues)
        }
    })

    /****************************************Images***************************************************/
    const {
        files: images,
        handleChange: handleImgChange,
        errors: validationImgErrors,
        uploadFile: uploadImages
    } = useFileInput({
        path: 'image/',
        num_files:2
    });
    
    // external links
    const addExternalLink  = async () => {
        // will be array
        var response = await uploadExternal_linkIcon();
        response = response[0];

        const newPorps = {
            icon_url: response ? response.publicUrl || "" : "",
            filename: response ? response.filename || "" : ""
        };

        await updateExternalLinks(newPorps);

        // to notify hook to clear input values
        return true;
    };

    const {
        values: externalLinkValues,
        handleChange: externalLinkChange,
        handleSubmit: externalLinkSubmit,
        isSubmitting: isAddingExternal_link,
        errors: externalLinkErrors
    } = useForm({
        initialValues: {
            title: "",
            link: ""
        },
        requiredValues: [
            'title',
            'link'
        ],
        onSubmit: addExternalLink
    });

    const { 
        updateTag: updateExternalLinks, 
        deleteTag: deleteExternalLink 
    } = useFormTag({
        tags: values.external_links,
        tagValues: externalLinkValues,
        updateTags: (updatedValues) => {
            changeSpecificValue('external_links', updatedValues)
        }
    })

    const {
        files: externalLinkIcon,
        handleChange: externalLinkIconChange,
        uploadFile: uploadExternal_linkIcon
    } = useFileInput({
        path: 'icon/'
    });

    /****************************************Side Effects***************************************************/

    useEffect(() => {
        reinitializeForm(experience);
    }, [experience])

    return (
        <div ref={ref}>
            <div className="overlay" id="app-overlay"></div>
            <div className="edit-form-wrapper">
                <header>
                    <img src={ExperienceIcon} alt="" />
                    <span className="text">Experience/Project Details</span>
                </header>

                <form className="exp-form" id="exp-form">
                    <FormInput
                        label="Title"
                        name="title"
                        type="text"
                        value={values.title || ""}
                        handleChange={handleChange}
                    />

                    <FormInput
                        label="Small description"
                        name="brief"
                        placeholder="Try to keep it brief"
                        type="textarea"
                        value={values.brief || ""}
                        handleChange={handleChange}
                    />

                    <UpdateTags
                        title="Add Tags"
                        helptext="These tags will be shown on main page"
                        tags={values.tags || []}
                        defaultIcon={TagIcon}
                        onDelete={deleteTag}
                    >

                        <FormInput
                            label="Tag"
                            name="tag"
                            type="text"
                            value={tagValues.tag}
                            handleChange={tagChange}
                        />

                        <Button
                            label="Add"
                            className = {isAddingTag ? "disable": ""}
                            onClick={tagSubmit}
                        />
                    </UpdateTags>

                    <FormInput
                        label="Detailed description"
                        name="detail"
                        placeholder="Provide detailed description"
                        type="textarea"
                        value={values.detail || ""}
                        handleChange={handleChange}
                    />

                    <UpdateTags
                        title="Additional Tags"
                        helptext="Will be seen on click-reveal page"
                        tags={values.additional_tags || []}
                        defaultIcon={TagIcon}
                        onDelete={deleteAdditionalTag}
                    >

                        <FormInput
                            label="Tag"
                            name="tag"
                            type="text"
                            value={additionalTagValues.tag}
                            handleChange={additionalTagChange}
                        />

                        <Button
                            label="Add"
                            className = {isAddingAdditionalTag ? "disable": ""}
                            onClick={additionalTagSubmit}
                        />
                    </UpdateTags>

                    <FileInput
                        label="Upload Images"
                        file={images}
                        multiple={true}
                        className="long"
                        handleChange={handleImgChange}
                    />

                    <Error errors={validationImgErrors} />

                    <UpdateTags
                        title="External Links"
                        helptext="Provide relevant links"
                        tags={values.external_links}
                        onDelete={deleteExternalLink}
                    >
                        <FormInput
                            label="Title"
                            name="title"
                            type="text"
                            value={externalLinkValues.title}
                            handleChange={externalLinkChange}
                        />

                        <FormInput
                            label="Link"
                            name="link"
                            type="url"
                            value={externalLinkValues.link}
                            handleChange={externalLinkChange}
                        />

                        <FileInput
                            label="Upload Icon"
                            file={externalLinkIcon}
                            handleChange={externalLinkIconChange}
                        />

                        <Error errors={externalLinkErrors} />

                        <Button
                            label="Add"
                            className = {isAddingExternal_link ? "disable" : ""}
                            onClick={externalLinkSubmit}
                        />

                    </UpdateTags>

                    <Error errors={formValidationErrors} />

                    <div className="action-buttons">
                        <Button
                            label="Save" 
                            className={"form-button save-button white" + (isUpdatingExperience ? " disable" : "")} 
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

export default ExperienceForm
