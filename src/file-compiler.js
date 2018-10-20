const fs = require("fs");
const config = require("../configs/config.js");
const widths = config.widths.sort((a, b) => (a - b));
const exdirs = require("./exdirs.js");
const files = {
  "snaps": [],
  "__current_output__": [],
  "__differencified_output__": []
};
var newDirs = exdirs.getNewDirs(), initTimer, initInt;

function compile(files){
  for (var group in files) {
    if (files.hasOwnProperty(group)) {
      moveFiles(group);
    }
  }
  console.log("Compile done");
}

function moveFiles(group){
  var filepath = "differencify_reports/__image_snapshots__/", fsFiles;
  if (group !== "snaps") {
    filepath += group + "/";
  }
  fsFiles = fs.readdirSync(filepath, {encoding: 'utf8', withFileTypes: true});
  fsFiles.forEach(function(file) {
    if (file.name[0] !== "." && !file.isDirectory()) {
      if (group === "snaps") {
        if (fs.existsSync("differencify_reports/__image_snapshots__/__differencified_output__/"
            + file.name.replace("snap", "differencified"))) {
          reformatAndMove(file.name, filepath, group);
        } else {
          console.log("No diff found for " + file.name + ", skipping...");
        }
      } else {
        reformatAndMove(file.name, filepath, group);
      }
    }
  });
}

function reformatAndMove(file, filepath, group){
  var newName = getNewName(file);
  fs.renameSync(filepath + file, newDirs[group] + newName);
}

function getNewName(file) {
  var fileSplit, path, width, ext, newName;
  fileSplit = file.split(" ");
  path = fileSplit[0];
  width = widths[fileSplit.length-2];
  ext = fileSplit[fileSplit.length-1];
  ext = ext.substr(ext.indexOf(".", 1));
  newName = path + "_" + width + ext;
  return newName;
}

compile(files);