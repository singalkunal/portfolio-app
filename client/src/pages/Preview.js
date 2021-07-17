import { useContext } from 'react';
import { LiveUpdateContext } from '../contexts/LiveUpdateContext';

const Preview = ( props ) => {
    const { about } = useContext(LiveUpdateContext);
    // 

    

    return (
        <div>

            <h1>Preview Page</h1>
            <h3>{about.name || "No name"}</h3>
            <h4>{about.email || "No email"}</h4>

        </div>
    );
}

export default Preview;