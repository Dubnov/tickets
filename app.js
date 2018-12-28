(function () {
    'use strict';

    angular
        .module('app', ['ngMaterial', 'ngMessages'])
        .controller('main', controller)

    controller.$inject = [];

    function controller() {
        const self = this;

        self.$onInit = () => {
            self.initRangePrices();
        }

        self.sortOption = 'Recommended'
        self.sortOptions = ['Recommended', 'Cheapest', 'Best seats', 'Highest price']

        self.initRangePrices = () => {
            const prices = self.tickets.map(x => x.price);
            self.minPrice = Math.min(...prices);
            self.maxPrice = Math.max(...prices);
        }

        self.sortBy = (option) => {
            self.sortOption = option || 'Recommended';
            self.sortTickets(self.sortOption);
        }

        self.sortTickets = (option) => {
            const tempTickets = angular.copy(self.tickets);
            switch (option) {
                case 'Cheapest': {
                    self.tickets = tempTickets.sort((a, b) => a.price - b.price);
                    break;
                }
                case 'Highest price': {
                    self.tickets = tempTickets.sort((a, b) => b.price - a.price);
                    break;
                }
                case 'Best Seats': {
                    self.tickets = tempTickets.sort((a, b) => b.price - a.price);
                    break;
                }
                case 'Recommended': {
                    self.tickets = tempTickets.sort((a, b) => b.price - a.price);                    
                    break;
                }
                default: {
                    self.tickets = tempTickets.sort((a, b) => b.price - a.price);                    
                    break;
                }
            }
            
        }

        self.tickets = [
            {
                title: 'Section 100',
                description: '',
                price: 300,
                location: '',
                amount: 2
            },
            {
                title: 'Section 200',
                description: '',
                price: 110,
                location: '',
                amount: 2
            },
            {
                title: 'Section 105',
                description: '',
                price: 250,
                location: '',
                amount: 2
            },
            {
                title: 'Section 210',
                description: '',
                price: 100,
                location: '',
                amount: 2
            },
            {
                title: 'Section 335',
                description: '',
                price: 55,
                location: '',
                amount: 2
            },
            {
                title: 'Section 300',
                description: '',
                price: 50,
                location: '',
                amount: 2
            },
            {
                title: 'Section 400',
                description: '',
                price: 10,
                location: '',
                amount: 2
            },
            {
                title: 'Section 10',
                description: '',
                price: 1000,
                location: '',
                amount: 2
            }
        ]
    }
})();