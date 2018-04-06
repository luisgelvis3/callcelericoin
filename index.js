const electron = require('electron');
const {app,BrowserWindow} = electron;

const path = require('path');
const url = require('url');
let win = null

app.on('ready', function(){
    win = new BrowserWindow({icon: __dirname + '/images/icons/favicon.icoo'});
    //({useContentSize: true,icon: __dirname + '/images/icons/favicon.icoo'})
    win.setMenu(null);
    win.maximize();
    //win.setFullScreen(true);
    win.loadURL(
        url.format({
            pathname: path.join(__dirname, 'login.html'),
            protocol: 'file',
            slashes: true
        })
    );
    win.setFullScreen(true);
    //win.webContents.openDevTools();
})