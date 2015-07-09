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


            }).state('ml.rhf.newPost',{

                url:'/newPost',
                views:{
                    'view_body@ml':{
                        templateUrl:'posts/public/views/body/newPost.html',
                        controller:'ctrlNewPost'
                    }
                }


            }).state('ml.rhf.onePost',{

                url:'/posts/:postId',
                views:{
                    'view_body@ml':{
                        templateUrl:'posts/public/views/body/onePost.html',
                        controller:'ctrlOnePost'
                    }
                }


            });

    }
]);