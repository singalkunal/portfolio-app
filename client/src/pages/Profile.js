import { useParams } from 'react-router-dom';
import useRequest from '../hooks/use-request';
const Profile = () => {
    const { uid } = useParams();
    const { doRequest***REMOVED*** errors } =  useRequest({
        url: 'http://localhost:3080/api/users/currentuser'***REMOVED***
        method: 'get'***REMOVED***
        onSuccess: (res) => {
            console.log("Response:"***REMOVED*** res);
    ***REMOVED***
***REMOVED***);

    const onSubmit = async (e) => {
    ***REMOVED***
            await doRequest();
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
***REMOVED***

    return (
        <div>
            <h1>Profile of {uid}</h1>
            <button type="submit" onClick={onSubmit}>Click me</button>
        </ div>
    )
}


export default Profile
