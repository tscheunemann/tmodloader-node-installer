class MacInstaller {

    constructor() {
        const homedir = require('os').homedir();
    }

    install_tmod(cb) {
        const homedir = require('os').homedir();
        const tempDirectory = require('temp-dir');
        const fs = require('fs');
        let config = [];

        config['os'] = 'Mac';
        config['steam_vdf_registry'] = "Library/Application Support/Steam/steamapps/libraryfolders.vdf";
        config['terrariaSteamDir'] = `${homedir}/Library/Application Support/Steam/steamapps/common/Terraria/Terraria.app/Contents/MacOS/`;
        config['terrariaInstallationFiles'] = ["Content", "FNA.dll", "FNA.dll.config", "Mono.Posix.dll", "Mono.Security.dll", "monoconfig", "monomachineconfig", "mscorlib.dll", "osx", "steam_appid.txt", "System.Configuration.dll", "System.Core.dll", "System.Data.dll", "System.dll", "System.Drawing.dll", "System.Numerics.dll", "System.Runtime.Serialization.dll", "System.Security.dll", "System.Windows.Forms.dll", "System.Xml.dll", "System.Xml.Linq.dll", "Terraria", "Terraria.bin.osx", "Terraria.exe", "TerrariaServer", "TerrariaServer.bin.osx", "TerrariaServer.bin.osx", "TerrariaServer.exe", "WindowsBase.dll"];
        config['defSteamFolder'] = `${homedir}/Library/Application Support/Steam`
        config['terrariaSelectedDirSuffix'] = "Terraria.app/Contents/MacOS"
        cb(config);
    }

    moveMods(cb) {
      const homedir = require('os').homedir();
      let config = [];

      config['steam_vdf_registry'] = "Library/Application Support/Steam/steamapps/libraryfolders.vdf";
      config['terrariaModsFolder'] = `${homedir}/Library/Application Support/Terraria/ModLoader`;
      cb(config)
    }
}
module.exports = MacInstaller;
