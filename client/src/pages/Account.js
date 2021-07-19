import { useHistory, useParams, Link } from "react-router-dom"
import { useContext, useEffect, useRef, useState } from 'react';

import useRequest from "../hooks/use-request";
import useModal from '../hooks/use-modal';

import Load from '../components/Load';
import SomeError from '../components/SomeError';
import { LiveUpdateContext } from "../contexts/LiveUpdateContext";
import Alert from "../components/Alert";

import calcPercentageCompleted from '../utils/user-details';
import {animateValue} from '../utils/animate';

import '../css/Account.css';
import Error from "../components/Error";

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

    const { doRequest: postPortfolio, errors: postPortfolioErrors } = useRequest({
        url: `${API_URL}/api/portfolio/post`,
        method: 'post'
    })

    const { modalContainerRef:alertRef, openModal:openAlert, closeModal:closeAlert } = useModal({activeClass:"active"});
    
    const PostPortfolio = async () => {
        await postPortfolio();
    }

    const onProceedDelete = async () => {
        const res = await deleteAccount();
        if(res) {
            setSignedInUser(null);
            setUser(null);
            history.push('/');
        }
    }
    const onDeleteAccount = async (event) => {
        openAlert();
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


        return () => {
            const body = document.querySelector('body');
            body.style.overflowY = "scroll";
        }
    }, [])



    

    return (
        
        <div className="container" ref={alertRef}>
            <div id="account-app-overlay"></div>
            <Load loading={loading}>
                <SomeError isError={isError || !user} redirect redirectTime={+redirectTime} path="/auth">
                    {
                        user
                        &&
                        <div className="account">
                            <header className="label">
                                <i className="fas fa-user-alt"></i>
                                <span className="title">&#64;{user.username}</span>
                            </header>
                            <ul className="options">
                                <li className="d_flex">
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
                                    
                                </li>

                                <li className="link" onClick={PostPortfolio}>
                                    <i className="fas fa-globe"></i>
                                    <span className="text">Post Portfolio</span>
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

                            <Error errors={postPortfolioErrors} disappearIn={5000}/>
                        </div>
                    }

                    <Alert
                        closeModal={closeAlert}
                        onProceed={onProceedDelete}
                        msg="Delete Account? "
                        isPositive={0}
                        ref={alertRef}
                    />
                </SomeError>
            </Load>
        </div>
    )
}

export default Account
