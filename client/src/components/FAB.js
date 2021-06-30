import { useState***REMOVED*** useEffect***REMOVED*** useRef } from 'react';
import { Link***REMOVED*** history***REMOVED*** useHistory } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import '../css/FAB.css';

const FAB = ({ url***REMOVED*** iconClass="fas fa-edit" ***REMOVED*** => {
    const fabRef = useRef(null);
    // useRef is used instead of useState so that event listeners can get updated value
    // const [dragging***REMOVED*** setDragging] = useState(false);
    const draggingRef = useRef(false);
    const setDragging = (val) => draggingRef.current = val;
    const dataTip = ["Click hold and move"***REMOVED*** "Double Click to edit"]

    const history = useHistory();

    // important to use all state values in single state
    const [state***REMOVED*** setState] = useState({
        posx: 15***REMOVED***
        posy: 75***REMOVED***
        relx: 0***REMOVED***
        rely: 0
***REMOVED***);

    useEffect(() => {
        const fab = fabRef.current;
        if(!fab) return;
        document.addEventListener('mouseup'***REMOVED*** onMouseUp);
        document.addEventListener('mousemove'***REMOVED*** onMouseMove);

        return () => {
            document.removeEventListener('mouseup'***REMOVED*** onMouseUp);
            document.removeEventListener('mousemove'***REMOVED*** onMouseMove);
    ***REMOVED***
***REMOVED******REMOVED*** []);


    const onMouseDown = (e) => {
        console.log('mouse down');
        setDragging(true);

        // const pageX = e.pageX || e.changedTouches[0].pageX;
        // const pageY = e.pageY || e.changedTouches[0].pageY;

        const { pageX***REMOVED*** pageY } = e;

        setState(prev => {
            return {
                ...prev***REMOVED***
                relx: pageX + prev.posx***REMOVED***
                rely: pageY + prev.posy
***REMOVED***
    ***REMOVED***)

        e.stopPropagation();
        e.preventDefault();
***REMOVED***;

    const onMouseUp = (e) => {
        setDragging(false);
        
        setState(prev => {
            return {
                ...prev***REMOVED***
***REMOVED***
    ***REMOVED***)

        e.stopPropagation();
        e.preventDefault();
***REMOVED***;

    const onMouseMove = (e) => {
        const drag = draggingRef.current;
        if(!drag) return;

        // const pageX = e.pageX || e.changedTouches[0].pageX;
        // const pageY = e.pageY || e.changedTouches[0].pageY;

        const { pageX***REMOVED*** pageY } = e;

        setState(prev => {
            return {
                ...prev***REMOVED***
                posx: prev.relx - pageX***REMOVED***
                posy: prev.rely - pageY
***REMOVED***
    ***REMOVED***)

        e.stopPropagation();
        e.preventDefault();

***REMOVED***;

    const routeToUrl = (event) => {
        history.push(url);
***REMOVED***

    return (
        <>
        <div ref={fabRef} 
        className="fab" 
        style={{right: state.posx+'px'***REMOVED*** bottom: state.posy+'px' }} 
        onMouseDown={onMouseDown}
        onDoubleClick={routeToUrl}
        onTouchStart={routeToUrl}
        data-tip={dataTip[+draggingRef.current]}
        >
                <i className={iconClass}></i>
            
        </div>
        <ReactTooltip />

        </>
    )
}

export default FAB
