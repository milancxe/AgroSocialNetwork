'use strict';

var config = {};
var isWin = /^win/.test(process.platform);
config.mode=process.env.AGRONET_ENV==='production'?'production':'dev';
config.port=process.env.AGRONET_PORT?process.env.AGRONET_PORT:'3000';

config.filePathPostImage=function(){
	if(isWin){
		return 'C:\\work\\agronet\\post\\';
	}else{
		return '/home/agronetUser/data/post/';
	}
};

config.fileProfilePicture=function(){
	if(isWin){
		return 'C:\\work\\agronet\\user\\';
	}else{
		return '/home/agronetUser/data/user/';
	}
};

config.logoPath=function(){
	if(isWin){
		return 'C:\\work\\agronet\\user\\';
	}else{
		return '/home/agronetUser/data/logoPicture/';
	}
};


config.paginationSize={
	posts:10,
	comments:10

};


config.imageDimensions=[
	2048,
	851,
	484,
	160,
	100,
	32
];
module.exports = config;
