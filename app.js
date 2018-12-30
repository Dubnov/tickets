(function () {
    'use strict';

    angular
        .module('app', ['ngMaterial', 'ngMessages', 'rzModule'])
        .controller('main', controller)

    controller.$inject = [];

    function controller() {
        const self = this;
        self.sortOption = 'Recommended'
        self.sortOptions = ['Recommended', 'Cheapest', 'Best seats', 'Highest price']
        self.date = new Date();
        self.areaFilter = {};

        self.$onInit = () => {
            self.initRangePrices();
            self.initAreasFilter();
        }

        self.initAreasFilter = () => {
            self.areas = [];

            self.tickets.map(x => x.area).forEach(x => {
                if (!self.areas.some(a => a === x)) {
                    self.areas.push(x);
                    self.areaFilter[x] = true;
                }
            });
        }

        self.initRangePrices = () => {
            const prices = self.tickets.map(x => x.price);
            self.priceSlider = {
                minValue: Math.min(...prices),
                maxValue: Math.max(...prices),
                options: {
                    floor: Math.min(...prices),
                    ceil: Math.max(...prices),
                }
            }
        }

        self.areaFilterFunc = (tick) => {
            return self.areaFilter[tick.area];
        }

        self.sortBy = (option) => {
            self.sortOption = option || 'Recommended';
            self.sortTickets(self.sortOption);
        }

        self.priceRangeFilter = (tick) => {
            return (tick.price >= self.priceSlider.minValue && tick.price <= self.priceSlider.maxValue)
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
                amount: 2,
                area: 'Lower Tier'
            },
            {
                title: 'Section 200',
                description: '',
                price: 110,
                location: '',
                amount: 2,
                area: 'Middle Tier'
            },
            {
                title: 'Section 105',
                description: '',
                price: 250,
                location: '',
                amount: 2,
                area: 'Lower Tier'
            },
            {
                title: 'Section 210',
                description: '',
                price: 100,
                location: '',
                amount: 2,
                area: 'Middle Tier'
            },
            {
                title: 'Section 335',
                description: '',
                price: 55,
                location: '',
                amount: 2,
                area: 'Middle Tier'
            },
            {
                title: 'Section 300',
                description: '',
                price: 50,
                location: '',
                amount: 2,
                area: 'Middle Tier'
            },
            {
                title: 'Section 400',
                description: '',
                price: 10,
                location: '',
                amount: 2,
                area: 'Upper Tier'
            },
            {
                title: 'Section 10',
                description: '',
                price: 1000,
                location: '',
                amount: 2,
                area: 'Boxes'
            }
        ]
    }
})();