import { useState } from "react";
import useForm from "../../hooks/use-form"
import Button from "../Button";
import FormInput from "../FormInput"
import UpdateTags from "./UpdateTags"

import PlusIcon from '../../icons/form-icons/Plus-dark.svg';
import useFormTag from "../../hooks/use-from-tag";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const SkillDomain = ({
    domain***REMOVED***
    handleDomainTitleChange***REMOVED***
    deleteDomain***REMOVED***
    updateDomain
***REMOVED*** => {

    const {
        values: relatedSkillValue***REMOVED***
        handleChange***REMOVED***
        handleSubmit***REMOVED***
***REMOVED*** = useForm({
        initialValues: {skill: ""}***REMOVED***
        onSubmit: async () => {
            console.log('Submit relatedskill...'***REMOVED*** relatedSkillValue)
            await updateTag();
            return true;
    ***REMOVED***
***REMOVED***);

    const { 
            updateTag***REMOVED*** 
            deleteTag 
    ***REMOVED*** = useFormTag({
            tags: domain.relatedSkills***REMOVED***
            tagValues: relatedSkillValue***REMOVED***
            updateTags: (updatedValues) => {
                console.log('Update values: '***REMOVED*** updatedValues);
                updateDomain(domain._id***REMOVED*** {'relatedSkills': updatedValues***REMOVED***
***REMOVED***
    ***REMOVED***)

    return (
        <div className="skill-domain-form">
            <UpdateTags
                title={domain.domain}
                labelName="skill"
                tags={domain.relatedSkills}
                editableTitle={true}
                nameTitle="domain"
                placeholderTitle="Domain"
                noSeparation={true}
                handleTitle={handleDomainTitleChange}
                dataid={domain._id}
                onDelete={deleteTag}
            >
                <FormInput
                    name="skill"
                    type="text"
                    value={relatedSkillValue.skill}
                    handleChange={handleChange}
                    placeholder="Related Skill"
                    dataid={domain._id}
                />

                <Button
                    label="Add Skill"
                    className="add-skill"
                    iconUrl={PlusIcon}
                    onClick={handleSubmit}
                />
            </UpdateTags>

            <div className="wrap-right">
                <Button 
                    className="domain-delete cancel onlyicon-btn"
                    id={domain._id}
                    onClick={deleteDomain}
                >
                    <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
            </div>

        </div>
    )
}

export default SkillDomain
