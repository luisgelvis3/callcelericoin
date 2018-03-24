const electron = require('electron');
const {app,BrowserWindow} = electron;

const path = require('path');
const url = require('url');

let win = null

app.on('ready', function(){
    win = new BrowserWindow({width:500, height:800})
    win.loadURL(
        url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file',
            slashes: true
        })
    )
})