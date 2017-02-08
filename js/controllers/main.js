/*
 * @Author: taoyige
 * @Date:   2017-02-08 16:23:05
 * @Last Modified by:   taoyige
 * @Last Modified time: 2017-02-08 17:14:00
 */

/**
 * 数据控制器
 * 	只存放界面逻辑，数据逻辑交给服务模块，然后再引用服务模块
 */

(function(angular) {
    'use strict';

    angular
        .module('app.controller.main', ['app.services.main'])
        .controller('DataController', [
            '$scope',
            '$location',
            '$routeParams',
            '$route',
            'MainService',
            function($scope, $location, $routeParams, $route, MainService) {
                /** 输入框模型 */
                $scope.text = '';

                /** 列表数据模型 数据：{id: 1, text: 'xxx', completed: true}*/
                $scope.todos = MainService.get();

                /** 输入框添加数据回车事件 */
                $scope.add = function() {
                    if ($scope.text === '') {
                        return;
                    }

                    MainService.add($scope.text);

                    $scope.text = '';
                }

                /** 删除数据方法 */
                $scope.remove = function(id) {
                    MainService.remove(id);
                }

                /** 清除完成的 */
                $scope.clear = function() {
                    $scope.todos = MainService.clear();
                }

                /** 是否存在已完成任务 */
                $scope.existCompleted = function() {
                    for (var i = 0; i < $scope.todos.length; i++) {
                        if ($scope.todos[i].completed) {
                            return true;
                        }
                    }
                    return false;
                }

                /** 
				由于改变编辑状态只是改变界面模型，并没有改变底层的数据模型，所以不用交给serveice服务处理
                	当前编辑的id模型 
                */
                $scope.currentEditingId = -1;
                /** 编辑事件模型 */
                $scope.editing = function(id) {
                        $scope.currentEditingId = id;
                        console.log(11);
                    }
                    /** 保存编辑事件模型 */
                $scope.save = function() {
                    $scope.currentEditingId = -1;
                }

                /** 选择单个 */
                $scope.toggle = function () {
                	MainService.saveToLocal();
                }

                /** 全选/全不选 */
                var checkAll = true;
                $scope.toggleAll = function() {
                    MainService.toggleAll();
                }

                /** 
                方式1：由于$watch方法只能监视$scope的成员属性，所以需要把$location作为$scope的一个成员 */
                // $scope.$location = $location;
                // $scope.currentShow = {};
                // $scope.$watch('$location.path()', function(now, old) {
                //     console.log(now);
                //     now = decodeURIComponent(now);
                //     switch (now) {
                //         case '/active':
                //             $scope.currentShow = {
                //                 completed: false
                //             };
                //             break;
                //         case '/completed':
                //             $scope.currentShow = {
                //                 completed: true
                //             };
                //             break;
                //         default:
                //             $scope.currentShow = {};
                //             break;
                //     }
                // })

                /** 
                 * 方式二：使用路由
                 * 由于使用了参数的方式匹配而不是直接匹配，所以无论怎样都会匹配成功，所以需要在这里使用switch
                 */
                var status = $routeParams.status;
                switch (status) {
                    case 'active':
                        $scope.currentShow = {
                            completed: false
                        };
                        break;
                    case 'completed':
                        $scope.currentShow = {
                            completed: true
                        };
                        break;
                    default:
                        // 这里是当路由参数不满足active或者completed时，就默认跳转到#/
                        /** 用于更新路由参数，实现地址的跳转 */
                        $route.updateParams({ status: '' });
                        $scope.currentShow = {};
                        break;
                }

                /** 自定义比较方法 */
                $scope.equal = function(source, target) {
                    return source === target;
                }

            }
        ]);

})(angular)
