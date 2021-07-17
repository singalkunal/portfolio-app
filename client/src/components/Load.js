import PulseLoader from 'react-spinners/PulseLoader';
import { Container } from '../styled-components/Container.style';

const Load = ({ loading, children }) => {
    return (
        <>
            {
                loading 
                ? 
                <Container><PulseLoader loading={loading} size={25} margin={20} color="#2E3959"/> </Container>
                :
                children
            }
        </>
    )
}

export default Load
