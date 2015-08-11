'use strict';



angular.module('agronet.posts')
.controller('ctrlImageGalery',['$scope', 'Post', '$stateParams', '$sce', 'dialogs','$location',
function($scope, Post, $stateParams, $sce, dialogs,$location){

	$scope.selectedImage=$scope.allImages[0];
	$scope.selectImage=function(image){

		$scope.selectedImage=image;
	};


	$scope.videoId=$scope.videos[0].id;
	console.log($scope.videoId);
	$scope.showItem=function(){
		$scope.activeType = 'youtube';
		$scope.selectedImage=$scope.videos[0];
	};
	
}]);