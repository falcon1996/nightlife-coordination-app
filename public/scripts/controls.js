var app = angular.module('myApp', ['ngStorage']);

app.controller('myCtrl', function($scope,$http,$sessionStorage,$window,$localStorage,$location) {
    
    var awesomePlaces = [0];
    
    $scope.data = {};
    
    $localStorage.showDiv;
    $localStorage.shownextDiv;
    $scope.loginvalue = $localStorage.showDiv;
    $scope.logoutvalue = $localStorage.shownextDiv;
    
    $scope.rsvped = $localStorage.rsvpbars;
    
    function show(storedPlaces){
        storedPlaces.forEach(function(index){
           
            $scope.VarName.data.businesses[index].rsvping = true;
            $scope.VarName.data.businesses[index].show = true;
        });
    }
    
    $scope.preview = function(){
        alert("Submitted!");
    }
    
    $scope.send = function(){
        
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
    
    $scope.myauth = function(){
        
        alert('Want to Authenticate?');
        
        $scope.loginvalue = true;
        $scope.logoutvalue = true;
        $localStorage.showDiv = $scope.loginvalue;
        $localStorage.shownextDiv = $scope.logoutvalue;
        
        $window.location.href = '/auth/github';
    }
    
    $scope.logout = function(){
        alert("Want to Logout?");
        
        $scope.loginvalue = false;
        $scope.logoutvalue = false;
        $localStorage.showDiv = $scope.loginvalue;
        $localStorage.shownextDiv = $scope.logoutvalue;
        
        $window.location.href = '/logout';
        
    }
    
    $scope.rsvp = function(index){
        
        
       // $scope.VarName.data.businesses[index].rsvping = true;
        //$scope.VarName.data.businesses[index].show = true;
        
        alert("Task Id is "+$scope.VarName.data.businesses[index].id);
    
        awesomePlaces.push(index);
        
        var req = $http({
            
            method: 'POST',
            url: '/getlist',
            data: {'index': $scope.VarName.data.businesses[index].id},
            processData: true
        }).then(function(response){
            
            $scope.places = response.data;
            
        }).catch(function(err){
            $scope.bars = err.statusText;
            console.log('List not recieved');
        });
        
        show($scope.places);
    } 
    
    $scope.cancel = function(index){
        
        //awesomePlaces.remove(index);
        
        console.log(awesomePlaces)
        
        $scope.VarName.data.businesses[index].rsvping = false;
        $scope.VarName.data.businesses[index].show = false;
        
       // $sessionStorage.myrsvp = $scope.VarName.data.businesses[index].rsvping;
        //$sessionStorage.myshow = $scope.VarName.data.businesses[index].show;
    }
    
    $scope.VarName = angular.fromJson($window.sessionStorage['storage']);
    
    $scope.myvalues = angular.fromJson($window.sessionStorage['mystorage']);
    
    
});
