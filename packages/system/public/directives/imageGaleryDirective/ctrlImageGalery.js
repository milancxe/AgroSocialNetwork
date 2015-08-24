'use strict';



angular.module('agronet.posts')
.controller('ctrlImageGalery',['$scope', 'Post', '$stateParams', '$sce', 'dialogs','$location',
function($scope, Post, $stateParams, $sce, dialogs,$location){

	$scope.traverse=$scope.allImages.length+$scope.videos.length;
	$scope.current=0;
	if($scope.allImages){
		$scope.selectedImage=$scope.allImages[0];
		$scope.picture=true;
	}
	$scope.selectImage=function(image){

		$scope.selectedImage=image;
	};

	$scope.nextOne=function(val){
		
		if(val===1){

			$scope.current=$scope.current+val;
		}else{
			
			if($scope.current===0){
				$scope.current=$scope.traverse+val;
			}else{
				$scope.current=$scope.current+val; 
			}
		}
		if($scope.current===$scope.traverse||$scope.current===-$scope.traverse){
			$scope.current=0;
		}

		
		if($scope.current<$scope.allImages.length){
			$scope.showPicture($scope.allImages[$scope.current]);
		}else{
			$scope.videosNumber=$scope.traverse-$scope.allImages.length;
			$scope.showVideo($scope.videos[$scope.current-$scope.allImages.length]);
		}

	};

	$scope.showPicture=function(pictureId){
		$scope.video=false;
		$scope.picture=true;
		$scope.selectedImage=pictureId;

	};	

	$scope.showVideo=function(videoObject){
		$scope.picture=false;
		$scope.video=true;

		$scope.videoId=videoObject.id;
	};

	
	
}]);