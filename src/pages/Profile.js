import { useParams } from 'react-router-dom';
import useRequest from '../hooks/use-request';
const Profile = () => {
    const { uid } = useParams();
    const { doRequest, errors } =  useRequest({
        url: 'http://localhost:3080/api/users/currentuser',
        method: 'get',
        onSuccess: (res) => {
            
        }
    });

    const onSubmit = async (e) => {
        await doRequest();
    }

    return (
        <div>
            <h1>Profile of {uid}</h1>
            <button type="submit" onClick={onSubmit}>Click me</button>
        </ div>
    )
}


export default Profile
