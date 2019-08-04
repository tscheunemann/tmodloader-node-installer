class Facade {
    constructor() {
        const HandlerFactory = require('./configuration/HandlerFactory');
        let handlerFactory = new HandlerFactory();
        const HandlerClass = require(handlerFactory.getImplementation())
        this.handler = new HandlerClass();

    }

    install_tmod_cb(config) {
        const ls = require('ls');
        const tempDirectory = require('temp-dir');
        const ncp = require('ncp').ncp;
        const downloadRelease = require('download-github-release');
        const mv = require('mv');
        const fs = require('fs');
        const homedir = require('os').homedir();
        const open = require('open');
        const GlobalConfig = require('./GlobalConfig');
        let globalconf = new GlobalConfig;
        let tModDownloadFiles = [];
        let user = 'blushiemagic'
        let repo = 'tModLoader'
        let outputdir = `${tempDirectory}/xmodr-tmp`
        let leaveZipped = false;
        let moduleInstance = globalconf.myInstance();
        let selectedDirectory = moduleInstance.returnSelectedDirectory(config['steam_vdf_registry'], config['terrariaSteamDir'], config['defSteamFolder'], config['terrariaSelectedDirSuffix'])

        console.log(selectedDirectory);

        config['terrariaInstallationFiles'].forEach((files) => {
            if (fs.existsSync(`${selectedDirectory}/${files}`)) {
                console.log(`${files} is installed properly`);
            }

            else {
                open('steam://validate/105600');
                throw "Terraria isn't properly installed! A new Steam window will open asking you to reinstall. Launch this app again when the installation is complete.";
            }
        });

        fs.mkdir(outputdir, { recursive: true }, (err) => {
            if (err) throw err;
        });

        function filterRelease(release) {
            // Filter out prereleases.
            return release.prerelease === false;
        }

        function filterAsset(asset) {
            return asset.name.indexOf(config['os']) >= 0;
        }

        function downloadtModResources(callback) {
          downloadRelease(user, repo, outputdir, filterRelease, filterAsset, leaveZipped)
            .then(function() {
                console.log('Successfully retrieved tModLoader files');
              })

              .catch(function(err) {
                console.error(err.message);
              })
            .then(function() {
              callback();
              });
        }

        // let newPromise = new Promise(
        //   function (resolve, reject) {
        //     config['tModLoaderArray'].forEach((files) => {
        //
        //       ncp.limit = 16;
        //       ncp(`${outputdir}/${files}`, `${selectedDirectory}/${config['terrariaSteamDir']}/${files}`, function (err) {
        //         if (err) {
        //           return console.error(err);
        //         }
        //         console.log('done!');
        //       });
        //     });
        //   }
        // );

        function testCallback() {

          for (var file of ls(`/${outputdir}/*`)) {
            console.log(file.name)
          }

          // config['tModLoaderArray'].forEach((files) => {
          //
          //   ncp.limit = 16;
          //   ncp(`${outputdir}/${files}`, `${selectedDirectory}/${config['terrariaSteamDir']}/${files}`, function (err) {
          //     if (err) {
          //       return console.error(err);
          //     }
          //     console.log('done!');
          //   });
          // });
        }

        downloadtModResources(testCallback);

      }

    install_tmod() {
        this.handler.install_tmod(this.install_tmod_cb);

    }
}

Facade = new Facade();
Facade.install_tmod();
