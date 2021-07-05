import { forwardRef } from "react";
import Button from "./Button";

const Alert = forwardRef(({ closeModal***REMOVED*** isPositive***REMOVED*** onProceed }***REMOVED*** ref) => {
    const msgs = ['Changes will be lost...'***REMOVED*** 'Changes will be saved...']
    const classes = ['cancel'***REMOVED*** 'save'];

    return (
        <div ref={ref}>
            <div className="overlay" id="app-overlay"></div>
            <div className="edit-form-wrapper">
                <header>
                    <h3 className="text">{msgs[+isPositive] + 'Proceed?'}</h3>
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
***REMOVED***

export default Alert
