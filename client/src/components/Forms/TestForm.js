import { useState } from "react"
import useFileInput from "../../hooks/use-file-input";
import useForm from "../../hooks/use-form";
import Button from "../Button";
import FormInput from "../FormInput";
import FileInput from "./FileInput";
import FormTag from "./FormTag";

const TestForm = () => {

    const [profileLinksDummy***REMOVED*** setProfileDummy] = useState([
***REMOVED***
            title: "Github"***REMOVED***
            link: 'https://www.google.com'***REMOVED***
            icon_url: ""***REMOVED***
            filename: ""***REMOVED***
    ***REMOVED******REMOVED***
***REMOVED***
            title: "Github2"***REMOVED***
            link: 'https://www.google.com'***REMOVED***
            icon_url: ""***REMOVED***
            filename: ""***REMOVED***
    ***REMOVED******REMOVED***
***REMOVED***
            title: "Github3"***REMOVED***
            link: 'https://www.google.com'***REMOVED***
            icon_url: ""***REMOVED***
            filename: ""***REMOVED***
    ***REMOVED******REMOVED***
***REMOVED***
            title: "Github4"***REMOVED***
            link: 'https://www.google.com'***REMOVED***
            icon_url: ""***REMOVED***
            filename: ""***REMOVED***
    ***REMOVED***
    ]);


    const { file***REMOVED*** handleChange: handleFileChange***REMOVED*** uploadFile } = useFileInput({
        path: 'icon/'
***REMOVED***)

    const { values***REMOVED*** handleChange***REMOVED*** handleSubmit***REMOVED*** changeSpecificValue } = useForm({
        initialValues: {
            title: ""***REMOVED***
            link: ""***REMOVED***
            iconUrl: ""***REMOVED***
            filename: ""
    ***REMOVED******REMOVED***
        onSubmit: async (event) => {
            const target = event.currentTarget;
            console.log(target);
            target.classList.add('disabled');
            const response = await uploadFile();
            const values_ = {
                ...values***REMOVED***
                icon_url: response.publicUrl***REMOVED***
                filename: response.filename
***REMOVED***
            // changeSpecificValue(iconUrl***REMOVED*** response)
            console.log("Add :"***REMOVED*** values_);
            setProfileDummy(prev => {
                return [
                    ...prev***REMOVED***
        ***REMOVED***
                        ...values_
    ***REMOVED***
                ]
***REMOVED***)

            target.classList.remove('disabled');
    ***REMOVED***
***REMOVED***);

    return (
        <div className="test-form" style={
***REMOVED***
                transition: 'all 100ms ease-in-out'
***REMOVED***
    ***REMOVED***>
***REMOVED***
                profileLinksDummy.map((p***REMOVED*** index) => {
                    return <FormTag
                                label={p.title}
                                iconUrl={p.icon_url}
                                link={p.link}
                           />
***REMOVED***)

***REMOVED***

            <FormInput 
                label="Title"
                name="title"
                type="text"
                value={values.title}
                handleChange={handleChange}
            />
            <FormInput 
                label="Link"
                name="link"
                type="url"
                value={values.link}
                handleChange={handleChange}
            />

            <FileInput 
                label="Upload icon"
                file={file}
                handleChange={handleFileChange}
            />

            <Button 
                label="Ok"
                onClick={handleSubmit}
            />

        </div>
    )
}

export default TestForm
