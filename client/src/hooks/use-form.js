import { useRef, useState, useEffect } from 'react';

const useForm = ({ initialValues, onSubmit, requiredValues=[] }) => {
    const [values, setValues] = useState(initialValues || {});
    const [errors, setErrors] = useState([]);
    const [isSubmitting, setisSubmitting] = useState(false);

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;

        const value = target.type === 'checkbox' ? target.checked : target.value;
        setValues({
            ...values,
            [name]: value
        });
    };

    const changeSpecificValue = (name, updValue) => {
        console.log("change ", name, "to ", updValue);
        setValues({
            ...values,
            [name]: updValue
        });
    };

    const reinitializeForm = (newValues) => {
        setValues(newValues);
        setErrors([]);
    };

    const handleSubmit = (event) => {
        // console.log(event);
        event.preventDefault();
        event.stopPropagation();
        // this is the place to check for errors and validation stuff


        const err = [];
        for (let name of requiredValues) {
            if(!values[name] || values[name] == "") {
                err.push({msg: `Must provide ${name}...`});
            }
        }

        setErrors(prev => err);
        setisSubmitting(prev => true);
        // setValues(initialValues);
    }

    const handleDiscard = (event) => {
        event.preventDefault();
        event.stopPropagation();

        reinitializeForm(initialValues);
    }

    useEffect(() => {
        const submitOrError = async () => {
            if(errors.length === 0 && isSubmitting) {
                const init = await onSubmit();
                // console.log('init: ' + init + '-->' + initialValues);
                // clear input values
                init && setValues(initialValues);
                setisSubmitting(prev => false);
            }
            else {
                setisSubmitting(prev=>false);
            }
        }

        submitOrError();
    }, [errors])

    return { values, handleChange, reinitializeForm, changeSpecificValue, handleSubmit, handleDiscard, isSubmitting, errors };

};

export default useForm;