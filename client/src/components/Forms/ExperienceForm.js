import { forwardRef***REMOVED*** useEffect } from "react"

import useForm from "../../hooks/use-form";
import useFileInput from '../../hooks/use-file-input';

import ExperienceIcon from '../../icons/form-icons/ExperienceIcon.png';
import Button from "../Button";
import FormInput from "../FormInput";
import UpdateTags from "./UpdateTags";
import FileInput from "./FileInput";
import Error from "../Error";

const ExperienceForm = forwardRef(({experience***REMOVED*** closeModal}***REMOVED*** ref) => {
    // global
    const { values***REMOVED*** 
            handleChange***REMOVED*** 
            handleSubmit***REMOVED***
            changeSpecificValue
    ***REMOVED*** = useForm({
            initialValues: {...experience}***REMOVED***
            onSubmit: async () => {
                console.log("submit exp form..."***REMOVED*** values);
***REMOVED***
***REMOVED***);

    // tags specific
    const addTag = (event) => {
        const prevValues = values.tags ? values.tags : [];
         changeSpecificValue("tags"***REMOVED*** [
            ...prevValues***REMOVED***
            tagValues.tag
        ]);

        // to notify hook to clear input values
        return true;
***REMOVED***
    const deleteTag = async (event) => {
        if(!event.target.classList.contains('minus-icon')) return;
        event.stopPropagation();
        event.preventDefault();

        event.currentTarget.classList.toggle('hide');
        const index = event.target.dataset.index;

        setTimeout(() => {
            console.log(index);
            if(!index) return;

            changeSpecificValue("tags"***REMOVED***
                values.tags.filter((p***REMOVED*** i) => i != index))
    ***REMOVED******REMOVED*** 200);
***REMOVED***

    const {
        values: tagValues***REMOVED***
        handleChange: tagChange***REMOVED***
        handleSubmit: tagSubmit***REMOVED***
        isSubmitting: isAddingTag***REMOVED***
        errors
***REMOVED*** = useForm({
        initialValues: {
            tag: ""
    ***REMOVED******REMOVED***
        requiredValues: [
            "tag"
        ]***REMOVED***
        onSubmit: addTag
***REMOVED***)

    // additional tags specific
    const addAdditionalTag = (event) => {
        const prevValues = values.additional_tags ? values.additional_tags : [];
         changeSpecificValue("additional_tags"***REMOVED*** [
            ...prevValues***REMOVED***
            additionalTagValues.tag
        ]);

        // to notify hook to clear input values
        return true;
***REMOVED***
    const deleteAdditionalTag = async (event) => {
        if(!event.target.classList.contains('minus-icon')) return;
        event.stopPropagation();
        event.preventDefault();

        event.currentTarget.classList.toggle('hide');
        const index = event.target.dataset.index;

        setTimeout(() => {
            console.log(index);
            if(!index) return;

            changeSpecificValue("additional_tags"***REMOVED***
                values.additional_tags.filter((p***REMOVED*** i) => i != index))
    ***REMOVED******REMOVED*** 200);
***REMOVED***

    const {
        values: additionalTagValues***REMOVED***
        handleChange: additionalTagChange***REMOVED***
        handleSubmit: additionalTagSubmit***REMOVED***
        isSubmitting: isAddingAdditionalTag***REMOVED***
        errors: additionalTagErrors
***REMOVED*** = useForm({
        initialValues: {
            tag: ""
    ***REMOVED******REMOVED***
        requiredValues: [
            "tag"
        ]***REMOVED***
        onSubmit: addAdditionalTag
***REMOVED***)

    // images
    const {
        file***REMOVED***
        handleChange: handleImgChange***REMOVED***
        errors: validationImgErrors***REMOVED***
        uploadFile
***REMOVED*** = useFileInput({
        path: 'image/'***REMOVED***
        num_files:2
***REMOVED***);
    

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
        <div ref={ref}>
            <div className="overlay" id="app-overlay" onClick={closeModal}></div>
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
                        tags={values.tags || []}
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
                        tags={values.additional_tags || []}
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
                        file={file}
                        multiple={true}
                        handleChange={handleImgChange}
                    />

                    <Error errors={validationImgErrors} />

                </form>
            </div>
            
        </div>
    )
***REMOVED***

export default ExperienceForm
