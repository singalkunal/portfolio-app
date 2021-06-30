import '../css/FormInput.css'
const FormInput = ({ 
    label***REMOVED*** 
    iconClasses***REMOVED*** 
    name***REMOVED*** 
    type***REMOVED*** 
    value***REMOVED*** 
    placeholder=""***REMOVED***
    handleChange***REMOVED*** 
    required=false ***REMOVED*** => {
    return (
        <div className={"form-group " + type}>
***REMOVED*** label && <label className="form-label">{label}</label> }
***REMOVED***
                type === 'textarea'
                ?
                <textarea 
                    rows="10" 
                    columns="10"
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                ></textarea>
                :
                iconClasses
                ?
                <div className="inputwithicon">
                    <i className={iconClasses}></i>
                    <input 
                        type={type} 
                        name={name} 
                        value={value}
                        placeholder={placeholder}
                        required={required}
                        onChange={handleChange}
                    />
                </div>
                :

                <input 
                    type={type} 
                    name={name} 
                    value={value}
                    required={required}
                    onChange={handleChange}
                />
***REMOVED***
        </div>
    )
}

export default FormInput
