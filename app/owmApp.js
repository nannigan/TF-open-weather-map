angular.module('OWMApp', ['ngRoute', 'ui.bootstrap','ngAnimate'])
.value('owmCities', ['San Francisco', 'Oakland', 'Arcata'])
.config(['$routeProvider', function($routeProvider)
    {
        $routeProvider
        .when('/',
        {
            templateUrl: 'home.html',
            controller: 'HomeCtrl as home'
        })
        .when('/cities/:city',//:city as URL parameter
        {
            templateUrl: 'city.html',
            controller: 'CityCtrl',
            resolve: {
                city: function(owmCities, $route, $location)
                {
                    var city = $route.current.params.city;
                    if (owmCities.indexOf(city) == -1)
                    {
                        $location.path('/error');
                        return;
                    }
                    return city;
                }
            }
        })
        .when('/error',
            {
                template: '<p>yuh r on a road to nowhere</p>'
            });
        //'$locationProvider',
       //$locationProvider.htm5Mode(true); to use html5 push state which provides 'normal' urls without the hash

    }])
// includes more possible exception scenarios than otherwise
.run(function($rootScope, $location, $timeout) {
    $rootScope.$on('$routeChangeError', function() {
        $location.path("/error");
    });
    $rootScope.$on('$routeChangeStart', function() {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function() {
      $timeout(function() {
        $rootScope.isLoading = false;
      }, 50);// 5000 so I can enjoy my ani
    });
})

    .controller('HomeCtrl', function()
    {
        this.message = 'God, you again!';
    })
    .controller('CityCtrl',function($scope, city)
    {
        $scope.city = city;
    });