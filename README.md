## tModLoader installer made in Node.js

This project was meant to replace my bash script that installs tModLoader. This includes support for multiple Steam libraries and also comes with the additional function to add mods. This is currently CLI based but I am in the process of adding a GUI. You can see a preview of the upcoming GUI by typing `npm start` while in the project's directory. 

This app is still very experimental and some functions may not work as expected.

### How to install tModLoader with this app
cd to the project's directory and run `node user_operations.js`


### How to add mods with this app
cd to the project's directory and run `node move-mods.js`


#### How the user_operations function works
It will first select the correct Steam directory Terraria is installed in by checking where the `appmanifest_105600.acf` file is in all of your Steam libraries

It will then verify that Terraria is correctly installed and if there is a file missing, this app will open a Steam window that verifies your games files.

It will then download and install tModLoader into the correct directory

#### How the move-mods function works
It will first check to see if tModLoader is installed and then it will ask for your mods directory. I am working on adding a feature that checks if it is compressed.

It will then move the selected mod into the mod directory
