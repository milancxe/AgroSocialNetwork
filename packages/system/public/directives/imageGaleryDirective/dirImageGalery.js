'use strict';

angular.module('agronet.posts')
.directive('ngImageGalery',[ function() {
	var directive={};
	directive.restrict='A';
	directive.replace=true;
	directive.scope={
		allImages:'=',
	};
	directive.templateUrl='system/public/directives/imageGaleryDirective/tmplDirImageGalery.html';
	directive.controller='ctrlImageGalery';
	directive.link= function (scope, element, attributes) {};
    return directive;
}]);