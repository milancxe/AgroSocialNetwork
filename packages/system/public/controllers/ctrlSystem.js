'use strict';

angular.module('agronet.system')
.controller('ctrlSystem', ['$scope', '$rootScope',
	function($scope, $rootScope) {
		//TODO comment this part
		console.log('spicio glavni');
		$scope.state = 'ml.rhf.testState';
		/*$rootScope.$on('$stateChangeStart',function(event, next, current){
			var toPath = next.url.replace('/','');
			$scope.state = toPath;
			if($scope.state === '' ) {
				$scope.state = 'ml.rhf.testState';
			}
		});*/
	}
]);