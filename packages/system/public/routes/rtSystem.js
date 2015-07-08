'use strict';

//Setting up route
angular.module('agronet.system').config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {

		// For unmatched routes:
		$urlRouterProvider.otherwise('/');

		// states for my app
		$stateProvider
		.state('ml', {
			abstract: true,
			templateUrl:'system/public/views/layouts/layoutHeaderBodyFooter.html'
		})
		.state('ml.rhf', {
			abstract: true,
			views: {
				'view_header@ml': {
						//resolve header
						templateProvider: ['$rootScope','$templateFactory','CheckAuth', function($rootScope,$templateFactory,CheckAuth) {
							var resolveView=function(resolve){
								/*if ( $rootScope.user){
									return $templateFactory.fromUrl('users/public/views/header/userHeader.html');
								}else{*/
									return $templateFactory.fromUrl('system/public/views/headers/headerLoginNavbar.html');
							//	}
							};
							/*if(!$rootScope.startUserChecked){
								var qUser=CheckAuth.checkUser();
								if(qUser){
									return qUser.then(resolveView);
								}else{
									return resolveView();
								}
							}else{*/
								return resolveView();
							//}

						}]
					},
					'view_footer@ml': {templateUrl: 'system/public/views/footers/footer.html'}
				}
			});
	}
	]).config(['$locationProvider',
	function ($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
	]);
