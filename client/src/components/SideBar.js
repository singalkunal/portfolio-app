import { useRef***REMOVED*** useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icon from '../icons/SideBarIcons';
import '../css/SideBar.css'

const SideBar = () => {
    const [expand***REMOVED*** setExpand] = useState(false);
    const sidebarRef = useRef(null)
    const links = [
***REMOVED***
            icon: process.env.PUBLIC_URL + '/info_circle_outline.svg'***REMOVED***
            title: "About"
    ***REMOVED******REMOVED***
***REMOVED***
            icon: process.env.PUBLIC_URL + '/info_circle_outline.svg'***REMOVED***
            title: "About"
    ***REMOVED******REMOVED***
***REMOVED***
            icon: process.env.PUBLIC_URL + '/info_circle_outline.svg'***REMOVED***
            title: "About"
    ***REMOVED******REMOVED***
***REMOVED***
            icon: process.env.PUBLIC_URL + '/info_circle_outline.svg'***REMOVED***
            title: "About"
    ***REMOVED******REMOVED***
    ];

    const [width***REMOVED*** height] = ["24px"***REMOVED*** "16px"];

    const handlHover = (e) => {

***REMOVED***

    const onClick = () => {
        var width = (window.innerWidth > 0) ? window.innerWidth : window.screen.width;

        const sidebar = sidebarRef.current;

        if(!sidebar || width < 620) return;

        if(!expand) {
            const elems = sidebar.querySelectorAll('.link-text');
            sidebar.classList.add('expand');

            // for smooth transition on display none
            setTimeout(()=> {
                for(let elem of elems){
                    elem.classList["add"]('visible');
***REMOVED***
***REMOVED*** 20);
    ***REMOVED***
        else if(expand) {
            const elems = sidebar.querySelectorAll('.link-text');
            sidebar.classList.remove('expand');
            setTimeout(()=> {
                for(let elem of elems){
                    elem.classList.remove('visible');
***REMOVED***
***REMOVED*** 20);
    ***REMOVED***

        setExpand(!expand);
***REMOVED***
    return (
        <div ref={sidebarRef} className="sidebar">
            <div className="sidebar-link logo" onClick={onClick}>
                <Icon.ShowIcon />
                <span className="link-text logo-text">Portfolio App</span>
            </div>
            <a href='#about'  className="sidebar-link nav-item">
                <Icon.InfoIcon />
                <span className="link-text">About</span>
            </a>
            <a href='#experiences' className="sidebar-link nav-item">
                <Icon.ExperienceIcon />
                <span className="link-text">Experience</span>
            </a>
            <a href='#skills' className="sidebar-link nav-item">
                <Icon.SkillsIcon />
                <span className="link-text">Skills</span>
            </a>

            <Link to='/account' className="sidebar-link nav-item">
                <Icon.UserIcon />
                <span className="link-text">My Account</span>
            </Link>
        </div>
    )
}

export default SideBar
