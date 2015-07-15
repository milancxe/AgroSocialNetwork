'use strict';

angular.module('agronet.posts')
.controller('ctrlNewPost',['$scope', '$stateParams','Post','$location','FileUploader',
	function($scope, $stateParams, Post,$location,FileUploader){
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


		$scope.newPost = new Post();

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


	
		$scope.createNewPost = function(){
			/*new Post().createNewPost($scope.newPost,function(data){
				//new Post().showOnePost(data);
				$location.path('posts/' + data._id);
			});*/
			
			$scope.newPost.$save(function(data){
				console.log('sacuvan je sada picim sliku!');
				console.log(data);
				uploadPhotos($scope.uploader,data._id);
				//$location.path('posts/' + data._id);
			});
		};




	}
]);