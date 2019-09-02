class LinuxInstaller {
  constructor() {
    // Dependencies go here
  }
  install_tmod(cb) {
      const homedir = require('os').homedir();
      const tempDirectory = require('temp-dir');
      const fs = require('fs');
      let config = [];

      config['os'] = 'Linux';
      config['defaultTerrariaInstall'] = `${homedir}/.steam/steam`
      config['steam_vdf_registry'] = `.steam/steam/steamapps/libraryfolders.vdf`;
      config['terrariaSteamDir'];
      config['terrariaInstallationFiles'] = ["Content", "FNA.dll", "FNA.dll.config", "Mono.Posix.dll", "Mono.Security.dll", "System.Configuration.dll", "System.Core.dll", "System.Data.dll", "System.Drawing.dll", "System.Numerics.dll", "System.Runtime.Serialization.dll", "System.Security.dll", "System.Windows.Forms.dll", "System.Windows.Forms.dll.config", "System.Xml.Linq.dll", "System.Xml.dll", "System.dll", "Terraria", "Terraria.bin.x86", "Terraria.bin.x86_64", "Terraria.exe", "Terraria.png", "TerrariaServer", "TerrariaServer.bin.x86", "TerrariaServer.bin.x86_64", "TerrariaServer.exe", "WindowsBase.dll", "installscript.vdf", "lib", "lib64", "monoconfig", "monomachineconfig", "mscorlib.dll", "open-folder", "steam_appid.txt"];
      config['defSteamFolder'] = `${homedir}/.local/share/Steam`
      config['terrariaSelectedDirSuffix'] = ""
      cb(config);
  }

  moveMods(cb) {
    const homedir = require('os').homedir();
    let config = [];

    config['steam_vdf_registry'] = "Library/Application Support/Steam/steamapps/libraryfolders.vdf";
    config['terrariaModsFolder'] = `${homedir}/.local/share/Terraria/ModLoader/Mods`;
    cb(config)
  }
}
module.exports = LinuxInstaller;
