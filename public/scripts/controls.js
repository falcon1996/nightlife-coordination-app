var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope,$http) {
    $scope.data = {};
    $scope.response = {};
    
    $scope.preview = function(){
        alert("Previewed");
    }
    
    $scope.send = function(){
        
        console.log("inside click");
        //console.log($scope.data.textdata);
        
        var posting = $http({
            
            method: 'POST',
            url: '/post',
            data: $scope.data,
            processData: true
        })
        
    }
});