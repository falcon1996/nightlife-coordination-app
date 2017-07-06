var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope,$http) {
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
            
        }).catch(function(err){
            $scope.bars = err.statusText;
            console.log('Data not recieved');
        });
    }
    
   /* $scope.save = function(bar){
        
        console.log('Decision Taken!');
        alert("Task Id is "+bar.id);
        
        var change = $http({
            
            method: 'GET',
            url: '/get',
            processData: true
        }).then(function(response){
            
            $scope.gym = bar.phone;
            
        });
    }*/
    
    $scope.rsvp = function(index){
        
        $scope.bars[index].rsvping = true;
        $scope.bars[index].show = true;
        
        
        alert("Task Id is "+$scope.bars[index].id);
        
        var change = $http({
            
            method: 'GET',
            url: '/get',
            processData: true
        }).then(function(response){
            
            $scope.gym = $scope.bars[index].phone;
            
        });
        
    }
    
    $scope.cancel = function(index){
        
        $scope.bars[index].rsvping = false;
        $scope.bars[index].show = false;
    }
    
});
