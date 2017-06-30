var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope,$http) {
    $scope.data = {};
    
    $scope.preview = function(){
        alert("Submitted!");
    }
    
    $scope.send = function(){
        
        console.log("inside click");
        //console.log($scope.data.textdata);
        
        var posting = $http({
            
            method: 'POST',
            url: '/post',
            data: $scope.data,
            processData: true
        }).then(function(response){
            
            $scope.bars = response.data.businesses;
            
        }).catch(function(err){
            $scope.bars = err.statusText;
            console.log('Data not recieved');
        });
    }
});
