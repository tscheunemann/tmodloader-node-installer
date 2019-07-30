class GlobalConfig {
    myInstance() {
      const fs = require('fs');
        return {
            publicMethod1:
                function () {
                    console.log("test")
                },
            publicMethod2:
                function () {
                  console.log("test");
                },
            returnSelectedDirectory:
                function (vdfRegistryVar, terrariaSteamInstallationDir) {
                  const homedir = require('os').homedir();
                  const vdf = require('vdfjs');
                  let selectedDirectory;
                  let steamVDFRegistry = fs.readFileSync(homedir + "/" + vdfRegistryVar, 'utf-8');
                  let data = vdf.parse(steamVDFRegistry);
                  let vdf_to_registry = JSON.stringify(data);
                  let nine = JSON.parse(vdf_to_registry);
                  let results = Object.keys(nine.LibraryFolders).filter(folder => Number.isInteger(Number(folder)));
                  let steamFolders = ['/Users/tyler/Library/Application Support/Steam'];

                  results.forEach((result) => {
                      steamFolders.push(nine.LibraryFolders[result]);
                  });

                  // Example of the module pattern:
                  // let moduleInstance = globalconf.myInstance();
                  // console.log(moduleInstance.publicMethod2());

                  steamFolders.forEach((path) => {
                      if (fs.existsSync(`${path}/steamapps/appmanifest_105600.acf`)) {
                          selectedDirectory = `${path}/steamapps/common/Terraria/`;
                      }
                  });


                  return selectedDirectory;

                }
        }
    }
}
module.exports = GlobalConfig;
