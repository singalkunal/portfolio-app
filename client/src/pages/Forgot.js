import useRequest from "../hooks/use-request";
import { useContext***REMOVED*** useEffect***REMOVED*** useState } from "react";
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
        boxShadow: "0 0 20px rgba(0***REMOVED***0***REMOVED***0***REMOVED***0.2)"***REMOVED***
        padding: "20px"***REMOVED***
        borderRadius: "15px"
***REMOVED******REMOVED***

    "header": {
        backgroundColor: "var(--bg-primary)"***REMOVED***
        padding: "20px"***REMOVED***
        marginBottom: "20px"***REMOVED***
        borderRadius: "15px"***REMOVED***
***REMOVED******REMOVED***

    "headerText": {
        fontSize: "24px"***REMOVED***
        fontWeight: 600***REMOVED***
        color: "white"
***REMOVED***

}
const Forgot = () => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    const [shownErrors***REMOVED*** setShownErrors] = useState([]);
    const history = useHistory();
    
    const { 
        values***REMOVED***
        handleChange***REMOVED***
        handleSubmit***REMOVED***
        isSubmitting
 ***REMOVED*** = useForm({
         initialValues: {
             alias: ""
     ***REMOVED******REMOVED***
         onSubmit: async () => {
             console.log('Submit'***REMOVED*** values);
             setShownErrors([]);
             const res = await doRequest();

             if(res) {
                 history.push(
                     '/redirect'***REMOVED***
         ***REMOVED***
                         header: 'Successfully sent reset link'***REMOVED***
                         helptext: 'Check your email for further instructions..'
     ***REMOVED***
         ***REMOVED***

 ***REMOVED***
             console.log(res);
     ***REMOVED***
 ***REMOVED***);

     const {doRequest***REMOVED*** errors} = useRequest({
        url: API_URL+'/api/users/forgot'***REMOVED***
        method: "post"***REMOVED***
        body: {
            alias: values.alias
    ***REMOVED***
***REMOVED***);

    useEffect(() => {
        if(errors && errors.length) {
            setShownErrors(errors);
    ***REMOVED***
***REMOVED******REMOVED*** [errors]);

    return (
        <div className="container">
***REMOVED***
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
***REMOVED***
        </div>
    )
}

export default Forgot
