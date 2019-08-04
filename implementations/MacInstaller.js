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
        config['tmodloaderFiles'] = ["Ionic.Zip.Reduced.dll", 'ModCompile', 'mono', 'Mono.Cecil.dll', 'MP3Sharp.dll', 'Terraria.exe', 'Terraria.exe.config', 'tModLoaderInstaller.jar', 'tModLoaderServer', 'tModLoaderServer.bin.osx', 'tModLoaderServer.exe'];
        config['terrariaSteamDir'] = `${homedir}/Library/Application Support/Steam/steamapps/common/Terraria/Terraria.app/Contents/MacOS/`;
        config['terrariaInstallationFiles'] = ["Content", "FNA.dll", "FNA.dll.config", "Mono.Posix.dll", "Mono.Security.dll", "monoconfig", "monomachineconfig", "mscorlib.dll", "osx", "steam_appid.txt", "System.Configuration.dll", "System.Core.dll", "System.Data.dll", "System.dll", "System.Drawing.dll", "System.Numerics.dll", "System.Runtime.Serialization.dll", "System.Security.dll", "System.Windows.Forms.dll", "System.Xml.dll", "System.Xml.Linq.dll", "Terraria", "Terraria.bin.osx", "Terraria.exe", "TerrariaServer", "TerrariaServer.bin.osx", "TerrariaServer.bin.osx", "TerrariaServer.exe", "WindowsBase.dll"];
        config['tModLoaderArray'] = [`I18N.West.dll`, 'I18N.dll', 'README.txt', 'Terraria', 'osx', 'tModLoader', 'tModLoader-kick', 'tModLoader-mono', 'tModLoader.exe', 'tModLoaderInstaller.jar', 'tModLoaderServer', 'tModLoaderServer.exe'];
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
