import { useEffect***REMOVED*** useState } from "react"
import { useHistory } from "react-router";

const SomeError = ({ isError***REMOVED*** redirect***REMOVED*** redirectTime***REMOVED*** children***REMOVED*** path=null ***REMOVED*** => {
    const [timeLeft***REMOVED*** setTimeLeft] = useState(+redirectTime);
    const history = useHistory()
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(prev => Math.max(0***REMOVED*** prev-1));
    ***REMOVED******REMOVED*** 1000)
        return () => clearTimeout(timer);
***REMOVED***);

    useEffect(() => {
        if(isError && path && !timeLeft) {
            history.push(path);
    ***REMOVED***
***REMOVED******REMOVED*** [timeLeft]);

    useEffect(() => {
        if(isError) {
            setTimeLeft(+redirectTime);
    ***REMOVED***
***REMOVED******REMOVED*** [isError]);
    return (
        <>
***REMOVED***
                isError
                ?
                <div className="some-error">
                    <h1>Access Denied</h1>
        ***REMOVED***redirect ? <span>Redirecting in... {timeLeft}</span> : ''}
                </div>
                :
                children
***REMOVED***
        </>
    )
}

export default SomeError
