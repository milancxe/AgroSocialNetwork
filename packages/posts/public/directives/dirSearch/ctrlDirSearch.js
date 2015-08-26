'use strict';

angular.module('agronet.posts')
.controller('ctrlDirSearch',['$scope','$state', 'Post','$rootScope', '$stateParams', '$sce', 'dialogs','$location',
function($scope,$state, Post,$rootScope, $stateParams, $sce, dialogs,$location){
	
	$scope.searchText='';

	$scope.searchPosts = function(){
		$state.transitionTo('ml.rhf.searchPosts',{searchText:$scope.searchText}, {
            reload: false,
            inherit: true
        });
	};
}]); 