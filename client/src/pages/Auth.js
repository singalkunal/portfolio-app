import { useContext, useEffect, useRef, useState } from 'react';
import useTranslate from '../hooks/use-translate';
import { Redirect, useHistory } from 'react-router-dom';

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
    const { translate, data } = useTranslate();

    const { setSignedInUser, setShowFooterButton } = useContext(LiveUpdateContext);

    const formOverlayRef = useRef(null);
    const formRef = useRef(null);
    
    const onSignin = async () => {
        const { email, password } = values; // email can be username or password

        console.log(email, password);
        try {
            const res = await signinRequest();
            console.log(res);
            if(res) {
                console.log('Successfully signed in...', res);
                setSignedInUser(res.user);
                history.push('/account');
            }
        }
        catch(err) {console.log('Error while signing in: ', err)}
    }

    const onSignup = async () => {
        try {
            const res = await signupRequest();
            if(res) {
                console.log('Successfully signed up...');
                console.log(res);
                history.push({
                    pathname: '/redirect',
                    state: {
                        header: 'Thank you for registering with us...',
                        helptext: 'Check you email for verification...'
                    }
                });
            }
        }
        catch(err) {console.log('Error while signing up: ', err)}
    }

    const { values, reinitializeForm, handleChange, handleSubmit } = useForm({
        initialValues: {
            username: "",
            email: "",
            password: "",
            remember: false
        },
        onSubmit: (event) => {
            console.log('Submit: ', values);
            data.type === 'in' ? onSignin(event) : onSignup(event);
        }
    });

    const onTranslate = (event) => {
        console.log(formOverlayRef.current)
        console.log(formRef.current)

        // // const overlayOffset = 
        console.log(formRef.current.offsetTop, formOverlayRef.current.offsetTop - formRef.current.offsetTop);

        

        
        const overlay = formOverlayRef.current;
        const form = formRef.current;

        translate(event, formOverlayRef.current, formRef.current);
        reinitializeForm({
            username: "",
            email: "", // email can be username or password in case of signin
            password: "",
            remember: false
        })
    }

    const [errors, setErrors] = useState([]);
    const history = useHistory();

    // requests
    const { doRequest: signinRequest, errors: signinerrors } = useRequest({
        url: API_URL+'/api/users/signin',
        method: 'post',
        body: { 
            alias: values.email,
            password: values.password,
            remember: values.remember
        }
    });

    const { doRequest: signupRequest, errors: signuperrors } = useRequest({
        url: API_URL+'/api/users/signup',
        method: 'post',
        body: { ...values }
    });


    // const onEmailChange = (e) => setEmail(e.target.value);
    // const onPasswordChange = (e) => {console.log(e.target); setPassword(e.target.value);}

    const forgotPassword = () => {
        history.push('/auth/forgot');
    }


    useEffect(() => {
        setShowFooterButton(false);
        return () => {
            setShowFooterButton(true);
        }
    }, []);
    
    // html data to render form
    useEffect(() => {
        // setEmail('');
        // setPassword('');
        setErrors([]);
    }, [data])

    useEffect(() => {
        const e = data.type === 'in' ? signinerrors : signuperrors;
        var width = (window.innerWidth > 0) ? window.innerWidth : window.screen.width;

        if(e && e.length && width <= 1000) {
            const formContainer = document.querySelector(".auth.form-container");
            formContainer.classList.add('alert');
            var showAlert = "";
            e.map(({msg, _}) => {
                if(msg) showAlert += '\n\u2022 ' + msg
            });

            setTimeout(() => {
                formContainer.classList.remove('alert');
            }, 1000);

            if(!showAlert.length) showAlert = "Please try again in some time..."
            alert(showAlert);
            setErrors([]);
            return;
        }

        setErrors(e ? e : ['Please try again in some time...']);
    }, [signinerrors, signuperrors])

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
                            {
                                data.type === 'up' && 
                                <FormInput
                                    label="Username"
                                    name="username"
                                    type="text"
                                    value={values.username}
                                    handleChange={handleChange}
                                />
                            }
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

                            {
                                data.type === 'in' && 
                                <FormInput 
                                    label="Remember me for a month"
                                    iconClasses=""
                                    name="remember"
                                    type="checkbox"
                                    value={values.remember}
                                    handleChange={handleChange}
                                />
                            }
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
