'use strict';

const _ = require('lodash');
const Subscribe = require('./subscribe.js');
const MockStorage = require('./mock-storage.js');

class Persistence extends Subscribe  {
    constructor() {
        super();

        this._storage = null;

        if (process.env.NODE_ENV === "development") {
            this._storage = require('electron-json-storage');
        }
		else if (process.env.NODE_ENV === "testing") {
			this._storage = new MockStorage();
		}

		this._model = null;
    }

	addPersistentStringProperty(prop, defaultValue) {
		if(!(this[prop])) {
			let titleCase = _.upperFirst(_.camelCase(prop));

			this[prop] = (defaultValue) ? defaultValue: "";

			this[`set${titleCase}`] = (val) => {
				if (this[prop] !== val) {
					this[prop] = val;
					this._notifyListeners(`on${titleCase}Changed`, this[prop]);
				}
			};

			this[`save${titleCase}`] = () => {
				this._storage.set(prop, this[prop], ()=> {
					this._notifyListeners(`on${titleCase}Saved`, this[prop]);
				});
			};

			this[`retrieve${titleCase}`] = () => {
				this._storage.has(prop, (hasError, hasKey) => {
					if (hasError) throw new Error();

					if (hasKey) {
						this._storage.get(prop, (getError, val) => {
							if (getError) throw getError;
							this[prop] = val;

							this._notifyListeners(`on${titleCase}Retrieved`, this[prop]);
						});
					}
					else {
						this._notifyListeners(`on${titleCase}Retrieved`, this[prop]);
					}
				});
			};

			this[`get${titleCase}`] = () => {
				return this[prop];
			};
		}
	}
}

module.exports = Persistence;
