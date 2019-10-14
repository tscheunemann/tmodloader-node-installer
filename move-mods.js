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
    const Seven = require('node-7z');
    const path = require('path');
    const fs = require('fs-extra');
    const ncp = require('ncp').ncp;
    const GlobalConfig = require('./GlobalConfig');
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })
    let globalconf = new GlobalConfig;
    let moduleInstance = globalconf.myInstance();
    let modPath;
    let fileExtensions = ['.zip', '.rar', '.7z']
    let checkIfError = "Launch Terraria with tModLoader installed at least once!";
    let tempDirectory = moduleInstance.returnxmodrTempDir();

    console.log(tempDirectory)

    moduleInstance.checkIfDirectoryExists(config['terrariaModsFolder'], checkIfError, function(error) {
      if (error) {
        throw "Launch Terraria with tModLoader installed at least once!";
      }
      else {
        //Carry on, all good, directory exists / created.
      }
    });

    function ifModIsZipped(directoryofmod, pathofmods, callback) {

      if (path.extname(directoryofmod) === '.zip') {
        console.log("This is a zip")
        let myStream = Seven.extract(directoryofmod, config['terrariaModsFolder'], {
          recursive: true,
          $cherryPick: '*.tmod'
        })

      }

      else if (path.extname(directoryofmod) === '.7z') {

        console.log("This is a 7z")
        let myStream = Seven.extract(directoryofmod, config['terrariaModsFolder'], {
          recursive: true,
          $cherryPick: '*.tmod'
        })

      }

      else if (path.extname(directoryofmod) === '.tmod') {

        ncp.limit = 16;
        ncp(`${directoryofmod}`, `${config['terrariaModsFolder']}/Mods/${pathofmods}`, function (err) {
          if (err) {
            return console.error("Please input a proper mod path.");
          }
          console.log('done!');
        });

      }

      else {
        throw "Please input a .tmod or a zipped file containing a .tmod"
      }

    }

    function getUserInput() {

      const {dialog} = require('electron').remote;

      // readline.question(`Drag and drop your mod in this window and press ENTER: `, (modPath) => {
      //   // This splits the string at the slash
      //   let stringSplit = modPath.split("/");
      //   // This extracts the last part of the string, the file name
      //   let realModPath = stringSplit[stringSplit.length - 1];
      //   // This cuts the whitespace i.e if there is a space in the string
      //   let bruhmodpath = modPath.trim();
      //
      //   // moveUsersMods(modPath);
      //   ifModIsZipped(bruhmodpath, realModPath);
      //   readline.close()
      // })

      dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections']
      }, function (files) {
          if (files !== undefined) {
            // handle files
            ifModIsZipped(files[0])
          }
        });

    }

    getUserInput();
  }

  moveMods(mods) {
      this.handler.moveMods(this.moveMods_cb);
  }
}

module.exports = MoveMods;

// window.onload = function() {
//     console.log("script #2: %o", document.getElementById("install_mods_btn"));
//     document.getElementById("install_mods_btn").onclick = MoveMods.moveMods();
// };
