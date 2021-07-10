import { useRef***REMOVED*** useState***REMOVED*** useEffect } from 'react';

const useForm = ({ initialValues***REMOVED*** onSubmit***REMOVED*** requiredValues=[] ***REMOVED*** => {
    const [values***REMOVED*** setValues] = useState(initialValues || {***REMOVED***
    const [errors***REMOVED*** setErrors] = useState([]);
    const [isSubmitting***REMOVED*** setisSubmitting] = useState(false);

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;

        const value = target.type === 'checkbox' ? target.checked : target.value;
        setValues({
            ...values***REMOVED***
            [name]: value
***REMOVED***
***REMOVED***;

    const changeSpecificValue = (name***REMOVED*** updValue) => {
        console.log("change "***REMOVED*** name***REMOVED*** "to "***REMOVED*** updValue);
        setValues({
            ...values***REMOVED***
            [name]: updValue
***REMOVED***
***REMOVED***;

    const reinitializeForm = (newValues) => {
        setValues(newValues);
***REMOVED***;

    const handleSubmit = (event) => {
        // console.log(event);
        event.preventDefault();
        event.stopPropagation();
        // this is the place to check for errors and validation stuff


        const err = [];
        for (let name of requiredValues) {
            if(!values[name] || values[name] == "") {
                err.push({msg: `Must provide ${name}...`***REMOVED***
***REMOVED***
    ***REMOVED***

        setErrors(prev => err);
        setisSubmitting(prev => true);
        // setValues(initialValues);
***REMOVED***

    const handleDiscard = (event) => {
        event.preventDefault();
        event.stopPropagation();

        reinitializeForm(initialValues);
***REMOVED***

    useEffect(() => {
        const submitOrError = async () => {
            if(errors.length === 0 && isSubmitting) {
                const init = await onSubmit();
                // console.log('init: ' + init + '-->' + initialValues);
                // clear input values
                init && setValues(initialValues);
                setisSubmitting(prev => false);
***REMOVED***
            else {
                setisSubmitting(prev=>false);
***REMOVED***
    ***REMOVED***

        submitOrError();
***REMOVED******REMOVED*** [errors])

    return { values***REMOVED*** handleChange***REMOVED*** reinitializeForm***REMOVED*** changeSpecificValue***REMOVED*** handleSubmit***REMOVED*** handleDiscard***REMOVED*** isSubmitting***REMOVED*** errors };

};

export default useForm;