import '../css/Home.css';
import Button from '../components/Button';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    
    const onClick = () => {
        history.push('/auth');
***REMOVED***

    return (
        <div className="container">
            <div className="home" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/sdlc.png)`}}>
                <div className="content-container">
                    <h1 className="heading">Build Your Portfolio Now!</h1>
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
                        <Button iconClass="fas fa-sign-in-alt" label="SignIn" onClick={onClick} />
                        <Button iconClass="fas fa-user-plus" label="SignUp" onClick={onClick} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
