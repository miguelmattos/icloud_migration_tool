import fs from "fs";

export async function cleanupFiles(files) {
  for (const file of files) {
    try {
      fs.unlinkSync(file);
      console.log("🧹 Deleted:", file);
    } catch (e) {
      console.error("Failed to delete:", file);
    }
  }
}
