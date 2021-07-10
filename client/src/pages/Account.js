import { useHistory***REMOVED*** useParams***REMOVED*** Link } from "react-router-dom"
import { useContext***REMOVED*** useEffect***REMOVED*** useRef***REMOVED*** useState } from 'react';
import useRequest from "../hooks/use-request";

import Load from '../components/Load';
import SomeError from '../components/SomeError';

import calcPercentageCompleted from '../utils/user-details';
import {animateValue} from '../utils/animate';

import '../css/Account.css';
import { LiveUpdateContext } from "../contexts/LiveUpdateContext";
import axios from "axios";

const Account = () => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    const COUNT_API_URL = 'https://api.countapi.xyz/get/'
    const redirectTime = 5 // redirection time (in seconds) on error
    const history = useHistory();
    const [loading***REMOVED*** setLoading] = useState(true);
    const [isError***REMOVED*** setIsError] = useState(false);
    const [user***REMOVED*** setUser] = useState({***REMOVED***
    const [viewCount***REMOVED*** setViewCount] = useState('NA');
    const progressRef = useRef(null);

    const { doRequest***REMOVED*** errors } = useRequest({
        url: API_URL + '/api/users/currentuser/details'***REMOVED***
        method: "get"***REMOVED***
***REMOVED***);

    const { doRequest: getViewCounts***REMOVED*** errors: viewCountErrors } = useRequest({
        // url: COUNT_API_URL + window.location.hostname + '/portfolio-' + user.username***REMOVED***
        method: "get"
***REMOVED***);

    const { doRequest: deleteAccount***REMOVED*** errors: deleteAccountErrors } = useRequest({
        method: 'delete'***REMOVED***
        url: API_URL + '/api/users/currentuser/delete'
***REMOVED***)

    const onDeleteAccount = async (event) => {
        // console.log('Delete me fast');

        const res = await deleteAccount();
        if(res) {
            setUserSignedIn(false);
            history.push('/');
    ***REMOVED***
***REMOVED***;

    const { userSignedIn***REMOVED*** setUserSignedIn***REMOVED*** globalLoading } = useContext(LiveUpdateContext);

    // check if current signed in user
    useEffect(() => {
        // render data
        console.log(window.location.hostname)
        const fetchAndAnimate = async () => {
            const data = await doRequest();
            if(data) {
                const { viewCount: vc***REMOVED*** user } = data;
                setViewCount(vc);
                setUser(user);
                setIsError(false);
                setLoading(false);

                // asynchronously animate certain fields
                animateValue(0***REMOVED*** calcPercentageCompleted(user)***REMOVED*** 2000***REMOVED*** document.getElementById('bar')***REMOVED*** "value");
                animateValue(0***REMOVED*** calcPercentageCompleted(user)***REMOVED*** 2000***REMOVED*** progressRef.current***REMOVED*** "textContent"***REMOVED*** "% Profile completed");
***REMOVED***

    ***REMOVED***

        fetchAndAnimate();

***REMOVED******REMOVED*** [])

    useEffect(() => {
        // var timer;
        if(isError || (errors && errors.length)) {
            console.log(errors)
            setIsError(true);
            setLoading(false);
    ***REMOVED***
        else {
            setIsError(false);
    ***REMOVED***

        // return () => clearTimeout(timer);
***REMOVED******REMOVED*** [errors***REMOVED*** isError]);

    

    return (
        <div className="container">
            <div id="account-app-overlay"></div>
            <Load loading={loading || globalLoading}>
                <SomeError isError={isError || !userSignedIn} redirect redirectTime={+redirectTime} path="/auth">
        ***REMOVED***
                        userSignedIn
                        &&
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
                                    <span className="text">Views: {viewCount} </span>
                                </li>

                                <li className="link">
                                    <Link to={{
                                        pathname:"/portfolio/" + user.username***REMOVED***
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
                                    
                                    <Link to='/auth/forgot'>
                                        <i className="fas fa-key"></i>
                                        <span className="text">Change Password</span>
                                    </Link>
                                </li>

                                <li className="link" onClick={onDeleteAccount}>
                        ***REMOVED***/* <a href=""> */}
                                        <i className="fas fa-trash-alt"></i>
                                        <span className="text">Delete Account</span>
                        ***REMOVED***/* </a> */}
                                </li>

                            </ul>
                        </div>
    ***REMOVED***
                </SomeError>
            </Load>
        </div>
    )
}

export default Account
