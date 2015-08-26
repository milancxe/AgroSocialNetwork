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
                        templateUrl:'posts/public/views/body/upsertPost.html',
                        controller:'ctrlNewPost'
                    }
                }


            }).state('ml.rhf.updatePost',{
                url:'/posts/:postId/edit',
                views:{
                    'view_body@ml':{
                        templateUrl:'posts/public/views/body/upsertPost.html',
                        controller:'ctrlNewPost'
                    }
                }
            })
            .state('ml.rhf.onePost',{

                url:'/posts/:postId',
                views:{
                    'view_body@ml':{
                        templateUrl:'posts/public/views/body/onePost.html',
                        controller:'ctrlOnePost'
                    }
                }


            }).state('ml.rhf.searchPosts',{

                url:'/searchPosts?searchText',
                views:{
                    'view_body@ml':{
                        templateUrl:'posts/public/views/body/searchPosts.html',
                        controller:'searchController'
                    }
                }


            })
            .state('ml.rhf.pleaseLogin',{
                url:'/error/requiresLogin',
                views:{
                    'view_body@ml':{
                        templateUrl:'posts/public/views/body/errorPage.html',
                        controller:'ctrlError'
                    }
                }
            });

    }
]);