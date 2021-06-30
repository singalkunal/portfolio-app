import PulseLoader from 'react-spinners/PulseLoader';

const Load = ({ loading***REMOVED*** children ***REMOVED*** => {
    console.log(loading);
    return (
        <>
***REMOVED***
                loading ? 
                <PulseLoader loading={loading} size={25} margin={20} color="#2E3959"/> :
                children
***REMOVED***
        </>
    )
}

export default Load
