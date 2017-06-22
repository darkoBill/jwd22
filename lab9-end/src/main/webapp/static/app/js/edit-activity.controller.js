
var wafepaApp = angular.module('wafepaApp');

wafepaApp.controller("editActivityCtrl", function($scope, $http, $routeParams, $location){

    var url_base = "http://localhost:8080/api/activities";

    var id = $routeParams.aid;

    $scope.got_activity = false;
    $scope.activity = {};

    // Dobavljanje aktivnosti sa servera
    var getActivity = function(){
        $http.get(url_base + "/" + id).then(
            function success(data){
                console.log(data);
                $scope.got_activity = true;
                $scope.activity = data.data;
            },
            function error(data){
                console.log(data);
                alert("Something went wrong");
            }

        );
    }
    getActivity();


    // Funkcija kojom se menja tekuca aktivnost.
    $scope.editActivity = function(){
        var promise = $http.put(url_base + "/" + id, $scope.activity);
        promise.then(
            function success(data){
                console.log(data);
                $location.path("/activities");

            },
            function error(data){
                console.log(data);
                alert('Something went wrong!');
            }
        )
    }
});
