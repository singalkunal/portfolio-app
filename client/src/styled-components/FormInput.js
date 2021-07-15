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
    label***REMOVED*** 
    labelRightIcon***REMOVED***
    labelRightOnClick***REMOVED***
    dataid=""***REMOVED***
    name***REMOVED*** 
    type***REMOVED*** 
    value***REMOVED*** 
    placeholder=""***REMOVED***
    rightText***REMOVED***
    rightOnClick***REMOVED***
    handleChange***REMOVED*** 
    className
***REMOVED*** => {
    return (
        <div className={className}>
***REMOVED***
                label 
                && 
                <FormLabel>
                    <span>{label}</span>
        ***REMOVED***
                        labelRightIcon 
                        &&
                        <FontAwesomeIcon icon={labelRightIcon} onClick={labelRightOnClick} />}
                </FormLabel>
***REMOVED***
            <InputWithIcon>
                <StyledInput 
                    type={type}
                    name={name}
                    placeholder={placeholder}
                />
                <StyledTextIcon>{rightText}</StyledTextIcon>
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
