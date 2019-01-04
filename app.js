(function() {
  "use strict";

  angular
    .module("app", ["ngMaterial", "ngMessages", "rzModule"])
    .controller("main", controller);

  controller.$inject = ['$mdDialog', '$mdToast'];

  function controller($mdDialog, $mdToast) {
    const self = this;
    self.eventLocation = 'Staples Center, Los Angeles, California, USA';
    self.ticketsAmount = '';
    self.sortOption = "Recommended";
    
    self.sortOptions = [
      "Recommended",
      "Cheapest",
      "Best seats",
      "Highest price"
    ];
    self.date = new Date();
    self.areaFilter = {};

    self.$onInit = () => {
        self.initTickets();
        self.initRangePrices();
        self.initAmountFilter();
        self.initAreasFilter(); 
        self.sortBy();
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

    self.buyTicket = ($event) => {
        $event.stopPropagation();
        $mdToast.show(
            $mdToast.simple()
            .textContent('Thank you for buying!')
            .position('')
            .hideDelay(3000))
    }


    self.toggleFavorite = ($event, ticket) => {
        $event.stopPropagation();
        ticket.favorite = !ticket.favorite

        if (ticket.favorite) {
            $mdToast.show(
                $mdToast.simple()
                .textContent('The ticket was successfully added to your favorites!')
                .position('')
                .hideDelay(3000))
        } else {
            $mdToast.show(
                $mdToast.simple()
                .textContent('The ticket was removed from your favorites')
                .position('')
                .hideDelay(3000))
        }
    }
    self.areaFilterFunc = tick => {
      return self.areaFilter[tick.area];
    };

    self.sortBy = option => {
      self.sortOption = option || "Recommended";
      self.sortTickets(self.sortOption);
    };

    self.priceRangeFilter = tick => {
      return (
        tick.price >= self.priceSlider.minValue &&
        tick.price <= self.priceSlider.maxValue
      );
    };

    self.sortTickets = option => {
      const tempTickets = angular.copy(self.tickets);
      switch (option) {
        case "Cheapest": {
          self.tickets = tempTickets.sort((a, b) => a.price - b.price);
          break;
        }
        case "Highest price": {
          self.tickets = tempTickets.sort((a, b) => b.price - a.price);
          break;
        }
        case "Best Seats": {
          self.tickets = tempTickets.sort((a, b) => b.price - a.price);
          break;
        }
        case "Recommended": {
          self.tickets = tempTickets.sort((a, b) => b.score - a.score);
          break;
        }
        default: {
          self.tickets = tempTickets.sort((a, b) => b.price - a.price);
          break;
        }
      }
    };

    self.greaterThan = function(prop, val){
        return function(item){
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
            template: `<img src="${imageUrl}">`,
            controller: function DialogController($scope, $mdDialog) {
            $scope.closeDialog = function() {
                $mdDialog.hide();
            };
            }
        });
        $event.stopPropagation();
    };

    self.initTickets = () => {
        self.tickets = window.data;
        self.ticketsDisplayed = angular.copy(self.tickets);
    };

    self.openTicket = (ticket, $event) => {
        $event.stopPropagation();
        $mdDialog.show({
            clickOutsideToClose: true,
            targetEvent: $event,
            locals: { ticket, location: self.eventLocation, toggleFavorite: self.toggleFavorite },
            controllerAs: 'dialogCtrl',
            fullscreen: true,
            template: `
            <md-dialog class="ticket-entity-modal" layout="row" layout-align="space-between">
                <div class="ticket-main" layout="row" layout-align="start start" layout-margin>
                    <div layout="column" layout-align="start center">
                        <img class="ticket-image" src="https://cdn.viagogo.net/img/svgpng4/77551/256963.png" alt=""
                            ng-click="ctrl.openImage($event, 'https://cdn.viagogo.net/img/svgpng4/77551/256963.png')">
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
                            Our Score: <strong>{{ ticket.score }}</strong>
                        </span>
                        <span layout="row">
                            <span>Description:</span>
                            <span style="margin-left: 5px;">{{ticket.description}}</span>
                        </span>
                    </div>
                </div>
                <div class="ticket-buy" layout="column" layout-align="end center">
                    <md-button class="buy-btn md-raised md-primary">Buy</md-button>
                </div>
                <md-button ng-if="!ticket.favorite" class="favorite md-icon-button md-accent" aria-label="Favorite" ng-click="toggleFavorite($event, ticket)">
                    <img  src="assets/icons/favorite-border.svg" alt="favorite">
                    <md-tooltip md-direction="top">Add to favorites</md-tooltip>
                </md-button>
                <md-button ng-if="ticket.favorite" class="favorite md-icon-button md-accent" aria-label="Favorite" ng-click="toggleFavorite($event, ticket)">
                    <img src="assets/icons/favorite.svg" alt="favorite">
                    <md-tooltip md-direction="top">Remove from favorites</md-tooltip>
                </md-button>
            </md-dialog>
            `,
            controller: function DialogController($scope, $mdDialog, ticket, location, toggleFavorite) {                
                $scope.ticket = ticket;
                $scope.location = location;
                $scope.toggleFavorite = toggleFavorite
                $scope.closeDialog = function() {
                    $mdDialog.hide();
                };
            }
          });
    }
  }
})();