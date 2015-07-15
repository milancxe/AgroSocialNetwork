'use strict';

var fs = require('fs');
var mongoose = require('mongoose');
var PostModel = mongoose.model('PostModel');
var multiparty= require('multiparty');
var lwip = require('lwip');

var randomString = function(length){
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for( var i=0; i < length; i=i+1)
		text = text+ possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
};

var writeOneImage=function(image,sizeIndex,imageFolder,imageName,onSuccess){
	//dimenzije slika
	var maxSize=global.config.imageDimensions[sizeIndex];
	var scaleFactor=1;
	//proveri dimenzije
	var iWidth=image.width();
	var iHeight=image.height();
	if(iWidth>maxSize){
		scaleFactor=maxSize/iWidth;
	}
	if(iHeight>maxSize){
		if(scaleFactor>maxSize/iHeight){
			scaleFactor=maxSize/iHeight;
		}
	}
	//sacuvaj sliku u fajl na putanji imageFolder/...
	image.batch()
	.scale(scaleFactor)
	.writeFile(imageFolder+'/'+maxSize+'/'+imageName+'.jpg', function(err){
		sizeIndex=sizeIndex+1;
		//ukoliko ide u jos dimenzija teraj opet
		if(sizeIndex!==global.config.imageDimensions.length){
			writeOneImage(image,sizeIndex,imageFolder,imageName,onSuccess);
		}else{
			if(onSuccess){
				onSuccess();
			}
		}
	});
};

var writeImages=function(type,source,fileName,onSuccess){
	var imageFolder='';
	
	imageFolder=global.config.filePathPostImage();
	var extension=source.split('.').pop().toLowerCase();
	//napravi sliku
	lwip.open(source, function(err, image){
		if(extension==='jpg'||extension==='jpeg'){
			writeOneImage(image,0,imageFolder,fileName,onSuccess);

		//ukoliko je png ide drugacije
		}else if(extension==='png'){
			//set white background
			lwip.create(image.width(), image.height(), 'white', function(err, canvas){
				canvas.paste(0, 0, image, function(err, whiteImage){
					writeOneImage(whiteImage,0,imageFolder,fileName,onSuccess);
				});
			});
		}
	});
};

exports.filename = function(req, res, next, filename) {
	req.filename = filename;
	next();
};
exports.fileSize = function(req, res, next, fileSize) {
	var intFileSize=-1;
	try{
		intFileSize=parseInt(fileSize);
		intFileSize=global.config.imageDimensions.indexOf(intFileSize)!==-1?intFileSize:-1;
	}catch(err){
		res.json(500,['bad request']);
	}
	if(intFileSize!==-1){
		req.fileSize = intFileSize;
		next();
	}else{
		res.json(500,['bad request']);
	}
};

exports.getPostImage = function(req, res) {

	console.log('spicio me je za prikaz slike');
	var filePath = global.config.filePathPostImage() + '/' + req.fileSize + '/' + req.filename;
	var stat = fs.statSync(filePath);

	res.writeHead(200, {
		'Content-Type': 'image/jpg',
		'Content-Length': stat.size
	});

	var readStream = fs.createReadStream(filePath);
	readStream.pipe(res);
};

exports.uploadImage = function(req, res) {

	console.log('pozvan je uploadImage');
	var form = new multiparty.Form({
		maxFilesSize:5000000
	});
	form.parse(req, function(err, fields, files) {

		if (err) {
			res.json(500,['bad request']);
		}
		PostModel.findOne({_id:fields.id}).exec(function(err, post) {
			if (err) {
				res.json(500,['bad request']);
			}
			if (!post){
				res.json(500,['bad request']);
			}
			else {
				var lastVideoNumber;
				if(post.postImage.length===0){
					lastVideoNumber=-1;
				}else{
					var parts=post.postImage[post.postImage.length-1].split('_');
					lastVideoNumber=parseInt(parts[parts.length-1]);
				}
				var currentVideoNumber=lastVideoNumber+1;

				var fileName = fields.id + '_' + currentVideoNumber +'_'+ randomString(5);
				post.postImage.push(fileName+ '.jpg');
				post.save(function(err){});

				var source = files.file[0].path;

				writeImages('post',source,fileName,function(){
					res.json(['ok']).status(200);
				});
			}
		});
	});
};