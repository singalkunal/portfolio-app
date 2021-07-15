import { useParams } from 'react-router-dom';
import useRequest from '../hooks/use-request';
const Profile = () => {
    const { uid } = useParams();
    const { doRequest, errors } =  useRequest({
        url: 'http://localhost:3080/api/users/currentuser',
        method: 'get',
        onSuccess: (res) => {
            console.log("Response:", res);
        }
    });

    const onSubmit = async (e) => {
        try {
            await doRequest();
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h1>Profile of {uid}</h1>
            <button type="submit" onClick={onSubmit}>Click me</button>
        </ div>
    )
}


export default Profile
