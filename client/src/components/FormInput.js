import '../css/FormInput.css'
const FormInput = ({ 
    label, 
    dataid="",
    name, 
    type, 
    value, 
    placeholder="",
    iconUrl=null,
    handleChange, 
    required=false }) => {
    return (
        
        <div className={"form-group " + type}>
            { label && <label className="form-label">{label}</label> }
            {
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
            }
        </div>
    )
}

export default FormInput
