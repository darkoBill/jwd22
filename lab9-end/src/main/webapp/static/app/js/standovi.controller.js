var wafepaApp = angular.module('wafepaApp');

wafepaApp.controller("standoviCtrl", function($scope, $http, standoviSrvc){

    var url_base_standovi = "http://localhost:8080/api/standovi";
    var url_base_sajmovi = "http://localhost:8080/api/sajmovi";

    $scope.filter = false;

    $scope.standovi = [];
    $scope.sajmovi = [];

    $scope.newStand = {};
    $scope.newStand.zakupac = "";
    $scope.newStand.povrsina = "";
    $scope.newStand.sajamId = 0;

    $scope.trazeniStand = {};
    $scope.trazeniStand.zakupac = "";
    $scope.trazeniStand.minP = "";
    $scope.trazeniStand.maxP = "";

    $scope.pageNum = 0;
    $scope.totalPages = 0;

    var getStandovi = function(){

        var config = { params: {} };

        config.params.pageNum = $scope.pageNum;

        if($scope.trazeniStand.zakupac != ""){
            config.params.zakupac = $scope.trazeniStand.zakupac;
        }

        if($scope.trazeniStand.minP != ""){
            config.params.minP = $scope.trazeniStand.minP;
        }

        if($scope.trazeniStand.maxP != ""){
            config.params.maxP = $scope.trazeniStand.maxP;
        }

        var promise = standoviSrvc.getStandovi(config);
        promise.then(
            function success(data){
                $scope.standovi = data.data;
                $scope.totalPages = data.headers("totalPages");
            },
            function error(data){
                alert("Something went wrong!");
                console.log(data);
            }
        );

    }

    getStandovi();

    $scope.got_sajmovi = false;
    var getSajmovi = function(){

        $http.get(url_base_sajmovi).then(
            function success(data){
                $scope.sajmovi = data.data;
                $scope.got_sajmovi = true;
            },
            function error(data){
                console.log(data);
            }

        )

    }
    getSajmovi();


    $scope.addStand = function(){

        if($scope.newStand.zakupac != "" && $scope.newStand.povrsina != "" && !isNaN($scope.newStand.povrsina) && $scope.newStand.sajamId != 0){
            var promise = $http.post(url_base_standovi, $scope.newStand);
            promise.then(
                function success(data){
                    //alert("Success!");
                    getStandovi();
                    $scope.newStand.zakupac="";
                    $scope.newStand.povrsina= "";
                    $scope.newStand.sajamId = 0;
                },
                function error(data){
                    alert("Something went wrong!");
                    console.log(data);
                }
            );
        }
        
    }

    $scope.change = function(){
        alert("Change!!");
    }

    $scope.go = function(num){
        $scope.pageNum = $scope.pageNum + num;
        getStandovi();
    }

    $scope.search = function(){

        $scope.pageNum = 0;
        getStandovi();
    }
});