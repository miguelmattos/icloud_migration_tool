export default {
  paths: {
    source: "Z:\\temp\\crz_icloud_photos",
    logFile: "C:\\rclone\\rclone.log",
    stateFile: "./state.json"
  },
  rclone: {
    remote: "onedrive:Photos",
    transfers: 8,
    checkers: 16,
    tpslimit: 10
  },
  processing: {
    batchSize: 500, // files per batch
    stableTimeMs: 60000 // wait 1 min before processing new file
  },
  cleanup: {
    enabled: false // set true to delete after upload
  }
};
