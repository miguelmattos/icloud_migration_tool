import { run } from "./utils/exec.js";
import config from "./config.js";
import { cleanupFiles } from "./cleaner.js";

export async function uploadBatch(files) {
  console.log(`🚀 Uploading batch (${files.length} files)...`);

  const fileList = files.map(f => `"${f}"`).join(" ");

  // Fix timestamps
  await run(`exiftool -overwrite_original -FileModifyDate<DateTimeOriginal ${fileList}`);

  // Upload
  await run(`
rclone copy ${fileList} ${config.rclone.remote} ^
--transfers=${config.rclone.transfers} ^
--checkers=${config.rclone.checkers} ^
--tpslimit=${config.rclone.tpslimit} ^
--modify-window=1s ^
--use-server-modtime ^
--metadata
`);

  if (config.cleanup.enabled) {
    await cleanupFiles(files);
  }

  console.log("✅ Batch completed");
}
