'use strict';
angular.module('agronet.users').config(['$stateProvider',
    function ($stateProvider) {


        // states for my app
        $stateProvider
            .state('auth', {
                url: '/auth',
                templateUrl: 'users/public/views/index.html'
            })
            .state('auth.login', {
                url: '/login',
                templateUrl: 'users/public/views/login.html',

                /*resolve: {
                    loggedin: checkLoggedOut
                }*/
            })
            .state('ml.rhf.register',{

                url:'/register',
                views:{
                    'view_body@ml':{
                        templateUrl:'users/public/views/body/register.html',
                        controller:'ctrlRegister'
                    }
                }


            });
            
    }
]);
