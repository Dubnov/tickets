(function() {
  "use strict";

  angular
    .module("app", ["ngMaterial", "ngMessages", "rzModule"])
    .controller("main", controller);

  controller.$inject = ["$mdDialog"];

  function controller($mdDialog) {
    const self = this;
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
          self.tickets = tempTickets.sort((a, b) => b.price - a.price);
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
        template:
          `<img src="${imageUrl}">`,
        controller: function DialogController($scope, $mdDialog) {
          $scope.closeDialog = function() {
            $mdDialog.hide();
          };
        }
      });
    };

    self.initTickets = () => {
        self.tickets = window.data;
        self.ticketsDisplayed = angular.copy(self.tickets);
    };
  }
})();



window.data = [
    {
        title: "Section 100",
        description: "",
        price: 300,
        row: 'row 2',
        amount: 3,
        view: { message: 'Unrestricted view', status: 0 },
        area: "Lower Tier"
    },
    {
        title: "Section 200",
        description: "",
        price: 110,
        row: 'row 2',
        amount: 1,
        view: { message: 'Unrestricted view', status: 0 },
        area: "Middle Tier"
    },
    {
        title: "Section 105",
        description: "",
        price: 250,
        row: 'row 2',
        amount: 2,
        view: { message: 'Unrestricted view', status: 0 },
        area: "Lower Tier"
    },
    {
        title: "Section 210",
        description: "",
        price: 100,
        row: 'row 2',
        amount: 2,
        view: { message: 'Unrestricted view', status: 0 },
        area: "Middle Tier"
    },
    {
        title: "Section 335",
        description: "",
        price: 55,
        row: 'row 2',
        amount: 4,
        view: { message: 'Unrestricted view', status: 0 },
        area: "Middle Tier"
    },
    {
        title: "Section 300",
        description: "",
        price: 50,
        row: 'row 2',
        amount: 1,
        view: { message: 'Unrestricted view', status: 0 },
        area: "Middle Tier"
    },
    {
        title: "Section 400",
        description: "",
        price: 10,
        row: 'row 2',
        amount: 2,
        view: { message: 'Unrestricted view', status: 0 },
        area: "Upper Tier"
    },
    {
        title: "Section 10",
        description: "",
        price: 1000,
        row: 'row 2',
        seat: 'seat 5',
        amount: 3,
        view: { message: 'Unrestricted view', status: 0 },
        area: "Boxes"
    }
];