const mk = require("mkdirp");
const fs = require("fs");

var newDirs = {
	"snaps": "",
	"__differencified_output__": "",
	"__current_output__": ""
};

module.exports = {
  getNewDirs : function(){
  	var y,ym,basePath;
    if (fileExists("exports/")) {
      y = getNewestDateDir("exports/");
      ym = getNewestDateDir(y);
      basePath = getNewestDateDir(ym);
    }
    assignNewDirs(basePath);
    return newDirs;
  },
  fileExists: function(testPath) {
    return fileExists(testPath);
  }
};

function getNewestDateDir(filepath){
  var newest, newestTime = "", fsFiles, fsStat;
  fsFiles = fs.readdirSync(filepath, {encoding: 'utf8', withFileTypes: true});
  fsFiles.forEach(function(file) {
    if (file.isDirectory()) {
      fsStat = fs.statSync(filepath + file.name);
      if (!newestTime || fsStat.ctime > newestTime) {
        newest = file;
      }
    }
  });
  return filepath + newest.name + "/";
}

function fileExists(testPath) {
  try {
    fs.accessSync(testPath);
    return true;
  } catch (err) {
    return false;
  }
}

async function createExportDirs() {
  console.log("Creating directories...");
  var basePath = constructBasePath(),
  subPath, fullPath;
  for (var group in newDirs) {
    if (group === "snaps") {
      subPath = "";
    } else {
      subPath = group + "/";
    }
    fullPath = basePath + subPath;
    mk.mkdirp.sync(fullPath);
  }
  console.log("New directory created in exports");
  return basePath;
}

function constructBasePath() {
  var date = new Date(),
    dd = date.getDate(),
    mm = date.getMonth() + 1,
    yyyy = date.getFullYear(),
    i = 1, datePath, latestPath;
  if(dd < 10) {
    dd = '0'+ dd
  }
  if(mm < 10) {
    mm = '0'+ mm
  }
  datePath = "exports/" + yyyy + "/"
    + mm + "/" + dd + "/";
  if (fileExists(datePath)) {
    while (fileExists(datePath + "_" + i)) {
      i++;
      latestPath = datePath + "_" + i;
    }
  } else {
    latestPath = datePath;
  }
  return latestPath + "/";
}

function assignNewDirs(path) {
  newDirs["snaps"] = path;
  newDirs["__differencified_output__"] = path + "__differencified_output__/";
  newDirs["__current_output__"] = path + "__current_output__/";
  return;
}

// Code for running from shell script
createExportDirs();