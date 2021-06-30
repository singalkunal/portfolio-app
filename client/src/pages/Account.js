import { useHistory***REMOVED*** useParams***REMOVED*** Link } from "react-router-dom"
import { useEffect***REMOVED*** useRef***REMOVED*** useState } from 'react';
import useRequest from "../hooks/use-request";

import Load from '../components/Load';
import SomeError from '../components/SomeError';

import calcPercentageCompleted from '../utils/user-details';
import {animateValue} from '../utils/animate';

import '../css/Account.css';

const Account = () => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    const redirectTime = 10 // redirection time (in seconds) on error
    const history = useHistory();
    const [loading***REMOVED*** setLoading] = useState(true);
    const [isError***REMOVED*** setIsError] = useState(false);
    const [user***REMOVED*** setUser] = useState({***REMOVED***
    const progressRef = useRef(null);

    const { doRequest***REMOVED*** errors } = useRequest({
        url: API_URL + '/api/users/currentuser/details'***REMOVED***
        method: "get"***REMOVED***
***REMOVED***);

    // check if current signed in user
    useEffect(() => {
        // render data
        const fetchAndAnimate = async () => {
            const data = await doRequest();
            if(data) {
                setUser(data);
                setIsError(false);
                setLoading(false);
***REMOVED***

            // asynchronously animate certain fields
            animateValue(0***REMOVED*** calcPercentageCompleted(data)***REMOVED*** 2000***REMOVED*** document.getElementById('bar')***REMOVED*** "value");
            animateValue(0***REMOVED*** calcPercentageCompleted(data)***REMOVED*** 2000***REMOVED*** progressRef.current***REMOVED*** "textContent"***REMOVED*** "% Profile completed");
    ***REMOVED***

        fetchAndAnimate();

***REMOVED******REMOVED*** [])

    useEffect(() => {
        if(errors && errors.length) {
            console.log(errors)
            setIsError(true);
            setLoading(false);
            setTimeout(() => {
                history.push('/auth');
***REMOVED*** (+redirectTime) * 1000)
            // set timeout for showing error and automatic redirect
            // to signin/up page
    ***REMOVED***
        else {
            setIsError(false);
    ***REMOVED***
***REMOVED******REMOVED*** [errors])

    

    return (
        <div className="container">
            <div id="account-app-overlay"></div>
            <Load loading={loading}>
                <SomeError isError={isError} redirect redirectTime={+redirectTime}>
                    <div className="account">
                        <header className="label">
                            <i className="fas fa-user-alt"></i>
                            <span className="title">My Account</span>
                        </header>
                        <ul className="options">
                            <li>
                                <i className="fas fa-envelope-square"></i>
                                <span className="text">{user.email}</span>
                            </li>
                            <li className="progress">
                                <div class="bar-container">
                                    <progress max="100" id="bar"></progress>
                                </div>
                                <div ref={progressRef} className="bar-percentage" data-percentage={calcPercentageCompleted(user)}></div>
                            </li>

                            <li className="views">
                                <i className="fas fa-eye"></i>
                                <span className="text">Views: 101</span>
                            </li>

                            <li className="link">
                                <Link to={{
                                    pathname:"/portfolio/" + user.id***REMOVED***
                                    state: {
                                        portfolio: user.portfolio
                    ***REMOVED***
                ***REMOVED***}
                                >
                                    <i className="far fa-file-alt"></i>
                                    <span className="text">My Portfolio</span>
                                </Link>
                    ***REMOVED***/* <a href="">
                                
                                </a> */}
                            </li>

                            <li className="link">
                                
                                <a href="">
                                    <i className="fas fa-key"></i>
                                    <span className="text">Change Password</span>
                                </a>
                            </li>

                            <li className="link">
                                <a href="">
                                    <i className="fas fa-trash-alt"></i>
                                    <span className="text">Delete Account</span>
                                </a>
                            </li>

                        </ul>
                    </div>
                </SomeError>
            </Load>
        </div>
    )
}

export default Account
