class HandlerFactory {

    constructor() {
    }

    getImplementation() {
        // Require configparser
        const ConfigParser = require('configparser');
        const config = new ConfigParser();
        config.read('./configuration/tmodconfig.conf');
        // the selectedClass (WinInstaller, MacInstaller, LinuxInstaller, etc) is
        // determined by process.platform()
        const selectedClass = process.platform;

        // if output of process.platform starts with win, then set selected class to win32
        if (process.platform.startsWith("win") == true) {
            const selectedClass = "win32";
        }
        config.sections();
        // Get the handler from the conf
        return `./implementations/${config.get(process.platform, 'class')}.js`;
        // return './implementations/MacInstaller.js';
        // Below is a test to see if the correct handler is being used.
        // console.log(`./implementations/${config.get(process.platform, 'class')}.js`);
    }
}
module.exports = HandlerFactory;
