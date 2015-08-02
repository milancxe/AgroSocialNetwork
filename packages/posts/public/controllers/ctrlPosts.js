'use strict';

angular.module('agronet.posts')
.controller('ctrlPosts',['$scope','$rootScope', '$stateParams','Post',
	function($scope,$rootScope, $stateParams, Post){

		$scope.allPosts=[];
		$scope.showLoadMore=false;


		new Post().getAll(null,function(allPosts){

			$scope.allPosts=allPosts;
			console.log('iz postova logujem');
			console.log($scope.allPosts);
			if(allPosts.length===10){
				$scope.showLoadMore=true;
			}else{
				$scope.showLoadMore=false;
			}
		});

		$scope.loadMore=function(){

			new Post().getAll($scope.allPosts[$scope.allPosts.length-1]._id , function(response){
				console.log('allPosts posle poziva');
				//console.log(response);

				$scope.allPosts.push.apply($scope.allPosts,response);
				if(response.length===10){
					$scope.showLoadMore=true;	

				}else{
					$scope.showLoadMore=false;
				}
			});
		};


	}
]);