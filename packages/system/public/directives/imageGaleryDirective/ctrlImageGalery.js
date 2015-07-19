'use strict';



angular.module('agronet.posts')
.controller('ctrlImageGalery',['$scope', 'Post', '$stateParams', '$sce', 'dialogs','$location',
function($scope, Post, $stateParams, $sce, dialogs,$location){


	console.log('logujem iz ctrlImageGalery objekat slika');
	console.log($scope.allImages);
	$scope.selectedImage=$scope.allImages[0];
	$scope.selectImage=function(image){
		console.log('izabrao si drugu sliku');
		console.log(image);
		$scope.selectedImage=image;
	};

	
}]);