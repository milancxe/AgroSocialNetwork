'use strict';

angular.module('agronet.posts')
.controller('searchController',['$scope', '$stateParams','$rootScope','$state','Post','$location','FileUploader','$http',
	function($scope, $stateParams,$rootScope,$state, Post,$location,FileUploader,$http){

		$scope.searchText='';
		$scope.foundPosts=[];
		console.log('na pocetku logujem foundposts');
		console.log($scope.foundPosts);
		console.log($scope.brr);

		$scope.searchPosts=function(){

			console.log('zovem sa parametrima:');
			console.log($scope.searchText);
			new Post().searchPosts($scope.searchText,function(response){
 
				$scope.foundPosts.push.apply($scope.foundPosts,response);

			});
		};

		if($stateParams.searchText){
			$scope.searchText=$stateParams.searchText;
			$scope.searchPosts();
		}
	}	
]);