import { useEffect, useState } from "react";
import { useLocation } from "react-router"
import Load from "../components/Load";
import SomeError from "../components/SomeError";
import useRequest from "../hooks/use-request";
import { Container } from "../styled-components/Container.style"

const Verify = () => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    const query = new URLSearchParams(useLocation().search);

    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const { doRequest: verifyEmailRequest, errors } = useRequest({
        url: `${API_URL}/api/users/verify?code=${query.get('code')}&email=${query.get('email')}`,
        method: 'get'
    })

    useEffect(() => {
        const verifyEmail = async () => {
            const res = await verifyEmailRequest();

            if(res === 'OK') {
                setLoading(false);
            }
            else {
                setIsError(true);
                setLoading(false);
            }
        }

        verifyEmail();
    }, []);

    return (
        <Load loading={loading}>
            <SomeError
                errorHeader="Can`t verify user"
                errors={errors}
                isError={isError}
            >
                <Container>
                    <h1>Verified</h1>
                    <p>You can now close this tab</p>
                </Container>
            </SomeError>
        </Load>
    )
}

export default Verify
