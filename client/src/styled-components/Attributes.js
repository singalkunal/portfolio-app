import styled from 'styled-components/macro';
import { FaIcon } from './FaIconLink';

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
    & span {
        font-size: ${props => props.fontSize || "16px"};
    }
    &:hover {
        cursor: pointer;
    }
`

export const StyledAttributes = styled.ul`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 10px 0;
`