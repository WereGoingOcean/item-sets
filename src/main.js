const { app, BrowserWindow } = require("electron");

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

app
  .whenReady()
  .then(() => {
    console.log("App ready");

    createWindow();
  })
  .catch((err) => {
    console.log(`Error creating window ${err}`);
    app.quit();
  });
