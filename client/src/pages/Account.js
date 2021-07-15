import { useHistory***REMOVED*** useParams***REMOVED*** Link } from "react-router-dom"
import { useContext***REMOVED*** useEffect***REMOVED*** useRef***REMOVED*** useState } from 'react';
import useRequest from "../hooks/use-request";

import Load from '../components/Load';
import SomeError from '../components/SomeError';

import calcPercentageCompleted from '../utils/user-details';
import {animateValue} from '../utils/animate';

import '../css/Account.css';
import { LiveUpdateContext } from "../contexts/LiveUpdateContext";

const Account = () => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    const redirectTime = 5 // redirection time (in seconds) on error
    const history = useHistory();

    const [user***REMOVED*** setUser] = useState({***REMOVED***
    const { setSignedInUser } = useContext(LiveUpdateContext);

    const [loading***REMOVED*** setLoading] = useState(true);
    const [isError***REMOVED*** setIsError] = useState(false);

    const [viewCount***REMOVED*** setViewCount] = useState('NA');
    const progressRef = useRef(null);


    const { doRequest: deleteAccount***REMOVED*** errors: deleteAccountErrors } = useRequest({
        method: 'delete'***REMOVED***
        url: API_URL + '/api/users/currentuser/delete'
***REMOVED***);

    const { doRequest: getUserDetails***REMOVED*** errors: getUserDetailsErrors } = useRequest({
        url: API_URL+"/api/users/currentuser/details"***REMOVED***
        method: 'get'
***REMOVED***);

    

    const onDeleteAccount = async (event) => {
        const res = await deleteAccount();
        if(res) {
            setSignedInUser(null);
            setUser(null);
            history.push('/');
    ***REMOVED***
***REMOVED***;


    // check if current signed in user
    useEffect(() => {
        // render data
        const fetchAndAnimate = async () => {
            
            const data = await getUserDetails();
            if(data) {
                const currentUser = data.user;
                setUser(currentUser);

                setIsError(false);
                setLoading(false);


                const p = calcPercentageCompleted(currentUser);
                console.log("% = "***REMOVED*** p);
                animateValue(0***REMOVED*** p***REMOVED*** 2000***REMOVED*** document.getElementById('bar')***REMOVED*** "value");
                animateValue(0***REMOVED*** p***REMOVED*** 2000***REMOVED*** progressRef.current***REMOVED*** "textContent"***REMOVED*** "% Profile completed");    
                // asynchronously animate certain fields
***REMOVED***
            else {
                setLoading(false);
                setIsError(true);
***REMOVED***

    ***REMOVED***

        fetchAndAnimate();

***REMOVED******REMOVED*** [])

    

    return (
        <div className="container">
            <div id="account-app-overlay"></div>
            <Load loading={loading}>
                <SomeError isError={isError || !user} redirect redirectTime={+redirectTime} path="/auth">
        ***REMOVED***
                        user
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
