import { useLocation } from "react-router"

const Redirect = () => {

    const location = useLocation();
    const { state } = location;
    return (
        <div className="container">
            <h3>{state.header}</h3>
            <p>{state.helptext}</p>
        </div>
    )
}

export default Redirect
