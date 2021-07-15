import { useContext***REMOVED*** useEffect***REMOVED*** useRef***REMOVED*** useState } from 'react';
import useTranslate from '../hooks/use-translate';
import { Redirect***REMOVED*** useHistory } from 'react-router-dom';

// custom hooks
import useRequest from '../hooks/use-request';
import useForm from '../hooks/use-form';

// import Form from "../components/Form"
import FormInput from '../components/FormInput';

import FormOverlay from "../components/FormOverlay";
import Button from '../components/Button'
import Error from '../components/Error';
import { LiveUpdateContext } from '../contexts/LiveUpdateContext';

import '../css/Auth.css';

const Auth = () => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    const { translate***REMOVED*** data } = useTranslate();

    const { setSignedInUser***REMOVED*** setShowFooterButton } = useContext(LiveUpdateContext);

    const formOverlayRef = useRef(null);
    const formRef = useRef(null);
    
    const onSignin = async () => {
        const { email***REMOVED*** password } = values; // email can be username or password

        console.log(email***REMOVED*** password);
    ***REMOVED***
            const res = await signinRequest();
            console.log(res);
            if(res) {
                console.log('Successfully signed in...'***REMOVED*** res);
                setSignedInUser(res.user);
                history.push('/account');
***REMOVED***
    ***REMOVED***
    ***REMOVED***console.log('Error while signing in: '***REMOVED*** err)}
***REMOVED***

    const onSignup = async () => {
    ***REMOVED***
            const res = await signupRequest();
            if(res) {
                console.log('Successfully signed up...');
                console.log(res);
                history.push({
                    pathname: '/redirect'***REMOVED***
                    state: {
                        header: 'Thank you for registering with us...'***REMOVED***
                        helptext: 'Check you email for verification...'
    ***REMOVED***
***REMOVED***);
***REMOVED***
    ***REMOVED***
    ***REMOVED***console.log('Error while signing up: '***REMOVED*** err)}
***REMOVED***

    const { values***REMOVED*** reinitializeForm***REMOVED*** handleChange***REMOVED*** handleSubmit } = useForm({
        initialValues: {
            username: ""***REMOVED***
            email: ""***REMOVED***
            password: ""***REMOVED***
            remember: false
    ***REMOVED******REMOVED***
        onSubmit: (event) => {
            console.log('Submit: '***REMOVED*** values);
            data.type === 'in' ? onSignin(event) : onSignup(event);
    ***REMOVED***
***REMOVED***);

    const onTranslate = (event) => {
        console.log(formOverlayRef.current)
        console.log(formRef.current)

        // // const overlayOffset = 
        console.log(formRef.current.offsetTop***REMOVED*** formOverlayRef.current.offsetTop - formRef.current.offsetTop);

        

        
        const overlay = formOverlayRef.current;
        const form = formRef.current;

        translate(event***REMOVED*** formOverlayRef.current***REMOVED*** formRef.current);
        reinitializeForm({
            username: ""***REMOVED***
            email: ""***REMOVED*** // email can be username or password in case of signin
            password: ""***REMOVED***
            remember: false
    ***REMOVED***)
***REMOVED***

    const [errors***REMOVED*** setErrors] = useState([]);
    const history = useHistory();

    // requests
    const { doRequest: signinRequest***REMOVED*** errors: signinerrors } = useRequest({
        url: API_URL+'/api/users/signin'***REMOVED***
        method: 'post'***REMOVED***
        body: { 
            alias: values.email***REMOVED***
            password: values.password***REMOVED***
            remember: values.remember
    ***REMOVED***
***REMOVED***);

    const { doRequest: signupRequest***REMOVED*** errors: signuperrors } = useRequest({
        url: API_URL+'/api/users/signup'***REMOVED***
        method: 'post'***REMOVED***
        body: { ...values }
***REMOVED***);


    // const onEmailChange = (e) => setEmail(e.target.value);
    // const onPasswordChange = (e) => {console.log(e.target); setPassword(e.target.value);}

    const forgotPassword = () => {
        history.push('/auth/forgot');
***REMOVED***


    useEffect(() => {
        setShowFooterButton(false);
        return () => {
            setShowFooterButton(true);
    ***REMOVED***
***REMOVED******REMOVED*** []);
    
    // html data to render form
    useEffect(() => {
        // setEmail('');
        // setPassword('');
        setErrors([]);
***REMOVED******REMOVED*** [data])

    useEffect(() => {
        const e = data.type === 'in' ? signinerrors : signuperrors;
        var width = (window.innerWidth > 0) ? window.innerWidth : window.screen.width;

        if(e && e.length && width <= 1000) {
            const formContainer = document.querySelector(".auth.form-container");
            formContainer.classList.add('alert');
            var showAlert = "";
            e.map(({msg***REMOVED*** _***REMOVED*** => {
                if(msg) showAlert += '\n\u2022 ' + msg
***REMOVED***);

            setTimeout(() => {
                formContainer.classList.remove('alert');
***REMOVED*** 1000);

            if(!showAlert.length) showAlert = "Please try again in some time..."
            alert(showAlert);
            setErrors([]);
            return;
    ***REMOVED***

        setErrors(e ? e : ['Please try again in some time...']);
***REMOVED******REMOVED*** [signinerrors***REMOVED*** signuperrors])

    return (
        <div className="wrapper">
            <div id="form-app-overlay"></div>
            <div className="auth form-container">
                <FormOverlay>
                    <div className="form-overlay" ref={formOverlayRef}>
                        <header className="title">{data.banner}</header>
                        <div className="desc">{data.desc}</div>
                        <Button label={data.ghostTitle} iconClass={data.ghosticon} onClick={onTranslate}/>
                        
                    </div>
                </FormOverlay>

                <div className="center" ref={formRef}>
                    <div className={"in form-wrapper"}>
                        <header className="text-center">
                            <i class="fas fa-user-circle"></i>
                        </header>

                        <form>
                ***REMOVED***
                                data.type === 'up' && 
                                <FormInput
                                    label="Username"
                                    name="username"
                                    type="text"
                                    value={values.username}
                                    handleChange={handleChange}
                                />
            ***REMOVED***
                            <FormInput 
                                label={data.type == 'up' ? "Email" : 'Email / Username'}
                                name="email"
                                type="text"
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
