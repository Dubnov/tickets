(function () {
    "use strict";

    angular
        .module('app', ['ngMaterial', 'ngMessages', 'rzModule'])
        .controller('main', controller);

    controller.$inject = ['$mdDialog', '$mdToast', '$window'];

    function controller($mdDialog, $mdToast, $window) {
        const self = this;
        self.eventLocation = 'Staples Center, Los Angeles, California, USA';
        self.ticketsAmount = '';
        self.sortOption = "Recommended";
        self.pageSize = 8;
        self.showFav = undefined;
        self.ticketsLimit = self.pageSize;
        self.date = new Date();

        self.sortOptions = [
            { name: 'Recommended', value: '-score', isDisabled: false},
            { name: 'Cheapest', value: 'price', isDisabled: false},
            { name: 'Best Seats', value: 'section', isDisabled: false},
            { name: 'Highest Price', value: '-price', isDisabled: false}
        ];
        self.sortChosen = ['-score'];
        self.areaFilter = {};

        self.$onInit = () => {
            self.initTickets();
            self.initRangePrices();
            self.initAmountFilter();
            self.initAreasFilter();
            self.initRowsRange();
            self.initSeatsRange();
            self.initScoreRange();
            // self.sortBy();
        };

        self.printSelectedSorting = () => {
            return self.sortChosen.map(x => x.name).join(', ');
        }

        self.hideAdvancedSearch = () => {
            self.isAdvancedSearch = false;
            self.initRowsRange();
            self.initSeatsRange();
            scoreSlider
        }

        self.showFavorites = () => {
            self.showFav = !self.showFav;
            if (!self.showFav) {
                self.showFav = undefined;
            }
        };

        self.loadTickets = () => {
            self.ticketsLimit = self.ticketsLimit + self.pageSize;
            // self.ticketsDisplayed = self.tickets.slice(0, self.ticketsDisplayed.length + self.pageSize)
        };

        self.initAmountFilter = () => {
            self.ticketsAmountOptions = [];

            self.tickets.map(x => x.amount).forEach(x => {
                if (!self.ticketsAmountOptions.some(a => a === x)) {
                    self.ticketsAmountOptions.push(x);
                }
            })

            self.ticketsAmountOptions.sort();
        }

        self.initAreasFilter = () => {
            self.areas = [];

            self.tickets
                .map(x => x.area)
                .forEach(x => {
                    if (!self.areas.some(a => a === x)) {
                        self.areas.push(x);
                        self.areaFilter[x] = true;
                    }
                });
        };

        self.selectAmount = (amount) => {
            self.ticketsAmount = amount;
        }

        self.initRangePrices = () => {
            const prices = self.tickets.map(x => x.price);
            self.priceSlider = {
                minValue: Math.min(...prices),
                maxValue: Math.max(...prices),
                options: {
                    floor: Math.min(...prices),
                    ceil: Math.max(...prices)
                }
            };
        };

        self.initRowsRange = () => {
            self.rowSlider = {
                minValue: 1,
                maxValue: 30,
                options: {
                    floor: 1,
                    ceil: 30
                }
            }
        }

        self.initSeatsRange = () => {
            self.seatSlider = {
                minValue: 1,
                maxValue: 30,
                options: {
                    floor: 1,
                    ceil: 30
                }
            }
        }

        self.initScoreRange = () => {
            self.scoreSlider = {
                minValue: 1,
                maxValue: 10,
                options: {
                    floor: 1,
                    ceil: 10
                }
            }
        }

        self.advancedFilter = (tick) => {
            return (tick.row >= self.rowSlider.minValue && tick.row <= self.rowSlider.maxValue ) &&
                    (tick.seat[0] >= self.seatSlider.minValue && tick.seat[tick.seat.length-1] <= self.seatSlider.maxValue) &&
                    (tick.score >= self.scoreSlider.minValue && tick.score <= self.scoreSlider.maxValue);
        }

        self.buyTicket = ($event) => {
            $event.stopPropagation();
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Thank you for buying!')
                    .position('')
                    .hideDelay(3000));
        }


        self.toggleFavorite = ($event, ticket) => {
            $event.stopPropagation();
            ticket.favorite = !ticket.favorite

            if (ticket.favorite) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('The ticket was successfully added to your favorites!')
                        .position('')
                        .hideDelay(3000));
            } else {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('The ticket was removed from your favorites')
                        .position('')
                        .hideDelay(3000));
            }
        }
        self.areaFilterFunc = tick => {
            return self.areaFilter[tick.area];
        };

        self.priceRangeFilter = tick => {
            return (
                tick.price >= self.priceSlider.minValue &&
                tick.price <= self.priceSlider.maxValue
            );
        };

        self.resetFilters = () => {
            self.ticketsAmount = '';
            self.sortOptions = [
                { name: 'Recommended', value: '-score', isDisabled: false},
                { name: 'Cheapest', value: 'price', isDisabled: false},
                { name: 'Best Seats', value: 'section', isDisabled: false},
                { name: 'Highest Price', value: '-price', isDisabled: false}
            ];
            self.sortChosen = ['-score'];
            self.areaFilter = {};
            self.initTickets();
            self.initRangePrices();
            self.initAmountFilter();
            self.initAreasFilter();
            self.initRowsRange();
            self.initSeatsRange();
            self.initScoreRange();
        }

        self.sortText = () => {
            const sortChoseText = [];
            for (let i = 0; i < self.sortChosen.length; i++) {
                const obj = self.sortOptions.find(x => x.value === self.sortChosen[i]);

                if (obj) {
                    sortChoseText.push(obj.name);
                }
                
            }

            return sortChoseText.join(', ');
        };

        self.sortTickets = () => {
            if (self.sortChosen.some(x => x === 'price')) {
                const index = self.sortOptions.findIndex(x => x.value === '-price');
                if (index >= 0) {
                    self.sortOptions[index].isDisabled = true;
                }
            } else if (self.sortChosen.some(x => x === '-price')) {
                const index = self.sortOptions.findIndex(x => x.value === 'price');
                if (index >= 0) {
                    self.sortOptions[index].isDisabled = true;
                }
            } else {
                let index = self.sortOptions.findIndex(x => x.value === 'price');
                if (index >= 0) {
                    self.sortOptions[index].isDisabled = false;
                }
                index = self.sortOptions.findIndex(x => x.value === '-price');
                if (index >= 0) {
                    self.sortOptions[index].isDisabled = false;
                }
            }
        }

        // self.sortTickets = option => {
        //     const tempTickets = angular.copy(self.tickets);
        //     switch (option) {
        //         case "Cheapest": {
        //             self.tickets = tempTickets.sort((a, b) => a.price - b.price);
        //             break;
        //         }
        //         case "Highest Price": {
        //             self.tickets = tempTickets.sort((a, b) => b.price - a.price);
        //             break;
        //         }
        //         case "Best Seats": {
        //             self.tickets = tempTickets.sort((a, b) => b.score - a.score);
        //             break;
        //         }
        //         case "Recommended": {
        //             self.tickets = tempTickets.sort((a, b) => b.score - a.score);
        //             break;
        //         }
        //         default: {
        //             self.tickets = tempTickets.sort((a, b) => b.score - a.score);
        //             break;
        //         }
        //     }
        // };

        self.greaterThan = function (prop, val) {
            return function (item) {
                return val ? item[prop] > val : true;
            }
        }

        self.openImage = ($event, imageUrl) => {
            $mdDialog.show({
                clickOutsideToClose: true,
                targetEvent: $event,
                bindToController: true,
                controllerAs: 'dialogCtrl',
                fullscreen: true,
                multiple: true,
                template: `<div><button ng-click="closeDialog()" style="position: absolute; top:0;right:0">X</button></div><img src="${imageUrl}">`,
                controller: function DialogController($scope, $mdDialog) {
                    $scope.closeDialog = function () {
                        $mdDialog.hide();
                    };
                }
            });
            $event.stopPropagation();
        };

        self.initTickets = () => {
            self.tickets = window.data;
        };

        self.openTicket = (ticket, $event) => {
            $event.stopPropagation();
            $mdDialog.show({
                clickOutsideToClose: true,
                targetEvent: $event,
                locals: {
                    ticket,
                    location: self.eventLocation,
                    toggleFavorite: self.toggleFavorite,
                    buyTicket: self.buyTicket,
                    openImage: self.openImage
                },
                controllerAs: 'dialogCtrl',
                fullscreen: true,
                template: `
            <md-dialog class="ticket-entity-modal" layout="row" layout-align="space-between">
                <button ng-click="closeDialog()" style="position: absolute; top:0;right:0">X</button>
                <div class="ticket-main" layout="row" layout-align="start start" layout-margin>
                    <div layout="column" layout-align="start center">
                        <div>
                            <img class="ticket-image" ng-src="assets/images/section {{ticket.section}}.png" alt=""
                                ng-click="openImage($event, 'assets/images/section ' + ticket.section +'.jpg')">
                            <md-tooltip md-direction="top">Click to View</md-tooltip>
                        </div>
                        <div layout="column" layout-align="start stretch">
                            <span>
                                Area <strong style="color: #287ac7;">{{ticket.area}}</strong>
                                | Section <strong style="color: #287ac7;">{{ticket.section}}</strong>                                
                            </span>
                            <span>
                                Row <strong style="color: #287ac7;">{{ticket.row}}</strong>
                                | Seats
                                <span ng-repeat="s in ticket.seat">
                                    <strong style="color: #287ac7;">{{s}}</strong><span ng-if="$index !== (ticket.seat.length - 1) ">,</span>
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="ticket-details" flex layout="column" layout-align="start start">
                        <span class="amount">Number of Tickets: <strong>{{ticket.amount}}</strong></span>
                        <span class="price">Ticket Price: <strong>{{ticket.price | currency}}</strong></span>
                        <span class="price">Total: <strong>{{(ticket.price * ticket.amount) | currency}}</strong></span>
                        <span class="view" ng-class="{'ok': ticket.view.status == '0', 'warning': ticket.view.status == '1', 'error': ticket.view.status == '2'}" layout="row">
                            {{ticket.view.message}}
                            <span layout="row" layout-align="center center" style="margin-left: 5px;">
                                <img src="assets/icons/info.svg" width="15" height="15">
                                <md-tooltip md-direction="bottom">{{ticket.view.subMsg}}</md-tooltip>
                            </span>
                        </span>
                        <span>
                            Our Score: <strong>{{ ticket.score }}/10</strong>
                        </span>
                        <span layout="row">
                            <span>Description:</span>
                            <span style="margin-left: 5px;">{{ticket.description}}</span>
                        </span>
                    </div>
                </div>
                <div class="ticket-buy" layout="column" layout-align="space-between center">
                    <md-button ng-if="!ticket.favorite" class="favorite md-icon-button md-accent" aria-label="Favorite" ng-click="toggleFavorite($event, ticket)">
                        <img  src="assets/icons/favorite-border.svg" alt="favorite">
                        <md-tooltip md-direction="top">Add to favorites</md-tooltip>
                    </md-button>
                    <md-button ng-if="ticket.favorite" class="favorite md-icon-button md-accent" aria-label="Favorite" ng-click="toggleFavorite($event, ticket)">
                        <img src="assets/icons/favorite.svg" alt="favorite">
                        <md-tooltip md-direction="top">Remove from favorites</md-tooltip>
                    </md-button>
                    <div layout="column" layout-align="center center">
                        <span style="font: bold 20px HeeboRegular;">{{(ticket.price * ticket.amount) | currency}}</span>
                        <md-button class="buy-btn md-raised md-primary" ng-click="buyTicket($event); closeDialog();">Buy</md-button>
                    </div>
                </div>
                
            </md-dialog>
            `,
                controller: function DialogController($scope, $mdDialog, ticket, location, toggleFavorite, buyTicket, openImage) {
                    $scope.ticket = ticket;
                    $scope.location = location;
                    $scope.toggleFavorite = toggleFavorite
                    $scope.buyTicket = buyTicket;
                    $scope.openImage = openImage;

                    $scope.closeDialog = function () {
                        $mdDialog.hide();
                    };
                }
            });
        }
    }
})();