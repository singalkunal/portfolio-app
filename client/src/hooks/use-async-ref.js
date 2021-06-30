import { useRef***REMOVED*** useState***REMOVED*** useEffect } from "react"

const useAsyncRef = (value***REMOVED*** isProp=false) => {
    const ref = useRef(value);
    // useRef doesn't triggers re-render
    // we are using dummy state variable to force re render
    const [***REMOVED*** forceRender] = useState(false);

    const updateState = (newState) => {
        // if (!Object.is(ref.current***REMOVED*** newState)) {
        //     ref.current = newState;
        //     forceRender(s => !s);
        //     console.log('re-render');
        // }

        ref.current = newState;
        forceRender(s => !s);
        console.log('re-render');
***REMOVED***
      
    if (isProp) {
        ref.current = value;
        return ref;
***REMOVED***
      
    return [ref***REMOVED*** updateState];
}
      

export default useAsyncRef
