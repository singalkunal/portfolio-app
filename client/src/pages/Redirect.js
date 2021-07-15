import { useLocation } from "react-router"

const Redirect = ({ 
    header='Can\'t fetch the page you requested for...'***REMOVED***
    helptext='Be patient try in some time'
***REMOVED*** => {

    const location = useLocation();
    const { state } = location;


    return (
        <div className="container">
            <h3>{state ? state.header : header }</h3>
            <p>{state ? state.helptext : helptext }</p>
        </div>
    )
}

export default Redirect
