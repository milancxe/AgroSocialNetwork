'use strict';

angular.module('agronet.posts')
.controller('ctrlPosts',['$scope','$rootScope', '$stateParams','Post',
	function($scope,$rootScope, $stateParams, Post){

		$scope.allPosts=[];
		$scope.showLoadMore=false;



		new Post().getAll(null,function(allPosts){

			$scope.allPosts=allPosts;
			if(allPosts.length===10){
				$scope.showLoadMore=true;
			}else{
				$scope.showLoadMore=false;
			}
		});

		new Post().giveMeBestFive(null,function(bestFive){

			$scope.bestFive=bestFive;
			if(bestFive.length===10){
				$scope.showLoadMore=true;
			}else{
				$scope.showLoadMore=false;
			}
		});


		$scope.loadMore=function(){

			new Post().getAll($scope.allPosts[$scope.allPosts.length-1]._id , function(response){

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