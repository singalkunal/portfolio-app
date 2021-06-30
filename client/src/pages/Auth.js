import { useEffect***REMOVED*** useState } from 'react';
import useTranslate from '../hooks/use-translate';
import { useHistory } from 'react-router-dom';

// custom hooks
import useRequest from '../hooks/use-request';
import useForm from '../hooks/use-form';

// import Form from "../components/Form"
import FormInput from '../components/FormInput';

import FormOverlay from "../components/FormOverlay";
import Button from '../components/Button'
import Error from '../components/Error';

import '../css/Auth.css';

const Auth = () => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    const { translate***REMOVED*** data } = useTranslate();

    const onSignin = async () => {
        const { email***REMOVED*** password } = values;
        console.log(email***REMOVED*** password);
    ***REMOVED***
            const res = await signinRequest();
            if(res) {
                console.log('Successfully signed in...'***REMOVED*** res);
                history.push('/account');
***REMOVED***
    ***REMOVED***
    ***REMOVED***console.log('Error while signing in: '***REMOVED*** err)}
***REMOVED***

    const onSignup = async () => {
    ***REMOVED***
            const res = await signupRequest();
            if(res)
                console.log('Successfully signed up...');
    ***REMOVED***
    ***REMOVED***console.log('Error while signing up: '***REMOVED*** err)}
***REMOVED***

    const { values***REMOVED*** handleChange***REMOVED*** handleSubmit } = useForm({
        initialValues: {
            email: ""***REMOVED***
            password: ""***REMOVED***
            remember: false
    ***REMOVED******REMOVED***
        onSubmit: (event) => {
            console.log('Submit: '***REMOVED*** values);
            data.type === 'in' ? onSignin(event) : onSignup(event);
    ***REMOVED***
***REMOVED***);

    const [errors***REMOVED*** setErrors] = useState([]);
    const history = useHistory();

    // requests
    const { doRequest: signinRequest***REMOVED*** errors: signinerrors } = useRequest({
        url: API_URL+'/api/users/signin'***REMOVED***
        method: 'post'***REMOVED***
        body: { ...values }
***REMOVED***);

    const { doRequest: signupRequest***REMOVED*** errors: signuperrors } = useRequest({
        url: API_URL+'/api/users/signup'***REMOVED***
        method: 'post'***REMOVED***
        body: { ...values }
***REMOVED***);


    // const onEmailChange = (e) => setEmail(e.target.value);
    // const onPasswordChange = (e) => {console.log(e.target); setPassword(e.target.value);}

    const forgotPassword = () => {
        console.log('forgot passwrod...');
***REMOVED***

    
    
    // html data to render form
    useEffect(() => {
        // setEmail('');
        // setPassword('');
        setErrors([]);
***REMOVED******REMOVED*** [data])

    useEffect(() => {
        const e = data.type === 'in' ? signinerrors : signuperrors;
        var width = (window.innerWidth > 0) ? window.innerWidth : window.screen.width;

        if(e && width <= 1000) {
            const formContainer = document.querySelector(".auth.form-container");
            formContainer.classList.add('alert');
            setTimeout(() => {
                formContainer.classList.remove('alert');
***REMOVED*** 1000)
            return;
    ***REMOVED***

        setErrors(e ? e : []);
***REMOVED******REMOVED*** [signinerrors***REMOVED*** signuperrors])

    return (
        <div className="wrapper">
            <div id="form-app-overlay"></div>
            <div className="auth form-container">
                <FormOverlay>
                    <div className="form-overlay" >
                        <header className="title">{data.banner}</header>
                        <div className="desc">{data.desc}</div>
                        <Button label={data.ghostTitle} iconClass={data.ghosticon} onClick={translate}/>
                        
                    </div>
                </FormOverlay>

                <div className="center">
                    <div className={"in form-wrapper"}>
                        <header className="text-center">
                            <i class="fas fa-user-circle"></i>
                        </header>

                        <form>
                            <FormInput 
                                label="Email"
                                iconClasses="fas fa-envelope-square"
                                name="email"
                                type="email"
                                value={values.email}
                                handleChange={handleChange}
                            />

                            <FormInput 
                                label="Password"
                                iconClasses="fas fa-key"
                                name="password"
                                type="password"
                                value={values.password}
                                handleChange={handleChange}
                            />

                ***REMOVED***
                                data.type === 'in' && 
                                <FormInput 
                                    label="Remember me for a month"
                                    iconClasses=""
                                    name="remember"
                                    type="checkbox"
                                    value={values.remember}
                                    handleChange={handleChange}
                                />
            ***REMOVED***
                            <span className={data.type + " helptext"} onClick={forgotPassword}> {data.helptext}</span>
                            <Error errors={errors} />
                            <Button label={data.title} iconClass={data.icon} className="form-button" onClick={handleSubmit}/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth
