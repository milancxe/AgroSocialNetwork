'use strict';

angular.module('agronet.users')
.controller('ctrlRegister',['$scope','$rootScope', '$stateParams','$location','FileUploader','$state', 'User',
function($scope, $rootScope, $stateParams,$location,FileUploader, $state , User){
	
	console.log('radi kontroler za registrovanje korisnika');
	$scope.editUser ={};

	$scope.uploader=new FileUploader({
        url:'/files/user/uploadImage',
        autoUpload: false
    });

    $scope.uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    var uploadPhotos=function(uploader,userId){
            var numberOfItems = 0;
            if (uploader.queue.length > 0) {
                uploader.onBeforeUploadItem = function (item) {
                    item.formData.push({
                        id: userId,
                        number: numberOfItems
                    });
                    numberOfItems += 1;
                };
                $scope.uploader.onCompleteAll = function () {
                    $location.path('user/' + userId);
                };

                $scope.uploader.uploadAll();
            } else {
                $location.path('user/' + userId);
        }
    };

	$scope.createUser = function(){

		console.log($scope.editUser);
		new User().createUser($scope.editUser, function(createdUser){
			uploadPhotos($scope.uploader,createdUser._id);
			$rootScope.user=createdUser;
			$state.go('ml.rhf.mainPage',{}, {
	                    	reload: true,
						    inherit: true}
						);
		});

	};
}]);