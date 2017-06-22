var wafepaApp = angular.module('wafepaApp');

wafepaApp.controller('activitiesCtrl', function($scope, $http, $location){
    
    var url_base = "http://localhost:8080/api/activities";	

    $scope.activities = [];
    $scope.got_activities = false;
    //Funkcija kojom dobavljamo sve aktivnosti sa servera
    var getActivities =  function(){

        var ac_promise = $http.get(url_base);
        ac_promise.then(
            function success(data){
                console.log(data);
                $scope.activities = data.data;
                $scope.got_activities = true;
            },
            function error(data){
                alert("Something went wrong!");
                console.log(data);
            }
        );
    }

    getActivities();

    // Funkcija kojom se aktivnost brise
    $scope.deleteActivity = function(id){
        var ac_promise = $http.delete(url_base + "/" + id);
        ac_promise.then(
            function success(data){
                console.log(data);
                getActivities();
            },
            function error(data){
                alert("Something went wrong!");
                console.log(data);
            }
        )

    }

    $scope.addActivity = function(){
        $location.path("/activities/add");
    }

    $scope.goToEdit = function(id){
        $location.path("/activities/edit/" + id);
    }
});