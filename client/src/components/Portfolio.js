import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import useRequest from '../hooks/use-request';

import About from './About';
import Experiences from './Experiences';
import Skills from './Skills';
import FAB from './FAB';

import Load from './Load';
import SomeError from './SomeError';

import '../css/Portfolio.css';
import { LiveUpdateContext } from '../contexts/LiveUpdateContext';
import Error from './Error';

const Portfolio = () => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    const { username } = useParams();
    const location = useLocation();

    const {signedInUser, setShowMail } = useContext(LiveUpdateContext);

    const [portfolio, setPortfolio] = useState({});
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(true);

    const { doRequest: fetchCurrentUser, errors: curerr } = useRequest({
        url: API_URL+'/api/users/currentuser',
        method: 'get'
    })
    const { doRequest: fetchUser, errors } = useRequest({
        url: API_URL+'/api/users/details/' + username,
        method: 'get'
    });

    // set portfolio
    // Case 1: portfoio is already passed from account page
    // Case 2: have to fetch
    useEffect(() => {
        const fetchPortfolio = async () => {
            var passedPortfolio = null;
            if(location.state) passedPortfolio = location.state.portfolio;

            if(passedPortfolio) {

                setIsError(false);
                setPortfolio(passedPortfolio);
            }
            else {
                try {
                    const { user } = await fetchUser();
                    if(user) {
                        setShowMail(user.email);
                        setIsError(false);
                        setPortfolio(user.portfolio);
                    }
                }
                catch(err) {
                    setIsError(true);
                }
            }
            
            setLoading(false);
        };

        fetchPortfolio();
        return () => {
            setShowMail(null);
        };

    }, []);

    useEffect(() => {
        if(errors && errors.length) {
            setIsError(true);
            setLoading(false);
        }
        else if(curerr && curerr.length) {
            setIsError(true);
            setLoading(false);
        }
        else {
            // setIsError(false);
        }
    }, [errors, curerr])

    return (

        <>
            <div className="container">
                <Load loading={loading}>
                    <SomeError isError={isError} errorHeader="Error!!" errors={[...errors, ...curerr]}>
                        <About about={portfolio.about} />
                        <Experiences experiences={portfolio.experiences} />
                        <Skills skills={portfolio.skills} />
                    </SomeError>
                </Load>
            </div>
            {(signedInUser?.username === username) && <FAB url="/portfolio/edit" />}
        </>
    )
}

export default Portfolio;
