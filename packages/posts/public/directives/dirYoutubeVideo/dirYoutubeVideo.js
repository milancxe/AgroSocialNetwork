'use strict';

angular.module('agronet.posts')
.directive('ngYoutubeVideo',['$compile', function($compile) {
	return {
		restrict: 'A',
		scope :{
			videoId:'@'
		},
		link: function (scope, element, attributes) {
			//scope.currentYoutubeVideoId = scope.url = $sce.trustAsResourceUrl();
			console.log(scope);
			scope.$watch('videoId',function(newValue,oldValue) {
				var youtubePlayer=$compile(
					'<div class="embed-container"><iframe src="https://www.youtube.com/embed/' + 
					newValue + 
					'" frameborder="0" allowfullscreen></iframe></div>')(scope);
				element.empty();
				element.append(youtubePlayer);
			});
		}
	};
}]);