// modulo para de la app para crear los controladores
var app = angular.module('tuCocina.controllers', ['tuCocina.services']);

// controlador para la vista home
app.controller('homeController', function($scope, $location){
	$scope.escribir_direccion = function(){
		$location.url('/direccion')
	}
});