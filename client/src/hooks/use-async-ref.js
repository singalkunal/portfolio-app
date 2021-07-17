import { useRef, useState, useEffect } from "react"

const useAsyncRef = (value, isProp=false) => {
    const ref = useRef(value);
    // useRef doesn't triggers re-render
    // we are using dummy state variable to force re render
    const [, forceRender] = useState(false);

    const updateState = (newState) => {
        // if (!Object.is(ref.current, newState)) {
        //     ref.current = newState;
        //     forceRender(s => !s);
        //     
        // }

        ref.current = newState;
        forceRender(s => !s);
        
    }
      
    if (isProp) {
        ref.current = value;
        return ref;
    }
      
    return [ref, updateState];
}
      

export default useAsyncRef
