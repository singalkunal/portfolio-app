import * as Icon from '../icons/SideBarIcons';

const SideBarLink = ({ icon, title }) => {
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
