(function () {
    'use strict';

    angular
        .module('app', [])
        .controller('main', controller)

    controller.$inject = [];

    function controller() {
        const self = this;

        self.openA = () => {
            alert('dfg');
        };
    }
})();