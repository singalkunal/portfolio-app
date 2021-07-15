import useRequest from "../hooks/use-request";
import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from 'react-router-dom';

import useForm from "../hooks/use-form"

import Button from "../components/Button"
import Error from "../components/Error";

import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
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


const Reset = () => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    const [shownErrors, setShownErrors] = useState([]);
    const query = new URLSearchParams(useLocation().search);

    const history = useHistory();

    const {signedInUser} = useContext(LiveUpdateContext);
    
    const { 
        values,
        handleChange,
        handleSubmit,
        isSubmitting
     } = useForm({
         initialValues: {
             password: ""
         },
         onSubmit: async () => {
             console.log('Submit', values);
             setShownErrors([]);
             const res = await doRequest();

             if(res) {
                 history.push(
                     '/redirect',
                     {
                         header: 'Password changed successfully',
                         helptext: 'You may close this window now...'
                     }
                 );

             }
            //  console.log(res);
         }
     });

     const {doRequest, errors} = useRequest({
        url: API_URL+'/api/users/reset',
        method: "post",
        body: {
            email: query.get('email'),
            code: query.get('code'),
            password: values.password
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
                !signedInUser 
                ?
                <form style={styles.wrapme}>
                <header style={styles.header}>
                    <span className="text" style={styles.headerText}>Reset password</span>
                </header>
                <FormInput
                    label="New Password"
                    type="password"
                    value={values.password}
                    name="password"
                    handleChange={handleChange}
                />

                <Error errors={shownErrors} />

                <Button
                    label="Confirm"
                    className={isSubmitting ? "disable" : ""}
                    faicon={faCheckCircle}
                    onClick={handleSubmit}
                />
            </form>

            :
            <h3>Must sign out first</h3>
            }
        </div>
    )
}

export default Reset
