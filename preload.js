const {contextBridge,ipcRenderer} = require("electron");

/*ensure that the ipcRenderer is connected on safe way and only supports specific actions*/
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            //list of supported actions
            let validChannels = ["settings"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["settings"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);
//check did process started
process.once('document-start', () => {

})