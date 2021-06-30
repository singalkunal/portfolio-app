import * as Icon from '../icons/SideBarIcons';

const SideBarLink = ({ icon***REMOVED*** title ***REMOVED*** => {
  return (
    <li>
        <a href="#" className="link">
            <Icon.InfoIcon className="icon" />
            <div className="text">{title}</div>
        </a>
    </li>
  );
};

export default SideBarLink;
