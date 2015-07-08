'use strict';

var config = {};
var isWin = /^win/.test(process.platform);
config.mode=process.env.AGRONET_ENV==='production'?'production':'dev';
config.port='3000';

config.filePathChallengeImage=function(){
	if(isWin){
		return 'C:\\work\\agronet\\challenge\\';
	}else{
		return '/home/agronetUser/data/challenge/';
	}
};

config.filePathReplyImage=function(){
	if(isWin){
		return 'C:\\work\\agronet\\reply\\';
	}else{
		return '/home/agronetUser/data/reply/';
	}
};

config.filePathUserImage=function(){
	if(isWin){
		return 'C:\\work\\agronet\\user\\';
	}else{
		return '/home/agronetUser/data/user/';
	}
};


module.exports = config;
