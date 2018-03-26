const electron = require('electron');
const {app,BrowserWindow} = electron;

const path = require('path');

const url = require('url');
var main = {a: 1,b: 2}; module.exports = main; 
let win = null

app.on('ready', function(){
    
    win = new BrowserWindow({width:600, height:800, icon: __dirname + '/images/icons/favicon.icoo'})
    win.setMenu(null);
    win.loadURL(
        url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file',
            slashes: true
        })
    )
})