const execa = require("execa");
const treeKill = require("tree-kill");

const subProcess = execa("electron-webpack", ["dev"]);
subProcess.stdout.pipe(process.stdout);
subProcess.stderr.pipe(process.stderr);

process.on("SIGINT", async () => {
  console.log("Caught interrupt. Killing process tree");
  treeKill(subProcess.pid, (e) => {
    console.error(`Tree Kill failed because of ${e}`);
  });
});