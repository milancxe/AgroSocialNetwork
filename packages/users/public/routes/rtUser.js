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


            })
            .state('ml.rhf.editProfile',{
                url:'/users/editProfile',
                views:{
                    'view_body@ml':{
                        templateUrl:'users/public/views/body/editProfile.html',
                        controller:'ctrlEditProfile'
                    }
                }
            })
            .state('ml.rhf.changePassword',{
                url:'/users/:userId/changePassword',
                views:{
                    'view_body@ml':{
                        templateUrl:'users/public/views/body/changePassword.html',
                        controller:'ctrlChangePassword'
                    }
                }
            })
            .state('ml.rhf.changeProfilePicture',{
                url:'/users/:userId/changeProfilePicture',
                views:{
                    'view_body@ml':{
                        templateUrl:'users/public/views/body/changeProfilePicture.html',
                        controller:'ctrlChangeProfilePicture'
                    }
                }
                
            }).state('ml.rhf.userProfile',{
                url:'/users/userProfile/:userId',
                views:{
                    'view_body@ml':{
                        templateUrl:'users/public/views/body/userProfile.html',
                        controller:'ctrlUserProfile'
                    }
                }
                
            })
            ;
            
    }
]);
