var wafepaApp = angular.module('wafepaApp');

wafepaApp.controller("addActivityCtrl", function($scope, $http, $location){

    var url_base = "http://localhost:8080/api/activities";

    $scope.newActivity = {};
    $scope.newActivity.name = "";

    //Funkcija koja prosledjuje novu aktivnost serveru, koji je potom dodaje u bazu
    $scope.addActivity = function(){
        if($scope.newActivity.name === ""){
            alert("Name is empty");
        }else{
            var promise = $http.post(url_base, $scope.newActivity);
            promise.then(
                function success(data){
                    console.log(data);
                    $location.path('/activities');
                },
                function error(data){
                    console.log(data);
                    alert("Something went wrong");
                }
            );

        }
        
    }
});