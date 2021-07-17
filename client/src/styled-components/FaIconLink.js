import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const FaIcon = styled(FontAwesomeIcon) `
    width: ${props => props.width || "24px"} !important;
    height: ${props => props.height || "24px"};

    transition: all 20ms ease-in-out;

    &:hover{
        ${props => props.hover}
    }
`
const FaIconLink = ({
    icon,
    link="",
    width,
    height,
    onHover={transform: "scale(1.1)"},
    external
}) => {
    return (

        <>
        {
            external
            ?
            <a href={link}>
                <FaIcon 
                    icon={icon}
                    width={width}
                    height={height}
                    hover={onHover}
                />
            </a>
            :
            <Link to={link}>
                <FaIcon 
                    icon={icon}
                    width={width}
                    height={height}
                    hover={onHover}
                />
            </Link>
        }
        </>
    )
}

export default FaIconLink
