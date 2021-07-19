import styled from 'styled-components/macro';
import { FaIcon } from './FaIconLink';

const cssVariables = {
    minDesktopWidth: "1000px",
}

const Attribute = ({
    className,
    icon,
    iconWidth,
    iconHeight,
    label,
    onClick
}) => {
    return (
        <li className={className} onClick={onClick}>
            <FaIcon
                icon={icon}
                width={iconWidth || "16px"}
                height={iconHeight || "16px"}
            />

            <span>{label}</span>
        </li>
    )
}


export const StyledAttribute = styled(Attribute)`
    padding: 0 10px;
    cursor: ${props => props.noLink ? 'unset': 'pointer'};
    & span {
        font-size: ${props => props.fontSize || "16px"};
    }
`

export const StyledAttributes = styled.ul`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 10px 0;

    &.hideOnSmall {
        @media only screen and (max-width: ${cssVariables.minDesktopWidth}) {
            display: none;
        }
    }
`