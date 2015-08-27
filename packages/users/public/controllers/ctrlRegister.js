'use strict';

angular.module('agronet.users')
.controller('ctrlRegister',['$scope','$http','$rootScope', '$stateParams','$location','FileUploader','$state', 'User',
function($scope,$http, $rootScope, $stateParams,$location,FileUploader, $state , User){
	
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

		/*console.log($scope.editUser);*/

        $http.post('/userDetail',  $scope.editUser
        ).success(function (response) {
                    
                    
                    var loggedUser = new User(response);
                    $rootScope.user = loggedUser;
                    uploadPhotos($scope.uploader,loggedUser._id);


                     $scope.uploader.onCompleteItem = function (item, response, status, headers) {
                        $rootScope.user.profilePicture=response.picture;
                    };
                    $scope.uploader.onCompleteAll = function () {
                        //$location.path('challenges/' + challengeId);
                        $state.go('ml.rhf.mainPage',{}, { 
                            reload: true,
                            inherit: true}
                        );
                    };
                    $scope.uploader.uploadAll();
                    if($scope.uploader.queue.length===0){
                        $state.go('ml.rhf.mainPage',{}, {
                            reload: true,
                            inherit: true}
                        );
                    }
                    $state.go('ml.rhf.mainPage', $stateParams, {
                        reload: true,
                        inherit: true
                    });
        }).error(function () {
                    $scope.loginerror = 'Authentication failed.';
        });

 


		/*new User().createUser($scope.editUser, function(createdUser){
			uploadPhotos($scope.uploader,createdUser._id);
			$rootScope.user=createdUser;
			$state.go('ml.rhf.mainPage',{}, {
	                    	reload: true,
						    inherit: true}
						);
		});*/

	};
}]);