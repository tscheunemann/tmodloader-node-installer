'use strict';

class Subscribe {
	constructor() {
		this._listeners = [];
	}

	_notifyListeners(event) {
		this._listeners.forEach((listener) => {
			if (listener.event === event) {
				let args = (arguments.length > 2) ? arguments.shift : ((arguments.length === 1) ? null : arguments[1]);
				listener.funct(args);
			}
		});
	}

	notifyListeners() {
		this._notifyListeners.apply(this, arguments);
	}

	addEventListener(event, funct) {
		let addEvent = !(this._listeners.some((listener) => {
			return (listener.event === event && listener.funct === funct);
		}));

		if (addEvent) {
			this._listeners.push({
				"event": event,
				"funct": funct
			});
		}
	}

	removeEventListener(event, funct) {
		this._listeners.some((listener, index) => {
			if (listener.event === event && listener.funct === funct) {
				this._listeners.splice(index, 1);
				return true;
			}
			return false;
		});
	}
}

module.exports = Subscribe;
