'use strict';

const storage = require('electron-json-storage');
const DemoModel = require('./Models/demo-model.js');
const DemoView = require('./Views/demo-view.js');
const DemoController = require('./Controllers/demo-controller.js');


var classInitializer = (function() {
	let instance;

	function init() {
		// Place code that you need to intialize you project here.


		// An example of initization code would be the following which allows you
		// to tab inside of all textareas instead of moving the focus to the next
		// input element.
		var textareas = document.getElementsByTagName('textarea');
  		var count = textareas.length;
  		for(var i=0;i<count;i++){
  		    textareas[i].onkeydown = function(e){
  		        if(e.keyCode===9 || e.which===9){
  		            e.preventDefault();
  		            var s = this.selectionStart;
  		            this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
  		            this.selectionEnd = s+1;
  		        }
  		    };
  		}

		// Another application of the initialization code is to hold references
		// of models, views, and controllers used in the getXXXXInstance functions
		// Approaching the construction of the MVC components in this way turns
		// each element into a singleton which can be helpful to eliminate race
		// conditions when persisting data or other long-running tasks
		let demoModel = null;
		let demoView = null;
		let demoController = null;

		return {
			getDemoInstance: function() {
				// this where you would begin to connect your page to the core
				// functionality of your project. This should be used to create
				// instances of the model, view, and controller used to control
				// the webpage and nothing else. Maintain separation of duties
				// between your classes

				// This will demonstrate one method of passing data using MVC
				if (!demoView) {
					demoView = new DemoView({
						"first_name_element": $("#first_name"),
						"last_name_element": $("#last_name"),
						"process_button_element": $("#process_button")
					});
				}

				if (!demoModel) {
					demoModel = new DemoModel(storage, {
						"first_name": "Jason",
						"last_name": "Scheunemann"
					});
				}

				if (!demoController) {
					demoController = new DemoController({
						"view": demoView,
						"model": demoModel
					});
				}

				return demoController;
			}
		};
	}

	return {
		getInstance: function() {
			if (!instance) {
				instance = init();
			}

			return instance;
		}
	};
})();

module.exports = classInitializer;
