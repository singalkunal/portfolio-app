import useRequest from "../hooks/use-request";
import { useContext***REMOVED*** useEffect***REMOVED*** useState } from "react";
import { useHistory***REMOVED*** useLocation***REMOVED*** useParams } from 'react-router-dom';

import useForm from "../hooks/use-form"

import Button from "../components/Button"
import Error from "../components/Error";

import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
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


const Reset = () => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    const [shownErrors***REMOVED*** setShownErrors] = useState([]);
    const query = new URLSearchParams(useLocation().search);

    const history = useHistory();

    const {signedInUser} = useContext(LiveUpdateContext);
    
    const { 
        values***REMOVED***
        handleChange***REMOVED***
        handleSubmit***REMOVED***
        isSubmitting
 ***REMOVED*** = useForm({
         initialValues: {
             password: ""
     ***REMOVED******REMOVED***
         onSubmit: async () => {
             console.log('Submit'***REMOVED*** values);
             setShownErrors([]);
             const res = await doRequest();

             if(res) {
                 history.push(
                     '/redirect'***REMOVED***
         ***REMOVED***
                         header: 'Password changed successfully'***REMOVED***
                         helptext: 'You may close this window now...'
     ***REMOVED***
         ***REMOVED***

 ***REMOVED***
            //  console.log(res);
     ***REMOVED***
 ***REMOVED***);

     const {doRequest***REMOVED*** errors} = useRequest({
        url: API_URL+'/api/users/reset'***REMOVED***
        method: "post"***REMOVED***
        body: {
            email: query.get('email')***REMOVED***
            code: query.get('code')***REMOVED***
            password: values.password
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
***REMOVED***
        </div>
    )
}

export default Reset
