import { useEffect***REMOVED*** useState } from "react"

const SomeError = ({ isError***REMOVED*** redirect***REMOVED*** redirectTime***REMOVED*** children ***REMOVED*** => {
    const [timeLeft***REMOVED*** setTimeLeft] = useState(+redirectTime);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(prev => prev-1);
    ***REMOVED******REMOVED*** 1000)
        return () => clearTimeout(timer);
***REMOVED***);

    return (
        <>
***REMOVED***
                isError
                ?
                <div className="some-error">
                    <h1>Error bruh</h1>
        ***REMOVED***redirect ? <span>Redirecting in... {timeLeft}</span> : ''}
                </div>
                :
                children
***REMOVED***
        </>
    )
}

export default SomeError
