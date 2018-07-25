const storage = require('electron-json-storage');
require('./subscribe.js');

class LocalPersistence extends Subscribe  {
    constructor() {
        super();
    }

    setModel(model) {
        this._properties = Object.keys(model).filter(prop => typeof model[prop] === "string");

        this._properties.forEach((prop) => {
            model[`set${prop.replace("_", "").replace(/^\w/, c => c.toUpperCase())}`] = (val) => {
                if (model[prop] != val) {
                    model[prop] = val;
                    model._notifyListeners(`on${prop.replace("_", "").replace(/^\w/, c => c.toUpperCase())}Changed`, model[prop]);
                }
            };

            model[`save${prop.replace("_", "").replace(/^\w/, c => c.toUpperCase())}`] = () => {
                storage.set(prop, model[prop], ()=> {
                    model._notifyListeners(`on${prop.replace("_", "").replace(/^\w/, c => c.toUpperCase())}Saved`, model[prop]);
                });
            };

            model[`retrieve${prop.replace("_", "").replace(/^\w/, c => c.toUpperCase())}`] = () => {
                storage.has(prop, (hasError, hasKey) => {
                    if (hasError) throw hasError;

					if (hasKey) {
						storage.get(prop, (getError, val) => {
							if (getError) throw getError;
							model[prop] = val
                            model._notifyListeners(`on${prop.replace("_", "").replace(/^\w/, c => c.toUpperCase())}Retrieved`, model[prop]);
						});
					}
					else {
						model._notifyListeners(`on${prop.replace("_", "").replace(/^\w/, c => c.toUpperCase())}Retrieved`, model[prop]);
					}
				});
            };

            model[`get${prop.replace("_", "").replace(/^\w/, c => c.toUpperCase())}`] = () => {
                return model[prop];
            };
        });
    }
}

global.LocalPersistence = LocalPersistence;
