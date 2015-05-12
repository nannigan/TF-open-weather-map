angular.module('OWMApp', ['ngRoute'])
 .value( 'owmCities', ['San Francisco','Oakland', 'Arcata'])
 .config(['$routeProvider', function($routeProvider){
        $routeProvider
          .when('/', {
            templateUrl : 'home.html',
            controller : 'HomeCtrl as home'
						})
					.when('/cities/:city', {
						templateUrl : 'city.html',
						controller : 'CityCtrl',
						resolve : {
							city: function(owmCities, $route, $location) {
							var city = $route.current.params.city;
							if(owmCities.indexOf(city) == -1 ) {
								$location.path('/error');
								return;
							}
								return city;
							}
						}
					})
					.when('/error', {
				    template : '<p>yuh r on a road to nowhere</p>'
					})
					// .otherwise('/error');
					
    }])
    .run(function($rootScope, $location) {
				    $rootScope.$on('$routeChangeError', function() {
		        $location.path('/error');
			    });
			})
					  
    .controller('HomeCtrl', function() {
    	this.message = 'God, you again!'
       
    })
    .controller('CityCtrl', 
    	function($scope, city) {
		    $scope.city = city;
		});
