'use strict';

angular.module('agronet.posts')
.controller('ctrlPosts',['$scope', '$stateParams','Post',
	function($scope, $stateParams, Post){

		new Post().getAll(function(allPosts){

			$scope.allPosts=allPosts;
		});


	}
]);