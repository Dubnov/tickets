(function () {
    'use strict';

    angular
        .module('app', ['ngMaterial', 'ngMessages'])
        .controller('main', controller)

    controller.$inject = [];

    function controller() {
        const self = this;

        self.openA = () => {
            alert('dfg');
        };

        self.tickets = [
            {
                title: '',
                description: '',
                price: 100,
                location: '',
                amount: 2
            },
            {
                title: '',
                description: '',
                price: 100,
                location: '',
                amount: 2
            },
            {
                title: '',
                description: '',
                price: 100,
                location: '',
                amount: 2
            },
            {
                title: '',
                description: '',
                price: 100,
                location: '',
                amount: 2
            },
            {
                title: '',
                description: '',
                price: 100,
                location: '',
                amount: 2
            },
            {
                title: '',
                description: '',
                price: 100,
                location: '',
                amount: 2
            },
            {
                title: '',
                description: '',
                price: 100,
                location: '',
                amount: 2
            },
            {
                title: '',
                description: '',
                price: 100,
                location: '',
                amount: 2
            }
        ]
    }
})();