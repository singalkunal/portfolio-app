import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LiveUpdateContext } from "../contexts/LiveUpdateContext";
import useRequest from "../hooks/use-request"
import Button from "./Button";

import { socket } from '../service/socket';

const SignOut = ({className=""}) => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;

    const {setSignedInUser} = useContext(LiveUpdateContext)
    const { doRequest: signOut, errors } = useRequest({
        url: API_URL+'/api/users/signout',
        method: 'delete'
    });

    const history = useHistory();

    const signout = async (event) => {
        socket.emit('close-session');
        await signOut();
        // window.location.reload();
        setSignedInUser(null);
        // history.push('/');
    };


    return (
        <Button
            label="Sign Out"
            className={"takeme " + className}
            onClick={signout}
        />
    )
}

export default SignOut
