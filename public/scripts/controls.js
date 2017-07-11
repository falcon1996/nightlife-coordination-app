var app = angular.module('myApp', ['ngStorage']);

app.controller('myCtrl', function($scope,$http,$sessionStorage,$window) {
    $scope.data = {};
    $scope.gym = 'Not going';
    
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
            
            $window.sessionStorage['storage'] = angular.toJson(response);
            location.reload();
            //$scope.VarName = angular.fromJson(accessData);
            
            
        }).catch(function(err){
            $scope.bars = err.statusText;
            console.log('Data not recieved');
        });
    }
    
    $scope.rsvp = function(index){
        
        $scope.VarName.data.businesses[index].rsvping = true;
        $scope.VarName.data.businesses[index].show = true;
        
        
        alert("Task Id is "+$scope.bars[index].id);
        
        var change = $http({
            
            method: 'POST',
            url: '/mypost',
            processData: true
        }).then(function(response){
            
            $scope.gym = $scope.bars[index].phone;
            
        });
        
    }
    
    $scope.cancel = function(index){
        
        $scope.VarName.data.businesses[index].rsvping = false;
        $scope.VarName.data.businesses[index].show = false;
    }
    
    
    
    $scope.VarName = angular.fromJson($window.sessionStorage['storage']);
    
});
