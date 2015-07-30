'use strict';

angular.module('agronet.users')
.controller('ctrlChangeProfilePicture',['$scope','$rootScope', '$stateParams','$state','FileUploader','$location', 'User',
function($scope, $rootScope, $stateParams, $state ,FileUploader,$location, User){

    $scope.error = {};
	console.log('this log is from cghange profile picture');
	$scope.uploader=new FileUploader({
        url:'/files/user/changeProfilePicture',
        autoUpload: false
    });

    $scope.uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });


    $scope.ChangeProfilePicture=function(){
    	var uploader= $scope.uploader;
    	if($scope.uploader.queue.length===1){
    		console.log('ok, moze jedna slika');

    		var numberOfItems = 0;
            if (uploader.queue.length > 0) {
                uploader.onBeforeUploadItem = function (item) {
                    item.formData.push({
                        id: $scope.user._id,
                        number: numberOfItems
                    });
                    numberOfItems += 1;
                };
                $scope.uploader.onCompleteAll = function () {
                    $location.path('/');
                };

                $scope.uploader.uploadAll();
            } else {
                $location.path('/');
        	}
    	}else{
            $scope.error.multipleImages ='You can choose only one profile picture';
    	}
    };

}]);