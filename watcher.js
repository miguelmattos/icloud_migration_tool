import chokidar from "chokidar";
import config from "./config.js";
import { queueFile } from "./processor.js";

export function startWatcher() {
  console.log("👀 Watching for new files...");

  const watcher = chokidar.watch(config.paths.source, {
    persistent: true,
    ignoreInitial: false
  });

  watcher.on("add", (file) => {
    console.log("📸 New file detected:", file);
    queueFile(file);
  });
}
