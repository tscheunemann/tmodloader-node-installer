class ViewHandler {
  mainFunction() {
    const {dialog} = require('electron').remote;
    const UserOperations = require('../user_operations.js')
    const MoveMods = require('../move-mods.js');
    let userops = new UserOperations();
    let moveTerrariaMods = new MoveMods();
    let installButton = document.getElementById("install_btn");
    let moveModsButton = document.getElementById("install_mods_btn");

    installButton.addEventListener('click', function() {
      userops.install_tmod();
    });

    moveModsButton.onclick = function() {
      moveTerrariaMods.moveMods();
    }

  }
}
ViewHandler = new ViewHandler();
ViewHandler.mainFunction();
