'use strict';

var pathU = require('path');
var fs = require('fs');

module.exports=function(app){
	var startPath=pathU.join(__dirname, '../packages');

	var findExtension=function(fileName){
		for(var i=fileName.length;i>0;i=i-1){
			if(fileName[i]==='.'){
				return fileName.substring(i);
			}
		}
	};

	var searchForModels=function(superPath,files){
		var currentPath;
		for(var i=0;i<files.length;i=i+1){
			currentPath=pathU.join(superPath, files[i]);
			if(fs.lstatSync(currentPath).isDirectory()){
				var checkPath=pathU.join(currentPath,'server/models');
				var status;
				try{
					status=fs.lstatSync(checkPath);
				}
				catch(err){status=undefined;}
				if(status&&status.isDirectory){
					var newFiles=fs.readdirSync(checkPath);
					for(var j=0;j<newFiles.length;j=j+1){
						if(findExtension(newFiles[j])==='.js'){
							require(pathU.join(checkPath, newFiles[j]));
						}
					}
				}else{
					searchForModels(currentPath,fs.readdirSync(currentPath));
				}
			}
		}
	};
	searchForModels(startPath,fs.readdirSync(startPath));
};