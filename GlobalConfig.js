class GlobalConfig {
    myInstance() {
      const fs = require('fs');
        return {
            returnxmodrTempDir:
                function () {
                  const tempDirectory = require('temp-dir');
                  let xmodrTempDir = `${tempDirectory}/xmodr-tmp`
                  return xmodrTempDir;
                },
            returnSelectedDirectory:
                function (vdfRegistryVar, terrariaSteamInstallationDir, defaultSteamFolder, macSelectedDir) {
                  const homedir = require('os').homedir();
                  const vdf = require('vdfjs');
                  let selectedDirectory;
                  let steamVDFRegistry = fs.readFileSync(homedir + "/" + vdfRegistryVar, 'utf-8');
                  let data = vdf.parse(steamVDFRegistry);
                  let vdf_to_registry = JSON.stringify(data);
                  let nine = JSON.parse(vdf_to_registry);
                  let results = Object.keys(nine.LibraryFolders).filter(folder => Number.isInteger(Number(folder)));
                  let steamFolders = [defaultSteamFolder];

                  results.forEach((result) => {
                      steamFolders.push(nine.LibraryFolders[result]);
                  });

                  // Example of the module pattern:
                  // let moduleInstance = globalconf.myInstance();
                  // console.log(moduleInstance.publicMethod2());

                  steamFolders.forEach((path) => {
                      if (fs.existsSync(`${path}/steamapps/appmanifest_105600.acf`)) {
                          selectedDirectory = `${path}/steamapps/common/Terraria/${macSelectedDir}`;
                      }
                  });


                  return selectedDirectory;

                },
            checkIfDirectoryExists:
                function (directory, errorMessage, callback) {

                  fs.stat(directory, function(err, stats) {
                    //Check if error defined and the error code is "not exists"
                    if (err && err.errno === 34) {
                      throw errorMessage;
                    } else {
                      //just in case there was a different error:
                      callback(err)
                    }
                  });

                },
            unzipper:
                function () {
                  
                  console.log("Test")
                },
        }
    }
}
module.exports = GlobalConfig;
