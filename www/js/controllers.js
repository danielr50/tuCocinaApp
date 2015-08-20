// modulo para de la app para crear los controladores
var app = angular.module('tuCocina.controllers', ['tuCocina.services', 'LocalStorageModule']);

// controlador para la vista home
app.controller('homeController', function($scope, $location, $timeout, $ionicLoading, $cordovaGeolocation, localStorageService){
	
	$scope.escribir_direccion = function(){
		$location.url('/direccion')
	}

	$scope.myLocation = function(){
	      var posOptions = {timeout: 10000, enableHighAccuracy: false};
		  var geocoder = new google.maps.Geocoder(); //objeto para pasar las coordenas a direccion

		  // cargo las coordenadas de mi posicion actual
		  $cordovaGeolocation
		    .getCurrentPosition(posOptions)
		    .then(function (position) {
		      var lat  = position.coords.latitude
		      var long = position.coords.longitude

		      var latlng = new google.maps.LatLng(lat, long);
		      // funcion que retorna la direccion del usuario
		      geocoder.geocode({'latLng': latlng}, function(results, status){
		      	if (status == google.maps.GeocoderStatus.OK) {
		      		if (results[0]) {
	  					var origen = results[0].formatted_address;
	  					console.log('origen: '+origen);

	  					// Setup the loader
						  $ionicLoading.show({
						    content: 'Loading',
						    animation: 'fade-in',
						    showBackdrop: true,
						    maxWidth: 200,
						    showDelay: 0
						  });
						  
						  // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
						  $timeout(function () {
						    $ionicLoading.hide();
	  						
	  						$scope.$apply(function(){
	  							// almaceno la direccion en el localstorage
	  							localStorageService.set('dir', origen);
	  							$location.url('/restaurantes');
	  						});
						  }, 2000);
		      		}
		      	}
		      });
		    }, function(err) {
		      // error
		    });

	}	
});

// controllador para hallar o escribir la direccion 
app.controller('direccionController', function($scope, $location, $timeout, $ionicLoading){
		// Setup the loader
	  $ionicLoading.show({
	    content: 'Loading',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 0
	  });
	  
	  // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
	  $timeout(function () {
	    $ionicLoading.hide();
	  }, 2000);

	$scope.restaurantes = function(){
		$location.url('/restaurantes');
	}

});

// controllador para los restaurantes
app.controller('restaurantesController', function($scope, $location, $timeout, $ionicLoading, localStorageService){
	// Setup the loader
	  $ionicLoading.show({
	    content: 'Loading',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 0
	  });
	  
	  // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
	  $timeout(function () {
	    $ionicLoading.hide();
	    // busco la direccion en el localstorage
	    // aca validar si existe o no para notificar al usuario
	    var direccion = localStorageService.get('dir');
	    $scope.dirOrigen = direccion;
	    // $scope.stooges = [{name: 'Moe'}, {name: 'Larry'}, {name: 'Curly'}];
	  }, 2000);
});

