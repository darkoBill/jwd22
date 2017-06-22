var wafepaApp = angular.module('wafepaApp');

wafepaApp.service("standoviSrvc", function($http){

	this.url_base_standovi = "http://localhost:8080/api/standovi";
	this.getStandovi = function(config){

		return $http.get(this.url_base_standovi, config);
	}

})