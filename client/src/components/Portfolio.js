import { useParams***REMOVED*** useLocation } from 'react-router-dom';
import { useState***REMOVED*** useEffect***REMOVED*** useContext } from 'react';
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

    const {signedInUser***REMOVED*** setShowMail } = useContext(LiveUpdateContext);

    const [showFab***REMOVED*** setShowFab] = useState(false);
    const [portfolio***REMOVED*** setPortfolio] = useState({***REMOVED***
    const [loading***REMOVED*** setLoading] = useState(true);
    const [isError***REMOVED*** setIsError] = useState(true);

    const { doRequest: fetchCurrentUser***REMOVED*** errors: curerr } = useRequest({
        url: API_URL+'/api/users/currentuser'***REMOVED***
        method: 'get'
***REMOVED***)
    const { doRequest: fetchUser***REMOVED*** errors } = useRequest({
        url: API_URL+'/api/users/details/' + username***REMOVED***
        method: 'get'
***REMOVED***);

    // set portfolio
    // Case 1: portfoio is already passed from account page
    // Case 2: have to fetch
    useEffect(() => {
        const fetchPortfolio = async () => {
            var passedPortfolio = null;
            if(location.state) passedPortfolio = location.state.portfolio;
            
            if(signedInUser && (signedInUser.username === username)) setShowFab(true);

            if(passedPortfolio) {
                console.log('passeed');
                setIsError(false);
                setPortfolio(passedPortfolio);
***REMOVED***
            else {
                console.log('nadda');
            ***REMOVED***
                    const { user } = await fetchUser();
                    if(user) {
                        setShowMail(user.email);
                        setIsError(false);
                        setPortfolio(user.portfolio);
    ***REMOVED***
***REMOVED***
            ***REMOVED***
                    setIsError(true);
***REMOVED***
***REMOVED***
            
            setLoading(false);
    ***REMOVED***;

        fetchPortfolio();

        return () => {
            setShowMail(null);
    ***REMOVED***;

***REMOVED******REMOVED*** []);

    useEffect(() => {
        if(errors && errors.length) {
            console.log(errors)
            setIsError(true);
            setLoading(false);
    ***REMOVED***
        else if(curerr && curerr.length) {
            console.log(curerr);
            setIsError(true);
            setLoading(false);
    ***REMOVED***
        else {
            // setIsError(false);
    ***REMOVED***
***REMOVED******REMOVED*** [errors***REMOVED*** curerr])

    return (

        <>
            <div className="container">
                <Load loading={loading}>
                    <SomeError isError={isError} errorHeader="Error!!" errors={[...errors***REMOVED*** ...curerr]}>
                        <About about={portfolio.about} />
                        <Experiences experiences={portfolio.experiences} />
                        <Skills skills={portfolio.skills} />
                    </SomeError>
                </Load>
            </div>
***REMOVED***showFab && <FAB url="/portfolio/edit" />}
        </>
    )
}

export default Portfolio;
