import { app, BrowserWindow } from "electron";

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
  win.loadFile("index.html");
}

app.whenReady().then(() => {
  console.log("App ready");

  createWindow();
});
