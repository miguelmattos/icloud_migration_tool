import fs from "fs";

export function isFileStable(file, stableTimeMs) {
  const stats = fs.statSync(file);
  const now = Date.now();
  return now - stats.mtimeMs > stableTimeMs;
}
