import '../css/FormInput.css'
const FormInput = ({ 
    label***REMOVED*** 
    dataid=""***REMOVED***
    name***REMOVED*** 
    type***REMOVED*** 
    value***REMOVED*** 
    placeholder=""***REMOVED***
    iconUrl=null***REMOVED***
    handleChange***REMOVED*** 
    required=false ***REMOVED*** => {
    return (
        
        <div className={"form-group " + type}>
***REMOVED*** label && <label className="form-label">{label}</label> }
***REMOVED***
                type === 'textarea'
                ?
                <textarea 
                    data-id={dataid}
                    rows="10" 
                    columns="10"
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                ></textarea>
                :
                iconUrl
                ?
                <div className="inputwithicon">
                    <i></i>
                    <input 
                        type={type} 
                        data-id={dataid}
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
                    data-id={dataid}
                    name={name} 
                    value={value}
                    required={required}
                    placeholder={placeholder}
                    onChange={handleChange}
                />
***REMOVED***
        </div>
    )
}

export default FormInput
