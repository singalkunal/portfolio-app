import { useHistory, useParams, Link } from "react-router-dom"
import { useContext, useEffect, useRef, useState } from 'react';
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

    const [user, setUser] = useState({});
    const { setSignedInUser } = useContext(LiveUpdateContext);

    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [viewCount, setViewCount] = useState('NA');
    const progressRef = useRef(null);


    const { doRequest: deleteAccount, errors: deleteAccountErrors } = useRequest({
        method: 'delete',
        url: API_URL + '/api/users/currentuser/delete'
    });

    const { doRequest: getUserDetails, errors: getUserDetailsErrors } = useRequest({
        url: API_URL+"/api/users/currentuser/details",
        method: 'get'
    });

    

    const onDeleteAccount = async (event) => {
        const res = await deleteAccount();
        if(res) {
            setSignedInUser(null);
            setUser(null);
            history.push('/');
        }
    };


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
                console.log("% = ", p);
                animateValue(0, p, 2000, document.getElementById('bar'), "value");
                animateValue(0, p, 2000, progressRef.current, "textContent", "% Profile completed");    
                // asynchronously animate certain fields
            }
            else {
                setLoading(false);
                setIsError(true);
            }

        }

        fetchAndAnimate();

    }, [])

    

    return (
        <div className="container">
            <div id="account-app-overlay"></div>
            <Load loading={loading}>
                <SomeError isError={isError || !user} redirect redirectTime={+redirectTime} path="/auth">
                    {
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
                                        pathname:"/portfolio/" + user.username,
                                        state: {
                                            portfolio: user.portfolio
                                        }
                                    }}
                                    >
                                        <i className="far fa-file-alt"></i>
                                        <span className="text">My Portfolio</span>
                                    </Link>
                                    {/* <a href="">
                                    
                                    </a> */}
                                </li>

                                <li className="link">
                                    
                                    <Link to='/auth/forgot'>
                                        <i className="fas fa-key"></i>
                                        <span className="text">Change Password</span>
                                    </Link>
                                </li>

                                <li className="link" onClick={onDeleteAccount}>
                                    {/* <a href=""> */}
                                        <i className="fas fa-trash-alt"></i>
                                        <span className="text">Delete Account</span>
                                    {/* </a> */}
                                </li>

                            </ul>
                        </div>
                    }
                </SomeError>
            </Load>
        </div>
    )
}

export default Account
