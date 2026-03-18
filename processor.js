import config from "./config.js";
import { isFileStable } from "./utils/file.js";
import { uploadBatch } from "./uploader.js";

let queue = [];
let processing = false;

export function queueFile(file) {
  queue.push(file);
  processQueue();
}

async function processQueue() {
  if (processing) return;
  processing = true;

  while (queue.length > 0) {
    const batch = queue.splice(0, config.processing.batchSize);

    const stableFiles = batch.filter((f) =>
      isFileStable(f, config.processing.stableTimeMs)
    );

    if (stableFiles.length === 0) {
      await sleep(30000);
      continue;
    }

    await uploadBatch(stableFiles);
  }

  processing = false;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
