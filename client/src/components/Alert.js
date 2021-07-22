import { forwardRef } from "react";
import Button from "./Button";

const Alert = forwardRef(({ closeModal, isPositive, onProceed, msg=null }, ref) => {
    const msgs = ['Changes will be lost...', 'Changes will be premanently saved...']
    const classes = ['cancel', 'save'];

    return (
        <div ref={ref}>
            <div className="overlay" id="app-overlay"></div>
            <div className="edit-form-wrapper">
                <header style={{textAlign: 'center'}}>
                    <h3 className="text">{msg || (msgs[+isPositive] + 'Proceed?')}</h3>
                </header>
                <div className="action-buttons">
                    <Button
                        label="Yes"
                        className={classes[+isPositive]}
                        onClick={onProceed}
                    />

                    <Button
                        label="No"
                        className={classes[1 - +isPositive]}
                        onClick={closeModal}
                    />
                </div>
            </div>
        </div>
    )
});

export default Alert
