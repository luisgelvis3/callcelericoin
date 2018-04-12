const electron = require('electron');
const {app,BrowserWindow} = electron;

const path = require('path');
const url = require('url');
let win = null

app.on('ready', function(){
    win = new BrowserWindow({icon: __dirname + '/images/icons/icon.ico'});
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
<<<<<<< HEAD
    //win.setFullScreen(true);
    win.webContents.openDevTools();
=======
    win.setFullScreen(true);
    //win.webContents.openDevTools();
>>>>>>> 8e35ed6cd882803967829e6ec291c2c8c107105d
})