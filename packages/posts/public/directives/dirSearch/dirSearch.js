'use strict';

angular.module('agronet.posts')
.directive('ngSearch',[ function() {
	var directive={};
	directive.restrict='A';
	directive.replace=true;
	directive.scope={
		
	};
	directive.templateUrl='posts/public/directives/dirSearch/tmplDirSearch.html';
	directive.controller='ctrlDirSearch';
	directive.link= function (scope, element, attributes) {};
    return directive;
}]);