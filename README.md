## Electron and Bootstrap Skeleton project

This project was put together to make it easy to begin developing a desktop app using the electron framework. This project also incorporates an easy to follow MVC implementation as well as local file storage using the electron-json-storage package from NPM.

###### Program execution flow
- main.js in the root folder
- index.html in the app folder
- renderer.js in the app folder
- class_init.js in the classes folder
- demo-model.js, demo-view.js, and demo-controller.js in the app/classes/* folders

###### Helper classes
- app/classes/HelperClasses/subscribe.js, provides easy to use callbacks for async operations
 - Subclassed by the LocalPersistence class
- app/classes/HelperClasses/local-persistence.js, provides local data storage for string variables from the Subclass
 - Subclassed by demo-model.js

###### Running the Program
1. Clone the repo `git clone git@gitlabs.net:jason/electron-and-bootstrap-skeleton-project.git` or download the zip file
2. Change directories into the project `cd electron-and-bootstrap-skeleton-project`
2. Run `npm install` to install dependencies
3. Run `npm start` to preview the program
