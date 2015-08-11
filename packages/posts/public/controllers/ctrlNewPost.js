'use strict';

angular.module('agronet.posts')
.controller('ctrlNewPost',['$scope', '$stateParams','Post','$location','FileUploader','$http',
	function($scope, $stateParams, Post,$location,FileUploader,$http){


		$scope.post = null;
		var deleteImages=null;

	    var create;
	    if($stateParams.postId){
	        //it is update
	        console.log('updejt je');
	        create=false;
	        deleteImages=[];
	    }else{
	        //it is create
	        create=true;
	    }


		$scope.uploader=new FileUploader({
	        url:'/files/uploadImage',
	        autoUpload: false
	    });
	    $scope.uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        //initialize data in case of edit
	    $scope.init=function(){
	        if(!create){
	            //update challenge
	            console.log('gledam dal je kreiranje i trazim ga od servera');
	            Post.get({
	                postId: $stateParams.postId
	            }, function(post) {
	            	console.log('dobio sam post od servera');
	                $scope.post = post;
	                console.log($scope.post);
	            });
	        }else{
	            //new challenge
	            $scope.post = new Post();
	        }
	    };

		var uploadPhotos=function(uploader,postId){
            var numberOfItems = 0;
            if (uploader.queue.length > 0) {
                uploader.onBeforeUploadItem = function (item) {
                    item.formData.push({
                        id: postId,
                        number: numberOfItems
                    });
                    numberOfItems += 1;
                };
                $scope.uploader.onCompleteAll = function () {
                    $location.path('posts/' + postId);
                };

                $scope.uploader.uploadAll();
            } else {
                $location.path('posts/' + postId);
            }
        };



    	/*$scope.addVideo();
        if(create) {
            $scope.post.$save(function (response) {
                uploadPhotos($scope.uploader,response._id);
            });
        }else{
            $scope.post .$update(function() {
                uploadPhotos($scope.uploader,$scope.post._id);
            });
        }*/
        $scope.addVideo = function() {
	        if($scope.contentVideoAddress &&
	        	$scope.contentVideoAddress !== null && $scope.contentVideoAddress.trim() !== '') {
	            //if it is a youtube video
	            if($scope.contentVideoAddress.lastIndexOf('https://www.youtube.com', 0) === 0){
	                var videoId=$scope.contentVideoAddress.split('&')[0].split('=')[1];
	                var video = {
	                    typeOfVideo: 'youtube',
	                    id: videoId
	                };
	                if(!$scope.post.contentVideo){
	                    $scope.post.contentVideo=[];
	                }
	                $scope.post.contentVideo.push(video);
	            }
	            $scope.contentVideoAddress = '';
	            //TODO show error if it is not youtube video
	            console.log($scope.post.contentVideo);
	        }
    	};

    	$scope.removeVideo = function(index) {
        	$scope.post.contentVideo.splice(index, 1);
    	};
        	
	
		$scope.savePost = function(){
			if(create){				
				$scope.post.$save(function(data){
					uploadPhotos($scope.uploader,data._id);
				});
			}else{
				$scope.post.deleteImages=deleteImages;
				$scope.post.$update(function(){
					uploadPhotos($scope.uploader,$scope.post._id);
				});
			}
		};

		$scope.removeImage = function(image){

			//finding picture to delete
			for(var i = 0; i < $scope.post.postImage.length; i+=1) {
	            if($scope.post.postImage[i] === image) {
	            	//remove it from array
	                $scope.post.postImage.splice(i, 1);
	                deleteImages.push(image);
	                if($scope.post.postImage.length>0){
	                	$scope.selectedImage=$scope.post.postImage[0];
	                }

	            }
        	}
		};


	}
]);