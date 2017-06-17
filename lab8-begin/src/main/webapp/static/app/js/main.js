var wafepaApp = angular.module('wafepaApp', ['ngRoute']);

wafepaApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : '/static/app/html/partial/home.html'
        })
        .when('/activities', {
            templateUrl : '/static/app/html/partial/activities.html'
        })
        .when('/activities/add', {
            templateUrl : '/static/app/html/partial/add-activity.html'
        })
        .when('/activities/edit/:aid', {
            templateUrl : '/static/app/html/partial/edit-activity.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

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
});

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
