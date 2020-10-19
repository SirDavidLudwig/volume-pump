const {app, BrowserWindow, ipcMain} = require("electron");
const { audio } = require("system-control");

let volume = -1;

function createWindow() {
	const win = new BrowserWindow({
		width: 32,
		height: 150,
		webPreferences: {
			nodeIntegration: true
		},
		alwaysOnTop: true,
		transparent: true,
		frame: false,
		resizable: false
	});

	win.loadFile('index.html');
	// win.webContents.openDevTools();

	ipcMain.on("set-volume", (event, value) => {
		if (value != volume) {
			volume = value;
			audio.volume(volume);
		}
	});
}

app.whenReady().then(createWindow);
