/*
 * @Author: taoyige
 * @Date:   2017-02-08 16:23:11
 * @Last Modified by:   taoyige
 * @Last Modified time: 2017-02-08 17:12:35
 */

/**
 * 服务模块
 *  数据逻辑在这里书写
 */

(function(angular) {
    'use strict';

    angular
        .module('app.services.main', [])
        .service('MainService', ['$window', function($window) {

            var storage = $window.localStorage;
            var todos = storage['todos'] ? JSON.parse(storage['todos']) : [];

            this.get = function() {
                return todos;
            }

            this.saveToLocal = function() {
                storage['todos'] = JSON.stringify(todos);
            }

            /** 输入框添加数据回车事件 */
            this.add = function(text) {
                todos.push({
                    id: +new Date(),
                    text: text,
                    completed: false
                });
                this.saveToLocal();
            }

            /** 删除数据方法 */
            this.remove = function(id) {
                for (var i = 0; i < todos.length; i++) {
                    if (todos[i].id === id) {
                        todos.splice(i, 1);
                    }
                }
                this.saveToLocal();
            }

            /** 清除完成的 */
            this.clear = function() {
                /**
                 本来controller的todos和service的todos指向同一个对象，但在这里service的todos指向了一个新的对象，导致了数据不能同步
                 */
                var tempArr = [];
                for (var i = 0; i < todos.length; i++) {
                    if (!todos[i].completed) {
                        tempArr.push(todos[i]);
                    }
                }
                todos = tempArr;
                this.saveToLocal();
                return todos;
            }

            /** 全选/全不选 */
            var checkAll = true;
            this.toggleAll = function() {
                for (var i = 0; i < todos.length; i++) {
                    todos[i].completed = checkAll;
                }
                checkAll = !checkAll;
                this.saveToLocal();
            }
        }]);
})(angular)
