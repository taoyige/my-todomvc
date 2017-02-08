(function(window, angular) {
    'use strict';

    /**
     * 创建自己的模块
     */
    var myApp = angular.module('myApp', ['ngRoute', 'app.controller.main']);

    /**
     * 路由设置
     */
    myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    	/** 避免锚点跳转时出现#!#%2F字符 */
        $locationProvider.hashPrefix('');
        
        /** status作为参数 */
        $routeProvider
        	.when('/:status?', {
        		controller: 'DataController',
        		templateUrl: 'temp'
        	});
    }]);


})(window, angular);