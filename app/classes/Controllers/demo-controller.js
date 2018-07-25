class DemoController {
    constructor(config) {
        this._model = (config["model"]) ? config["model"] : null;
        this._view = (config["view"]) ? config["view"] : null;

        // Retrieve first name from storage

        this._model.addEventListener("onFirstNameRetrieved", (value) => {
            this._view.setFirstNameField(value);
        });

        this._model.retrieveFirstName();

        // Retrieve last name from storage

        this._model.addEventListener("onLastNameRetrieved", (value) => {
            this._view.setLastNameField(value);
        });

        this._model.retrieveLastName();

        // Automatically persist changes when first name changes

        this._model.addEventListener("onFirstNameChanged", (value) => {
            this._model.saveFirstName();
        });

        // Automatically persist changes when last name changes

        this._model.addEventListener("onLastNameChanged", (value) => {
            this._model.saveLastName();
        });

        // Attach process button listener

        this._view.setProcessButtonCallback(() => {
            this._model.setFirstName(this._view.getFirstNameField());
            this._model.setLastName(this._view.getLastNameField());
        });
    }
}

global.DemoController = DemoController;
