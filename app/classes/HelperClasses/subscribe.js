let Subscribe = function() {
	this._listeners = [],
	this._notifyListeners = function (event) {
		for (var i = 0; i < this._listeners.length; i++) {
			if (this._listeners[i].event === event) {
				if (arguments.length == 1) {
					this._listeners[i].funct(null);
				}
				else if (arguments.length > 2) {
					arguments.shift;
					this._listeners[i].funct(arguments);
				}
				else {
					this._listeners[i].funct(arguments[1]);
				}
			}
		}
	},

	this.addEventListener = function(event, funct) {
		var addEvent = true;

		for (var i = 0; i < this._listeners.length; i++) {
			if (this._listeners[i].event === event) {
				if (this._listeners[i].funct == funct) {
					addEvent = false;
				}
			}
		}

		if (addEvent) {
			this._listeners.push({
				"event": event,
				"funct": funct
			});
		}
	}
}

global.Subscribe = Subscribe;
