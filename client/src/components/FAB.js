import { useState, useEffect, useRef } from 'react';
import { Link, history, useHistory } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import '../css/FAB.css';

const FAB = ({ url, iconClass="fas fa-edit" }) => {
    const fabRef = useRef(null);
    // useRef is used instead of useState so that event listeners can get updated value
    // const [dragging, setDragging] = useState(false);
    const draggingRef = useRef(false);
    const setDragging = (val) => draggingRef.current = val;
    const dataTip = ["Click hold and move", "Double Click to edit"]

    const history = useHistory();

    // important to use all state values in single state
    const [state, setState] = useState({
        posx: 10,
        posy: 80,
        relx: 0,
        rely: 0
    });

    useEffect(() => {
        const fab = fabRef.current;
        if(!fab) return;
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mousemove', onMouseMove);

        return () => {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }
    }, []);


    const onMouseDown = (e) => {
        console.log('mouse down');
        setDragging(true);

        // const pageX = e.pageX || e.changedTouches[0].pageX;
        // const pageY = e.pageY || e.changedTouches[0].pageY;

        const { pageX, pageY } = e;

        setState(prev => {
            return {
                ...prev,
                relx: pageX + prev.posx,
                rely: pageY + prev.posy
            }
        })

        e.stopPropagation();
        e.preventDefault();
    };

    const onMouseUp = (e) => {
        setDragging(false);
        
        setState(prev => {
            return {
                ...prev,
            }
        })

        e.stopPropagation();
        e.preventDefault();
    };

    const onMouseMove = (e) => {
        const drag = draggingRef.current;
        if(!drag) return;

        // const pageX = e.pageX || e.changedTouches[0].pageX;
        // const pageY = e.pageY || e.changedTouches[0].pageY;

        const { pageX, pageY } = e;

        setState(prev => {
            return {
                ...prev,
                posx: prev.relx - pageX,
                posy: prev.rely - pageY
            }
        })

        e.stopPropagation();
        e.preventDefault();

    };

    const routeToUrl = (event) => {
        history.push(url);
    }

    return (
        <>
        <div ref={fabRef} 
        className="fab" 
        style={{right: state.posx+'px', bottom: state.posy+'px' }} 
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
