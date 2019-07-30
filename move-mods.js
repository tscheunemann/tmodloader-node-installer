class MoveMods {
  constructor() {
    // dependencies go here
    const HandlerFactory = require('./configuration/HandlerFactory');
    let handlerFactory = new HandlerFactory();
    const HandlerClass = require(handlerFactory.getImplementation())
    this.handler = new HandlerClass();

  }

  moveMods_cb(config) {
  //  const unzip = require('unzip');
    const path = require('path');
    const fs = require('fs-extra');
    const ncp = require('ncp').ncp;
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })
    const GlobalConfig = require('./GlobalConfig');
    let globalconf = new GlobalConfig;
    let modPath;

    // Example of the module pattern:
    let moduleInstance = globalconf.myInstance();

    function checkDirectory(directory, callback) {
      fs.stat(directory, function(err, stats) {
        //Check if error defined and the error code is "not exists"
        if (err && err.errno === 34) {
          throw "Launch Terraria with tModLoader installed at least once!";
        } else {
          //just in case there was a different error:
          callback(err)
        }
      });
    }

    checkDirectory(config['terrariaModsFolder'], function(error) {
      if (error) {
        throw "Launch Terraria with tModLoader installed at least once!";
      }
      else {
        //Carry on, all good, directory exists / created.
      }
    });

    function ifModIsZipped(directoryofmod, pathofmods, callback) {

      // This function checks if the file provided is compressed using either .zip, .rar or .7z
      if (path.extname(directoryofmod) === '.zip') {
        console.log("This is a zip file")
      }

      else if (path.extname(directoryofmod) === '.7z') {
        console.log("This is a 7zip file")
      }

      else if (path.extname(directoryofmod) === '.rar') {
        console.log("This is a rar file")
      }


      callback(directoryofmod, pathofmods);
    }

    function moveUsersMods(directoryofmod, pathofmods) {

      // This checks if the file provided is a .tmod
      if (path.extname(directoryofmod) != '.tmod') {
        throw "This isn't a mod! The file needs to end in .tmod!"
      }

      // This copies the mod to the Mods folder.
      ncp.limit = 16;
      ncp(`${directoryofmod}`, `${config['terrariaModsFolder']}/Mods/${pathofmods}`, function (err) {
        if (err) {
          return console.error("Please input a proper mod path.");
        }
        console.log('done!');
      });
    }

    function getUserInput() {

      readline.question(`Drag and drop your mod in this window and press ENTER: `, (modPath) => {
        // This splits the string at the slash
        let stringSplit = modPath.split("/");
        // This extracts the last part of the string, the file name
        let realModPath = stringSplit[stringSplit.length - 1];
        // This cuts the whitespace i.e if there is a space in the string
        let bruhmodpath = modPath.trim();

        // moveUsersMods(modPath);
        ifModIsZipped(bruhmodpath, realModPath, moveUsersMods);
        readline.close()
      })
    }

    getUserInput();

  }

  moveMods() {
      this.handler.moveMods(this.moveMods_cb);
  }
}

MoveMods = new MoveMods();
MoveMods.moveMods();
