'use strict';
angular.module('agronet.posts').config(['$stateProvider',
    function ($stateProvider) {

    	$stateProvider
            .state('ml.rhf.mainPage',{

                url:'/',
                views:{
                    'view_body@ml':{
                        templateUrl:'posts/public/views/body/mainPage.html',
                        controller:'ctrlPosts'
                    }
                }


            });

    }
]);