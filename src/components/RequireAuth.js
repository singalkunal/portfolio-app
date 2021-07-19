import { useContext } from "react";
import { LiveUpdateContext } from "../contexts/LiveUpdateContext";
import Redirect from "../pages/Redirect";
import Load from "./Load";
import SomeError from "./SomeError";

const RequireAuth = ({ children }) => {
const { signedInUser, globalLoading } = useContext(LiveUpdateContext);
    const redirectTime = 3;
    return (
        <>
            <Load loading={globalLoading}>
                <SomeError 
                    isError={!signedInUser}
                    errorHeader="Must sign in to access community"
                    redirect
                    redirectTime={redirectTime}
                    path="/auth"
                >
                    {children}
                </SomeError>
            </Load>
        </>
    )
}

export default RequireAuth
