class DemoView {
    constructor(config) {
        this._firstNameElement = (config.first_name_element) ? config.first_name_element : null;
        this._lastNameElement = (config.last_name_element) ? config.last_name_element : null;
        this._processButtonElement = (config.process_button_element) ? config.process_button_element : null;
    }

    setFirstNameField(value) {
        if (this._firstNameElement) {
            this._firstNameElement.val(value);
        }
    }

    getFirstNameField() {
        if (this._firstNameElement) {
            return this._firstNameElement.val();
        }
    }

    setLastNameField(value) {
        if (this._lastNameElement) {
            this._lastNameElement.val(value);
        }
    }

    getLastNameField() {
        if (this._lastNameElement) {
            return this._lastNameElement.val();
        }
    }

    setProcessButtonCallback(callback) {
        if (this._processButtonElement) {
            this._processButtonElement.click(callback);
        }
    }
}

module.exports = DemoView;
