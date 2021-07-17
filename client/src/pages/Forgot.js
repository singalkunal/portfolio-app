import useRequest from "../hooks/use-request";
import { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

import useForm from "../hooks/use-form"

import Button from "../components/Button"
import Error from "../components/Error";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { LiveUpdateContext } from "../contexts/LiveUpdateContext";

const { default: FormInput } = require("../components/FormInput")

const styles = {
    "wrapme": {
        boxShadow: "0 0 20px rgba(0,0,0,0.2)",
        padding: "20px",
        borderRadius: "15px"
    },

    "header": {
        backgroundColor: "var(--bg-primary)",
        padding: "20px",
        marginBottom: "20px",
        borderRadius: "15px",
    },

    "headerText": {
        fontSize: "24px",
        fontWeight: 600,
        color: "white"
    }

}
const Forgot = () => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    const [shownErrors, setShownErrors] = useState([]);
    const history = useHistory();
    
    const { 
        values,
        handleChange,
        handleSubmit,
        isSubmitting
     } = useForm({
         initialValues: {
             alias: ""
         },
         onSubmit: async () => {
             
             setShownErrors([]);
             const res = await doRequest();

             if(res) {
                 history.push(
                     '/redirect',
                     {
                         header: 'Successfully sent reset link',
                         helptext: 'Check your email for further instructions..'
                     }
                 );

             }
             
         }
     });

     const {doRequest, errors} = useRequest({
        url: API_URL+'/api/users/forgot',
        method: "post",
        body: {
            alias: values.alias
        }
    });

    useEffect(() => {
        if(errors && errors.length) {
            setShownErrors(errors);
        }
    }, [errors]);

    return (
        <div className="container">
            {
                <form style={styles.wrapme}>
                <header style={styles.header}>
                    <span className="text" style={styles.headerText}>Reset password</span>
                </header>
                <FormInput
                    label="Email / Username"
                    type="text"
                    value={values.alias}
                    name="alias"
                    handleChange={handleChange}
                />

                <Error errors={shownErrors} />

                <Button
                    label="Send"
                    className={isSubmitting ? "disable" : ""}
                    faicon={faShareSquare}
                    onClick={handleSubmit}
                />
            </form>
            }
        </div>
    )
}

export default Forgot
