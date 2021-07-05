import { forwardRef***REMOVED*** useEffect } from "react"

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

const ExperienceForm = forwardRef(({experience***REMOVED*** updateExperiences***REMOVED*** closeModal}***REMOVED*** ref) => {
    /****************************************hooks***************************************************/
    const { values***REMOVED*** 
            handleChange***REMOVED***
            reinitializeForm***REMOVED*** 
            handleSubmit***REMOVED***
            handleDiscard***REMOVED***
            errors: formValidationErrors***REMOVED***
            changeSpecificValue
    ***REMOVED*** = useForm({
            initialValues: {...experience}***REMOVED***
            requiredValues: [
                'title'***REMOVED***
                'brief'***REMOVED***
                'detail'
            ]***REMOVED***
            onSubmit: async () => {
                var response = null;
                if(images) {
                    response = await uploadImages();

                    response = response;
***REMOVED***


                var newImages = [];
                if(response) {
                    for(let img of response) {
                        newImages.push(img.publicUrl)
    ***REMOVED***
***REMOVED***

                await updateExperiences({
                    ...values***REMOVED***
                    img_url: newImages ? newImages : experience.img_url
***REMOVED***);

                closeModal();
***REMOVED***
***REMOVED***);


    /****************************************Tags specific***************************************************/
    const addTag = async () => {
        await updateTag();
        // to notify hook to clear input values
        return true;
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

    const { updateTag***REMOVED*** deleteTag } = useFormTag({
        tags: values.tags***REMOVED***
        tagValues: tagValues***REMOVED***
        updateTags: (updatedValues) => {
            changeSpecificValue('tags'***REMOVED*** updatedValues);
    ***REMOVED***
***REMOVED***)

    /****************************************Additional Tags specific***************************************************/
    const addAdditionalTag = async () => {
        await updateAdditionalTag();
        // to notify hook to clear input values
        return true;
***REMOVED***;

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


    const { updateTag: updateAdditionalTag***REMOVED*** deleteTag: deleteAdditionalTag } = useFormTag({
        tags: values.additional_tags***REMOVED***
        tagValues: additionalTagValues***REMOVED***
        updateTags: (updatedValues) => {
            changeSpecificValue('additional_tags'***REMOVED*** updatedValues)
    ***REMOVED***
***REMOVED***)

    /****************************************Images***************************************************/
    const {
        files: images***REMOVED***
        handleChange: handleImgChange***REMOVED***
        errors: validationImgErrors***REMOVED***
        uploadFile: uploadImages
***REMOVED*** = useFileInput({
        path: 'image/'***REMOVED***
        num_files:2
***REMOVED***);
    
    // external links
    const addExternalLink  = async () => {
        // will be array
        var response = await uploadExternal_linkIcon();
        response = response[0];

        const newPorps = {
            icon_url: response ? response.publicUrl || "" : ""***REMOVED***
            filename: response ? response.filename || "" : ""
    ***REMOVED***;

        await updateExternalLinks(newPorps);

        // to notify hook to clear input values
        return true;
***REMOVED***;

    const {
        values: externalLinkValues***REMOVED***
        handleChange: externalLinkChange***REMOVED***
        handleSubmit: externalLinkSubmit***REMOVED***
        isSubmitting: isAddingExternal_link***REMOVED***
        errors: externalLinkErrors
***REMOVED*** = useForm({
        initialValues: {
            title: ""***REMOVED***
            link: ""
    ***REMOVED******REMOVED***
        requiredValues: [
            'title'***REMOVED***
            'link'
        ]***REMOVED***
        onSubmit: addExternalLink
***REMOVED***);

    const { 
        updateTag: updateExternalLinks***REMOVED*** 
        deleteTag: deleteExternalLink 
***REMOVED*** = useFormTag({
        tags: values.external_links***REMOVED***
        tagValues: externalLinkValues***REMOVED***
        updateTags: (updatedValues) => {
            changeSpecificValue('external_links'***REMOVED*** updatedValues)
    ***REMOVED***
***REMOVED***)

    const {
        files: externalLinkIcon***REMOVED***
        handleChange: externalLinkIconChange***REMOVED***
        uploadFile: uploadExternal_linkIcon
***REMOVED*** = useFileInput({
        path: 'icon/'
***REMOVED***);

    /****************************************Side Effects***************************************************/

    useEffect(() => {
        reinitializeForm(experience);
***REMOVED******REMOVED*** [experience])

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

export default ExperienceForm
