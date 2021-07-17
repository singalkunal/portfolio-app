import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components/macro';

const FormLabel = styled.label`
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
`

const InputWithIcon = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`
const StyledInput = styled.input`
    width: 100%;
`

const StyledTextIcon = styled.span`
    font-size: 12px;
    font-weight: 700;

    cursor: pointer;

    position: absolute;
    right: 5px;
    
`

const FormInput = ({
    label, 
    labelRightIcon,
    labelRightOnClick,
    dataid="",
    name, 
    type, 
    value, 
    placeholder="",
    rightText,
    rightOnClick,
    handleChange, 
    handleSubmit,
    className
}) => {
    return (
        <div className={className}>
            {
                label 
                && 
                <FormLabel>
                    <span>{label}</span>
                    {
                        labelRightIcon 
                        &&
                        <FontAwesomeIcon icon={labelRightIcon} onClick={labelRightOnClick} />}
                </FormLabel>
            }
            <InputWithIcon>
                <StyledInput 
                    type={type}
                    value={value}
                    name={name}
                    placeholder={placeholder}
                    onChange={handleChange}
                />
                <StyledTextIcon onClick={handleSubmit}>{rightText}</StyledTextIcon>
            </InputWithIcon>
        </div>
    )
}

export const StyledFormInput = styled(FormInput)`
    display: flex;
    flex-direction: column;

    margin: 10px 0;
`
export default FormInput
