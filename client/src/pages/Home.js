import '../css/Home.css';
import Button from '../components/Button';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { LiveUpdateContext } from '../contexts/LiveUpdateContext';

const Home = () => {
    const history = useHistory();
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    // console.log(API_URL);
    
    const onClick = () => {
        history.push('/auth');
***REMOVED***

    const {userSignedIn} = useContext(LiveUpdateContext);
    console.log(userSignedIn);

    return (
        <div className="container">
            <div className="home" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/sdlc.png)`}}>
                <div className="content-container">
                    <h1 className="heading">Your Portfolio Now!</h1>
                    <Button className="example" label="See Example" iconClass="fas fa-external-link-alt"/>
                    <ul className="steps">
                        <li className="step">
                            <i class="fas fa-pencil-alt"></i>
                            <span className="text">Fill your details</span>
                        </li>
                        <li className="step">
                            <i class="far fa-eye"></i>
                            <span className="text">Refine using preview</span>
                        </li>
                        <li className="step">
                            <i class="fas fa-share-square"></i>
                            <span className="text">Save to your profile</span>
                        </li>
                    </ul>
                    <div className="buttons">
       ***REMOVED***
                       !userSignedIn
                       ?
                        <>
                            <Button label="SignIn" onClick={onClick} />
                            <Button label="SignUp" onClick={onClick} />
                        </>
                        :
                        <Button label="My Account" onClick={() => history.push('/account')} />
   ***REMOVED***
                   </div>
                </div>
            </div>
        </div>
    )
}

export default Home
