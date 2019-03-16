(function(){
	var app = angular.module("myApp", []);
	app.controller('myCtrl', function($scope){
		$scope.firstName = 'john';
		$scope.lastName = 'Doe';
		$scope.fullName = function(){
			return $scope.firstName + " and " + $scope.lastName;
		}
	})
})();