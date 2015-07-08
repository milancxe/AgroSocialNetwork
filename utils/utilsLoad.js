'use strict';

var express = require('express');
var pathU = require('path');
var globalConfig = require('../config/globalConfig.js');
var fs = require('fs');
var configAssetsBower = require('../config/assetsBower.js');

module.exports=function(app){
	var startPath=pathU.join(__dirname, '../packages');

	var libraryIndex={};
	libraryIndex.css=[];
	libraryIndex.js=[];
	libraryIndex.bowerCss=[];
	libraryIndex.bowerJs=[];

	var findExtension=function(fileName){
		for(var i=fileName.length;i>0;i=i-1){
			if(fileName[i]==='.'){
				return fileName.substring(i);
			}
		}
	};
	//add bower static assets
	if(globalConfig.mode==='dev'){
		/*for(var i=0;i<configAssetsBower.css.length;i=i+1){
			var path='./'+configAssetsBower.css[i];
			var regPath='/'+configAssetsBower.css[i];
			app.use(regPath,express.static(path));
			libraryIndex.bowerCss.push(regPath);
		}*/
		for(var i=0;i<configAssetsBower.js.length;i=i+1){
			var path='./'+configAssetsBower.js[i];
			var regPath='/'+configAssetsBower.js[i];
			app.use(regPath,express.static(path));
			libraryIndex.bowerJs.push(regPath);
		}
	}

	if(globalConfig.mode==='dev'){
		for(var i=0;i<configAssetsBower.expose.length;i=i+1){
			var path=configAssetsBower.expose[i][0];
			var regPath=configAssetsBower.expose[i][1];
			app.use(regPath,express.static(path));
		}
	}else{
		for(var i=0;i<configAssetsBower.exposeProduction.length;i=i+1){
			var path=configAssetsBower.exposeProduction[i][0];
			var regPath=configAssetsBower.exposeProduction[i][1];
			app.use(regPath,express.static(path));
		}
	}

	if(globalConfig.mode==='dev'){
		var searchForCustomJSnCSS=function(superPath,files){
			var currentPath='';
			for(var i=0;i<files.length;i=i+1){
				currentPath=pathU.join(superPath, files[i]);
				if(fs.lstatSync(currentPath).isDirectory()){
					searchForCustomJSnCSS(currentPath,fs.readdirSync(currentPath));
				}else{
					if(currentPath.indexOf('public')!==-1){
						var ext=findExtension(currentPath);
						if(ext==='.js'/*||ext==='.css'||ext==='.less'*/){
							var regPath=currentPath.substring(startPath.length);
							regPath=regPath.replace(/\\/g,'/');
							app.use(regPath,express.static(currentPath));
							if(ext==='.js'){
								libraryIndex.js.push(regPath);
							}/*else{
								libraryIndex.css.push(regPath);
							}*/
						}
					}
				}
			}
		};
		searchForCustomJSnCSS(startPath,fs.readdirSync(startPath));
		/*Only one css*/
		app.use('/non-aggregated.css',express.static('./production/non-aggregated.css'));
		libraryIndex.css.push('/non-aggregated.css');
	}
	if(globalConfig.mode!=='dev'){
		app.use('/aggregated.js',express.static('./production/aggregated.js'));
		libraryIndex.js.push('/aggregated.js');
		app.use('/aggregated.css',express.static('./production/aggregated.css'));
		libraryIndex.css.push('/aggregated.css');
	}

	//add custom static assets
	var searchForCustomHTML=function(superPath,files){
		var currentPath;
		for(var i=0;i<files.length;i=i+1){
			currentPath=pathU.join(superPath, files[i]);
			if(!fs.lstatSync(currentPath).isDirectory()){
				if(currentPath.indexOf('public')!==-1){
					if(findExtension(currentPath)==='.html'){
						var regPath=currentPath.substring(startPath.length);
						regPath=regPath.replace(/\\/g,'/');
						app.use(regPath,express.static(currentPath));
					}
				}
			}else{
				searchForCustomHTML(currentPath,fs.readdirSync(currentPath));
			}
		}
	};
	searchForCustomHTML(startPath,fs.readdirSync(startPath));

	var searchForRouters=function(superPath,files){
		var currentPath;
		for(var i=0;i<files.length;i=i+1){
			currentPath=pathU.join(superPath, files[i]);
			if(fs.lstatSync(currentPath).isDirectory()){
				var checkPath=pathU.join(currentPath,'server/routes');
				var status;
				try{
					status=fs.lstatSync(checkPath);
				}
				catch(err){status=undefined;}
				if(status&&status.isDirectory()){
					var newFiles=fs.readdirSync(checkPath);
					for(var j=0;j<newFiles.length;j=j+1){
						if(findExtension(newFiles[j])==='.js'){
							require(pathU.join(checkPath, newFiles[j]))(app);
						}
					}
				}else{
					searchForRouters(currentPath,fs.readdirSync(currentPath));
				}
			}
		}
	};
	searchForRouters(startPath,fs.readdirSync(startPath));
	return libraryIndex;
};