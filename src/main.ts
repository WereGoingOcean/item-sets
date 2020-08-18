import { app, BrowserWindow, ipcMain } from 'electron';
import ItemSetGenerator from './electron/item-set-generator';

function createWindow() {
	// Create a browser window
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	// Load an index.html
	win.loadFile('index.html');
}

app.whenReady().then(() => {
	console.log('App ready');

	createWindow();
});

ipcMain.on('generate-item-sets', async (event, args) => {
	try {
		await ItemSetGenerator.generateItemSets(args);
		event.sender.send('notification', {
			message: 'Successfully created item sets.',
		});
	} catch (err) {
		console.log(err);
		event.sender.send('error', {
			message: err,
		});
	}
});
