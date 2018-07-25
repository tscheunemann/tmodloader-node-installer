require('../HelperClasses/local-persistence.js')

class DemoModel extends LocalPersistence {
    constructor(config) {
        super();

        this._firstName = (config["first_name"]) ? config["first_name"] : "";
        this._lastName = (config["last_name"]) ? config["last_name"] : "";

        super.setModel(this);
    }
}

global.DemoModel = DemoModel;
